import { KnowledgeChunk, Language } from '../types';

interface DocumentIndex {
  c: KnowledgeChunk;
  tf: Record<string, number>;
  len: number;
}

interface SearchIndex {
  docs: DocumentIndex[];
  df: Record<string, number>;
  avg: number;
  n: number;
}

const STOP_WORDS = new Set(
  (
    "a an and are as at be by can do does for from has have how i in is it its me my of on or our the this to we what when where which who why will with you your about tell show give need want quantinox handle handles work works offer offers provide provides available possible " +
    "का की के है हैं में से को और या क्या कैसे कौन कौन-से मुझे मेरे हम आप यह वह पर भी तो एक लिए करें करता करती होता होती बताएँ बताइए"
  ).split(/\s+/)
);

// High-frequency synonym mappings for ERP
const SYNONYMS: Record<string, string[]> = {
  gst: ["tax", "taxes", "invoice", "compliance", "statutory", "जीएसटी", "टैक्स"],
  tax: ["gst", "compliance", "statutory", "टैक्स", "कर"],
  einvoice: ["invoice", "gst", "tax", "इनवॉइस"],
  invoice: ["billing", "invoicing", "इनवॉइस", "बिलिंग"],
  billing: ["invoice", "sales", "बिलिंग"],
  payroll: ["salary", "hr", "employee", "पेरोल", "वेतन"],
  salary: ["payroll", "hr", "पेरोल", "वेतन"],
  employee: ["hr", "payroll", "कर्मचारी"],
  staff: ["hr", "employee", "कर्मचारी"],
  hiring: ["recruitment", "hr"],
  inventory: ["stock", "warehouse", "supply", "स्टॉक", "इन्वेंटरी"],
  stock: ["inventory", "warehouse", "स्टॉक", "इन्वेंटरी"],
  warehouse: ["inventory", "stock", "logistics", "वेयरहाउस", "गोदाम"],
  price: ["pricing", "cost", "कीमत", "प्राइसिंग"],
  cost: ["pricing", "price", "savings", "कीमत", "लागत"],
  pricing: ["price", "cost", "कीमत", "प्राइसिंग"],
  accounting: ["finance", "ledger", "accounts", "फ़ाइनेंस", "अकाउंटिंग"],
  accounts: ["finance", "ledger", "receivables", "payables", "फ़ाइनेंस"],
  cash: ["treasury", "receivables", "finance", "liquidity"],
  purchase: ["procurement", "supplier", "vendor", "sourcing", "खरीद"],
  procurement: ["purchase", "supplier", "vendor", "sourcing", "खरीद"],
  supplier: ["vendor", "procurement", "सप्लायर"],
  vendor: ["supplier", "procurement", "वेंडर", "सप्लायर"],
  production: ["manufacturing", "उत्पादन", "मैन्युफैक्चरिंग"],
  manufacturing: ["production", "factory", "plant", "उत्पादन", "मैन्युफैक्चरिंग"],
  project: ["services", "projects", "प्रोजेक्ट"],
  services: ["project", "projects", "consulting", "सर्विस"],
  maintenance: ["assets", "asset", "equipment", "मेंटेनेंस"],
  assets: ["maintenance", "equipment", "asset", "मशीनरी"],
  ai: ["assistant", "quanta", "agents", "automation"],
  agent: ["ai", "agents", "automation"],
  trial: ["demo", "try", "free", "ट्रायल"],
  demo: ["trial", "tour", "book", "डेमो"],
  support: ["help", "ticket", "case", "सपोर्ट", "मदद"],
  जीएसटी: ["gst", "tax", "invoice"],
  टैक्स: ["gst", "tax", "कर"],
  पेरोल: ["payroll", "salary", "hr", "वेतन"],
  वेतन: ["payroll", "salary", "hr", "पेरोल"],
  कीमत: ["pricing", "price", "cost", "प्राइसिंग"],
  स्टॉक: ["inventory", "stock", "warehouse"],
  खरीद: ["procurement", "supplier", "purchase"],
  बिक्री: ["sales", "billing"],
  सप्लायर: ["supplier", "vendor", "procurement"]
};

export function tokenize(text: string): string[] {
  const matches = (String(text || '')
    .toLowerCase()
    .replace(/[-–/]/g, ' ')
    .match(/[\p{L}\p{N}][\p{L}\p{N}\p{M}]*/gu) || []) as string[];
  return matches
    .filter((w: string) => w.length > 1 && !STOP_WORDS.has(w))
    .map((w: string) => (/^[a-z0-9]+$/.test(w) && w.length > 6 ? w.slice(0, 6) : w));
}

let cachedIndex: SearchIndex | null = null;
let cachedChunks: KnowledgeChunk[] = [];

export async function loadKnowledge(): Promise<KnowledgeChunk[]> {
  if (cachedChunks.length) return cachedChunks;
  try {
    const res = await fetch('/assets/data/assistant-knowledge.json');
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.chunks)) {
        cachedChunks = data.chunks;
        initIndex(cachedChunks);
        return cachedChunks;
      }
    }
  } catch (err) {
    console.warn('Could not load remote knowledge JSON, using fallback knowledge', err);
  }
  return [];
}

function initIndex(chunks: KnowledgeChunk[]) {
  const docs: DocumentIndex[] = chunks.map((c) => {
    const tk = tokenize(`${c.t} ${c.t} ${c.pt} ${c.x}`);
    const tf: Record<string, number> = {};
    for (const w of tk) {
      tf[w] = (tf[w] || 0) + 1;
    }
    return { c, tf, len: tk.length };
  });

  const df: Record<string, number> = {};
  let totalWords = 0;
  for (const d of docs) {
    totalWords += d.len;
    for (const w of Object.keys(d.tf)) {
      df[w] = (df[w] || 0) + 1;
    }
  }

  cachedIndex = {
    docs,
    df,
    avg: totalWords / Math.max(1, docs.length),
    n: docs.length,
  };
}

export interface SearchResult {
  chunk: KnowledgeChunk;
  score: number;
  cover: number;
}

export function searchKnowledge(query: string, lang: Language, currentPage?: string, limit: number = 6): SearchResult[] {
  if (!cachedIndex || !cachedIndex.docs.length) return [];
  const qt = tokenize(query);
  if (!qt.length) return [];

  const k1 = 1.4;
  const b = 0.75;
  const results: SearchResult[] = [];
  const uq = Array.from(new Set(qt));

  for (const d of cachedIndex.docs) {
    if (d.c.l !== lang) continue;
    let score = 0;
    let hit = 0;

    const bm25 = (w: string) => {
      const f = d.tf[w];
      if (!f) return 0;
      const idf = Math.log(1 + (cachedIndex!.n - (cachedIndex!.df[w] || 0) + 0.5) / ((cachedIndex!.df[w] || 0) + 0.5));
      return idf * (f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / cachedIndex!.avg));
    };

    for (const w of uq) {
      const own = bm25(w);
      let best = own;
      const syns = SYNONYMS[w] || [];
      for (const alt of syns) {
        best = Math.max(best, 0.45 * bm25(alt));
      }
      if (best > 0) {
        hit += own ? 1 : 0.5;
        score += best;
      }
    }

    if (score > 0) {
      const cover = hit / uq.length;
      score *= 0.35 + cover;
      if (currentPage && d.c.p === currentPage) {
        score *= 1.2;
      }
      results.push({ chunk: d.c, score, cover });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

export function extractBestSnippet(text: string, query: string, maxLen: number = 240): string {
  const qt = tokenize(query);
  const sentences = text.match(/[^.!?।]+[.!?।]?/g) || [text];
  const scored = sentences.map((s, i) => {
    const tokens = tokenize(s);
    const hits = tokens.filter((w) => qt.includes(w)).length;
    return { sentence: s.trim(), index: i, hits };
  });

  scored.sort((a, b) => b.hits - a.hits || a.index - b.index);
  let snippet = scored.slice(0, 2).map((x) => x.sentence).join(' ');
  if (snippet.length > maxLen) {
    snippet = snippet.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
  }
  return snippet || text.slice(0, maxLen);
}

export const INTENT_PATTERNS: [string, RegExp][] = [
  ['greet', /^\s*(hi|hello|hey|hii+|good (morning|afternoon|evening)|namaste|नमस्ते|नमस्कार|हेलो|हाय)\b[\s!.?]*$/i],
  ['summary', /(summari[sz]e|summary|this page|what is on this page|सारांश|इस पेज)/i],
  ['human', /(human|real person|someone|agent|representative|talk to (sales|team|a person)|whatsapp|इंसान|व्यक्ति|किसी से बात|टीम से बात|व्हाट्सएप)/i],
  ['callback', /(call ?back|call me|phone call|कॉल बैक|कॉल करें|फ़ोन कर)/i],
  ['demo', /(\bdemo\b|demonstration|डेमो)/i],
  ['calc', /(saving|save money|roi|return on|calculat|business case|worth|बचत|कैलकुलेट|फ़ायदा कितना)/i],
  ['finder', /(which modules?|what modules?|recommend|right (package|plan|fit)|where (do|should) i start|कौन-से मॉड्यूल|कौन से मॉड्यूल|मॉड्यूल चाहिए|सुझा|कौन-सा पैकेज|सही पैकेज)/i],
  ['pricing', /(pric|cost|how much|plans?\b|package|subscription|quote|कीमत|दाम|लागत|प्लान|पैकेज|कोटेशन)/i],
  ['trial', /(trial|try it|free account|sandbox|ट्रायल|आज़मा|मुफ़्त)/i],
  ['tour', /(tour|show me (the )?(product|screens?)|screenshots?|टूर|स्क्रीन दिखा|प्रोडक्ट दिखा)/i],
  ['lang', /(hindi|english|हिन्दी|हिंदी|अंग्रेज़ी|language|भाषा)/i],
  ['overview', /(what('s| is) quantinox|about quantinox|what (can|does) quantinox|tell me about (quantinox|your (company|product|erp))|overview|quantinox क्या|क्या कर सकता|के बारे में बताएँ|के बारे में बताइए)/i],
  ['implementation', /(implement|go[ -]?live|how long|timeline|onboard|migrat|set ?up|move from|switch from|लागू|इम्प्लीमेंट|कितना समय|माइग्रेशन)/i],
  ['security', /(secur|privacy|encrypt|backup|data (safety|security|protection|residency|cent(re|er)|stored|storage)|where is (my|our) data|dpdp|सुरक्षा|गोपनीयता)/i],
  ['support', /(customer support|support (team|case|ticket|portal)|raise a (case|ticket)|help ?desk|सपोर्ट टीम|सहायता चाहिए|टिकट)/i],
  ['ai_info', /(quanta ai|ai agents?|artificial intelligence|what can (the )?ai|एजेंट|आर्टिफ़िशियल)/i],
  ['industries', /(industr|sectors?|उद्योग)/i]
];

export function detectIntent(query: string): string | null {
  for (const [intent, pattern] of INTENT_PATTERNS) {
    if (pattern.test(query)) {
      return intent;
    }
  }
  return null;
}

import { Language } from '../types';

export interface NavMenuCol {
  title: string;
  href?: string;
  groups?: { name?: string; items: { label: string; href: string; page: string }[] }[];
  items?: { label: string; href: string; page: string }[];
}

export interface NavMenuItem {
  id: string;
  label: { en: string; hi: string };
  cols: { en: NavMenuCol[]; hi: NavMenuCol[] };
  footerText?: { en: string; hi: string };
  footerLink?: { en: { label: string; href: string; page: string }; hi: { label: string; href: string; page: string } };
  isNarrow?: boolean;
}

export const NAV_ITEMS: NavMenuItem[] = [
  {
    id: 'products',
    label: { en: 'Products', hi: 'प्रोडक्ट' },
    cols: {
      en: [
        {
          title: 'Applications',
          href: '/products',
          items: [
            { label: 'Financial management', href: '/finance', page: 'finance' },
            { label: 'Spend management', href: '/procurement', page: 'procurement' },
            { label: 'Supply chain management', href: '/supply-chain', page: 'supply-chain' },
            { label: 'Manufacturing', href: '/manufacturing', page: 'manufacturing' },
            { label: 'Sales & customer experience', href: '/sales', page: 'sales' },
            { label: 'Projects & services', href: '/services', page: 'services' },
            { label: 'Asset management', href: '/asset-management', page: 'asset-management' },
            { label: 'Human capital management', href: '/hr', page: 'hr' },
          ],
        },
        {
          title: 'Quantinox Platform',
          href: '/platform',
          groups: [
            {
              name: 'Build',
              items: [
                { label: 'Develop', href: '/platform#develop', page: 'platform' },
                { label: 'Integrate', href: '/platform#integrate', page: 'platform' },
              ],
            },
            {
              name: 'Contextualize and reason',
              items: [
                { label: 'Data and analytics', href: '/platform#analytics', page: 'platform' },
                { label: 'AI models', href: '/platform#ai-models', page: 'platform' },
              ],
            },
            {
              name: 'Govern',
              items: [
                { label: 'AI agent governance', href: '/platform#governance', page: 'platform' },
                { label: 'Transformation management', href: '/platform#transformation', page: 'platform' },
              ],
            },
          ],
        },
        {
          title: 'Artificial Intelligence',
          href: '/ai',
          items: [
            { label: 'Gemini Multi-Turn Advisor', href: '/gemini-chat', page: 'gemini-chat' },
            { label: '3D Digital Twin Simulation', href: '/digital-twin', page: 'digital-twin' },
            { label: 'Quanta AI assistant', href: '/ai#assistant', page: 'ai' },
            { label: 'Quanta AI agents', href: '/ai#agents', page: 'ai' },
            { label: 'Agent builder', href: '/ai#builder', page: 'ai' },
            { label: 'Responsible AI', href: '/ai#trust', page: 'ai' },
            { label: 'AI Solution Advisor', href: '/ai-advisor', page: 'ai-advisor' },
          ],
        },
        {
          title: 'More Quantinox Offerings',
          items: [
            { label: '3D Smart Factory Twin', href: '/digital-twin', page: 'digital-twin' },
            { label: 'Cloud ERP Private', href: '/pricing', page: 'pricing' },
            { label: 'Midsize business packages', href: '/pricing', page: 'pricing' },
            { label: 'Trials & demos', href: '/trials', page: 'trials' },
            { label: 'Product tour', href: '/tour', page: 'tour' },
            { label: 'Value calculator', href: '/value-calculator', page: 'value-calculator' },
            { label: 'Pricing', href: '/pricing', page: 'pricing' },
          ],
        },
      ],
      hi: [
        {
          title: 'एप्लिकेशन',
          href: '/products',
          items: [
            { label: 'फ़ाइनेंशियल मैनेजमेंट', href: '/finance', page: 'finance' },
            { label: 'खर्च प्रबंधन', href: '/procurement', page: 'procurement' },
            { label: 'सप्लाई चेन मैनेजमेंट', href: '/supply-chain', page: 'supply-chain' },
            { label: 'मैन्युफ़ैक्चरिंग', href: '/manufacturing', page: 'manufacturing' },
            { label: 'सेल्स और ग्राहक अनुभव', href: '/sales', page: 'sales' },
            { label: 'प्रोजेक्ट और सर्विसेज़', href: '/services', page: 'services' },
            { label: 'एसेट मैनेजमेंट', href: '/asset-management', page: 'asset-management' },
            { label: 'मानव संसाधन प्रबंधन (HR)', href: '/hr', page: 'hr' },
          ],
        },
        {
          title: 'Quantinox Platform',
          href: '/platform',
          groups: [
            {
              name: 'बनाएँ',
              items: [
                { label: 'डेवलप करें', href: '/platform#develop', page: 'platform' },
                { label: 'इंटीग्रेट करें', href: '/platform#integrate', page: 'platform' },
              ],
            },
            {
              name: 'विश्लेषण',
              items: [
                { label: 'डेटा और एनालिटिक्स', href: '/platform#analytics', page: 'platform' },
                { label: 'AI मॉडल', href: '/platform#ai-models', page: 'platform' },
              ],
            },
            {
              name: 'नियंत्रण',
              items: [
                { label: 'AI एजेंट गवर्नेंस', href: '/platform#governance', page: 'platform' },
                { label: 'ट्रांसफ़ॉर्मेशन मैनेजमेंट', href: '/platform#transformation', page: 'platform' },
              ],
            },
          ],
        },
        {
          title: 'आर्टिफ़िशियल इंटेलिजेंस',
          href: '/ai',
          items: [
            { label: 'Gemini मल्टी-टर्न चैट एडवाइज़र', href: '/gemini-chat', page: 'gemini-chat' },
            { label: '3D डिजिटल ट्विन सिमुलेशन', href: '/digital-twin', page: 'digital-twin' },
            { label: 'Quanta AI असिस्टेंट', href: '/ai#assistant', page: 'ai' },
            { label: 'Quanta AI एजेंट', href: '/ai#agents', page: 'ai' },
            { label: 'एजेंट बिल्डर', href: '/ai#builder', page: 'ai' },
            { label: 'ज़िम्मेदार AI', href: '/ai#trust', page: 'ai' },
            { label: 'AI सॉल्यूशन एडवाइज़र', href: '/ai-advisor', page: 'ai-advisor' },
          ],
        },
        {
          title: 'Quantinox के और ऑफ़रिंग',
          items: [
            { label: '3D स्मार्ट फ़ैक्टरी ट्विन', href: '/digital-twin', page: 'digital-twin' },
            { label: 'Cloud ERP Private', href: '/pricing', page: 'pricing' },
            { label: 'मिडसाइज़ बिज़नेस पैकेज', href: '/pricing', page: 'pricing' },
            { label: 'ट्रायल और डेमो', href: '/trials', page: 'trials' },
            { label: 'प्रोडक्ट टूर', href: '/tour', page: 'tour' },
            { label: 'वैल्यू कैलकुलेटर', href: '/value-calculator', page: 'value-calculator' },
            { label: 'कीमतें', href: '/pricing', page: 'pricing' },
          ],
        },
      ],
    },
    footerText: { en: 'Not sure where to start?', hi: 'कहाँ से शुरू करें?' },
    footerLink: {
      en: { label: 'Build your suite in 30 seconds', href: '/#build', page: 'home' },
      hi: { label: 'अपना सूट 30 सेकंड में बनाएँ', href: '/#build', page: 'home' },
    },
  },
  {
    id: 'industries',
    label: { en: 'Industries', hi: 'उद्योग' },
    cols: {
      en: [
        {
          title: 'Industry AI',
          href: '/industries',
          items: [
            { label: 'Adaptive production', href: '/industries#adaptive-production', page: 'industries' },
            { label: 'Predictive asset care', href: '/industries#asset-care', page: 'industries' },
            { label: 'Regulated manufacturing', href: '/industries#regulated', page: 'industries' },
            { label: 'Unified commerce', href: '/industries#unified-commerce', page: 'industries' },
          ],
        },
        {
          title: 'Featured Industries',
          href: '/industries',
          items: [
            { label: 'Industrial manufacturing', href: '/industry-manufacturing', page: 'industry-manufacturing' },
            { label: 'Retail', href: '/industry-retail', page: 'industry-retail' },
            { label: 'Wholesale distribution', href: '/industry-wholesale', page: 'industry-wholesale' },
            { label: 'Life sciences & pharma', href: '/industry-life-sciences', page: 'industry-life-sciences' },
            { label: 'Professional services', href: '/industry-professional-services', page: 'industry-professional-services' },
          ],
        },
        {
          title: 'Energy & Natural Resources',
          href: '/industries',
          items: [
            { label: 'Chemicals', href: '/industries#chemicals', page: 'industries' },
            { label: 'Mill products', href: '/industries#mill-products', page: 'industries' },
            { label: 'Mining', href: '/industries#mining', page: 'industries' },
            { label: 'Oil, gas & energy', href: '/industries#oil-gas', page: 'industries' },
            { label: 'Utilities', href: '/industries#utilities', page: 'industries' },
          ],
        },
        {
          title: 'Public & Financial',
          href: '/industries',
          items: [
            { label: 'Healthcare & Life Sciences', href: '/industry-life-sciences', page: 'industry-life-sciences' },
            { label: 'Education & Government', href: '/industries#public', page: 'industries' },
            { label: 'Banking & NBFCs', href: '/industries#banking', page: 'industries' },
            { label: 'All 30 industries', href: '/industries', page: 'industries' },
          ],
        },
      ],
      hi: [
        {
          title: 'इंडस्ट्री AI',
          href: '/industries',
          items: [
            { label: 'एडैप्टिव प्रोडक्शन', href: '/industries#adaptive-production', page: 'industries' },
            { label: 'प्रिडिक्टिव एसेट केयर', href: '/industries#asset-care', page: 'industries' },
            { label: 'रेगुलेटेड मैन्युफ़ैक्चरिंग', href: '/industries#regulated', page: 'industries' },
            { label: 'यूनिफ़ाइड कॉमर्स', href: '/industries#unified-commerce', page: 'industries' },
          ],
        },
        {
          title: 'प्रमुख उद्योग',
          href: '/industries',
          items: [
            { label: 'इंडस्ट्रियल मैन्युफ़ैक्चरिंग', href: '/industry-manufacturing', page: 'industry-manufacturing' },
            { label: 'रिटेल', href: '/industry-retail', page: 'industry-retail' },
            { label: 'होलसेल डिस्ट्रीब्यूशन', href: '/industry-wholesale', page: 'industry-wholesale' },
            { label: 'लाइफ़ साइंसेज़', href: '/industry-life-sciences', page: 'industry-life-sciences' },
            { label: 'प्रोफ़ेशनल सर्विसेज़', href: '/industry-professional-services', page: 'industry-professional-services' },
          ],
        },
        {
          title: 'ऊर्जा और संसाधन',
          href: '/industries',
          items: [
            { label: 'केमिकल्स', href: '/industries#chemicals', page: 'industries' },
            { label: 'मिल प्रोडक्ट्स', href: '/industries#mill-products', page: 'industries' },
            { label: 'माइनिंग', href: '/industries#mining', page: 'industries' },
            { label: 'तेल व गैस', href: '/industries#oil-gas', page: 'industries' },
          ],
        },
        {
          title: 'वित्तीय व सार्वजनिक',
          href: '/industries',
          items: [
            { label: 'बैंकिंग और NBFC', href: '/industries#banking', page: 'industries' },
            { label: 'सरकारी सेवाएँ', href: '/industries#public', page: 'industries' },
            { label: 'सभी 30 उद्योग', href: '/industries', page: 'industries' },
          ],
        },
      ],
    },
    footerText: { en: "Don't see your industry?", hi: 'आपका उद्योग नहीं दिखा?' },
    footerLink: {
      en: { label: 'Talk to an industry expert', href: '/demo', page: 'demo' },
      hi: { label: 'इंडस्ट्री विशेषज्ञ से बात करें', href: '/demo', page: 'demo' },
    },
  },
  {
    id: 'transform',
    label: { en: 'Transform & Support', hi: 'ट्रांसफ़ॉर्म और सपोर्ट' },
    cols: {
      en: [
        {
          title: 'How to Move to the Cloud',
          href: '/support',
          items: [
            { label: 'Move your existing ERP', href: '/support#move', page: 'support' },
            { label: 'Start fresh in the cloud', href: '/support#start', page: 'support' },
            { label: 'Private & sovereign cloud', href: '/support#sovereign', page: 'support' },
          ],
        },
        {
          title: 'Services & Success Plans',
          href: '/support',
          items: [
            { label: 'Essential Success plan', href: '/support#plan-essential', page: 'support' },
            { label: 'Advanced Success plan', href: '/support#plan-advanced', page: 'support' },
            { label: 'Implementation services', href: '/support#implementation', page: 'support' },
            { label: 'Cloud application services', href: '/support#cloud-services', page: 'support' },
          ],
        },
        {
          title: 'Customer Support',
          href: '/support',
          items: [
            { label: 'Get support (log in)', href: '/support#get-support', page: 'support' },
            { label: 'Knowledge base', href: '/support#knowledge-base', page: 'support' },
            { label: 'Documentation', href: '/support#documentation', page: 'support' },
            { label: 'System status', href: '/support#status', page: 'support' },
          ],
        },
      ],
      hi: [
        {
          title: 'क्लाउड पर कैसे जाएँ',
          href: '/support',
          items: [
            { label: 'मौजूदा ERP लाएँ', href: '/support#move', page: 'support' },
            { label: 'क्लाउड में नई शुरुआत', href: '/support#start', page: 'support' },
            { label: 'प्राइवेट और सॉवरेन क्लाउड', href: '/support#sovereign', page: 'support' },
          ],
        },
        {
          title: 'सक्सेस प्लान',
          href: '/support',
          items: [
            { label: 'Essential Success प्लान', href: '/support#plan-essential', page: 'support' },
            { label: 'Advanced Success प्लान', href: '/support#plan-advanced', page: 'support' },
            { label: 'इम्प्लीमेंटेशन सर्विसेज़', href: '/support#implementation', page: 'support' },
          ],
        },
        {
          title: 'ग्राहक सहायता',
          href: '/support',
          items: [
            { label: 'सहायता लें (लॉग इन)', href: '/support#get-support', page: 'support' },
            { label: 'नॉलेज बेस', href: '/support#knowledge-base', page: 'support' },
            { label: 'सिस्टम स्टेटस', href: '/support#status', page: 'support' },
          ],
        },
      ],
    },
  },
  {
    id: 'community',
    label: { en: 'Community & Events', hi: 'कम्युनिटी व इवेंट्स' },
    isNarrow: true,
    cols: {
      en: [
        {
          title: 'Community',
          href: '/community',
          items: [
            { label: 'Community overview', href: '/community', page: 'community' },
            { label: 'Customer stories', href: '/customers', page: 'customers' },
            { label: 'Events & webinars', href: '/events', page: 'events' },
            { label: 'Partners & directory', href: '/partners', page: 'partners' },
            { label: 'Learning hub', href: '/learning', page: 'learning' },
            { label: 'Resource library', href: '/resources', page: 'resources' },
          ],
        },
      ],
      hi: [
        {
          title: 'कम्युनिटी',
          href: '/community',
          items: [
            { label: 'कम्युनिटी का परिचय', href: '/community', page: 'community' },
            { label: 'ग्राहकों की कहानियाँ', href: '/customers', page: 'customers' },
            { label: 'इवेंट और वेबिनार', href: '/events', page: 'events' },
            { label: 'पार्टनर', href: '/partners', page: 'partners' },
            { label: 'लर्निंग हब', href: '/learning', page: 'learning' },
            { label: 'संसाधन लाइब्रेरी', href: '/resources', page: 'resources' },
          ],
        },
      ],
    },
  },
  {
    id: 'about',
    label: { en: 'About', hi: 'हमारे बारे में' },
    isNarrow: true,
    cols: {
      en: [
        {
          title: 'Company',
          href: '/company',
          items: [
            { label: 'Company Overview & Story', href: '/company', page: 'company' },
            { label: 'Executive Leadership', href: '/company#leadership', page: 'company' },
            { label: 'Global Offices & Locations', href: '/company#locations', page: 'company' },
            { label: 'Trust & Security Center', href: '/company#trust', page: 'company' },
            { label: 'Corporate Social Responsibility (CSR)', href: '/csr', page: 'csr' },
            { label: 'Investor Relations & Financials', href: '/investor-relations', page: 'investor-relations' },
            { label: 'Careers & Engineering Openings', href: '/careers', page: 'careers' },
            { label: 'Contact Us', href: '/contact', page: 'contact' },
            { label: 'Privacy Policy', href: '/privacy', page: 'privacy' },
            { label: 'Terms of Use', href: '/terms', page: 'terms' },
            { label: 'Accessibility Statement', href: '/accessibility', page: 'accessibility' },
          ],
        },
      ],
      hi: [
        {
          title: 'कंपनी',
          href: '/company',
          items: [
            { label: 'कंपनी का परिचय व इतिहास', href: '/company', page: 'company' },
            { label: 'कार्यकारी नेतृत्व', href: '/company#leadership', page: 'company' },
            { label: 'वैश्विक कार्यालय व केंद्र', href: '/company#locations', page: 'company' },
            { label: 'ट्रस्ट व सुरक्षा सर्टिफिकेशन', href: '/company#trust', page: 'company' },
            { label: 'सामाजिक उत्तरदायित्व (CSR)', href: '/csr', page: 'csr' },
            { label: 'निवेशक संबंध एवं वित्तीय परिणाम', href: '/investor-relations', page: 'investor-relations' },
            { label: 'करियर व अवसर', href: '/careers', page: 'careers' },
            { label: 'संपर्क करें', href: '/contact', page: 'contact' },
            { label: 'गोपनीयता नीति', href: '/privacy', page: 'privacy' },
            { label: 'उपयोग की शर्तें', href: '/terms', page: 'terms' },
            { label: 'एक्सेसिबिलिटी', href: '/accessibility', page: 'accessibility' },
          ],
        },
      ],
    },
  },
];

export const STRINGS: Record<Language, Record<string, string>> = {
  en: {
    brandName: 'QUANTINOX',
    brandSub: 'IT TECHNOLOGY',
    topbarNotice: 'New: Quanta AI agents for finance close and supply planning are now available.',
    pricing: 'Pricing',
    contactSales: 'Contact sales',
    signup: 'Sign up',
    login: 'Log in',
    logout: 'Log out',
    bookDemo: 'Book a demo',
    takeTour: 'Take the product tour',
    skipToContent: 'Skip to content',
    askAiAria: 'Ask Quanta AI (Ctrl+I)',
    searchSiteAria: 'Search the site (/)',
    themeToggleAria: 'Switch between light and dark theme',
    searchPlaceholder: 'Search products, industries, tools…',
    searchNoHits: 'No matches found. Try another search term.',
    myAccount: 'My Account',
    adminDashboard: 'Admin Portal',
    send: 'Send',
    sending: 'Sending…',
    submit: 'Submit',
    successTitle: 'Thank you!',
    demoBookedNotice: 'A product expert will email you within one business day to confirm the schedule.',
    requiredField: 'This field is required.',
    validEmail: 'Please enter a valid work email.',
    copied: 'Copied to clipboard!',
  },
  hi: {
    brandName: 'QUANTINOX',
    brandSub: 'IT TECHNOLOGY',
    topbarNotice: 'नया: फ़ाइनेंस क्लोज़ और सप्लाई प्लानिंग के लिए Quanta AI एजेंट अब उपलब्ध हैं।',
    pricing: 'कीमतें',
    contactSales: 'सेल्स से बात करें',
    signup: 'साइन अप',
    login: 'लॉग इन',
    logout: 'लॉग आउट',
    bookDemo: 'डेमो बुक करें',
    takeTour: 'प्रोडक्ट टूर देखें',
    skipToContent: 'सीधे सामग्री पर जाएँ',
    askAiAria: 'Quanta AI से पूछें (Ctrl+I)',
    searchSiteAria: 'साइट पर खोजें (/)',
    themeToggleAria: 'लाइट और डार्क थीम बदलें',
    searchPlaceholder: 'प्रोडक्ट, उद्योग, टूल खोजें…',
    searchNoHits: 'कुछ नहीं मिला। कोई दूसरा शब्द आज़माएँ।',
    myAccount: 'मेरा खाता',
    adminDashboard: 'एडमिन पोर्टल',
    send: 'भेजें',
    sending: 'भेजा जा रहा है…',
    submit: 'जमा करें',
    successTitle: 'धन्यवाद!',
    demoBookedNotice: 'एक कार्यदिवस के भीतर प्रोडक्ट विशेषज्ञ समय तय करने के लिए आपसे संपर्क करेंगे।',
    requiredField: 'कृपया यह फ़ील्ड भरें।',
    validEmail: 'कृपया सही कार्य ईमेल दर्ज करें।',
    copied: 'कॉपी हो गया!',
  },
};

export const MODULES_INFO = [
  {
    id: 'finance',
    name: { en: 'Finance', hi: 'फ़ाइनेंस' },
    lead: {
      en: 'Close faster, see cash clearly, stay compliant everywhere.',
      hi: 'तेज़ी से क्लोज़ करें, नकद स्थिति स्पष्ट देखें और हमेशा अनुपालन में रहें।',
    },
    bullets: {
      en: [
        'Accounting, financial close and multi-entity consolidation',
        'Receivables, payables and automated treasury flows',
        'Cost management and profitability analysis by dimension',
        'Global tax, GST and statutory e-invoicing compliance',
      ],
      hi: [
        'अकाउंटिंग, वित्तीय क्लोज़ और मल्टी-एंटिटी कंसॉलिडेशन',
        'प्राप्य, देय और स्वचालित ट्रेज़री प्रबंधन',
        'लागत प्रबंधन और लाभप्रदता विश्लेषण',
        'वैश्विक टैक्स, GST और ई-इनवॉइसिंग अनुपालन',
      ],
    },
    agents: [
      { name: 'Reconciliation agent', role: 'Matches bank lines and clears open items automatically.' },
      { name: 'Invoice matching agent', role: 'Matches incoming invoices to purchase orders and goods receipts.' },
      { name: 'Cash forecast agent', role: 'Predicts 30-day liquidity trends and flags shortfalls.' },
    ],
  },
  {
    id: 'supply-chain',
    name: { en: 'Supply Chain', hi: 'सप्लाई चेन' },
    lead: {
      en: 'Real-time inventory, intelligent replenishment, unified warehouses.',
      hi: 'रियल-टाइम इन्वेंटरी, स्मार्ट पुनःपूर्ति और एकीकृत वेयरहाउस।',
    },
    bullets: {
      en: [
        'Multi-location inventory and warehouse management',
        'Transportation management and logistics tracking',
        'Available-to-promise and demand forecasting',
        'Batch and serial number traceability',
      ],
      hi: [
        'इन्वेंटरी और वेयरहाउस प्रबंधन',
        'ट्रांसपोर्टेशन और लॉजिस्टिक्स ट्रैकिंग',
        'उपलब्धता-वादा और मांग पूर्वानुमान',
        'बैच और सीरियल नंबर ट्रेसबिलिटी',
      ],
    },
    agents: [
      { name: 'Supplier confirmation agent', role: 'Tracks delayed supplier confirmations and proposes alternates.' },
      { name: 'Safety stock optimizer', role: 'Adjusts reorder thresholds based on supplier lead-time variances.' },
    ],
  },
  {
    id: 'manufacturing',
    name: { en: 'Manufacturing', hi: 'मैन्युफ़ैक्चरिंग' },
    lead: {
      en: 'Production planning, MRP, and shop-floor execution in one view.',
      hi: 'प्रोडक्शन प्लानिंग, MRP और शॉप-फ़्लोर संचालन एक ही नज़र में।',
    },
    bullets: {
      en: [
        'Production planning and Material Requirements Planning (MRP)',
        'Shop-floor execution and quality control checkpoints',
        'Variant configuration for make-to-order manufacturing',
        'Subcontracting and outsourced processing tracking',
      ],
      hi: [
        'प्रोडक्शन प्लानिंग और MRP',
        'शॉप-फ़्लोर संचालन और गुणवत्ता नियंत्रण',
        'ऑर्डर पर निर्माण के लिए वेरिएंट कॉन्फ़िगरेशन',
        'सबकॉन्ट्रैक्टिंग और आउटसोर्स कार्य प्रबंधन',
      ],
    },
    agents: [
      { name: 'Production re-planning agent', role: 'Reschedules work orders when machinery or materials change.' },
      { name: 'Yield prediction agent', role: 'Monitors line quality telemetry to prevent scrap.' },
    ],
  },
  {
    id: 'procurement',
    name: { en: 'Procurement', hi: 'प्रोक्योरमेंट' },
    lead: {
      en: 'Requisition-to-pay automation and supplier collaboration.',
      hi: 'मांग से भुगतान तक स्वचालन और सप्लायर सहयोग।',
    },
    bullets: {
      en: [
        'Requisition-to-purchase-order automated approval flows',
        'Centralized vendor invoice management and 3-way matching',
        'Supplier collaboration portal and vendor scorecards',
        'Category spend analytics and contract leakage detection',
      ],
      hi: [
        'मांग से खरीद आदेश तक स्वचालित मंज़ूरी',
        'केंद्रीय इनवॉइस प्रबंधन और 3-वे मिलान',
        'सप्लायर सहयोग और मूल्यांकन स्कोरकार्ड',
        'खर्च विश्लेषण और कॉन्ट्रैक्ट अनुपालन',
      ],
    },
    agents: [
      { name: 'Invoice matching agent', role: 'Reconciles lines against POs and receipt vouchers.' },
      { name: 'Contract compliance agent', role: 'Flags rogue buying outside negotiated corporate contracts.' },
    ],
  },
  {
    id: 'sales',
    name: { en: 'Sales & Billing', hi: 'सेल्स और बिलिंग' },
    lead: {
      en: 'Quote-to-cash, flexible subscriptions, and contract billing.',
      hi: 'कोटेशन से कैश, सब्सक्रिप्शन और कॉन्ट्रैक्ट बिलिंग।',
    },
    bullets: {
      en: [
        'Quote-to-cash for both products and services',
        'Dynamic pricing, tier discounts, rebates and promotions',
        'Subscription management and usage-based billing',
        'Revenue recognition compliance (IFRS 15 / Ind AS 115)',
      ],
      hi: [
        'सामान और सेवाओं के लिए कोटेशन से कैश',
        'मूल्य निर्धारण, रिबेट और प्रमोशन',
        'सब्सक्रिप्शन और कॉन्ट्रैक्ट बिलिंग',
        'राजस्व मान्यता और लेखा मानक अनुपालन',
      ],
    },
    agents: [
      { name: 'Collections agent', role: 'Prioritizes overdue receivables and drafts personalized dunning emails.' },
      { name: 'Discount governance agent', role: 'Validates margin thresholds before sales quotes are sent.' },
    ],
  },
  {
    id: 'services',
    name: { en: 'Projects & Services', hi: 'प्रोजेक्ट और सर्विसेज़' },
    lead: {
      en: 'Resource scheduling, milestone billing, and project profitability.',
      hi: 'संसाधन शेड्यूलिंग, माइलस्टोन बिलिंग और प्रोजेक्ट लाभप्रदता।',
    },
    bullets: {
      en: [
        'Project planning, capacity staffing and resource allocation',
        'Mobile time logging and expense approvals',
        'Milestone, T&M, and fixed-price project billing',
        'Real-time project margin and utilization tracking',
      ],
      hi: [
        'प्रोजेक्ट योजना, स्टाफ़िंग और संसाधन प्रबंधन',
        'समय और खर्च का मोबाइल रिकॉर्डिंग',
        'प्रोजेक्ट बिलिंग और लाभप्रदता विश्लेषण',
        'सर्विस ऑर्डर प्रबंधन और उपयोग दर',
      ],
    },
    agents: [
      { name: 'Staffing optimization agent', role: 'Matches qualified staff to open client deliverables.' },
      { name: 'Budget overrun alert agent', role: 'Forecasts project burn-rate against target milestones.' },
    ],
  },
  {
    id: 'asset-management',
    name: { en: 'Asset Management', hi: 'एसेट मैनेजमेंट' },
    lead: {
      en: 'Less downtime, longer equipment lifecycle, predictive repair.',
      hi: 'कम डाउनटाइम, लंबा उपकरण जीवन और पूर्वानुमानित मरम्मत।',
    },
    bullets: {
      en: [
        'Preventive, condition-based and predictive maintenance',
        'Master technical asset registry with functional hierarchies',
        'Field technician dispatch and mobile work order closure',
        'Connected asset depreciation and lifecycle cost accounting',
      ],
      hi: [
        'प्रिवेंटिव और प्रिडिक्टिव मेंटेनेंस',
        'तकनीकी एसेट रजिस्टर और पार्ट्स सूची',
        'फ़ील्ड सर्विस और इन-हाउस मरम्मत',
        'बिल्ट-इन एसेट एनालिटिक्स और डेप्रिसिएशन',
      ],
    },
    agents: [
      { name: 'Maintenance scheduling agent', role: 'Schedules technicians around planned factory down-time.' },
      { name: 'Failure prediction agent', role: 'Uses IoT vibration and temperature data to trigger work orders.' },
    ],
  },
  {
    id: 'hr',
    name: { en: 'People & HR', hi: 'मानव संसाधन (HR)' },
    lead: {
      en: 'Hire-to-retire workforce management, payroll, and compliance.',
      hi: 'भर्ती से रिटायरमेंट तक वर्कफ़ोर्स प्रबंधन, पेरोल और अनुपालन।',
    },
    bullets: {
      en: [
        'Hire-to-retire employee lifecycle and documentation',
        'Automated payroll, tax withholdings and PF/ESI compliance',
        'Time tracking, shift planning, leave and attendance',
        'Employee and manager self-service portal',
      ],
      hi: [
        'कर्मचारी जीवनचक्र और दस्तावेज़ प्रबंधन',
        'स्वचालित पेरोल और वैधानिक अनुपालन',
        'वर्कफ़ोर्स प्लानिंग और हाज़िरी ट्रैकिंग',
        'कर्मचारी और मैनेजर सेल्फ़-सर्विस',
      ],
    },
    agents: [
      { name: 'Payroll audit agent', role: 'Validates salary adjustments and attendance discrepancies before runs.' },
      { name: 'HR query assistant', role: 'Answers employee policy and leave balance queries automatically.' },
    ],
  },
];

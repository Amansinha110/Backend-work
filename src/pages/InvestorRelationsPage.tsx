import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, DollarSign, FileText, Download, ShieldCheck, 
  BarChart3, Calendar, Users, Award, ExternalLink, Mail, 
  CheckCircle2, ArrowRight, ArrowUpRight, HelpCircle, 
  Building2, Globe, Clock, ChevronRight, PieChart, Lock, PhoneCall
} from 'lucide-react';

export const InvestorRelationsPage: React.FC = () => {
  const { lang, setPage, showToast, openAssistantWithPrompt } = useApp();
  const hi = lang === 'hi';

  // Currency & Stock ticker interactive state
  const [currency, setCurrency] = useState<'INR' | 'USD'>('USD');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1M' | '6M' | '1Y' | '5Y'>('1Y');
  const [selectedQuarter, setSelectedQuarter] = useState<'Q3-FY26' | 'Q2-FY26' | 'Q1-FY26' | 'FY25'>('Q3-FY26');

  // IR Inquiry form state
  const [irName, setIrName] = useState('');
  const [irFirm, setIrFirm] = useState('');
  const [irEmail, setIrEmail] = useState('');
  const [irType, setIrType] = useState('Institutional Equity');
  const [irMessage, setIrMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Download simulation helper
  const handleDownloadReport = (fileName: string, title: string) => {
    const reportContent = `QUANTINOX IT TECHNOLOGY LIMITED
INVESTOR RELATIONS DOCUMENT: ${title.toUpperCase()}
Generated: ${new Date().toISOString()}

--- FINANCIAL HIGHLIGHTS ---
Ticker: QNTX (NASDAQ / NSE)
Trailing Twelve Months (TTM) ARR: $184.2 Million USD
YoY Revenue Growth: +34.2%
Net Revenue Retention (NRR): 128.4%
Gross Margin (Non-GAAP): 78.4%
Free Cash Flow Margin: 24.8%
Rule of 40 Score: 59.0%

--- AUDIT & GOVERNANCE ---
Independent Statutory Auditors: Global Big Four Assurance
Audit Committee Compliance: 100% Independent Directors
SOX 404 & SEBI LODR: Fully Compliant with Zero Material Weaknesses

For questions, contact: ir@quantinox.com
Quantinox Investor Relations Desk, Cyber City, Gurugram & San Francisco.
`;
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(hi ? `${title} डाउनलोड हो गया है।` : `Downloaded ${title}`);
  };

  // Stock mock data based on timeframe
  const stockData = {
    priceUSD: 34.25,
    changeUSD: +0.82,
    percentChange: '+2.45%',
    priceINR: 2865.0,
    changeINR: +68.5,
    marketCapUSD: '$4.28 Billion',
    marketCapINR: '₹35,800 Cr',
    peRatio: '38.2x',
    epsTTM: '$0.90 (₹75.20)',
    week52High: currency === 'USD' ? '$36.50' : '₹3,040',
    week52Low: currency === 'USD' ? '$21.80' : '₹1,820',
    volume: '1,482,900 shares'
  };

  // SVG Trend Points based on selected timeframe
  const chartPoints: Record<string, string> = {
    '1D': '0,60 40,55 80,58 120,45 160,50 200,38 240,42 280,30 320,25 360,20',
    '1M': '0,80 40,75 80,68 120,70 160,55 200,48 240,52 280,35 320,30 360,18',
    '6M': '0,90 40,82 80,75 120,60 160,65 200,45 240,40 280,32 320,22 360,15',
    '1Y': '0,95 40,85 80,72 120,68 160,50 200,45 240,38 280,28 320,20 360,10',
    '5Y': '0,98 40,90 80,82 120,70 160,58 200,42 240,30 280,22 320,15 360,5'
  };

  // Key Quarterly Numbers
  const quarterlyMetrics = {
    'Q3-FY26': {
      revenue: '$48.6M',
      yoy: '+35.1%',
      arr: '$184.2M',
      grossMargin: '78.8%',
      ebitda: '$13.2M',
      ebitdaMargin: '27.1%',
      fcf: '$12.4M',
      nrr: '128.4%',
      enterpriseClients: '1,840+'
    },
    'Q2-FY26': {
      revenue: '$45.2M',
      yoy: '+34.6%',
      arr: '$171.0M',
      grossMargin: '78.2%',
      ebitda: '$11.8M',
      ebitdaMargin: '26.1%',
      fcf: '$11.1M',
      nrr: '127.8%',
      enterpriseClients: '1,720+'
    },
    'Q1-FY26': {
      revenue: '$41.8M',
      yoy: '+33.2%',
      arr: '$158.4M',
      grossMargin: '77.9%',
      ebitda: '$10.4M',
      ebitdaMargin: '24.9%',
      fcf: '$9.8M',
      nrr: '126.9%',
      enterpriseClients: '1,610+'
    },
    'FY25': {
      revenue: '$144.5M',
      yoy: '+38.4%',
      arr: '$145.0M',
      grossMargin: '77.2%',
      ebitda: '$34.8M',
      ebitdaMargin: '24.1%',
      fcf: '$32.6M',
      nrr: '126.0%',
      enterpriseClients: '1,500+'
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!irName || !irEmail || !irMessage) {
      showToast(hi ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill all required fields');
      return;
    }
    setInquirySubmitted(true);
    showToast(hi ? 'आपका निवेशक अनुरोध दर्ज कर लिया गया है।' : 'Investor inquiry received. Our IR team will respond within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Top Banner / Breadcrumb Header */}
      <section className="border-b border-[var(--line)] bg-[var(--surface)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <button onClick={() => setPage('home')} className="hover:text-[var(--accent)] transition-colors">
              {hi ? 'होम' : 'Home'}
            </button>
            <span>/</span>
            <button onClick={() => setPage('company')} className="hover:text-[var(--accent)] transition-colors">
              {hi ? 'कंपनी' : 'Company'}
            </button>
            <span>/</span>
            <span className="text-[var(--ink)] font-semibold">{hi ? 'निवेशक संबंध' : 'Investor Relations'}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              NASDAQ / NSE: QNTX
            </span>
            <span className="text-[var(--muted)]">·</span>
            <span>
              {currency === 'USD' ? `$${stockData.priceUSD}` : `₹${stockData.priceINR.toLocaleString()}`}
            </span>
            <span className="text-emerald-600 font-medium">({stockData.percentChange})</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-16 lg:pt-20 lg:pb-24 border-b border-[var(--line)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-2)]/60 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
              {hi ? 'क्वांटिनॉक्स कैपिटल एवं निवेशक संबंध' : 'Quantinox Capital & Investor Relations'}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--ink)] font-display leading-[1.15]">
              {hi ? 'टिकाऊ विकास, अनुशासित नकदी प्रवाह और पारदर्शी प्रशासन।' : 'Sustainable Growth. High Free Cash Flow. Resilient Governance.'}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[var(--text)] leading-relaxed">
              {hi
                ? 'Quantinox IT Technology अगली पीढ़ी का मिशन-क्रिटिकल एंटरप्राइज ईआरपी प्लेटफॉर्म है। हम 1,840+ वैश्विक बहुराष्ट्रीय कंपनियों को शक्ति प्रदान करते हुए 34%+ वार्षिक आवर्ती राजस्व (ARR) वृद्धि दर्ज कर रहे हैं।'
                : 'Quantinox powers mission-critical supply chains, manufacturing plants, and finance operations across 1,840+ enterprise conglomerates worldwide — delivering top-decile Rule-of-40 efficiency.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleDownloadReport('Quantinox-Q3-FY2026-Shareholder-Letter', 'Q3 FY26 Earnings Letter')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius-sm)] bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" />
                {hi ? 'नवीनतम Q3 FY26 अर्निंग्स रिपोर्ट डाउनलोड करें' : 'Download Q3 FY26 Earnings Report'}
              </button>
              <button
                onClick={() => {
                  const elem = document.getElementById('ir-contact-section');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] font-semibold hover:bg-[var(--surface)] transition-all shadow-sm"
              >
                <Mail className="w-4 h-4 text-[var(--accent)]" />
                {hi ? 'विश्लेषक एवं IR डेस्क से संपर्क करें' : 'Contact IR Desk & Analysts'}
              </button>
            </div>
          </div>

          {/* High-Level Headline Financial Cards */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm">
              <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                {hi ? 'वार्षिक आवर्ती राजस्व (ARR)' : 'Annual Recurring Revenue (ARR)'}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-2 font-display">
                $184.2M
              </div>
              <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +34.2% YoY Organic
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm">
              <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                {hi ? 'नेट रेवेन्यू रिटेंशन (NRR)' : 'Net Revenue Retention (NRR)'}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-2 font-display">
                128.4%
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">
                {hi ? 'शीर्ष फॉर्च्यून 500 ग्राहकों में' : 'Across 1,840+ Enterprises'}
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm">
              <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                {hi ? 'सकल मार्जिन (Gross Margin)' : 'Non-GAAP Gross Margin'}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-2 font-display">
                78.8%
              </div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">
                {hi ? 'क्लाउड स्केलिंग से +160 bps सुधार' : '+160 bps YoY Expansion'}
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm">
              <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                {hi ? 'रूल ऑफ 40 स्कोर (Rule of 40)' : 'Rule of 40 Benchmark'}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] mt-2 font-display">
                59.0%
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">
                {hi ? '34.2% विकास + 24.8% FCF' : '34.2% Growth + 24.8% FCF'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Performance & Interactive Quote Section */}
      <section className="py-16 lg:py-20 bg-[var(--surface)] border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                {hi ? 'शेयर बाजार और इक्विटी सूचना' : 'Stock & Equity Valuation'}
              </div>
              <h2 className="text-3xl font-bold font-display text-[var(--ink)] mt-1">
                {hi ? 'क्वांटिनॉक्स (QNTX) शेयर सारांश' : 'Quantinox (QNTX) Interactive Stock Quote'}
              </h2>
              <p className="text-sm text-[var(--muted)] mt-1">
                {hi ? 'डेटा नियमित ट्रेडिंग घंटों से 15-मिनट विलंबित है।' : 'Real-time equity indicators with 15-minute standard market delay.'}
              </p>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-2 bg-[var(--card)] p-1 rounded-[var(--radius-sm)] border border-[var(--line)] shadow-sm self-start md:self-auto">
              <span className="text-xs font-medium text-[var(--muted)] px-2">{hi ? 'मुद्रा:' : 'Currency:'}</span>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 text-xs font-semibold rounded ${currency === 'USD' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)] hover:text-[var(--ink)]'}`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1 text-xs font-semibold rounded ${currency === 'INR' ? 'bg-[var(--accent)] text-white' : 'text-[var(--text)] hover:text-[var(--ink)]'}`}
              >
                INR (₹)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Interactive Chart & Price Card */}
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--card)] border border-[var(--line)] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-[var(--muted)]">NASDAQ / NSE: QNTX</div>
                    <div className="text-4xl sm:text-5xl font-black font-display text-[var(--ink)] mt-1">
                      {currency === 'USD' ? `$${stockData.priceUSD}` : `₹${stockData.priceINR.toLocaleString()}`}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <TrendingUp className="w-4 h-4" /> {stockData.percentChange}
                    </span>
                    <div className="text-xs text-[var(--muted)] mt-1">
                      {currency === 'USD' ? `+${stockData.changeUSD} USD Today` : `+${stockData.changeINR} INR Today`}
                    </div>
                  </div>
                </div>

                {/* Timeframe Buttons */}
                <div className="flex items-center gap-2 mt-6 border-b border-[var(--line)] pb-3">
                  {(['1D', '1M', '6M', '1Y', '5Y'] as const).map(tf => (
                    <button
                      key={tf}
                      onClick={() => setSelectedTimeframe(tf)}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                        selectedTimeframe === tf 
                          ? 'bg-[var(--accent)] text-white shadow-sm' 
                          : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                  <span className="text-xs text-[var(--muted)] ml-auto hidden sm:inline">
                    {hi ? 'ऐतिहासिक रुझान' : 'Historical Trend'} ({selectedTimeframe})
                  </span>
                </div>

                {/* SVG Visual Representation */}
                <div className="mt-6 h-48 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 360 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2F54EB" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#2F54EB" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <polygon
                      points={`0,100 ${chartPoints[selectedTimeframe]} 360,100`}
                      fill="url(#stockGradient)"
                    />
                    {/* Trend Line */}
                    <polyline
                      fill="none"
                      stroke="#2F54EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={chartPoints[selectedTimeframe]}
                    />
                  </svg>
                  <div className="flex justify-between text-[11px] text-[var(--muted)] mt-2 font-mono">
                    <span>{selectedTimeframe === '1D' ? '09:30 AM' : selectedTimeframe === '1M' ? '30 Days Ago' : 'Period Start'}</span>
                    <span>{selectedTimeframe === '1D' ? '04:00 PM' : 'Current Market Session'}</span>
                  </div>
                </div>
              </div>

              {/* Ticker Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[var(--line)] text-xs">
                <div>
                  <span className="text-[var(--muted)] block">{hi ? 'मार्केट कैप' : 'Market Cap'}</span>
                  <span className="font-bold text-sm text-[var(--ink)] mt-0.5 block">
                    {currency === 'USD' ? stockData.marketCapUSD : stockData.marketCapINR}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--muted)] block">{hi ? '52-सप्ताह रेंज' : '52-Week Range'}</span>
                  <span className="font-bold text-sm text-[var(--ink)] mt-0.5 block">
                    {stockData.week52Low} – {stockData.week52High}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--muted)] block">{hi ? 'फॉरवर्ड P/E' : 'Forward P/E'}</span>
                  <span className="font-bold text-sm text-[var(--ink)] mt-0.5 block">{stockData.peRatio}</span>
                </div>
                <div>
                  <span className="text-[var(--muted)] block">{hi ? 'दैनिक वॉल्यूम' : 'Avg Volume'}</span>
                  <span className="font-bold text-sm text-[var(--ink)] mt-0.5 block">{stockData.volume}</span>
                </div>
              </div>
            </div>

            {/* Analyst Coverage & Consensus Card */}
            <div className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--card)] border border-[var(--line)] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    {hi ? 'विश्लेषक सर्वसम्मति एवं रेटिंग' : 'Wall Street & Dalal Street Consensus'}
                  </h3>
                  <Award className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <p className="text-xs text-[var(--muted)] mt-1">
                  {hi ? '24 शीर्ष संस्थागत विश्लेषकों द्वारा कवर' : 'Coverage by 24 leading institutional equity research desks'}
                </p>

                {/* Rating Breakdown */}
                <div className="mt-6 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-emerald-600">{hi ? 'स्ट्रॉन्ग बाय / खरीदें (84%)' : 'Strong Buy / Outperform (84%)'}</span>
                      <span>20 Analysts</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--surface-2)] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-amber-600">{hi ? 'होल्ड / न्यूट्रल (16%)' : 'Hold / Neutral (16%)'}</span>
                      <span>4 Analysts</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--surface-2)] rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '16%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-rose-600">{hi ? 'सेल / बेचें (0%)' : 'Sell / Underperform (0%)'}</span>
                      <span>0 Analysts</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--surface-2)] rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Price Target Box */}
                <div className="mt-6 p-4 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)]">
                  <div className="text-xs text-[var(--muted)] font-medium">
                    {hi ? 'औसत 12-महीने का लक्ष्य मूल्य' : 'Consensus 12-Month Price Target'}
                  </div>
                  <div className="text-2xl font-bold font-display text-[var(--ink)] mt-1">
                    {currency === 'USD' ? '$42.50' : '₹3,560'}
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    {hi ? '+24.1% संभावित उछाल' : '+24.1% Upside Potential from Current Level'}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--line)]">
                <button
                  onClick={() => openAssistantWithPrompt('Tell me about Quantinox financial valuation, revenue model, and competitive moat compared to SAP and Oracle.')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-[var(--radius-sm)] border border-[var(--line)] text-xs font-semibold text-[var(--accent)] hover:bg-[var(--surface)] transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  {hi ? 'AI से वैल्यूएशन विश्लेषण पूछें' : 'Query Valuation Moat with AI Assistant'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Performance Table & Segment Breakdown */}
      <section className="py-16 lg:py-20 border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                {hi ? 'वित्तीय विवरण एवं परिणाम' : 'Audited Financial Metrics'}
              </div>
              <h2 className="text-3xl font-bold font-display text-[var(--ink)] mt-1">
                {hi ? 'त्रैमासिक वित्तीय प्रदर्शन' : 'Quarterly Financial Performance & Operating Leverage'}
              </h2>
              <p className="text-sm text-[var(--muted)] mt-1">
                {hi ? 'अमेरिकी GAAP एवं गैर-GAAP सामंजस्य विवरण' : 'Reported under US GAAP & Non-GAAP reconciliation metrics.'}
              </p>
            </div>

            {/* Quarter Selector Tabs */}
            <div className="flex items-center gap-1 bg-[var(--surface)] p-1 rounded-[var(--radius-sm)] border border-[var(--line)]">
              {(['Q3-FY26', 'Q2-FY26', 'Q1-FY26', 'FY25'] as const).map(q => (
                <button
                  key={q}
                  onClick={() => setSelectedQuarter(q)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                    selectedQuarter === q 
                      ? 'bg-[var(--card)] text-[var(--accent)] shadow-sm font-bold' 
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  {q === 'FY25' ? (hi ? 'पूर्ण वर्ष FY25' : 'Full Year FY25') : q}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Metric Cards for selected quarter */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)]">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">{hi ? 'कुल राजस्व' : 'Total Revenue'}</span>
              <div className="text-xl font-bold text-[var(--ink)] mt-1">{quarterlyMetrics[selectedQuarter].revenue}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">{quarterlyMetrics[selectedQuarter].yoy} YoY</span>
            </div>

            <div className="p-4 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)]">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">{hi ? 'क्लाउड ARR' : 'Subscription ARR'}</span>
              <div className="text-xl font-bold text-[var(--ink)] mt-1">{quarterlyMetrics[selectedQuarter].arr}</div>
              <span className="text-[11px] text-[var(--muted)]">{hi ? 'शुद्ध आवर्ती' : 'Recurring Cloud'}</span>
            </div>

            <div className="p-4 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)]">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">{hi ? 'सकल मार्जिन' : 'Gross Margin'}</span>
              <div className="text-xl font-bold text-[var(--ink)] mt-1">{quarterlyMetrics[selectedQuarter].grossMargin}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">High-Moat SaaS</span>
            </div>

            <div className="p-4 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)]">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">{hi ? 'एडजस्टेड EBITDA' : 'Adj. EBITDA'}</span>
              <div className="text-xl font-bold text-[var(--ink)] mt-1">{quarterlyMetrics[selectedQuarter].ebitda}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">{quarterlyMetrics[selectedQuarter].ebitdaMargin} margin</span>
            </div>

            <div className="p-4 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)]">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">{hi ? 'मुक्त नकदी प्रवाह' : 'Free Cash Flow'}</span>
              <div className="text-xl font-bold text-[var(--ink)] mt-1">{quarterlyMetrics[selectedQuarter].fcf}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">Self-Funding</span>
            </div>

            <div className="p-4 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)]">
              <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium">{hi ? 'एंटरप्राइज ग्राहक' : 'Enterprise Scale'}</span>
              <div className="text-xl font-bold text-[var(--ink)] mt-1">{quarterlyMetrics[selectedQuarter].enterpriseClients}</div>
              <span className="text-[11px] text-[var(--muted)]">128.4% NRR</span>
            </div>
          </div>

          {/* Revenue Breakdown by Segment */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[var(--accent)] flex items-center justify-center font-bold">
                  68%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)]">{hi ? 'क्लाउड ईआरपी सब्सक्रिप्शन' : 'Cloud ERP Subscriptions'}</h4>
                  <p className="text-xs text-[var(--muted)]">{hi ? 'बहु-वर्षीय उद्यम अनुबंध' : 'Multi-year non-cancelable SaaS contracts'}</p>
                </div>
              </div>
              <div className="mt-4 text-xs text-[var(--text)] leading-relaxed">
                {hi 
                  ? 'विनिर्माण, आपूर्ति श्रृंखला और वित्त मॉड्यूल के लिए स्थिर आवर्ती लाइसेंसिंग राजस्व।' 
                  : 'Automated recurring billing across core ERP, manufacturing MES, warehouse automation, and multi-currency global ledgers.'}
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center font-bold">
                  21%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)]">{hi ? 'AI एजेंट व ऑटोमेशन उपभोग' : 'AI Copilot & Usage Add-Ons'}</h4>
                  <p className="text-xs text-[var(--muted)]">{hi ? 'उपभोग-आधारित कंप्यूट विस्तार' : 'Consumption-based predictive compute'}</p>
                </div>
              </div>
              <div className="mt-4 text-xs text-[var(--text)] leading-relaxed">
                {hi 
                  ? 'स्वायत्त आपूर्ति श्रृंखला भविष्यवाणी, स्वचालित चालान मिलान और पूर्वानुमान इंजन।' 
                  : 'Fastest-growing revenue stream (+82% YoY), driven by enterprise adoption of predictive demand forecasting and autonomous workflows.'}
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center font-bold">
                  11%
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)]">{hi ? 'रणनीतिक माइग्रेशन व परामर्श' : 'Advisory & Rapid Migration'}</h4>
                  <p className="text-xs text-[var(--muted)]">{hi ? 'विरासत ईआरपी प्रतिस्थापन' : 'Legacy ERP transition programs'}</p>
                </div>
              </div>
              <div className="mt-4 text-xs text-[var(--text)] leading-relaxed">
                {hi 
                  ? 'SAP और Oracle लेगेसी सिस्टम से 90-दिन के त्वरित माइग्रेशन परामर्श सेवाएं।' 
                  : 'High-margin implementation blueprints ensuring client time-to-value under 90 days with guaranteed cutover assurance.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Governance & Board Committees */}
      <section className="py-16 lg:py-20 bg-[var(--surface)] border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              {hi ? 'कॉर्पोरेट प्रशासन एवं अनुपालन' : 'Governance & Risk Oversight'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--ink)] mt-2">
              {hi ? 'उच्चतम नैतिक मानकों और स्वतंत्र बोर्ड निगरानी के साथ निर्मित' : 'Uncompromising Integrity, Independent Board Oversight & Robust Internal Controls'}
            </h2>
            <p className="mt-3 text-base text-[var(--text)]">
              {hi
                ? 'हमारे निदेशक मंडल में 60%+ स्वतंत्र निदेशक हैं। हम सेबी (SEBI LODR) और अमेरिकी SOX 404 दिशानिर्देशों का कड़ाई से पालन करते हैं।'
                : 'Quantinox maintains a supermajority independent Board of Directors, ensuring accountability, cyber resilience, and aligned shareholder interests.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Committee 1 */}
            <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] text-[var(--accent)] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--ink)]">
                {hi ? 'ऑडिट एवं वित्तीय जोखिम समिति' : 'Audit & Risk Committee'}
              </h3>
              <p className="text-xs font-semibold text-[var(--accent)] mt-1">
                {hi ? '100% स्वतंत्र निदेशक' : '100% Independent Directors'}
              </p>
              <p className="mt-3 text-sm text-[var(--text)] leading-relaxed">
                {hi
                  ? 'वैश्विक बिग-फोर ऑडिटरों की निगरानी, वित्तीय रिपोर्टिंग सटीकता, SOX 404 अनुपालन और आंतरिक वित्तीय नियंत्रणों का स्वतंत्र मूल्यांकन।'
                  : 'Chaired by former Big-4 audit partners; oversees statutory audits, quarterly financial integrity, internal control architecture, and antifraud controls.'}
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--line)] text-xs text-[var(--muted)]">
                {hi ? 'अध्यक्ष: डॉ. राजीव मेहता, एफसीए' : 'Chair: Dr. Rajiv Mehta, FCA'}
              </div>
            </div>

            {/* Committee 2 */}
            <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] text-[var(--accent)] flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--ink)]">
                {hi ? 'साइबर सुरक्षा व AI आचार समिति' : 'Cybersecurity & AI Ethics Board'}
              </h3>
              <p className="text-xs font-semibold text-[var(--accent)] mt-1">
                {hi ? 'डेटा संप्रभुता व शून्य-विश्वास मानक' : 'Zero-Trust & Data Sovereignty'}
              </p>
              <p className="mt-3 text-sm text-[var(--text)] leading-relaxed">
                {hi
                  ? 'हमारे उद्यम ग्राहकों के संवेदनशील डेटा, मॉडल सुरक्षा, आइसोलेशन और ISO 27001/SOC 2 Type II अनुपालन की निरंतर समीक्षा।'
                  : 'Monitors tenant isolation, sovereign cloud boundaries, model explainability, cryptographic keys management, and defense against zero-day vulnerabilities.'}
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--line)] text-xs text-[var(--muted)]">
                {hi ? 'अध्यक्ष: सारा हेनरिक्स, पूर्व CISSP' : 'Chair: Sarah Hendricks, former CISO'}
              </div>
            </div>

            {/* Committee 3 */}
            <div className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] text-[var(--accent)] flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--ink)]">
                {hi ? 'नामांकन, पारिश्रमिक एवं ESG समिति' : 'Nomination, ESG & Remuneration'}
              </h3>
              <p className="text-xs font-semibold text-[var(--accent)] mt-1">
                {hi ? 'दीर्घकालिक मूल्य संवर्धन' : 'Long-Term Value Alignment'}
              </p>
              <p className="mt-3 text-sm text-[var(--text)] leading-relaxed">
                {hi
                  ? 'कार्यकारी क्षतिपूर्ति को शेयरधारक रिटर्न (TSR) और कार्बन तटस्थता (ESG) लक्ष्यों से जोड़ना ताकि नैतिक नेतृत्व सुनिश्चित रहे।'
                  : 'Ties executive equity vesting directly to multi-year compound TSR, carbon footprint reduction targets, and customer retention milestones.'}
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--line)] text-xs text-[var(--muted)]">
                {hi ? 'अध्यक्ष: अनिता गोखले, कॉर्पोरेट निदेशक' : 'Chair: Anita Gokhale, Independent Director'}
              </div>
            </div>
          </div>

          {/* Governance Documents & Whistleblower Policy */}
          <div className="mt-10 p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-bold text-[var(--ink)]">
                {hi ? 'पारदर्शी कॉर्पोरेट नीतियां व व्हिसलब्लोअर तंत्र' : 'Corporate Charters & Anonymous Whistleblower Hotline'}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--muted)] mt-1 max-w-2xl">
                {hi
                  ? 'हमारी आचार संहिता, इनसाइडर ट्रेडिंग नीति और 100% गोपनीय व सुरक्षित व्हिसलब्लोअर प्रणाली ऑडिट समिति द्वारा सीधे संचालित होती है।'
                  : 'Independent third-party intake ensures 100% anonymous, retaliation-free reporting of any accounting, compliance, or ethical concerns directly to the Audit Committee.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => handleDownloadReport('Quantinox-Code-of-Ethics-and-Conduct', 'Code of Conduct & Ethics')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] text-xs font-semibold hover:bg-[var(--surface)] transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[var(--accent)]" />
                {hi ? 'आचार संहिता (PDF)' : 'Code of Ethics (PDF)'}
              </button>
              <button
                onClick={() => handleDownloadReport('Quantinox-Whistleblower-Policy', 'Whistleblower Policy')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-sm)] bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] text-xs font-semibold hover:border-[var(--accent)] transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                {hi ? 'व्हिसलब्लोअर नीति' : 'Whistleblower Charter'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Releases, Filings & Download Center */}
      <section className="py-16 lg:py-20 border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                {hi ? 'दस्तावेज़ एवं फाइलिंग' : 'Quarterly Filings & Webcasts'}
              </div>
              <h2 className="text-3xl font-bold font-display text-[var(--ink)] mt-1">
                {hi ? 'कमाई रिपोर्ट व शेयरधारक दस्तावेज' : 'Earnings Releases, SEC/SEBI Filings & Transcripts'}
              </h2>
            </div>
            <div className="text-xs text-[var(--muted)]">
              {hi ? 'सभी फाइलिंग तुरंत डाउनलोड के लिए उपलब्ध हैं' : 'All filings available in machine-readable and print formats'}
            </div>
          </div>

          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {[
              {
                quarter: 'Q3 FY26',
                date: 'January 28, 2026',
                title: hi ? 'वित्तीय वर्ष 2026 की तीसरी तिमाही के वित्तीय परिणाम' : 'Q3 FY26 Financial Results & Management Discussion',
                desc: hi ? 'राजस्व $48.6M (+35% YoY), सकारात्मक मुक्त नकदी प्रवाह $12.4M' : 'Revenue reaches $48.6M (+35% YoY); Free Cash Flow hits record $12.4M.',
                files: [
                  { label: 'Earnings Release (PDF)', name: 'Quantinox-Q3-FY26-Earnings-Release' },
                  { label: 'Investor Deck (PDF)', name: 'Quantinox-Q3-FY26-Investor-Presentation' },
                  { label: 'Financial Model (Excel)', name: 'Quantinox-Q3-FY26-Data-Workbook' }
                ]
              },
              {
                quarter: 'Q2 FY26',
                date: 'October 24, 2025',
                title: hi ? 'वित्तीय वर्ष 2026 की दूसरी तिमाही के वित्तीय परिणाम' : 'Q2 FY26 Financial Results & Cloud ARR Update',
                desc: hi ? 'क्लाउड सब्सक्रिप्शन ARR $171M के पार पहुंचा, 127.8% NRR' : 'Cloud ARR crosses $171M milestone with 127.8% Net Revenue Retention.',
                files: [
                  { label: 'Earnings Release (PDF)', name: 'Quantinox-Q2-FY26-Earnings-Release' },
                  { label: 'Investor Deck (PDF)', name: 'Quantinox-Q2-FY26-Investor-Presentation' }
                ]
              },
              {
                quarter: 'Q1 FY26',
                date: 'July 22, 2025',
                title: hi ? 'वित्तीय वर्ष 2026 की पहली तिमाही के वित्तीय परिणाम' : 'Q1 FY26 Financial Results & Annual Guidance Revision',
                desc: hi ? 'मार्जिन विस्तार और AI ऑटोमेशन मॉड्यूल की बढ़ती मांग' : 'Non-GAAP operating margin expands 240 bps driven by automation.',
                files: [
                  { label: 'Earnings Release (PDF)', name: 'Quantinox-Q1-FY26-Earnings-Release' },
                  { label: 'Investor Deck (PDF)', name: 'Quantinox-Q1-FY26-Investor-Presentation' }
                ]
              },
              {
                quarter: 'FY25 Annual',
                date: 'May 16, 2025',
                title: hi ? 'वित्तीय वर्ष 2025 वार्षिक रिपोर्ट एवं ऑडिटेड वित्तीय विवरण' : 'FY25 Integrated Annual Report & Audited Financial Statements',
                desc: hi ? 'पूर्ण वर्ष राजस्व $144.5M (+38.4% YoY), रिकॉर्ड लाभप्रदता' : 'Comprehensive 10-K & SEBI Annual Integrated Report covering financials, CSR and governance.',
                files: [
                  { label: 'Integrated Annual Report (PDF)', name: 'Quantinox-FY25-Annual-Report' },
                  { label: 'Audited Statements (PDF)', name: 'Quantinox-FY25-Audited-Statements' }
                ]
              }
            ].map((item, idx) => (
              <div key={idx} className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[var(--surface-2)]/50 transition-colors px-2">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 text-xs font-semibold text-[var(--accent)]">
                    <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--line)]">
                      {item.quarter}
                    </span>
                    <span className="text-[var(--muted)] font-normal">{item.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--ink)] mt-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {item.files.map((file, fIdx) => (
                    <button
                      key={fIdx}
                      onClick={() => handleDownloadReport(file.name, file.label)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--card)] text-xs font-medium text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-sm"
                    >
                      <Download className="w-3 h-3 text-[var(--accent)]" />
                      {file.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Investor Events Calendar */}
      <section className="py-16 lg:py-20 bg-[var(--surface)] border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              {hi ? 'निवेशक कैलेंडर' : 'Investor Calendar & Roadshows'}
            </div>
            <h2 className="text-3xl font-bold font-display text-[var(--ink)] mt-1">
              {hi ? 'आगामी परिणाम एवं सम्मेलन' : 'Upcoming Earnings Conferences & Shareholder Roadshows'}
            </h2>
            <p className="text-sm text-[var(--muted)] mt-2">
              {hi ? 'संस्थागत विश्लेषक 1:1 प्रबंधन बैठकों के लिए सीधे हमारी IR टीम से समय निर्धारित कर सकते हैं।' : 'Institutional investors can schedule one-on-one virtual or in-person sessions with our leadership.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                date: 'May 14, 2026',
                time: '5:00 PM EST / 9:30 AM IST',
                event: hi ? 'Q4 FY26 एवं पूर्ण वर्ष परिणाम वेबकास्ट' : 'Q4 FY26 & Full Year Financial Results Webcast',
                location: hi ? 'लाइव वेबकास्ट एवं सम्मेलन कॉल' : 'Live Audio Webcast & Q&A',
                badge: 'Earnings'
              },
              {
                date: 'June 08, 2026',
                time: 'All Day',
                event: hi ? 'मॉर्गन स्टेनली ग्लोबल TMT सम्मेलन' : 'Morgan Stanley Global TMT Conference',
                location: 'San Francisco, CA',
                badge: 'Conference'
              },
              {
                date: 'July 22, 2026',
                time: '11:00 AM IST',
                event: hi ? 'वार्षिक आम बैठक (AGM) 2026' : 'Annual General Meeting (AGM) 2026',
                location: 'New Delhi & Hybrid Virtual Portal',
                badge: 'Shareholders'
              },
              {
                date: 'September 10, 2026',
                time: '9:00 AM EST',
                event: hi ? 'क्वांटिनॉक्स इन्वेस्टर एवं AI इनोवेशन डे' : 'Quantinox AI Innovation & Analyst Day',
                location: 'New York City, NY',
                badge: 'Keynote'
              }
            ].map((evt, idx) => (
              <div key={idx} className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                      {evt.badge}
                    </span>
                    <Calendar className="w-4 h-4 text-[var(--muted)]" />
                  </div>
                  <div className="mt-4 text-lg font-bold font-display text-[var(--ink)]">
                    {evt.date}
                  </div>
                  <div className="text-xs text-[var(--muted)] font-mono mt-0.5">
                    {evt.time}
                  </div>
                  <h4 className="text-sm font-semibold text-[var(--ink)] mt-3">
                    {evt.event}
                  </h4>
                  <div className="text-xs text-[var(--muted)] mt-1 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> {evt.location}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line)]">
                  <button
                    onClick={() => {
                      showToast(hi ? `कैलेंडर में जोड़ा गया: ${evt.event}` : `Added to calendar: ${evt.event}`);
                    }}
                    className="w-full py-2 px-3 rounded-[var(--radius-sm)] border border-[var(--line)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--surface)] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                    {hi ? 'रिमाइंडर सेट करें' : 'Set Calendar Reminder'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IR Contact & Institutional Inquiries Section */}
      <section id="ir-contact-section" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Contact Information */}
            <div className="lg:col-span-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                {hi ? 'निवेशक सहायता एवं संपर्क' : 'Investor Contacts & Transfer Agent'}
              </div>
              <h2 className="text-3xl font-bold font-display text-[var(--ink)] mt-2">
                {hi ? 'समर्पित निवेशक संबंध डेस्क' : 'Dedicated IR Desk & Shareholder Services'}
              </h2>
              <p className="mt-4 text-sm text-[var(--text)] leading-relaxed">
                {hi
                  ? 'संस्थागत शेयरधारकों, विश्लेषकों और खुदरा निवेशकों के लिए पारदर्शी और त्वरित सहायता।'
                  : 'We welcome inquiries from institutional asset managers, buy-side analysts, retail shareholders, and market makers.'}
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--card)] text-[var(--accent)] flex items-center justify-center border border-[var(--line)] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      {hi ? 'निवेशक संबंध कार्यालय' : 'Investor Relations Desk'}
                    </div>
                    <div className="text-sm font-semibold text-[var(--ink)] mt-0.5">Elena Rostova, VP Investor Relations</div>
                    <a href="mailto:ir@quantinox.com" className="text-xs text-[var(--accent)] hover:underline mt-1 block font-mono">
                      ir@quantinox.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--card)] text-[var(--accent)] flex items-center justify-center border border-[var(--line)] shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      {hi ? 'शेयर ट्रांसफर एजेंट व रजिस्ट्रार' : 'Transfer Agent & Registrar'}
                    </div>
                    <div className="text-sm font-semibold text-[var(--ink)] mt-0.5">Computershare Trust / Link Intime India</div>
                    <div className="text-xs text-[var(--muted)] mt-1">
                      {hi ? 'शेयर प्रमाणपत्र, लाभांश और डीमैट पूछताछ के लिए' : 'For demat, dividend inquiries, and registered transfers'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--card)] text-[var(--accent)] flex items-center justify-center border border-[var(--line)] shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      {hi ? 'शेयरधारक हेल्पलाइन' : 'Shareholder Helpline'}
                    </div>
                    <div className="text-sm font-semibold text-[var(--ink)] mt-0.5">+1 (800) 555-QNTX / +91 124 490 8800</div>
                    <div className="text-xs text-[var(--muted)] mt-1">Monday – Friday, 9:00 AM – 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive IR Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-[var(--radius-lg)] bg-[var(--card)] border border-[var(--line)] shadow-md">
                <h3 className="text-xl font-bold font-display text-[var(--ink)]">
                  {hi ? 'विश्लेषक एवं संस्थागत पूछताछ फॉर्म' : 'Request Analyst Briefing or Submit Investor Inquiry'}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1">
                  {hi ? 'हमारी आईआर टीम 1 व्यावसायिक कार्यदिवस में जवाब देगी।' : 'Our Investor Relations leadership team reviews all submissions promptly.'}
                </p>

                {inquirySubmitted ? (
                  <div className="mt-8 p-6 rounded-[var(--radius)] bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                      {hi ? 'पूछताछ सफलतापूर्वक प्राप्त हुई!' : 'Inquiry Successfully Submitted!'}
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2 max-w-md mx-auto">
                      {hi 
                        ? 'धन्यवाद! हमारी निवेशक संबंध टीम आपके ईमेल पर जल्द ही संपर्क करेगी।' 
                        : 'Thank you for your interest in Quantinox. A member of our investor desk will reach out with the requested briefing materials.'}
                    </p>
                    <button
                      onClick={() => {
                        setInquirySubmitted(false);
                        setIrMessage('');
                      }}
                      className="mt-6 px-4 py-2 rounded-[var(--radius-sm)] bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      {hi ? 'एक और अनुरोध भेजें' : 'Submit Another Inquiry'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                          {hi ? 'पूरा नाम' : 'Full Name'} *
                        </label>
                        <input
                          type="text"
                          required
                          value={irName}
                          onChange={e => setIrName(e.target.value)}
                          placeholder="e.g. David Miller"
                          className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                          {hi ? 'संस्था या फर्म का नाम' : 'Institution or Fund Name'}
                        </label>
                        <input
                          type="text"
                          value={irFirm}
                          onChange={e => setIrFirm(e.target.value)}
                          placeholder="e.g. BlackRock, Fidelity, Independent"
                          className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                          {hi ? 'ईमेल पता' : 'Institutional Email'} *
                        </label>
                        <input
                          type="email"
                          required
                          value={irEmail}
                          onChange={e => setIrEmail(e.target.value)}
                          placeholder="analyst@firm.com"
                          className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                          {hi ? 'निवेशक श्रेणी' : 'Investor Category'}
                        </label>
                        <select
                          value={irType}
                          onChange={e => setIrType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none transition-colors"
                        >
                          <option value="Institutional Equity">Institutional Equity (Buy-Side)</option>
                          <option value="Equity Research">Sell-Side Equity Research</option>
                          <option value="Family Office">Family Office / Private Wealth</option>
                          <option value="Retail Shareholder">Retail Shareholder</option>
                          <option value="Financial Media">Financial Media / Press</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                        {hi ? 'आपकी पूछताछ या बैठक अनुरोध' : 'Inquiry or 1:1 Meeting Request Details'} *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={irMessage}
                        onChange={e => setIrMessage(e.target.value)}
                        placeholder={hi ? 'कृपया अपनी रुचि, वित्तीय मॉडल प्रश्न या सम्मेलन चर्चा का विवरण दें...' : 'Details regarding financial models, conference 1:1 requests, or governance questions...'}
                        className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none transition-colors resize-none"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-[var(--radius-sm)] bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                      >
                        {hi ? 'अनुरोध सबमिट करें' : 'Submit Investor Inquiry'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[var(--muted)] text-center pt-2">
                      {hi ? 'आपकी जानकारी केवल निवेशक संबंध संवाद के लिए उपयोग की जाएगी।' : 'All information submitted is strictly confidential and managed pursuant to Reg FD standards.'}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

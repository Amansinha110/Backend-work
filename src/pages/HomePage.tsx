import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_INFO } from '../data/content';
import { PageId } from '../types';

export const HomePage: React.FC = () => {
  const { lang, setPage, openAssistantWithPrompt } = useApp();

  // Suite Finder state
  const [selectedFinder, setSelectedFinder] = useState<string[]>(['finance']);

  // AI Demo chat state
  const [activeDemoPrompt, setActiveDemoPrompt] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const toggleFinderModule = (mod: string) => {
    setSelectedFinder((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );
  };

  const hasOperations = selectedFinder.some((m) =>
    ['supply-chain', 'manufacturing', 'services'].includes(m)
  );

  const finderPlan = selectedFinder.length === 0
    ? '—'
    : hasOperations
    ? 'Business Suite'
    : 'Finance Essentials';

  const finderNote =
    selectedFinder.length === 0
      ? lang === 'hi'
        ? 'सुझाव देखने के लिए कम से कम एक क्षेत्र चुनें।'
        : 'Select at least one area to see a suggestion.'
      : hasOperations
      ? lang === 'hi'
        ? 'आपको फ़ाइनेंस के साथ ऑपरेशंस भी चाहिए, इसलिए फ़ाइनेंस, सप्लाई चेन, मैन्युफ़ैक्चरिंग और सर्विसेज़ एक ही प्लेटफ़ॉर्म पर लेकर शुरू करें।'
        : 'You need operations as well as finance, so start with finance, supply chain, manufacturing and services on one platform.'
      : lang === 'hi'
      ? 'ऑर्डर से कैश और खरीद से भुगतान वाला कोर फ़ाइनेंस आपकी चुनी हुई ज़रूरतें पूरी करता है।'
      : 'Core finance with order to cash and procure to pay covers what you selected.';

  const finderAddons: string[] = [];
  if (selectedFinder.includes('assets')) {
    finderAddons.push(lang === 'hi' ? '+ Asset & field service ऐड-ऑन' : '+ Asset & field service add-on');
  }
  if (selectedFinder.includes('hr')) {
    finderAddons.push(lang === 'hi' ? '+ People & payroll ऐड-ऑन' : '+ People & payroll add-on');
  }

  // Demo prompts answers
  const demoAnswers = [
    {
      q: lang === 'hi' ? 'अगले सप्ताह के उत्पादन के लिए किन सप्लायरों से डिलीवरी में देरी का खतरा है?' : "Which suppliers are at risk of late delivery for next week's production?",
      text: lang === 'hi' ? 'दो सप्लायरों की पुष्टि नियत तारीख के बाद भी बाकी है। ये मिलकर 4 प्रोडक्शन ऑर्डर पर असर डालते हैं।' : 'Two suppliers have open confirmations past their due date. Together they affect 4 production orders.',
      bullets: [
        lang === 'hi' ? 'सप्लायर A — 2 परचेज़ ऑर्डर, 3 दिन देरी' : 'Supplier A — 2 purchase orders, 3 days late',
        lang === 'hi' ? 'सप्लायर B — 1 परचेज़ ऑर्डर, पुष्टि नहीं' : 'Supplier B — 1 purchase order, unconfirmed',
      ],
      actions: [lang === 'hi' ? 'पुष्टि का अनुरोध करें' : 'Request confirmations', lang === 'hi' ? 'वैकल्पिक स्रोत खोजें' : 'Find alternate source'],
    },
    {
      q: lang === 'hi' ? 'इस महीने का क्लोज़ किस वजह से रुका है?' : "What is blocking this month's close?",
      text: lang === 'hi' ? 'क्लोज़ 72% पूरा है। दो चीज़ें इसे रोक रही हैं, दोनों पेएबल्स और इंटरकंपनी में।' : 'The close is 72% done. Two items are holding it up, both in payables and intercompany.',
      bullets: [
        lang === 'hi' ? 'गुड्स रसीद के बिना 3 वेंडर इनवॉइस — 0.42M' : '3 vendor invoices without a goods receipt — 0.42M',
        lang === 'hi' ? 'भारत ↔ जर्मनी इंटरकंपनी अंतर — 18.6K' : 'Intercompany difference India ↔ Germany — 18.6K',
      ],
      actions: [lang === 'hi' ? 'इनवॉइस को रसीदों से मिलाएँ' : 'Match invoices to receipts', lang === 'hi' ? 'क्लोज़ कॉकपिट खोलें' : 'Open close cockpit'],
    },
    {
      q: lang === 'hi' ? 'अगले 30 दिनों के कैश का अनुमान बताओ।' : 'Forecast our cash for the next 30 days.',
      text: lang === 'hi' ? 'अनुमानित क्लोज़िंग कैश 5.30M है, यानी 0.48M ज़्यादा। सबसे कम स्तर 18वें दिन होगा, पेरोल और टैक्स भुगतान के बाद।' : 'Expected closing cash is 5.30M, up 0.48M. The lowest point is on day 18, after payroll and tax payments.',
      bullets: [
        lang === 'hi' ? 'आमद: 46 खुले इनवॉइस से 2.10M' : 'Inflows: 2.10M from 46 open invoices',
        lang === 'hi' ? 'खर्च: पेरोल और GST सहित 1.62M' : 'Outflows: 1.62M including payroll and GST',
      ],
      actions: [lang === 'hi' ? 'रोज़ का अनुमान दिखाएँ' : 'Show daily forecast', lang === 'hi' ? 'देर से भुगतान करने वालों को चिह्नित करें' : 'Flag late payers'],
    },
  ];

  const handlePromptSelect = (index: number) => {
    setActiveDemoPrompt(index);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 400);
  };

  return (
    <main id="main">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill">Quantinox Cloud ERP</span>
            <h1 className="display">
              {lang === 'hi'
                ? 'अपना हर मुख्य कामकाज एक इंटेलिजेंट क्लाउड ERP पर चलाएँ।'
                : 'Run every core operation on one intelligent cloud ERP.'}
            </h1>
            <p className="lead">
              {lang === 'hi'
                ? 'फ़ाइनेंस, सप्लाई चेन, प्रोक्योरमेंट, सेल्स, सर्विसेज़ और HR एक ही रियल-टाइम प्लेटफ़ॉर्म पर, बिल्ट-इन AI एजेंटों और पहले दिन से तैयार बेस्ट-प्रैक्टिस प्रक्रियाओं के साथ।'
                : 'Finance, supply chain, procurement, sales, services and HR on a single real-time platform, with built-in AI agents and best-practice processes ready from day one.'}
            </p>
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-lg btn-primary"
                onClick={() => setPage('demo')}
              >
                {lang === 'hi' ? 'लाइव डेमो बुक करें' : 'Book a live demo'}
              </button>
              <button
                type="button"
                className="btn btn-lg btn-outline"
                onClick={() => setPage('tour')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M10 8l6 4-6 4z" />
                </svg>
                {lang === 'hi' ? 'प्रोडक्ट टूर देखें' : 'Take the product tour'}
              </button>
            </div>
            <ul className="hero-ticks">
              <li>
                <span className="is-ok">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                {lang === 'hi' ? 'पूरी तरह मैनेज्ड SaaS' : 'Fully managed SaaS'}
              </li>
              <li>
                <span className="is-ok">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                {lang === 'hi' ? 'स्वचालित अपडेट' : 'Automatic updates'}
              </li>
              <li>
                <span className="is-ok">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                {lang === 'hi' ? 'ओपन API' : 'Open APIs'}
              </li>
            </ul>
          </div>

          <div className="hero-visual">
            <div className="mock" role="img" aria-label="Quantinox Cloud ERP finance dashboard with sample data">
              <div className="mock-chrome">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span style={{ marginLeft: '12px' }}>{lang === 'hi' ? 'फ़ाइनेंस सारांश' : 'Finance overview'}</span>
                <span className="badge-sample">{lang === 'hi' ? 'सैंपल डेटा' : 'Sample data'}</span>
              </div>
              <div className="mock-body">
                <div className="mock-side">
                  <span className="is-active">{lang === 'hi' ? 'फ़ाइनेंस' : 'Finance'}</span>
                  <span>{lang === 'hi' ? 'सप्लाई चेन' : 'Supply chain'}</span>
                  <span>{lang === 'hi' ? 'प्रोक्योरमेंट' : 'Procurement'}</span>
                  <span>{lang === 'hi' ? 'सेल्स' : 'Sales'}</span>
                  <span>{lang === 'hi' ? 'सर्विसेज़' : 'Services'}</span>
                  <span>{lang === 'hi' ? 'एसेट' : 'Assets'}</span>
                  <span>{lang === 'hi' ? 'लोग' : 'People'}</span>
                </div>
                <div className="mock-main">
                  <div className="kpis">
                    <div className="kpi">
                      <div className="kpi-label">{lang === 'hi' ? 'कैश स्थिति' : 'Cash position'}</div>
                      <div className="kpi-value">4.82M</div>
                      <div className="kpi-note is-ok">{lang === 'hi' ? 'पिछले महीने से +6.1%' : '+6.1% vs last month'}</div>
                    </div>
                    <div className="kpi">
                      <div className="kpi-label">{lang === 'hi' ? 'क्लोज़ के दिन' : 'Days to close'}</div>
                      <div className="kpi-value">3.5</div>
                      <div className="kpi-note is-ok">{lang === 'hi' ? '−1.5 दिन' : '−1.5 days'}</div>
                    </div>
                    <div className="kpi">
                      <div className="kpi-label">{lang === 'hi' ? 'खुले प्राप्य' : 'Open receivables'}</div>
                      <div className="kpi-value">1.21M</div>
                      <div className="kpi-note is-warn">{lang === 'hi' ? '12 बकाया' : '12 overdue'}</div>
                    </div>
                  </div>

                  <div className="chart-card">
                    <div className="chart-head">
                      <span>{lang === 'hi' ? 'महीने के अनुसार राजस्व' : 'Revenue by month'}</span>
                      <span>FY 2026</span>
                    </div>
                    <div className="bars">
                      <span style={{ height: '42%' }}></span>
                      <span style={{ height: '55%' }}></span>
                      <span style={{ height: '48%' }}></span>
                      <span style={{ height: '63%' }}></span>
                      <span style={{ height: '70%' }}></span>
                      <span style={{ height: '66%' }}></span>
                      <span style={{ height: '78%' }}></span>
                      <span style={{ height: '86%' }}></span>
                      <span className="is-current" style={{ height: '94%' }}></span>
                    </div>
                  </div>

                  <div className="ai-note">
                    <span style={{ color: 'var(--mint)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                      </svg>
                    </span>
                    <div>
                      <strong>Quanta AI:</strong>{' '}
                      {lang === 'hi'
                        ? '3 वेंडर इनवॉइस महीने के अंत का क्लोज़ रोक रहे हैं। मैं उन्हें माल प्राप्ति से मिलाकर मंज़ूरी के लिए भेज सकता हूँ।'
                        : '3 vendor invoices are blocking the month-end close. I can match them to goods receipts and route them for approval.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Banner */}
      <section className="event-wrap" aria-label="Quantinox Connect">
        <div className="container">
          <button
            type="button"
            className="event-band"
            onClick={() => setPage('events')}
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
          >
            <span className="event-name">
              <strong>Quantinox Connect</strong>
              <small>VIRTUAL</small>
            </span>
            <span className="event-text">
              {lang === 'hi'
                ? 'देखें कि टीमें Quantinox पर AI से चलने वाली प्रक्रियाएँ कैसे बनाती हैं।'
                : 'See how teams build AI-powered processes on Quantinox.'}
            </span>
            <span className="event-cta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 4l12 8-12 8z" />
              </svg>
              {lang === 'hi' ? 'सत्र देखें' : 'Watch the sessions'}
            </span>
          </button>
        </div>
      </section>

      {/* Industry Strip */}
      <section className="strip" id="industries" aria-label="Industries">
        <div className="container">
          <ul>
            <li>{lang === 'hi' ? 'इनके लिए बना' : 'Built for'}</li>
            <li>
              <button type="button" onClick={() => setPage('industry-manufacturing')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit' }}>
                {lang === 'hi' ? 'मैन्युफ़ैक्चरिंग' : 'Manufacturing'}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setPage('industry-retail')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit' }}>
                {lang === 'hi' ? 'रिटेल और डिस्ट्रीब्यूशन' : 'Retail & distribution'}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setPage('industry-professional-services')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit' }}>
                {lang === 'hi' ? 'प्रोफ़ेशनल सर्विसेज़' : 'Professional services'}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setPage('industry-life-sciences')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit' }}>
                {lang === 'hi' ? 'लाइफ़ साइंसेज़' : 'Life sciences'}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setPage('industries')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit' }}>
                {lang === 'hi' ? 'ऊर्जा व यूटिलिटी' : 'Energy & utilities'}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setPage('industries')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit' }}>
                {lang === 'hi' ? 'सरकारी क्षेत्र' : 'Public sector'}
              </button>
            </li>
          </ul>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{lang === 'hi' ? 'Quantinox Cloud ERP क्या है' : 'What is Quantinox Cloud ERP'}</p>
              <h2 className="h2">
                {lang === 'hi'
                  ? 'तुरंत चलने वाला ERP, जो आपके व्यवसाय के साथ बढ़ता है।'
                  : 'A ready-to-run ERP that grows with your business.'}
              </h2>
            </div>
            <p className="body-lg">
              {lang === 'hi'
                ? 'एक ही डेटा मॉडल हर विभाग को जोड़ता है, ताकि प्रोक्योरमेंट, फ़ाइनेंस और ऑपरेशन के फ़ैसले रियल टाइम में एक-दूसरे को अपडेट करें।'
                : 'One data model connects every department, so decisions in procurement, finance and operations update each other in real time. No upgrade projects, no disconnected spreadsheets.'}
            </p>
          </div>
          <div className="grid">
            <div className="card">
              <svg className="card-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3 8-8" />
                <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
              </svg>
              <h3 className="h3">{lang === 'hi' ? 'बेस्ट प्रैक्टिस पहले से शामिल' : 'Best practices built in'}</h3>
              <p>
                {lang === 'hi'
                  ? 'हर वर्कफ़्लो शुरू से डिज़ाइन करने के बजाय पहले से कॉन्फ़िगर की गई प्रक्रियाओं से शुरुआत करें।'
                  : 'Start from preconfigured, industry-proven processes instead of designing every workflow from scratch.'}
              </p>
            </div>

            <div className="card">
              <svg className="card-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z" />
              </svg>
              <h3 className="h3">{lang === 'hi' ? 'बिना सीमा के नवाचार' : 'Innovate without limits'}</h3>
              <p>
                {lang === 'hi'
                  ? 'नए बिज़नेस मॉडल, सब्सक्रिप्शन और सेवाएँ तेज़ी से शुरू करें, बिना कस्टम कोड की झंझट के।'
                  : 'Launch new business models, subscriptions and services quickly, without custom code that slows upgrades.'}
              </p>
            </div>

            <div className="card">
              <svg className="card-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M15 7h6v6" />
              </svg>
              <h3 className="h3">{lang === 'hi' ? 'आसानी से विस्तार' : 'Scale with ease'}</h3>
              <p>
                {lang === 'hi'
                  ? 'उसी प्लेटफ़ॉर्म पर नई इकाइयाँ, बाज़ार और प्रोडक्ट लाइन जोड़ें, हर नए देश के लिए लोकलाइज़ेशन के साथ।'
                  : 'Add entities, markets and product lines on the same platform, with localization for each country you enter.'}
              </p>
            </div>

            <div className="card">
              <svg className="card-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <h3 className="h3">{lang === 'hi' ? 'भरोसे के साथ लाइव जाएँ' : 'Go live with confidence'}</h3>
              <p>
                {lang === 'hi'
                  ? 'गाइडेड इम्प्लीमेंटेशन पद्धति और सर्टिफ़ाइड विशेषज्ञ आपके रोलआउट को समय और बजट पर रखते हैं।'
                  : 'A guided implementation method and certified experts keep your rollout on time and on budget.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Module Grid Section */}
      <section className="section" id="modules" style={{ paddingTop: '64px' }}>
        <div className="container">
          <div className="center-block">
            <p className="eyebrow">{lang === 'hi' ? 'क्षमताएँ' : 'Capabilities'}</p>
            <h2 className="h2">{lang === 'hi' ? 'हर व्यावसायिक विभाग, एक जुड़ा हुआ सुइट' : 'Every line of business, one connected suite'}</h2>
            <p className="lead">
              {lang === 'hi'
                ? 'आज ज़रूरी मॉड्यूल से शुरू करें और बढ़ने के साथ और जोड़ें। सब कुछ एक ही डेटा मॉडल साझा करता है।'
                : 'Start with the modules you need today and switch on more as you grow. Everything shares one data model.'}
            </p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {MODULES_INFO.map((mod) => (
              <article className="card-soft" key={mod.id}>
                <div className="module-head">
                  <span className="icon-box">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </span>
                  <h3 className="h3">{mod.name[lang]}</h3>
                </div>
                <ul className="bullets">
                  {mod.bullets[lang].map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="link-arrow"
                  onClick={() => setPage(mod.id as PageId)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }}
                >
                  {lang === 'hi' ? `${mod.name[lang]} देखें` : `Explore ${mod.name[lang]}`} <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 30-Second Suite Finder */}
      <section className="section section-alt" id="build">
        <div className="container finder">
          <div className="finder-copy">
            <p className="eyebrow" style={{ margin: 0 }}>{lang === 'hi' ? 'सही विकल्प चुनें' : 'Find your fit'}</p>
            <h2 className="h2">{lang === 'hi' ? '30 सेकंड में अपना सूट बनाएँ' : 'Build your suite in 30 seconds'}</h2>
            <p className="body-lg">
              {lang === 'hi'
                ? 'चुनें कि आप Quantinox पर कौन-से काम चलाना चाहते हैं। हम शुरुआती पैकेज सुझाएँगे और आपका डेमो इन्हीं मॉड्यूल पर केंद्रित करेंगे।'
                : 'Pick the areas you want to run on Quantinox. We will suggest a starting package and tailor your demo to exactly these modules.'}
            </p>
            <p className="muted" style={{ fontSize: '14px' }}>
              {lang === 'hi' ? 'कीमतें और पैकेज की जानकारी कीमतों वाले पेज पर है। आप कभी भी मॉड्यूल जोड़ सकते हैं।' : 'Prices and package contents are on the pricing page. You can add modules at any time.'}
            </p>
          </div>

          <div className="finder-card">
            <fieldset className="fieldset">
              <legend>{lang === 'hi' ? 'आप क्या चलाना चाहते हैं?' : 'What do you want to run?'}</legend>
              <div className="chips">
                {[
                  ['finance', lang === 'hi' ? 'फ़ाइनेंस' : 'Finance'],
                  ['sales', lang === 'hi' ? 'सेल्स और बिलिंग' : 'Sales & billing'],
                  ['procurement', lang === 'hi' ? 'प्रोक्योरमेंट' : 'Procurement'],
                  ['supply-chain', lang === 'hi' ? 'सप्लाई चेन' : 'Supply chain'],
                  ['manufacturing', lang === 'hi' ? 'मैन्युफ़ैक्चरिंग' : 'Manufacturing'],
                  ['services', lang === 'hi' ? 'प्रोजेक्ट और सर्विसेज़' : 'Projects & services'],
                  ['assets', lang === 'hi' ? 'एसेट मैनेजमेंट' : 'Asset management'],
                  ['hr', lang === 'hi' ? 'लोग और HR' : 'People & HR'],
                ].map(([id, label]) => (
                  <label className="chip" key={id}>
                    <input
                      type="checkbox"
                      checked={selectedFinder.includes(id)}
                      onChange={() => toggleFinderModule(id)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="finder-result" aria-live="polite">
              <span className="kind">{lang === 'hi' ? 'सुझाया गया शुरुआती पैकेज' : 'Suggested starting point'}</span>
              <strong className="finder-plan">{finderPlan}</strong>
              <p>{finderNote}</p>
              {finderAddons.length > 0 && (
                <div className="finder-addons">
                  {finderAddons.map((ad, idx) => (
                    <span key={idx}>{ad}</span>
                  ))}
                </div>
              )}
              <div className="btn-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setPage('demo', { modules: selectedFinder.join(',') })}
                >
                  {lang === 'hi' ? 'इन मॉड्यूल के लिए डेमो बुक करें' : 'Book a demo for these modules'}
                </button>
                <button
                  type="button"
                  className="link-arrow"
                  onClick={() => setPage('pricing')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
                >
                  {lang === 'hi' ? 'पैकेज की तुलना करें →' : 'Compare packages →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quanta AI Interactive Showcase */}
      <section className="section section-dark" id="ai">
        <div className="container ai-layout">
          <div className="ai-copy">
            <p className="eyebrow" style={{ margin: 0 }}>Quanta AI</p>
            <h2 className="h2">
              {lang === 'hi'
                ? 'ऐसा AI जो सिर्फ़ आपका डेटा नहीं, आपकी व्यावसायिक प्रक्रियाएँ भी समझता है।'
                : 'AI that knows your business processes, not just your data.'}
            </h2>
            <p className="body-lg">
              {lang === 'hi'
                ? 'आसान भाषा में सवाल पूछें, दोहराए जाने वाले काम एजेंटों को सौंपें, और अपने व्यावसायिक नियमों व मंज़ूरियों पर आधारित अपने एजेंट बनाएँ।'
                : 'Ask questions in plain language, let agents handle repetitive work, and build your own agents grounded in your business rules and approvals.'}
            </p>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '8px' }}>
              <div className="card-dark" style={{ padding: '20px' }}>
                <h3 className="h3" style={{ fontSize: '17px' }}>{lang === 'hi' ? 'बातचीत वाला असिस्टेंट' : 'Conversational assistant'}</h3>
                <p>{lang === 'hi' ? 'चैट से हर मॉड्यूल में खोजें, विश्लेषण करें और काम करें।' : 'Find, analyze and act across every module by chat.'}</p>
              </div>
              <div className="card-dark" style={{ padding: '20px' }}>
                <h3 className="h3" style={{ fontSize: '17px' }}>{lang === 'hi' ? 'स्वायत्त एजेंट' : 'Autonomous agents'}</h3>
                <p>{lang === 'hi' ? 'मिलान, इनवॉइस मिलान, सप्लायर पुष्टि।' : 'Reconciliation, invoice matching, supplier confirmations.'}</p>
              </div>
              <div className="card-dark" style={{ padding: '20px' }}>
                <h3 className="h3" style={{ fontSize: '17px' }}>{lang === 'hi' ? 'पूर्वानुमान आधारित जानकारी' : 'Predictive insights'}</h3>
                <p>{lang === 'hi' ? 'कैश, मांग और रुकावटों का पहले से अनुमान लगाएँ।' : 'Forecast cash, demand and disruptions before they hit.'}</p>
              </div>
              <div className="card-dark" style={{ padding: '20px' }}>
                <h3 className="h3" style={{ fontSize: '17px' }}>{lang === 'hi' ? 'एजेंट बिल्डर' : 'Agent builder'}</h3>
                <p>{lang === 'hi' ? 'गवर्नेंस और सुरक्षा नियमों के साथ अपने एजेंट डिज़ाइन करें।' : 'Design custom agents with governance and guardrails.'}</p>
              </div>
            </div>

            <div className="btn-row">
              <button
                className="btn btn-lg btn-white"
                type="button"
                onClick={() =>
                  openAssistantWithPrompt(
                    lang === 'hi' ? 'Quantinox मेरे व्यवसाय के लिए क्या कर सकता है?' : 'What can Quantinox do for my business?'
                  )
                }
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                  <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
                </svg>
                {lang === 'hi' ? 'Quanta AI से Quantinox के बारे में पूछें' : 'Ask Quanta AI about Quantinox'}
              </button>
            </div>
          </div>

          {/* Interactive Chat Mock */}
          <div>
            <div className="chat">
              <div className="chat-head">
                <span className="chat-avatar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                  </svg>
                </span>
                <span className="chat-name">Quanta AI</span>
                <span className="chat-tag">{lang === 'hi' ? 'उदाहरण बातचीत' : 'Example conversation'}</span>
              </div>

              <div className="chat-log" aria-live="polite">
                <div className="bubble-user">{demoAnswers[activeDemoPrompt].q}</div>
                {isTyping ? (
                  <div className="typing" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  <div className="bubble-ai">
                    <span>{demoAnswers[activeDemoPrompt].text}</span>
                    <ul>
                      {demoAnswers[activeDemoPrompt].bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                    <div className="chat-actions">
                      {demoAnswers[activeDemoPrompt].actions.map((act, idx) => (
                        <span key={idx}>{act}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="chat-prompts" role="group" aria-label="Try a question">
                <span className="chat-prompts-label" aria-hidden="true">
                  {lang === 'hi' ? 'कोई सवाल आज़माएँ:' : 'Try a question:'}
                </span>
                {[
                  lang === 'hi' ? 'सप्लायर जोखिम' : 'Supplier risk',
                  lang === 'hi' ? 'मंथ-एंड क्लोज़' : 'Month-end close',
                  lang === 'hi' ? 'कैश अनुमान' : 'Cash forecast',
                ].map((label, idx) => (
                  <button
                    key={idx}
                    className="prompt-chip"
                    type="button"
                    aria-pressed={activeDemoPrompt === idx}
                    onClick={() => handlePromptSelect(idx)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div
                className="chat-input"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  openAssistantWithPrompt(
                    demoAnswers[activeDemoPrompt].q
                  )
                }
              >
                {lang === 'hi' ? 'Quanta AI से कुछ भी पूछें… (क्लिक करके चैट खोलें)' : 'Ask Quanta AI anything… (Click to open chat)'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Platform Features */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{lang === 'hi' ? 'प्लेटफ़ॉर्म' : 'Platform'}</p>
              <h2 className="h2">{lang === 'hi' ? 'एंटरप्राइज़-स्तर की नींव, पूरी तरह मैनेज्ड' : 'Enterprise-grade foundation, fully managed'}</h2>
            </div>
            <p className="body-lg">
              {lang === 'hi'
                ? 'इन्फ़्रास्ट्रक्चर, सुरक्षा और अपडेट हम संभालते हैं, ताकि आपकी टीम व्यवसाय पर ध्यान दे सके।'
                : 'We run the infrastructure, security and updates, so your team can focus on the business.'}
            </p>
          </div>
          <div className="tile-grid">
            <div className="tile">
              <h3 className="h3" style={{ fontSize: '19px' }}>{lang === 'hi' ? 'रियल-टाइम एनालिटिक्स' : 'Real-time analytics'}</h3>
              <p>{lang === 'hi' ? 'हर मॉड्यूल में बिल्ट-इन डैशबोर्ड और रिपोर्ट, अलग BI टूल की ज़रूरत नहीं।' : 'Embedded dashboards and reports across every module, with no separate BI tool required.'}</p>
            </div>
            <div className="tile">
              <h3 className="h3" style={{ fontSize: '19px' }}>{lang === 'hi' ? 'लो-कोड एक्सटेंसिबिलिटी' : 'Low-code extensibility'}</h3>
              <p>{lang === 'hi' ? 'कोर को साफ़ रखते हुए ERP के ऊपर ऐप, वर्कफ़्लो और ऑटोमेशन बनाएँ।' : 'Build apps, workflows and automations on top of the ERP while keeping the core clean.'}</p>
            </div>
            <div className="tile">
              <h3 className="h3" style={{ fontSize: '19px' }}>{lang === 'hi' ? 'ओपन API और इंटीग्रेशन' : 'Open APIs & integration'}</h3>
              <p>{lang === 'hi' ? 'CRM, ई-कॉमर्स, बैंक और पार्टनर सिस्टम के लिए दस्तावेज़ित API और तैयार कनेक्टर।' : 'Documented APIs and prebuilt connectors for CRM, e-commerce, banks and partner systems.'}</p>
            </div>
            <div className="tile">
              <h3 className="h3" style={{ fontSize: '19px' }}>{lang === 'hi' ? 'प्रोसेस इंटेलिजेंस' : 'Process intelligence'}</h3>
              <p>{lang === 'hi' ? 'अपनी प्रक्रियाओं का विश्लेषण करके रुकावटें पहचानें और सुधार मापें।' : 'Mine your processes to spot bottlenecks and measure improvements after go-live.'}</p>
            </div>
            <div className="tile">
              <h3 className="h3" style={{ fontSize: '19px' }}>{lang === 'hi' ? 'वैश्विक लोकलाइज़ेशन' : 'Global localization'}</h3>
              <p>{lang === 'hi' ? 'टैक्स, वैधानिक रिपोर्टिंग और ई-इनवॉइसिंग के लिए बहु-देशीय कंट्री वर्ज़न।' : 'Country versions for tax, statutory reporting and e-invoicing across global jurisdictions.'}</p>
            </div>
            <div className="tile">
              <h3 className="h3" style={{ fontSize: '19px' }}>{lang === 'hi' ? 'सुरक्षा और अनुपालन' : 'Security & compliance'}</h3>
              <p>{lang === 'hi' ? 'टेनेंट आइसोलेशन, एन्क्रिप्शन, बैकअप और डिज़ास्टर रिकवरी, चौबीसों घंटे संचालित।' : 'Tenant isolation, encryption, backups and disaster recovery, operated around the clock.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Editions */}
      <section className="section section-alt" id="editions">
        <div className="container">
          <div className="center-block">
            <p className="eyebrow">{lang === 'hi' ? 'संस्करण' : 'Editions'}</p>
            <h2 className="h2">{lang === 'hi' ? 'अपने लिए सही डिप्लॉयमेंट चुनें' : 'Choose the deployment that fits you'}</h2>
            <p className="lead">{lang === 'hi' ? 'एक ही प्लेटफ़ॉर्म, चलाने के दो तरीके।' : 'Same platform, two ways to run it.'}</p>
          </div>

          <div className="grid grid-24" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <div className="plan plan-featured">
              <div className="plan-top">
                <div>
                  <h3 className="plan-name">Quantinox Cloud ERP</h3>
                  <p className="muted">{lang === 'hi' ? 'नए और बढ़ते व्यवसायों के लिए तुरंत चलने वाला SaaS' : 'Ready-to-run SaaS for new and growing businesses'}</p>
                </div>
                <span className="pill">{lang === 'hi' ? 'सबसे लोकप्रिय' : 'Most popular'}</span>
              </div>
              <ul className="check-list">
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  <span>{lang === 'hi' ? 'मल्टी-टेनेंट क्लाउड, पूरी तरह Quantinox द्वारा मैनेज्ड' : 'Multi-tenant cloud, fully managed by Quantinox'}</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  <span>{lang === 'hi' ? 'पहले से कॉन्फ़िगर की गई बेस्ट-प्रैक्टिस प्रक्रियाएँ' : 'Preconfigured best-practice processes'}</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  <span>{lang === 'hi' ? 'साल में दो बड़े रिलीज़, अपने-आप उपलब्ध' : 'Two major releases a year, delivered automatically'}</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  <span>{lang === 'hi' ? 'लो-कोड ऐप और API से विस्तार करें' : 'Extend with low-code apps and open APIs'}</span>
                </li>
              </ul>
              <div className="plan-foot">
                <span className="edition-price">₹2,800 <small>/ {lang === 'hi' ? 'यूज़र / महीना' : 'user / month'}</small></span>
                <button type="button" className="btn btn-primary" onClick={() => setPage('pricing')}>
                  {lang === 'hi' ? 'कीमतें देखें' : 'See pricing'}
                </button>
              </div>
            </div>

            <div className="plan">
              <div>
                <h3 className="plan-name">Quantinox Cloud ERP Private</h3>
                <p className="muted">{lang === 'hi' ? 'जटिल उद्यमों के लिए समर्पित, कस्टमाइज़ करने योग्य क्लाउड' : 'Dedicated, customizable cloud for complex enterprises'}</p>
              </div>
              <ul className="check-list">
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  <span>{lang === 'hi' ? 'गहरे कस्टमाइज़ेशन के साथ सिंगल-टेनेंट वातावरण' : 'Single-tenant environment with deep customization'}</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  <span>{lang === 'hi' ? 'मौजूदा ERP माइग्रेट करें और अपना निवेश सुरक्षित रखें' : 'Migrate your existing ERP and protect historical data'}</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  <span>{lang === 'hi' ? 'हाइपरस्केलर या सॉवरेन क्लाउड पर डिप्लॉय करें' : 'Deploy on hyperscaler, private data center or sovereign cloud'}</span>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  <span>{lang === 'hi' ? 'माइग्रेशन टूल और प्रोसेस माइनिंग शामिल' : 'Migration tools and process mining included'}</span>
                </li>
              </ul>
              <div className="plan-foot">
                <span className="edition-price">{lang === 'hi' ? 'कस्टम कीमत' : 'Custom pricing'}</span>
                <button type="button" className="btn btn-dark-outline" onClick={() => setPage('demo')}>
                  {lang === 'hi' ? 'सेल्स टीम से बात करें' : 'Talk to sales'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Section */}
      <section className="section" id="migrate" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="migrate">
            <div className="migrate-copy">
              <p className="eyebrow">{lang === 'hi' ? 'पहले से कोई ERP चला रहे हैं?' : 'Already running an ERP?'}</p>
              <h2 className="h2">{lang === 'hi' ? 'नए सिरे से शुरू किए बिना Quantinox पर आएँ' : 'Move to Quantinox without starting over'}</h2>
              <p className="body-lg">
                {lang === 'hi'
                  ? 'पुराने ERP, अकाउंटिंग सॉफ़्टवेयर या स्प्रेडशीट से अपना डेटा, प्रक्रियाएँ और इतिहास साथ लाएँ, एक गाइडेड माइग्रेशन प्रोग्राम के साथ।'
                  : 'Bring your data, processes and history across from a legacy ERP, an accounting package or spreadsheets, with a guided migration program and experienced team.'}
              </p>
              <button type="button" className="btn btn-lg btn-primary" onClick={() => setPage('demo')}>
                {lang === 'hi' ? 'अपने माइग्रेशन की योजना बनाएँ' : 'Plan your migration'}
              </button>
            </div>
            <ul className="migrate-list">
              <li>
                <strong>{lang === 'hi' ? 'प्रक्रिया का आकलन' : 'Process assessment'}</strong>
                <span>{lang === 'hi' ? 'प्रोसेस माइनिंग दिखाती है कि आप आज कैसे काम करते हैं और क्या सरल करना है।' : 'Process mining shows how you work today and what to keep, simplify or retire.'}</span>
              </li>
              <li>
                <strong>{lang === 'hi' ? 'गाइडेड डेटा माइग्रेशन' : 'Guided data migration'}</strong>
                <span>{lang === 'hi' ? 'मास्टर डेटा, खुली एंट्री और बैलेंस हर कदम पर जाँच के साथ ट्रांसफ़र करें।' : 'Move master records, open items and balances with validation at every step.'}</span>
              </li>
              <li>
                <strong>{lang === 'hi' ? 'पैरेलल रन' : 'Parallel run'}</strong>
                <span>{lang === 'hi' ? 'स्विच करने से पहले अपने मौजूदा सिस्टम के साथ नतीजों की तुलना करें।' : 'Compare results side by side with your current system before you switch.'}</span>
              </li>
              <li>
                <strong>{lang === 'hi' ? 'अपना इतिहास साथ रखें' : 'Keep your history'}</strong>
                <span>{lang === 'hi' ? 'रिपोर्टिंग, ऑडिट और तुलना के लिए पिछले सालों का डेटा साथ लाएँ।' : 'Bring past years across for reporting, audits and comparisons.'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5-Step Journey */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">{lang === 'hi' ? 'आपका सफ़र' : 'Your journey'}</p>
          <h2 className="h2" style={{ maxWidth: '720px', marginBottom: '48px' }}>
            {lang === 'hi' ? 'शुरुआत से लाइव होने तक, पाँच आसान चरणों में' : 'From start to go-live, in five guided steps'}
          </h2>
          <ol className="journey" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', listStyle: 'none', padding: 0 }}>
            <li>
              <span className="num" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent)' }}>01</span>
              <span className="step" style={{ display: 'block', fontWeight: 700, fontSize: '18px', margin: '8px 0' }}>{lang === 'hi' ? 'समझें' : 'Discover'}</span>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{lang === 'hi' ? 'अपनी प्रक्रियाओं को मैप करें और लक्ष्य दायरा तय करें।' : 'Map current operations and define the target scope.'}</p>
            </li>
            <li>
              <span className="num" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent)' }}>02</span>
              <span className="step" style={{ display: 'block', fontWeight: 700, fontSize: '18px', margin: '8px 0' }}>{lang === 'hi' ? 'मानकीकरण' : 'Fit to standard'}</span>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{lang === 'hi' ? 'उद्योग की बेस्ट-प्रैक्टिस प्रक्रियाओं के साथ मिलान करें।' : 'Align workflows with proven industry templates.'}</p>
            </li>
            <li>
              <span className="num" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent)' }}>03</span>
              <span className="step" style={{ display: 'block', fontWeight: 700, fontSize: '18px', margin: '8px 0' }}>{lang === 'hi' ? 'कॉन्फ़िगर करें' : 'Configure'}</span>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{lang === 'hi' ? 'डेटा माइग्रेट करें और इंटीग्रेशन जोड़ें।' : 'Migrate master data, connect APIs and set up roles.'}</p>
            </li>
            <li>
              <span className="num" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent)' }}>04</span>
              <span className="step" style={{ display: 'block', fontWeight: 700, fontSize: '18px', margin: '8px 0' }}>{lang === 'hi' ? 'गो-लाइव' : 'Go live'}</span>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{lang === 'hi' ? 'टीम ट्रेनिंग और पैरेलल रन के साथ सुरक्षित शुरुआत।' : 'Transition seamlessly with certified expert support.'}</p>
            </li>
            <li>
              <span className="num" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent)' }}>05</span>
              <span className="step" style={{ display: 'block', fontWeight: 700, fontSize: '18px', margin: '8px 0' }}>{lang === 'hi' ? 'सुधारें' : 'Improve'}</span>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{lang === 'hi' ? 'Quanta AI एजेंटों के साथ प्रक्रियाओं को और तेज़ बनाएँ।' : 'Automate repetitive workflows with autonomous AI agents.'}</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Bottom CTA Band */}
      <section className="section section-dark" style={{ textAlign: 'center', padding: '80px 0' }}>
        <div className="container">
          <h2 className="display-sm" style={{ marginBottom: '16px' }}>
            {lang === 'hi' ? 'अपने व्यवसाय को Quantinox पर चलाने के लिए तैयार हैं?' : 'Ready to see Quantinox Cloud ERP run your operations?'}
          </h2>
          <p className="lead" style={{ margin: '0 auto 32px', maxWidth: '640px', color: '#C9D1E3' }}>
            {lang === 'hi'
              ? 'हमारे उत्पाद विशेषज्ञ के साथ 30 मिनट का व्यक्तिगत डेमो शेड्यूल करें।'
              : 'Schedule a tailored 30-minute consultation and walkthrough with an industry specialist.'}
          </p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn btn-lg btn-primary" onClick={() => setPage('demo')}>
              {lang === 'hi' ? 'लाइव डेमो बुक करें' : 'Book a live demo'}
            </button>
            <button type="button" className="btn btn-lg btn-ghost-white" onClick={() => setPage('ai-advisor')}>
              {lang === 'hi' ? 'AI सॉल्यूशन एडवाइज़र आज़माएँ' : 'Try AI Solution Advisor'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

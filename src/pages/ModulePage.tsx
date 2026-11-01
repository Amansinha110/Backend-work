import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_INFO } from '../data/content';
import { PageId } from '../types';

export const ModulePage: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  const { lang, setPage, openAssistantWithPrompt } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  const mod = MODULES_INFO.find((m) => m.id === moduleId) || MODULES_INFO[0];

  const tabsContent: Record<string, { title: { en: string; hi: string }; desc: { en: string; hi: string }; points: { en: string[]; hi: string[] } }[]> = {
    finance: [
      {
        title: { en: 'Accounting & Financial Close', hi: 'अकाउंटिंग व वित्तीय क्लोज़' },
        desc: {
          en: 'Post, reconcile and close on a single real-time ledger, with a guided close cockpit for every entity.',
          hi: 'सिंगल रियल-टाइम लेजर पर पोस्टिंग, मिलान और क्लोज़, हर एंटिटी के लिए गाइडेड क्लोज़ कॉकपिट के साथ।',
        },
        points: {
          en: ['Universal journal for all transactions', 'Close task cockpit with owners and deadlines', 'Multi-entity, multi-currency and multi-GAAP consolidation', 'Automated accruals and recurring allocations'],
          hi: ['सभी लेन-देन के लिए यूनिवर्सल जर्नल', 'समय-सीमा व ज़िम्मेदारियों वाला टास्क कॉकपिट', 'मल्टी-एंटिटी, मल्टी-करेंसी और विदेशी मुद्रा प्रबंधन', 'स्वचालित एक्रुअल्स और आवधिक आवंटन'],
        },
      },
      {
        title: { en: 'Treasury & Cash Management', hi: 'ट्रेज़री व कैश मैनेजमेंट' },
        desc: {
          en: 'See cash across every bank and entity, forecast liquidity with AI, and manage payments and risk.',
          hi: 'हर बैंक और एंटिटी में कैश देखें, AI से लिक्विडिटी का अनुमान लगाएँ और भुगतान प्रबंधित करें।',
        },
        points: {
          en: ['Daily aggregated cash position across all banks', 'AI-assisted 30-day liquidity forecasting', 'Automated SEPA, NEFT, RTGS payment runs', 'FX and interest-rate exposure tracking'],
          hi: ['सभी बैंकों में दैनिक नकद स्थिति', 'AI-संचालित 30-दिवसीय लिक्विडिटी पूर्वानुमान', 'स्वचालित बैंक कनेक्टिविटी और भुगतान प्रक्रिया', 'मुद्रा जोखिम और ब्याज दर एक्सपोज़र ट्रैकिंग'],
        },
      },
      {
        title: { en: 'Receivables & Payables', hi: 'प्राप्य व देय खाते' },
        desc: {
          en: 'Collect faster and pay on time with automated 3-way invoice matching and dispute management.',
          hi: 'स्वचालित 3-वे इनवॉइस मिलान और विवाद प्रबंधन के साथ तेज़ी से वसूली करें और समय पर भुगतान करें।',
        },
        points: {
          en: ['Automated vendor invoice line matching', 'Predictive dunning and collections worklists', 'Customer credit limits and risk profiles', 'Early-payment discount capture engine'],
          hi: ['स्वचालित वेंडर इनवॉइस लाइन मिलान', 'पूर्वानुमानित वसूली कार्यसूची', 'ग्राहक क्रेडिट सीमा और जोखिम निगरानी', 'शीघ्र भुगतान छूट का अधिकतम लाभ'],
        },
      },
      {
        title: { en: 'Global Tax & GST Compliance', hi: 'वैश्विक टैक्स व GST अनुपालन' },
        desc: {
          en: 'Calculate indirect taxes, file statutory reports and send e-invoices with built-in localized engines.',
          hi: 'अप्रत्यक्ष करों की गणना करें, वैधानिक रिपोर्ट दाखिल करें और ई-इनवॉइसिंग स्वतः संचालित करें।',
        },
        points: {
          en: ['Native GST determination and return preparation (GSTR-1, 3B)', 'Direct e-way bill and e-invoicing generation', 'Statutory audit trail on every posting', 'Country localized versions for international tax jurisdictions'],
          hi: ['नेक्स्ट-जेन GST निर्धारण और रिटर्न तैयारी', 'सीधा ई-वे बिल और ई-इनवॉइस निर्माण', 'हर पोस्टिंग पर सुरक्षित ऑडिट ट्रेल', 'अंतरराष्ट्रीय टैक्स नियमों के लिए कंट्री वर्ज़न'],
        },
      },
    ],
    manufacturing: [
      {
        title: { en: 'Production Planning & MRP', hi: 'प्रोडक्शन प्लानिंग व MRP' },
        desc: { en: 'Run material requirements planning and schedule work centers with capacity balancing.', hi: 'मटेरियल प्लानिंग चलाएँ और वर्क सेंटरों की क्षमता संतुलित करें।' },
        points: {
          en: ['Multi-level Bill of Materials (BOM) management', 'Finite and infinite capacity scheduling', 'Make-to-stock and make-to-order logic', 'Scrap and yield tracking across production steps'],
          hi: ['मल्टी-लेवल बिल ऑफ़ मटेरियल्स (BOM)', 'क्षमता शेड्यूलिंग और लोड संतुलन', 'मेक-टू-स्टॉक और मेक-टू-ऑर्डर लॉजिक', 'उत्पादन चरणों में स्क्रैप व उपज ट्रैकिंग'],
        },
      },
      {
        title: { en: 'Shop-Floor Execution', hi: 'शॉप-फ़्लोर संचालन' },
        desc: { en: 'Dispatch work orders to operator terminals and monitor live cycle times.', hi: 'ऑपरेटर टर्मिनलों पर वर्क ऑर्डर भेजें और लाइव साइकिल समय देखें।' },
        points: {
          en: ['Touchscreen kiosk work order dispatching', 'Live machine uptime and downtime logging', 'In-line quality sampling checkpoints', 'Barcode and RFID component tracking'],
          hi: ['टचस्क्रीन कियोस्क वर्क ऑर्डर डिस्पैच', 'लाइव मशीन अपटाइम व ब्रेकडाउन ट्रैकिंग', 'इन-लाइन गुणवत्ता निरीक्षण बिंदु', 'बारकोड व RFID कंपोनेंट ट्रैकिंग'],
        },
      },
    ],
    'supply-chain': [
      {
        title: { en: 'Inventory & Warehousing', hi: 'इन्वेंटरी व वेयरहाउसिंग' },
        desc: { en: 'Multi-bin storage, pick-pack-ship automation and cycle counts.', hi: 'मल्टी-बिन स्टोरेज, पिक-पैक-शिप ऑटोमेशन और साइकिल काउंट।' },
        points: {
          en: ['Multi-warehouse transfer orders and in-transit visibility', 'Batch, lot and serial number genealogy', 'Dynamic reorder point algorithms', 'FIFO, LIFO and FEFO valuation rules'],
          hi: ['मल्टी-वेयरहाउस ट्रांसफर ऑर्डर और ट्रांज़िट विज़िबिलिटी', 'बैच और सीरियल नंबर ट्रेसबिलिटी', 'डायनामिक पुनःपूर्ति सीमाएँ', 'FIFO और FEFO मूल्यांकन'],
        },
      },
    ],
  };

  const currentTabs = tabsContent[moduleId] || [
    {
      title: { en: 'Overview & Workflows', hi: 'अवलोकन व वर्कफ़्लो' },
      desc: { en: 'Connected end-to-end workflows built specifically for your domain.', hi: 'आपके व्यावसायिक क्षेत्र के लिए बने एकीकृत वर्कफ़्लो।' },
      points: {
        en: ['Standard enterprise processes pre-configured', 'Real-time telemetry and reporting dashboards', 'Seamless inter-module data sharing', 'Mobile-ready for field and shop operations'],
        hi: ['मानक एंटरप्राइज़ प्रक्रियाएँ पहले से कॉन्फ़िगर', 'रियल-टाइम टेलीमेट्री और रिपोर्टिंग', 'सहज इंटर-मॉड्यूल डेटा शेयरिंग', 'मोबाइल और टैबलेट के लिए तैयार'],
      },
    },
    {
      title: { en: 'AI Automation & Agents', hi: 'AI स्वचालन व एजेंट' },
      desc: { en: 'Autonomous Quanta AI agents taking over repetitive tasks.', hi: 'दोहराए जाने वाले कामों को संभालने वाले Quanta AI एजेंट।' },
      points: {
        en: ['Intelligent anomaly detection', 'Automated email drafting and supplier chasing', 'Policy-governed approval workflows', 'Zero custom code maintenance'],
        hi: ['बुद्धिमान विसंगति पहचान', 'स्वचालित सप्लायर चेज़िंग', 'नियम-आधारित मंज़ूरी वर्कफ़्लो', 'बिना कोड अपग्रेड सुरक्षा'],
      },
    },
  ];

  return (
    <main id="main">
      {/* Sub-hero */}
      <section className="hero hero-sub">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill">Quantinox {mod.name[lang]}</span>
            <h1 className="display-sm">{mod.name[lang]}</h1>
            <p className="lead">{mod.lead[lang]}</p>
            <div className="btn-row">
              <button type="button" className="btn btn-lg btn-primary" onClick={() => setPage('demo', { modules: moduleId })}>
                {lang === 'hi' ? `${mod.name[lang]} का डेमो बुक करें` : `Book a ${mod.name[lang]} demo`}
              </button>
              <button
                type="button"
                className="btn btn-lg btn-outline"
                onClick={() => openAssistantWithPrompt(`Tell me more about Quantinox ${mod.name['en']} capabilities`)}
              >
                {lang === 'hi' ? 'Quanta AI से पूछें' : 'Ask Quanta AI'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--line)', marginBottom: '32px', overflowX: 'auto', paddingBottom: '4px' }}>
            {currentTabs.map((tab, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === idx ? '3px solid var(--accent)' : '3px solid transparent',
                  padding: '12px 20px',
                  font: 'inherit',
                  fontWeight: activeTab === idx ? 700 : 500,
                  color: activeTab === idx ? 'var(--accent)' : 'var(--muted)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.title[lang]}
              </button>
            ))}
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', gap: '48px' }}>
            <div>
              <h2 className="h2" style={{ marginBottom: '16px' }}>{currentTabs[activeTab].title[lang]}</h2>
              <p className="body-lg" style={{ marginBottom: '24px' }}>{currentTabs[activeTab].desc[lang]}</p>
              <ul className="bullets" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentTabs[activeTab].points[lang].map((p, pIdx) => (
                  <li key={pIdx} style={{ fontSize: '15px' }}>{p}</li>
                ))}
              </ul>
            </div>

            {/* Visual mock card */}
            <div className="card" style={{ padding: '24px', boxShadow: 'var(--shadow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                <strong style={{ fontSize: '15px' }}>{mod.name[lang]} {lang === 'hi' ? 'कॉकपिट' : 'Cockpit'}</strong>
                <span className="badge-sample">Active · Live Sync</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Module Status</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ok)' }}>✓ All Workflows Operational</div>
                </div>
                <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Active AI Agents</div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>
                    {mod.agents.map((a) => a.name).join(' · ')}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-block"
                  onClick={() => setPage('tour')}
                >
                  {lang === 'hi' ? 'लाइव स्क्रीन टूर देखें' : 'View in Interactive Tour'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built-in Agents Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="center-block">
            <p className="eyebrow">Quanta AI Agents</p>
            <h2 className="h2">{lang === 'hi' ? 'इस मॉड्यूल के लिए विशेष AI एजेंट' : `Autonomous Agents for ${mod.name[lang]}`}</h2>
            <p className="lead">{lang === 'hi' ? 'नियम-आधारित स्वचालन जो आपकी टीम के घंटों का समय बचाता है।' : 'Pre-trained agents embedded into routine business operations.'}</p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {mod.agents.map((agent, aIdx) => (
              <div className="card" key={aIdx}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                  </svg>
                  <strong style={{ fontSize: '16px' }}>{agent.name}</strong>
                </div>
                <p style={{ color: 'var(--text)', fontSize: '14px' }}>{agent.role}</p>
                <div style={{ marginTop: '16px' }}>
                  <button
                    type="button"
                    className="link-arrow"
                    onClick={() => openAssistantWithPrompt(`How does the ${agent.name} work in Quantinox?`)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
                  >
                    {lang === 'hi' ? 'एजेंट से सवाल पूछें →' : 'Ask about this agent →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section section-dark" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2" style={{ marginBottom: '16px' }}>
            {lang === 'hi' ? `Quantinox ${mod.name[lang]} लाइव देखें` : `See Quantinox ${mod.name[lang]} in Action`}
          </h2>
          <p className="lead" style={{ margin: '0 auto 32px', color: '#C9D1E3' }}>
            {lang === 'hi' ? 'अपनी विशिष्ट उद्योग आवश्यकताओं के आधार पर एक व्यक्तिगत वॉकथ्रू प्राप्त करें।' : 'Tailored specifically for your operational scenarios and existing software stack.'}
          </p>
          <button type="button" className="btn btn-lg btn-primary" onClick={() => setPage('demo', { modules: moduleId })}>
            {lang === 'hi' ? 'डेमो शेड्यूल करें' : 'Schedule a live demo'}
          </button>
        </div>
      </section>
    </main>
  );
};

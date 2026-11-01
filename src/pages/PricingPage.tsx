import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const PricingPage: React.FC = () => {
  const { lang, setPage } = useApp();
  const [annual, setAnnual] = useState(true);

  const hi = lang === 'hi';

  const faqs = [
    {
      q: hi ? 'हम केवल उन्हीं मॉड्यूल के लिए भुगतान कैसे करते हैं जिनकी हमें ज़रूरत है?' : 'How does per-module licensing work?',
      a: hi
        ? 'आप उन विशिष्ट मॉड्यूल (जैसे केवल फ़ाइनेंस या फ़ाइनेंस + मैन्युफ़ैक्चरिंग) का चयन करते हैं जिन्हें आप सक्रिय करना चाहते हैं। जैसे-जैसे आपकी टीम बढ़ती है, आप किसी भी समय नए मॉड्यूल या यूज़र सीटें जोड़ सकते हैं।'
        : 'You only subscribe to the modules your team activates (e.g. Finance Essentials or full Business Suite). Additional lines of business and user seats can be added dynamically at any time.',
    },
    {
      q: hi ? 'क्या सॉफ़्टवेयर अपडेट और बैकअप शामिल हैं?' : 'Are software updates, backups and security included?',
      a: hi
        ? 'हाँ। पूरी तरह प्रबंधित SaaS के रूप में, सभी सुरक्षा पैच, आपदा रिकवरी बैकअप, और साल में दो प्रमुख फीचर रिलीज़ बिना किसी अतिरिक्त शुल्क के अपने-आप उपलब्ध होते हैं।'
        : 'Yes. All infrastructure management, daily snapshots, failover disaster recovery, and semi-annual major feature updates are fully managed by Quantinox with zero maintenance overhead.',
    },
    {
      q: hi ? 'क्या मौजूदा ERP या टैली से माइग्रेशन में सहायता मिलती है?' : 'What migration support is included?',
      a: hi
        ? 'हमारे प्रमाणित इम्प्लीमेंटेशन इंजीनियर आपके चार्ट ऑफ़ अकाउंट्स, वेंडर मास्टर, और ओपन इनवॉइस को मैप और ट्रांसफ़र करने के लिए गाइडेड डेटा माइग्रेशन टूलकिट प्रदान करते हैं।'
        : 'Our certified delivery partners assist with automated ETL migration scripts for legacy Tally, SAP, Oracle or spreadsheets, including master data cleansing and validation.',
    },
  ];

  return (
    <main id="main">
      <section className="hero hero-sub">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill">{hi ? 'कीमतें और पैकेज' : 'Transparent Pricing'}</span>
            <h1 className="display-sm">
              {hi ? 'आपके व्यवसाय के अनुकूल पारदर्शी मूल्य' : 'Predictable Pricing that Scales With Your Growth'}
            </h1>
            <p className="lead">
              {hi
                ? 'प्रति यूज़र, प्रति महीना मूल्य निर्धारण। केवल उन्हीं मॉड्यूल का भुगतान करें जिनका आप उपयोग करते हैं।'
                : 'Per user, per month. No hidden server infrastructure fees or forced multi-year lock-ins.'}
            </p>

            {/* Monthly / Annual Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
              <div style={{ background: 'var(--card)', border: '1px solid var(--line-strong)', padding: '4px', borderRadius: '12px', display: 'inline-flex' }}>
                <button
                  type="button"
                  onClick={() => setAnnual(false)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    background: !annual ? 'var(--accent)' : 'transparent',
                    color: !annual ? '#fff' : 'var(--text)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {hi ? 'मासिक बिलिंग' : 'Monthly'}
                </button>
                <button
                  type="button"
                  onClick={() => setAnnual(true)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    background: annual ? 'var(--accent)' : 'transparent',
                    color: annual ? '#fff' : 'var(--text)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {hi ? 'वार्षिक (15% बचत)' : 'Annual (Save 15%)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section className="section">
        <div className="container">
          <div className="grid grid-24" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'stretch' }}>
            {/* Finance Essentials */}
            <div className="plan">
              <div className="plan-top">
                <div>
                  <h3 className="plan-name">Finance Essentials</h3>
                  <p className="muted">{hi ? 'कोर फ़ाइनेंस, टैक्स व ई-इनवॉइसिंग' : 'Core ledger, automated close & GST'}</p>
                </div>
              </div>

              <div style={{ margin: '20px 0' }}>
                <span className="edition-price">
                  {annual ? '₹2,380' : '₹2,800'}
                  <small> / {hi ? 'यूज़र / महीना' : 'user / month'}</small>
                </span>
              </div>

              <ul className="check-list" style={{ marginBottom: '32px' }}>
                <li>
                  <span className="is-ok">✓</span> General Ledger, AP, AR & Treasury
                </li>
                <li>
                  <span className="is-ok">✓</span> Guided Month-End Financial Close Cockpit
                </li>
                <li>
                  <span className="is-ok">✓</span> Multi-Currency & Consolidated Reporting
                </li>
                <li>
                  <span className="is-ok">✓</span> GST E-Invoicing & E-Way Bills
                </li>
                <li>
                  <span className="is-ok">✓</span> Quanta AI Bank Reconciliation Agent
                </li>
                <li>
                  <span className="is-ok">✓</span> Standard Open REST APIs
                </li>
              </ul>

              <div className="plan-foot">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => setPage('demo', { modules: 'finance' })}
                >
                  {hi ? 'डेमो बुक करें' : 'Start with Finance'}
                </button>
              </div>
            </div>

            {/* Business Suite */}
            <div className="plan plan-featured">
              <div className="plan-top">
                <div>
                  <h3 className="plan-name">Business Suite</h3>
                  <p className="muted">{hi ? 'फ़ाइनेंस + सप्लाई चेन, मैन्युफ़ैक्चरिंग व सर्विसेज़' : 'Full operational ERP with end-to-end supply chain'}</p>
                </div>
                <span className="pill">{hi ? 'सर्वाधिक लोकप्रिय' : 'Most Popular'}</span>
              </div>

              <div style={{ margin: '20px 0' }}>
                <span className="edition-price">
                  {annual ? '₹4,420' : '₹5,200'}
                  <small> / {hi ? 'यूज़र / महीना' : 'user / month'}</small>
                </span>
              </div>

              <ul className="check-list" style={{ marginBottom: '32px' }}>
                <li>
                  <span className="is-ok">✓</span> Everything in Finance Essentials
                </li>
                <li>
                  <span className="is-ok">✓</span> Multi-Warehouse Inventory & Order Fulfillment
                </li>
                <li>
                  <span className="is-ok">✓</span> Manufacturing Production Planning & MRP
                </li>
                <li>
                  <span className="is-ok">✓</span> Procure-to-Pay 3-Way Invoice Matching
                </li>
                <li>
                  <span className="is-ok">✓</span> Sales Quote-to-Cash & Subscription Billing
                </li>
                <li>
                  <span className="is-ok">✓</span> Projects, Timesheets & Milestone Billing
                </li>
                <li>
                  <span className="is-ok">✓</span> Full Quanta AI Autonomous Agents Suite
                </li>
              </ul>

              <div className="plan-foot">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => setPage('demo', { modules: 'finance,manufacturing,supply-chain' })}
                >
                  {hi ? 'Business Suite का डेमो बुक करें' : 'Get Business Suite Demo'}
                </button>
              </div>
            </div>

            {/* Enterprise Private */}
            <div className="plan">
              <div className="plan-top">
                <div>
                  <h3 className="plan-name">Enterprise Private</h3>
                  <p className="muted">{hi ? 'समर्पित सिंगल-टेनेंट सॉवरेन क्लाउड' : 'Dedicated single-tenant sovereign cloud'}</p>
                </div>
              </div>

              <div style={{ margin: '20px 0' }}>
                <span className="edition-price">{hi ? 'कस्टम कोटेशन' : 'Custom Pricing'}</span>
              </div>

              <ul className="check-list" style={{ marginBottom: '32px' }}>
                <li>
                  <span className="is-ok">✓</span> Everything in Business Suite
                </li>
                <li>
                  <span className="is-ok">✓</span> Dedicated Isolated Cloud Infrastructure
                </li>
                <li>
                  <span className="is-ok">✓</span> Custom Code Extensibility & Unlimited Sandbox
                </li>
                <li>
                  <span className="is-ok">✓</span> Sovereign Cloud Data Residency Guarantees
                </li>
                <li>
                  <span className="is-ok">✓</span> Dedicated Customer Success Manager & 24/7 SLA
                </li>
                <li>
                  <span className="is-ok">✓</span> Tailored Migration Engineering Package
                </li>
              </ul>

              <div className="plan-foot">
                <button
                  type="button"
                  className="btn btn-dark-outline btn-block"
                  onClick={() => setPage('demo', { tier: 'enterprise' })}
                >
                  {hi ? 'सेल्स टीम से बात करें' : 'Contact Enterprise Sales'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section section-alt">
        <div className="container">
          <div className="center-block">
            <h2 className="h2">{hi ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently Asked Questions'}</h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((f, idx) => (
              <div key={idx} className="card" style={{ padding: '24px' }}>
                <h3 className="h3" style={{ fontSize: '17px', marginBottom: '8px' }}>{f.q}</h3>
                <p style={{ color: 'var(--text)', margin: 0, fontSize: '15px', lineHeight: 1.6 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

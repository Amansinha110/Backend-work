import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface TourScreen {
  id: string;
  title: { en: string; hi: string };
  badge: { en: string; hi: string };
  description: { en: string; hi: string };
  kpis: { label: string; value: string; note: string }[];
  hotspots: { title: string; desc: string }[];
}

const SCREENS: TourScreen[] = [
  {
    id: 'finance',
    title: { en: 'Real-Time Financial Dashboard', hi: 'रियल-टाइम फ़ाइनेंशियल डैशबोर्ड' },
    badge: { en: 'Screen 1 of 6 · Universal Ledger', hi: 'स्क्रीन 1/6 · यूनिवर्सल लेजर' },
    description: {
      en: 'Track consolidated liquidity, receivables aging and operating margins live without waiting for month-end batch jobs.',
      hi: 'मंथ-एंड बैच जॉब्स का इंतजार किए बिना कंसॉलिडेटेड लिक्विडिटी, प्राप्य और ऑपरेटिंग मार्जिन लाइव ट्रैक करें।',
    },
    kpis: [
      { label: 'Operating Cash', value: '₹4.82 Cr', note: '+6.1% vs prev month' },
      { label: 'DSO (Days Sales Outstanding)', value: '38 Days', note: '−4 days improved' },
      { label: 'Unreconciled Bank Lines', value: '0', note: '100% matched by AI' },
    ],
    hotspots: [
      { title: 'Quanta AI Close Cockpit', desc: 'Monitors remaining closing tasks across all subsidiaries and clears automated intercompany entries.' },
      { title: 'Multi-GAAP Switcher', desc: 'Toggle instantly between Ind AS, IFRS and US GAAP statutory views with one ledger.' },
    ],
  },
  {
    id: 'supply',
    title: { en: 'Supplier Risk & Logistics Monitor', hi: 'सप्लायर रिस्क व लॉजिस्टिक्स मॉनिटर' },
    badge: { en: 'Screen 2 of 6 · Supply Chain', hi: 'स्क्रीन 2/6 · सप्लाई चेन' },
    description: {
      en: 'Identify delayed inbound shipments and critical part stockouts before they disrupt the production schedule.',
      hi: 'उत्पादन शेड्यूल में रुकावट आने से पहले ही लेट शिपमेंट और क्रिटिकल पार्ट्स की कमी पहचानें।',
    },
    kpis: [
      { label: 'Fill Rate', value: '98.4%', note: 'Target 97.5%' },
      { label: 'At-Risk Work Orders', value: '2 Orders', note: 'Alternate vendor flagged' },
      { label: 'Inventory Turnover', value: '8.2x', note: 'Top quartile' },
    ],
    hotspots: [
      { title: 'Early Warning Telemetry', desc: 'Alerts logistics managers when supplier departure milestones are missed.' },
      { title: 'Dynamic Reorder Recommendation', desc: 'AI reallocates stock from regional hub to prevent assembly shutdown.' },
    ],
  },
  {
    id: 'manufacturing',
    title: { en: 'Shop Floor & Capacity Planner', hi: 'शॉप फ़्लोर व क्षमता योजना' },
    badge: { en: 'Screen 3 of 6 · Manufacturing', hi: 'स्क्रीन 3/6 · मैन्युफ़ैक्चरिंग' },
    description: {
      en: 'Finite capacity scheduling, machine telemetry and digital work instructions for shop floor operators.',
      hi: 'परिमित क्षमता शेड्यूलिंग, मशीन टेलीमेट्री और ऑपरेटरों के लिए डिजिटल वर्क निर्देश।',
    },
    kpis: [
      { label: 'Overall Equipment Effectiveness (OEE)', value: '87.6%', note: '+3.2% this quarter' },
      { label: 'Active Production Lines', value: '14 / 16', note: '2 in scheduled maintenance' },
      { label: 'First-Pass Yield', value: '99.1%', note: 'Zero defect target' },
    ],
    hotspots: [
      { title: 'Kiosk Terminal Mode', desc: 'Tablet-friendly interface for operators to log batch output and report scrap.' },
      { title: 'Predictive Maintenance Alert', desc: 'Vibration telemetry on CNC lathe 04 suggests bearing inspection in 48 hours.' },
    ],
  },
  {
    id: 'procurement',
    title: { en: 'Autonomous 3-Way Invoice Matching', hi: 'स्वायत्त 3-वे इनवॉइस मिलान' },
    badge: { en: 'Screen 4 of 6 · Procurement', hi: 'स्क्रीन 4/6 · प्रोक्योरमेंट' },
    description: {
      en: 'AI reads vendor PDF invoices, extracts line items, verifies pricing against purchase orders, and queues payment.',
      hi: 'AI वेंडर इनवॉइस पढ़ता है, लाइन आइटम निकालता है, PO से कीमत मिलाता है और भुगतान शेड्यूल करता है।',
    },
    kpis: [
      { label: 'Auto-Matched Rate', value: '94.2%', note: 'No human touch' },
      { label: 'Processing Cost / Bill', value: '₹14', note: 'Down from ₹180' },
      { label: 'Early Pay Discounts Captured', value: '₹18.4 Lakh', note: 'YTD savings' },
    ],
    hotspots: [
      { title: 'Tolerance Variance Resolver', desc: 'Under-₹50 freight discrepancies approved automatically within policy rules.' },
      { title: 'Vendor Scorecard', desc: 'Displays on-time delivery rate, quality compliance, and billing accuracy.' },
    ],
  },
  {
    id: 'services',
    title: { en: 'Field Service & Asset Dispatch', hi: 'फ़ील्ड सर्विस व एसेट डिस्पैच' },
    badge: { en: 'Screen 5 of 6 · Assets', hi: 'स्क्रीन 5/6 · एसेट' },
    description: {
      en: 'Dispatch technicians based on skills, geography, and truck parts inventory with live mobile status.',
      hi: 'तकनीशियनों के हुनर, स्थान और पार्ट्स की उपलब्धता के आधार पर लाइव मोबाइल डिस्पैच।',
    },
    kpis: [
      { label: 'Mean Time to Repair (MTTR)', value: '1.8 Hours', note: '−35 min improvement' },
      { label: 'First-Time Fix Rate', value: '91.8%', note: 'Industry best-in-class' },
      { label: 'Technician Utilization', value: '84%', note: 'Optimized routing' },
    ],
    hotspots: [
      { title: 'GPS Routing & Part Check', desc: 'Verifies required spare parts are in truck inventory before dispatching route.' },
      { title: 'Digital Sign-off & Billing', desc: 'Customer signs on mobile glass; sales invoice posts immediately in general ledger.' },
    ],
  },
  {
    id: 'people',
    title: { en: 'People Analytics & Payroll Cockpit', hi: 'पीपल एनालिटिक्स व पेरोल कॉकपिट' },
    badge: { en: 'Screen 6 of 6 · Human Capital', hi: 'स्क्रीन 6/6 · मानव संसाधन' },
    description: {
      en: 'Centralized hire-to-retire employee lifecycle, attendance biometric feeds, and one-click statutory payroll.',
      hi: 'केंद्रीकृत कर्मचारी जीवनचक्र, बायोमेट्रिक हाज़िरी और एक क्लिक में वैधानिक पेरोल प्रोसेसिंग।',
    },
    kpis: [
      { label: 'Monthly Payroll Run Time', value: '12 Minutes', note: 'Down from 3 days' },
      { label: 'Statutory Compliance Score', value: '100%', note: 'PF, ESI & TDS automated' },
      { label: 'Self-Service Adoption', value: '96.4%', note: 'Mobile leave & payslips' },
    ],
    hotspots: [
      { title: 'Automated Compliance Engine', desc: 'Calculates tax brackets and generates filing-ready statutory schedules.' },
      { title: 'Manager Org Modeler', desc: 'Simulate restructuring costs and approval hierarchies with drag-and-drop.' },
    ],
  },
];

export const TourPage: React.FC = () => {
  const { lang, setPage } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  const screen = SCREENS[activeStep];
  const hi = lang === 'hi';

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % SCREENS.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + SCREENS.length) % SCREENS.length);
  };

  return (
    <main id="main">
      <section className="hero hero-sub">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill">{hi ? 'इंटरैक्टिव प्रोडक्ट टूर' : 'Interactive Product Tour'}</span>
            <h1 className="display-sm">
              {hi ? 'Quantinox Cloud ERP के मुख्य वर्कफ़्लो देखें' : 'Tour Quantinox Cloud ERP Operations'}
            </h1>
            <p className="lead">
              {hi
                ? 'दो मिनट में छह वास्तविक उत्पादन स्क्रीन और Quanta AI प्रक्रियाओं का वॉकथ्रू।'
                : 'Walk through six core screens and see how Quanta AI connects departments in real time.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Progress Bar & Screen Steps */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontWeight: 600, color: 'var(--accent)' }}>
                {screen.badge[lang]}
              </span>
              <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
                {activeStep + 1} / {SCREENS.length}
              </span>
            </div>
            <div style={{ height: '6px', background: 'var(--track)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${((activeStep + 1) / SCREENS.length) * 100}%`,
                  background: 'var(--accent)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
              {SCREENS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: activeStep === idx ? 'var(--accent)' : 'var(--line)',
                    background: activeStep === idx ? 'var(--accent-tint)' : 'var(--card)',
                    color: activeStep === idx ? 'var(--accent)' : 'var(--text)',
                    fontWeight: activeStep === idx ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontSize: '13px',
                  }}
                >
                  {s.title[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Screen Walkthrough */}
          <div className="mock" style={{ boxShadow: 'var(--shadow)', borderRadius: '20px', overflow: 'hidden' }}>
            {/* Chrome Bar */}
            <div className="mock-chrome" style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }}></span>
                <span className="dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }}></span>
                <span className="dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }}></span>
                <span style={{ marginLeft: '12px', fontWeight: 600, fontSize: '14px' }}>
                  Quantinox {screen.title[lang]}
                </span>
              </div>
              <span className="badge-sample">Live Production UI</span>
            </div>

            {/* Content Area */}
            <div style={{ padding: '32px', background: 'var(--card)' }}>
              <h2 className="h2" style={{ marginBottom: '8px' }}>{screen.title[lang]}</h2>
              <p className="body-lg" style={{ marginBottom: '28px', maxWidth: '800px' }}>
                {screen.description[lang]}
              </p>

              {/* KPI Strip */}
              <div className="kpis" style={{ marginBottom: '32px' }}>
                {screen.kpis.map((kpi, idx) => (
                  <div className="kpi" key={idx}>
                    <div className="kpi-label">{kpi.label}</div>
                    <div className="kpi-value">{kpi.value}</div>
                    <div className="kpi-note is-ok">{kpi.note}</div>
                  </div>
                ))}
              </div>

              {/* Hotspot highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {screen.hotspots.map((hs, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ background: 'var(--accent)', color: '#fff', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-grid', placeItems: 'center', fontSize: '12px', fontWeight: 700 }}>
                        {idx + 1}
                      </span>
                      <strong style={{ fontSize: '15px' }}>{hs.title}</strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)', lineHeight: 1.5 }}>
                      {hs.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={prevStep}
                  disabled={activeStep === 0}
                >
                  ← {hi ? 'पिछला' : 'Previous'}
                </button>

                <div className="btn-row">
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    {activeStep === SCREENS.length - 1 ? (hi ? 'फिर से शुरू करें' : 'Start Over') : (hi ? 'अगला स्क्रीन →' : 'Next Screen →')}
                  </button>
                  <button type="button" className="btn btn-outline" onClick={() => setPage('demo')}>
                    {hi ? 'पूरा लाइव डेमो बुक करें' : 'Book Full Live Demo'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

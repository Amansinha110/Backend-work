import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ValueCalculatorPage: React.FC = () => {
  const { lang, setPage } = useApp();

  const [reduction, setReduction] = useState(30);
  const [invoices, setInvoices] = useState(1200);
  const [minutes, setMinutes] = useState(14);
  const [team, setTeam] = useState(6);
  const [closeDays, setCloseDays] = useState(9);
  const [monthlyCost, setMonthlyCost] = useState(45000);

  const r = reduction / 100;
  const manualHoursMonth = (invoices * minutes) / 60 + team * closeDays * 8;
  const hoursSavedAnnual = Math.round(manualHoursMonth * r * 12);
  const fteSaved = (hoursSavedAnnual / (160 * 12)).toFixed(1);
  const hourlyRate = monthlyCost / 160;
  const annualSavingsInr = Math.round(hoursSavedAnnual * hourlyRate);
  const newCloseDays = Math.max(1, (closeDays * (1 - r * 0.75))).toFixed(1);

  const hi = lang === 'hi';

  return (
    <main id="main">
      <section className="hero hero-sub">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill">{hi ? 'वैल्यू कैलकुलेटर' : 'Business Value Calculator'}</span>
            <h1 className="display-sm">
              {hi ? 'Quantinox के साथ अपनी वित्तीय व परिचालन बचत मापें' : 'Calculate Your ROI with Quantinox Cloud ERP'}
            </h1>
            <p className="lead">
              {hi
                ? 'देखें कि Quanta AI ऑटोमेशन और एकीकृत प्रक्रियाओं से आपकी टीम के कितने घंटे और लागत बच सकते हैं।'
                : 'See how much manual effort, closing time, and operating cost your business saves by switching to Quantinox.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', alignItems: 'flex-start' }}>
            {/* Input Controls */}
            <div className="card" style={{ padding: '32px', boxShadow: 'var(--shadow)' }}>
              <h2 className="h3" style={{ marginBottom: '24px' }}>
                {hi ? 'अपने संगठन के परिचालन पैरामीटर' : 'Operating Parameters'}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontWeight: 600 }}>{hi ? 'मासिक सप्लायर इनवॉइस' : 'Monthly Vendor Invoices'}</label>
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{invoices.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="50"
                    value={invoices}
                    onChange={(e) => setInvoices(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontWeight: 600 }}>{hi ? 'प्रति इनवॉइस औसत समय (मिनट)' : 'Minutes spent per invoice today'}</label>
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{minutes} min</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="45"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontWeight: 600 }}>{hi ? 'फ़ाइनेंस टीम का आकार' : 'Finance & Accounting Team Size'}</label>
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{team} members</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={team}
                    onChange={(e) => setTeam(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontWeight: 600 }}>{hi ? 'वर्तमान मंथ-एंड क्लोज़ के दिन' : 'Days to close books today'}</label>
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{closeDays} days</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    value={closeDays}
                    onChange={(e) => setCloseDays(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontWeight: 600 }}>{hi ? 'औसत मासिक लागत प्रति कर्मचारी (₹)' : 'Avg. Monthly Cost per Staff (₹)'}</label>
                    <span style={{ fontWeight: 700, color: 'var(--accent)' }}>₹{monthlyCost.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="150000"
                    step="5000"
                    value={monthlyCost}
                    onChange={(e) => setMonthlyCost(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontWeight: 600 }}>{hi ? 'अपेक्षित ऑटोमेशन दर' : 'Target Process Automation'}</label>
                    <span style={{ fontWeight: 700, color: 'var(--ok)' }}>{reduction}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="65"
                    value={reduction}
                    onChange={(e) => setReduction(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card" style={{ padding: '32px', background: 'var(--surface-2)', border: '2px solid var(--bar)' }}>
                <p className="eyebrow" style={{ color: 'var(--accent)' }}>{hi ? 'वार्षिक अनुमानित लाभ' : 'Estimated Annual Value'}</p>
                <div style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 800, color: 'var(--accent)', margin: '8px 0 16px' }}>
                  ₹{annualSavingsInr.toLocaleString('en-IN')}
                </div>
                <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: 1.6 }}>
                  {hi
                    ? `3-वे इनवॉइस मिलान और वित्तीय क्लोज़ प्रक्रियाओं को ऑटोमेट करके आपकी कंपनी हर साल लगभग ₹${annualSavingsInr.toLocaleString('en-IN')} की प्रत्यक्ष बचत कर सकती है।`
                    : `By automating vendor invoice processing and accelerating your monthly financial close cockpit, your organization captures approximately ₹${annualSavingsInr.toLocaleString('en-IN')} in direct efficiency gains each year.`}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ink)' }}>{hoursSavedAnnual.toLocaleString()}</div>
                    <small style={{ color: 'var(--muted)', fontSize: '12px' }}>{hi ? 'वार्षिक घंटे बचे' : 'Hours Saved / Yr'}</small>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ok)' }}>{fteSaved}</div>
                    <small style={{ color: 'var(--muted)', fontSize: '12px' }}>{hi ? 'FTE क्षमता मुक्त' : 'FTE Unlocked'}</small>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>{newCloseDays} {hi ? 'दिन' : 'days'}</div>
                    <small style={{ color: 'var(--muted)', fontSize: '12px' }}>{hi ? 'नया क्लोज़ समय' : 'New Close Time'}</small>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <h3 className="h3" style={{ fontSize: '18px', marginBottom: '12px' }}>
                  {hi ? 'इस बिजनेस केस के साथ डेमो बुक करें' : 'Validate This Business Case with an Expert'}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>
                  {hi
                    ? 'हमारे सॉल्यूशन कंसल्टेंट आपकी कंपनी के वास्तविक लेज़र और इनवॉइस वॉल्यूम के आधार पर एक विस्तृत ROI रिपोर्ट तैयार करेंगे।'
                    : 'Our solution architects will review your transaction ledger volumes and present an audited financial model during your live demo.'}
                </p>
                <button type="button" className="btn btn-primary btn-block" onClick={() => setPage('demo')}>
                  {hi ? 'डेमो बुक करें' : 'Book a Live Demo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

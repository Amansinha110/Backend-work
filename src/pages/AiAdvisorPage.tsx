import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdvisorPlan } from '../types';
import { StorageService } from '../services/storage';

export const AiAdvisorPage: React.FC = () => {
  const { lang, setPage, openAssistantWithPrompt } = useApp();

  const [desc, setDesc] = useState('');
  const [industry, setIndustry] = useState('manufacturing');
  const [size, setSize] = useState('51–250 employees');
  const [currentSystem, setCurrentSystem] = useState('Tally / Spreadsheets');
  const [priorities, setPriorities] = useState<string[]>(['close', 'inventory']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [plan, setPlan] = useState<AdvisorPlan | null>(() => StorageService.getAdvisorPlan());

  const hi = lang === 'hi';

  const togglePriority = (p: string) => {
    setPriorities((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (desc.trim().length < 12) {
      alert(hi ? 'कृपया अपने व्यवसाय का थोड़ा और विवरण दें।' : 'Please describe your business in a sentence or two.');
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      // Generate rule-based tailored plan
      const text = `${desc} ${industry} ${currentSystem}`.toLowerCase();
      const mods = ['finance'];
      const add = (m: string) => {
        if (!mods.includes(m)) mods.push(m);
      };

      if (/manufactur|factory|plant|production|machine|textile|pharma/i.test(text) || industry === 'manufacturing') {
        add('manufacturing');
        add('supply-chain');
        add('procurement');
      }
      if (/retail|pos|store|e-commerce/i.test(text) || industry === 'retail') {
        add('sales');
        add('supply-chain');
      }
      if (/project|consult|service|agency/i.test(text) || industry === 'services') {
        add('services');
        add('hr');
      }
      if (/asset|maintenance|fleet|equipment/i.test(text) || priorities.includes('maintenance')) {
        add('assets');
      }
      if (/payroll|salary|hiring|hr/i.test(text) || priorities.includes('payroll')) {
        add('hr');
      }
      add('ai');

      const isLarge = /1,000\+|251/.test(size) || /sap|oracle|custom/i.test(currentSystem);
      const pkg: AdvisorPlan['package'] = isLarge
        ? 'enterprise-private'
        : mods.length > 3
        ? 'business-suite'
        : 'finance-essentials';

      const pkgReason = {
        'finance-essentials': hi
          ? 'मुख्य रूप से फ़ाइनेंस और बिलिंग की ज़रूरतों के लिए, एक केंद्रित और किफ़ायती शुरुआत।'
          : 'Focused core finance, order-to-cash and procure-to-pay for fast go-live and immediate ROI.',
        'business-suite': hi
          ? 'फ़ाइनेंस के साथ ऑपरेशन (इन्वेंटरी, प्रोडक्शन, प्रोजेक्ट्स) एक ही एकीकृत प्लेटफ़ॉर्म पर।'
          : 'Complete unified platform running finance alongside operational inventory, shop-floor and procurement.',
        'enterprise-private': hi
          ? 'बड़े या उच्च-कस्टमाइज़ेशन वाले उद्यमों के लिए समर्पित, सुरक्षित सिंगल-टेनेंट क्लाउड।'
          : 'Dedicated single-tenant enterprise environment with custom integrations and sovereign compliance.',
      }[pkg];

      const generatedPlan: AdvisorPlan = {
        summary: desc.slice(0, 220),
        package: pkg,
        package_reason: pkgReason,
        modules: mods.map((m, idx) => ({
          id: m,
          priority: idx < 2 ? 'now' : idx < 4 ? 'next' : 'later',
          why: hi ? 'आपके विवरण और परिचालन प्राथमिकताओं से मेल खाता है।' : 'Matches the operational priorities and team scale you provided.',
        })),
        agents: [
          { name: 'Reconciliation Agent', benefit: hi ? 'बैंक स्टेटमेंट का स्वतः मिलान और खुली प्रविष्टियों का क्लीयरेंस।' : 'Automates bank statement line reconciliations and clears open ledger items.' },
          { name: 'Invoice Matching Agent', benefit: hi ? 'वेंडर इनवॉइस का खरीद आदेश व रसीद से स्वतः 3-वे मिलान।' : '3-way automated matching of incoming vendor bills against POs and goods receipts.' },
          { name: 'Supplier Confirmation Agent', benefit: hi ? 'देर से आने वाली आपूर्तियों का पीछा करता है और वैकल्पिक स्रोत सुझाता है।' : 'Monitors delayed supplier confirmations and surfaces alternate suppliers.' },
        ],
        phases: [
          {
            title: hi ? 'चरण 1: मास्टर डेटा व तैयारी' : 'Phase 1: Master Data & Scope',
            weeks: '2–4 weeks',
            items: hi
              ? ['सफलता के मुख्य मैट्रिक्स तय करें', `${currentSystem} से मास्टर डेटा साफ़ करके माइग्रेट करें`, 'प्रारंभिक बैलेंस और चार्ट ऑफ़ अकाउंट्स मैप करें']
              : ['Define key success metrics & scope', `Clean and extract master data from ${currentSystem}`, 'Map standard chart of accounts and tax codes'],
          },
          {
            title: hi ? 'चरण 2: कोर वर्कफ़्लो गो-लाइव' : 'Phase 2: Core Workflows Go-Live',
            weeks: '6–8 weeks',
            items: hi
              ? ['कोर प्रोसेस कॉन्फ़िगर करें', 'मुख्य उपयोगकर्ताओं को ट्रेनिंग दें', 'समांतर संचालन (पैरेलल रन) चलाकर सत्यापन करें']
              : ['Configure core finance and operational workflows', 'Train key department operators', 'Conduct side-by-side parallel run for auditing'],
          },
          {
            title: hi ? 'चरण 3: Quanta AI एजेंट सक्रियण' : 'Phase 3: Autonomous AI Activation',
            weeks: '3–4 weeks',
            items: hi
              ? ['AI मिलान और इनवॉइस एजेंट चालू करें', 'कार्यकारी एनालिटिक्स डैशबोर्ड सक्रिय करें']
              : ['Enable autonomous AI reconciliation agents', 'Deploy predictive cash and supply chain dashboards'],
          },
        ],
        quick_wins: hi
          ? ['GST व ई-इनवॉइसिंग एक ही क्लिक में', 'मंथ-एंड क्लोज़ में 40% समय की बचत', 'दैनिक नकद स्थिति का लाइव दृश्य']
          : ['One-click unified GST & e-invoicing', '40% reduction in month-end financial close duration', 'Live real-time visibility into daily cash and receivables'],
        risks: hi
          ? ['डेटा स्वच्छता: पुराने सिस्टम से अमान्य वेंडर/आइटम रिकॉर्ड पहले ही हटाएँ।', 'उपयोगकर्ता प्रशिक्षण: शुरुआती सप्ताहों में नियमित हैंड-होल्डिंग सुनिश्चित करें।']
          : ['Data Hygiene: purge inactive customer and duplicate item codes prior to migration.', 'Change Management: appoint departmental process owners early.'],
        questions: hi
          ? ['कितने समवर्ती उपयोगकर्ताओं के लिए लाइसेंसिंग चाहिए?', 'कौन-से बैंक या बाहरी ई-कॉमर्स पोर्टल से सीधा एकीकरण आवश्यक है?']
          : ['How many concurrent user seats are needed across departments?', 'Which third-party banks, portals or shop systems require direct API connectors?'],
      };

      setPlan(generatedPlan);
      StorageService.saveAdvisorPlan(generatedPlan);
      setIsSubmitting(false);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }, 500);
  };

  const handleBookDemoWithPlan = () => {
    if (!plan) return;
    const modulesQuery = plan.modules.map((m) => m.id).join(',');
    setPage('demo', { modules: modulesQuery, from: 'advisor' });
  };

  const handleDownloadPlanTxt = () => {
    if (!plan) return;
    const lines = [
      'QUANTINOX ERP IMPLEMENTATION PLAN',
      `Date: ${new Date().toLocaleDateString()}`,
      '',
      `Recommended Package: ${plan.package.toUpperCase()}`,
      `Reason: ${plan.package_reason}`,
      '',
      'MODULES IN SCOPE:',
      ...plan.modules.map((m) => `  - [${m.priority.toUpperCase()}] ${m.id}: ${m.why}`),
      '',
      'ROLLOUT PHASES:',
      ...plan.phases.flatMap((ph) => [`  ${ph.title} (${ph.weeks})`, ...ph.items.map((it) => `     * ${it}`)]),
      '',
      'EXPECTED QUICK WINS:',
      ...plan.quick_wins.map((w) => `  * ${w}`),
      '',
      'QUESTIONS FOR DEMO:',
      ...plan.questions.map((q) => `  ? ${q}`),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantinox-erp-plan-${plan.package}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main id="main">
      <section className="hero hero-sub">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill">Quanta AI Solution Advisor</span>
            <h1 className="display-sm">
              {hi ? 'एक मिनट में अपने बिज़नेस के लिए ERP प्लान पाएँ' : 'Get a tailored ERP plan for your business in 60 seconds'}
            </h1>
            <p className="lead">
              {hi
                ? 'अपने शब्दों में अपने बिज़नेस के बारे में बताइए। Quanta AI पैकेज, मॉड्यूल, AI एजेंट और रोलआउट प्लान सुझाता है।'
                : 'Describe your business in plain words. Quanta AI suggests the exact package, required modules, autonomous agents, and a phased rollout plan.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Advisor Input Form */}
          <form onSubmit={handleGeneratePlan} className="card" style={{ padding: '32px', marginBottom: '40px', boxShadow: 'var(--shadow)' }}>
            <h2 className="h2" style={{ marginBottom: '8px' }}>{hi ? 'अपने व्यवसाय के बारे में बताएँ' : 'Tell us about your business'}</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
              {hi ? 'कोई भी विवरण लिखें (उत्पाद, चुनौतियाँ, वर्तमान प्रणाली)।' : 'Briefly describe your industry, current bottlenecks, and what you want to automate.'}
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>
                {hi ? 'व्यावसायिक विवरण' : 'Business Description'}
              </label>
              <textarea
                rows={3}
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={hi ? 'उदा: हम 120 कर्मचारियों वाली ऑटो-पार्ट्स मैन्युफ़ैक्चरिंग कंपनी हैं। टैली पर अकाउंटिंग और एक्सेल पर स्टॉक संभालते हैं, जिससे हर महीने क्लोज़ में 10 दिन लग जाते हैं।' : 'e.g. We are an auto parts manufacturer with 120 employees running on Tally and Excel. Inventory tracking is manual, and month-end financial close takes over 10 days.'}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--line-strong)', background: 'var(--card)' }}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{hi ? 'उदाहरण आज़माएँ:' : 'Try an example:'}</span>
                <button
                  type="button"
                  onClick={() => setDesc('Midsize precision manufacturing plant with 80 machines, struggling with machine downtime and vendor invoice matching.')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline', padding: 0 }}
                >
                  Industrial Manufacturer
                </button>
                <button
                  type="button"
                  onClick={() => setDesc('Retail chain with 15 stores needing unified inventory, omnichannel billing and automated supplier purchasing.')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline', padding: 0 }}
                >
                  Retail Chain
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>{hi ? 'उद्योग' : 'Industry'}</label>
                <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={{ width: '100%' }}>
                  <option value="manufacturing">Industrial Manufacturing</option>
                  <option value="retail">Retail & E-commerce</option>
                  <option value="wholesale">Wholesale Distribution</option>
                  <option value="life-sciences">Life Sciences & Pharma</option>
                  <option value="services">Professional Services</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>{hi ? 'कंपनी का आकार' : 'Company Size'}</label>
                <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%' }}>
                  <option value="1–50 employees">1–50 employees</option>
                  <option value="51–250 employees">51–250 employees</option>
                  <option value="251–1,000 employees">251–1,000 employees</option>
                  <option value="1,000+ employees">1,000+ employees</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>{hi ? 'मौजूदा सिस्टम' : 'Current Software'}</label>
                <select value={currentSystem} onChange={(e) => setCurrentSystem(e.target.value)} style={{ width: '100%' }}>
                  <option value="Tally / Spreadsheets">Tally / Spreadsheets</option>
                  <option value="Legacy Desktop ERP">Legacy Desktop ERP</option>
                  <option value="SAP / Oracle">SAP / Oracle (Legacy)</option>
                  <option value="Multiple disconnected SaaS">Multiple disconnected tools</option>
                </select>
              </div>
            </div>

            {/* Priorities Chips */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>
                {hi ? 'शीर्ष प्राथमिकताएँ (बहु-चयन)' : 'Top Operational Priorities'}
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  ['close', hi ? 'वित्तीय क्लोज़ तेज़ी' : 'Faster Month-End Close'],
                  ['inventory', hi ? 'इन्वेंटरी सटीकता' : 'Inventory Accuracy'],
                  ['production', hi ? 'शॉप-फ़्लोर ऑटोमेशन' : 'Shop Floor Automation'],
                  ['purchasing', hi ? 'वेंडर इनवॉइस मिलान' : '3-Way Invoice Matching'],
                  ['maintenance', hi ? 'मशीन मेंटेनेंस' : 'Machine Downtime / Maintenance'],
                  ['payroll', hi ? 'पेरोल व हाज़िरी' : 'Automated Payroll'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => togglePriority(id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '999px',
                      border: '1px solid',
                      borderColor: priorities.includes(id) ? 'var(--accent)' : 'var(--line)',
                      background: priorities.includes(id) ? 'var(--accent-tint)' : 'var(--surface)',
                      color: priorities.includes(id) ? 'var(--accent)' : 'var(--text)',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {priorities.includes(id) ? '✓ ' : '+ '}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-lg btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (hi ? 'प्लान बनाया जा रहा है…' : 'Generating Plan…') : (hi ? 'मेरा प्लान बनाएँ' : 'Generate Tailored ERP Plan')}
            </button>
          </form>

          {/* Generated Plan Output */}
          {plan && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span className="pill" style={{ background: '#E3F5EE', color: '#1F7A5C', marginBottom: '8px' }}>
                    {hi ? '✓ सत्यापित AI योजना' : '✓ Verified AI Recommendation'}
                  </span>
                  <h2 className="display-sm" style={{ margin: 0 }}>
                    {hi ? 'आपकी सुझाई गई ERP योजना' : 'Your Tailored Implementation Plan'}
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="btn btn-outline" onClick={handleDownloadPlanTxt}>
                    📄 {hi ? 'प्लान डाउनलोड करें' : 'Download Plan (TXT)'}
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleBookDemoWithPlan}>
                    📅 {hi ? 'इस प्लान के साथ डेमो बुक करें' : 'Book Demo with this Plan'}
                  </button>
                </div>
              </div>

              {/* Package card */}
              <div className="card" style={{ padding: '28px', borderLeft: '6px solid var(--accent)' }}>
                <p className="eyebrow">{hi ? 'अनुशंसित पैकेज' : 'Recommended Package'}</p>
                <h3 className="h2" style={{ textTransform: 'capitalize', color: 'var(--accent)', marginBottom: '8px' }}>
                  {plan.package.replace('-', ' ')}
                </h3>
                <p className="body-lg">{plan.package_reason}</p>
              </div>

              {/* Modules breakdown */}
              <div>
                <h3 className="h3" style={{ marginBottom: '16px' }}>{hi ? 'मॉड्यूल चरणबद्ध कार्यान्वयन' : 'Modules Breakdown by Priority'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  {plan.modules.map((m, idx) => (
                    <div className="card" key={idx} style={{ padding: '20px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          background: m.priority === 'now' ? '#E3F5EE' : m.priority === 'next' ? '#D6DEFB' : '#EEF1F6',
                          color: m.priority === 'now' ? '#1F7A5C' : m.priority === 'next' ? '#2F54EB' : '#5B6478',
                          marginBottom: '8px',
                        }}
                      >
                        {m.priority === 'now' ? 'Start Now' : m.priority === 'next' ? 'Phase 2' : 'Later Phase'}
                      </span>
                      <strong style={{ display: 'block', fontSize: '17px', textTransform: 'capitalize', marginBottom: '6px' }}>
                        {m.id.replace('-', ' ')}
                      </strong>
                      <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{m.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rollout phases */}
              <div className="card" style={{ padding: '28px' }}>
                <h3 className="h3" style={{ marginBottom: '20px' }}>{hi ? 'रोलआउट समय-सीमा' : 'Phased Rollout Timeline'}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {plan.phases.map((ph, pIdx) => (
                    <div key={pIdx} style={{ paddingBottom: '16px', borderBottom: pIdx < plan.phases.length - 1 ? '1px solid var(--line)' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <strong style={{ fontSize: '16px' }}>{ph.title}</strong>
                        <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>{ph.weeks}</span>
                      </div>
                      <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text)', fontSize: '14px' }}>
                        {ph.items.map((it, iIdx) => (
                          <li key={iIdx}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick wins & risks */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div className="card" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--ok)', marginBottom: '12px' }}>{hi ? 'जल्दी मिलने वाले फ़ायदे' : 'Expected Quick Wins'}</h4>
                  <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {plan.quick_wins.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>

                <div className="card" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--warn)', marginBottom: '12px' }}>{hi ? 'जोखिम प्रबंधन व तैयारी' : 'Risks & Key Decisions'}</h4>
                  <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {plan.risks.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="btn-row" style={{ marginTop: '16px' }}>
                <button type="button" className="btn btn-lg btn-primary" onClick={handleBookDemoWithPlan}>
                  {hi ? 'इस प्लान के साथ लाइव डेमो बुक करें' : 'Book a Live Demo with this Plan'}
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-outline"
                  onClick={() => openAssistantWithPrompt(`I have generated an ERP plan for ${plan.package}. What should our team prepare for the demo?`)}
                >
                  {hi ? 'Quanta AI से इस प्लान पर चर्चा करें' : 'Discuss this Plan with Quanta AI'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

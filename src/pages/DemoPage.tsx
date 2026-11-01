import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';

export const DemoPage: React.FC = () => {
  const { lang, queryParams, showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [companySize, setCompanySize] = useState('51–250 employees');
  const [country, setCountry] = useState('India');
  const [selectedModules, setSelectedModules] = useState<string[]>(['finance']);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (queryParams.modules) {
      const list = queryParams.modules.split(',').filter(Boolean);
      if (list.length) setSelectedModules(list);
    }
    if (queryParams.from === 'advisor') {
      const plan = StorageService.getAdvisorPlan();
      if (plan) {
        setMessage(`Tailored Plan from Advisor:\nPackage: ${plan.package}\nModules: ${plan.modules.map((m) => m.id).join(', ')}\n${plan.summary}`);
      }
    }
  }, [queryParams]);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert(lang === 'hi' ? 'कृपया सहमति बॉक्स चुनें।' : 'Please check the consent box.');
      return;
    }
    StorageService.addLead({
      lead_type: 'demo',
      name,
      email,
      company,
      phone,
      company_size: companySize,
      country,
      modules: selectedModules,
      message,
      lang,
    });
    setSubmitted(true);
    showToast(lang === 'hi' ? 'डेमो अनुरोध सफलतापूर्वक दर्ज हुआ!' : 'Demo request successfully received!', 'success');
  };

  const hi = lang === 'hi';

  return (
    <main id="main">
      <section className="hero hero-sub">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill">{hi ? 'लाइव डेमो बुक करें' : 'Book a Live Demo'}</span>
            <h1 className="display-sm">
              {hi ? 'देखें कि Quantinox आपके व्यवसाय को कैसे चलाता है' : 'See Quantinox Cloud ERP Run Your Business'}
            </h1>
            <p className="lead">
              {hi
                ? 'हमारे उत्पाद विशेषज्ञ 30 मिनट में आपके उद्योग परिदृश्यों और चुने हुए मॉड्यूल के साथ लाइव सिस्टम दिखाएँगे।'
                : 'A solution engineer will walk you through the exact modules and workflows relevant to your business.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {submitted ? (
            <div className="card" style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 32px', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E3F5EE', color: '#1F7A5C', display: 'inline-grid', placeItems: 'center', fontSize: '32px', marginBottom: '20px' }}>
                ✓
              </div>
              <h2 className="h2" style={{ marginBottom: '12px' }}>
                {hi ? 'धन्यवाद! आपका अनुरोध प्राप्त हुआ।' : 'Thank You! Your Demo is Requested.'}
              </h2>
              <p style={{ color: 'var(--text)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                {hi
                  ? `हमने ${email} पर पुष्टि भेज दी है। एक कार्यदिवस के भीतर हमारे प्रमाणित सलाहकार मीटिंग लिंक के साथ आपसे संपर्क करेंगे।`
                  : `We have logged your request for ${company || 'your team'}. A dedicated solution architect will follow up at ${email} within one business day.`}
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
              >
                {hi ? 'एक और अनुरोध दर्ज करें' : 'Submit Another Request'}
              </button>
            </div>
          ) : (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'flex-start' }}>
              {/* Form */}
              <form onSubmit={handleSubmit} className="card" style={{ padding: '36px', boxShadow: 'var(--shadow)' }}>
                <h2 className="h3" style={{ marginBottom: '20px' }}>
                  {hi ? 'अपनी संपर्क जानकारी दर्ज करें' : 'Contact Information'}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>{hi ? 'पूरा नाम' : 'Full Name'} *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Verma"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>{hi ? 'कार्य ईमेल' : 'Work Email'} *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@company.com"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>{hi ? 'कंपनी का नाम' : 'Company Name'} *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Verma Logistics Ltd"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>{hi ? 'फ़ोन नंबर' : 'Phone Number'} *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>{hi ? 'कंपनी का आकार' : 'Company Size'}</label>
                    <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} style={{ width: '100%' }}>
                      <option value="1–50 employees">1–50 employees</option>
                      <option value="51–250 employees">51–250 employees</option>
                      <option value="251–1,000 employees">251–1,000 employees</option>
                      <option value="1,000+ employees">1,000+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>{hi ? 'देश / क्षेत्र' : 'Country'}</label>
                    <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%' }}>
                      <option value="India">India</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Modules to focus demo on */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>
                    {hi ? 'डेमो में कौन-से मॉड्यूल देखना चाहते हैं?' : 'Modules to Focus On'}
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                      ['finance', 'Finance'],
                      ['sales', 'Sales & Billing'],
                      ['procurement', 'Procurement'],
                      ['supply-chain', 'Supply Chain'],
                      ['manufacturing', 'Manufacturing'],
                      ['services', 'Services'],
                      ['assets', 'Asset Management'],
                      ['hr', 'People & HR'],
                    ].map(([id, label]) => (
                      <label key={id} className="chip">
                        <input
                          type="checkbox"
                          checked={selectedModules.includes(id)}
                          onChange={() => toggleModule(id)}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>
                    {hi ? 'विशिष्ट आवश्यकताएँ या प्रश्न (वैकल्पिक)' : 'Specific Requirements or Questions (Optional)'}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={hi ? 'उदा: हमें टैली से डेटा माइग्रेशन और GST इनवॉइसिंग पर जानकारी चाहिए।' : 'Tell us about your current software or timeline for evaluation.'}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--muted)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={{ marginTop: '3px' }}
                    />
                    <span>
                      {hi
                        ? 'मैं Quantinox की गोपनीयता नीति और इस अनुरोध के संबंध में संपर्क किए जाने की अनुमति देता हूँ।'
                        : 'I agree to be contacted by Quantinox regarding this demo request in accordance with the Privacy Policy.'}
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-lg btn-primary btn-block">
                  {hi ? 'डेमो का अनुरोध भेजें' : 'Request Tailored Demo'}
                </button>
              </form>

              {/* What to Expect */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="card" style={{ padding: '32px' }}>
                  <h3 className="h3" style={{ marginBottom: '16px' }}>
                    {hi ? 'डेमो सत्र में क्या शामिल होगा?' : 'What to Expect in Your Demo'}
                  </h3>
                  <ul className="bullets" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>
                      <strong>30 Minutes, Focused on You:</strong> We skip generic slides and directly show your selected modules running with realistic company data.
                    </li>
                    <li>
                      <strong>Live Quanta AI Scenarios:</strong> Experience autonomous invoice matching, bank reconciliations, and instant assistant queries.
                    </li>
                    <li>
                      <strong>Migration & Architecture Q&A:</strong> Ask our technical engineers about data migration timelines, security isolation, and API connectors.
                    </li>
                    <li>
                      <strong>Custom Proposal & Sizing:</strong> Receive a clear, transparent per-user cost estimate based strictly on your scope.
                    </li>
                  </ul>
                </div>

                <div className="card-soft" style={{ padding: '24px' }}>
                  <strong style={{ display: 'block', marginBottom: '8px' }}>
                    {hi ? 'सीधे बात करना चाहते हैं?' : 'Prefer to talk immediately?'}
                  </strong>
                  <p style={{ fontSize: '14px', color: 'var(--text)', margin: '0 0 12px' }}>
                    Call our enterprise desk at <strong>+91 98765 43210</strong> or chat live with an advisor.
                  </p>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ textDecoration: 'none' }}
                  >
                    💬 WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

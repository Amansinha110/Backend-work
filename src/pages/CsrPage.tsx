import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storage';
import { 
  Leaf, Heart, GraduationCap, Globe, ShieldCheck, 
  Download, ArrowRight, CheckCircle2, Sparkles, Building, 
  Users, Award, Droplets, Sun, Recycle, Send, AlertCircle
} from 'lucide-react';

export const CsrPage: React.FC = () => {
  const { lang, setPage, showToast, openAssistantWithPrompt } = useApp();
  const hi = lang === 'hi';

  const [grantOrgName, setGrantOrgName] = useState('');
  const [grantContactEmail, setGrantContactEmail] = useState('');
  const [grantCategory, setGrantCategory] = useState('Healthcare & Humanitarian Relief');
  const [grantDetails, setGrantDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const impactMetrics = [
    { value: '42,000+', label: hi ? 'मीट्रिक टन CO₂ की बचत' : 'Metric Tons CO₂ Offset', sub: hi ? 'ग्रीन क्लाउड शेड्यूलिंग द्वारा' : 'Through Carbon-Aware Compute' },
    { value: '100%', label: hi ? 'नवीकरणीय ऊर्जा डेटा केंद्र' : 'Renewable-Powered Infrastructure', sub: hi ? 'सौर व जल विद्युत आधारित' : 'Zero-Carbon Grid Matching' },
    { value: '14,200+', label: hi ? 'छात्रों को STEM छात्रवृत्ति' : 'Students Upskilled & Certified', sub: hi ? 'टियर-2/3 ग्रामीण युवा' : 'Quantinox Tech Scholars Program' },
    { value: '120+', label: hi ? 'NGOs को मुफ़्त Cloud ERP' : 'Non-Profits & NGOs Supported', sub: hi ? 'स्वास्थ्य व आपदा राहत केंद्र' : '100% Pro-Bono Cloud Licenses' },
    { value: '18,500+', label: hi ? 'घंटे कर्मचारी स्वयंसेवा' : 'Employee Volunteer Hours', sub: hi ? 'सामुदायिक विकास परियोजनाओं में' : 'Hands-on Grassroots Impact' },
  ];

  const sustainabilityPillars = [
    {
      icon: Sun,
      title: hi ? 'कार्बन-सचेत क्लाउड कंप्यूटिंग' : 'Carbon-Aware Cloud Architecture',
      desc: hi 
        ? 'हम भारी बैच व सिमुलेशन कार्यों को केवल उन क्षेत्रों में चलाते हैं जहाँ उस समय सौर या पवन ऊर्जा का उत्पादन चरम पर होता है।'
        : 'Our distributed workload scheduler shifts heavy ERP simulations and MRP crunching dynamically to cloud regions with maximum surplus solar and wind generation.'
    },
    {
      icon: Leaf,
      title: hi ? 'स्कोप 1, 2 व 3 एमिशन लेज़र' : 'Scope 1, 2 & 3 Emission Ledgers',
      desc: hi
        ? 'Quantinox ERP में कार्बन फुटप्रिंट ट्रैकिंग इनबिल्ट है, जिससे 1,800+ विनिर्माता अपनी आपूर्ति श्रृंखला में ग्रीनहाउस गैस उत्सर्जन को माप और घटा सकते हैं।'
        : 'Every purchase order, freight movement, and shopfloor machine run calculates its embedded CO₂ footprint down to the gram, enabling rigorous ESG auditing.'
    },
    {
      icon: Recycle,
      title: hi ? 'जीरो ई-कचरा व सर्कुलर हार्डवेयर' : 'Zero E-Waste & Circular Lifecycle',
      desc: hi
        ? 'हमारे सभी पुराने सर्वर, IoT गेटवे और औद्योगिक सेंसर प्रमाणित सर्कुलर रिसाइकलरों को सौंपे जाते हैं, जिससे लैंडफिल में शून्य कचरा जाता है।'
        : 'We partner with certified circular electronics recyclers to repurpose, refurbish, and responsibly harvest retired hardware components with zero landfill footprint.'
    }
  ];

  const communityPillars = [
    {
      icon: GraduationCap,
      title: hi ? 'Quantinox टेक स्कॉलर्स फ़ेलोशिप' : 'Quantinox Tech Scholars Fellowship',
      desc: hi
        ? 'ग्रामीण और छोटे शहरों के इंजीनियरिंग छात्रों को मुफ़्त में क्लाउड आर्किटेक्चर, आधुनिक ERP कोडिंग और AI सिस्टम्स का प्रशिक्षण और वजीफा देते हैं।'
        : 'Annual multi-million rupee endowment offering fully funded scholarships, hands-on enterprise software apprenticeships, and placement mentorship for underserved rural youth.'
    },
    {
      icon: Heart,
      title: hi ? 'गैर-लाभकारी अस्पतालों को मुफ़्त ERP' : 'Pro-Bono Humanitarian Cloud ERP',
      desc: hi
        ? 'दूरदराज के धर्मार्थ अस्पतालों, आपदा राहत संगठनों और दवा वितरण टीमों को 100% निःशुल्क एंटरप्राइज़ लाइसेंस और 24/7 सहायता प्रदान करते हैं।'
        : 'Non-profit healthcare networks, community food banks, and disaster relief fleets receive complimentary Enterprise-tier licenses, dedicated onboarding, and zero subscription fees.'
    },
    {
      icon: Building,
      title: hi ? 'ग्रामीण कुटीर व MSME उद्योग सशक्तिकरण' : 'Rural Artisan & MSME Enablement',
      desc: hi
        ? 'पारंपरिक कारीगर सहकारी समितियों और छोटे विनिर्माताओं को कागज़ी रिकॉर्ड से डिजिटल, GST-अनुपालक प्रणाली पर लाने के लिए मुफ़्त सॉफ्टवेयर और सहायता।'
        : 'Empowering cottage industry cooperatives, handloom clusters, and micro-manufacturers with zero-cost inventory systems, direct bank payouts, and digital fair-trade certification.'
    }
  ];

  const impactStories = [
    {
      title: hi ? 'सेवा हेल्थ नेटवर्क (हिमालयी ज़िले)' : 'Seva Remote Health Network (Himalayan Belt)',
      impact: hi ? '450,000+ टीकों का रीयल-टाइम कोल्ड-चेन वितरण' : '450,000+ Vaccines Tracked with Cold-Chain Integrity',
      desc: hi
        ? 'दूरदराज के पहाड़ी क्षेत्रों में टीकों के तापमान और स्टॉक को Quantinox मोबाइल मॉड्यूल द्वारा ट्रैक किया गया, जिससे दवाइयों की बर्बादी शून्य हो गई।'
        : 'Equipped mobile health vans and remote mountain clinics with offline-first IoT temperature monitors and inventory dispatch, eliminating vaccine spoilage entirely across 32 clinics.'
    },
    {
      title: hi ? 'ग्रीनवेव बुनकर सहकारी समिति' : 'GreenWeave Artisans Cooperative',
      impact: hi ? '1,200 ग्रामीण बुनकरों को सीधा बैंक भुगतान' : '1,200 Handloom Weavers Paid Directly Without Middlemen',
      desc: hi
        ? 'बिचौलियों को हटाकर कारीगरों को उनके तैयार कपड़ों का सटीक हिसाब और रीयल-टाइम बैंक खाते में भुगतान सुनिश्चित किया गया।'
        : 'Replaced exploitative middleman commission books with transparent barcode tracking at local collection centers, boosting artisan take-home income by 34%.'
    },
    {
      title: hi ? 'जलधारा जल संरक्षण फ़ाउंडेशन' : 'JalDhara Watershed Conservation',
      impact: hi ? '80 सूखा-संभावित गाँवों में जल आपूर्ति प्रबंधन' : '80 Drought-Prone Villages Managed Water Infrastructure',
      desc: hi
        ? 'चेक-डैम निर्माण, पाइपलाइन सामग्री खरीद और सामुदायिक रखरखाव का पूरा लेखा-जोखा पारदर्शी रूप से संचालित हुआ।'
        : 'Streamlined civil pipeline procurement, contractor milestone payments, and pump telemetry across 80 drought-affected agrarian hamlets with 100% donor audit transparency.'
    }
  ];

  const handleDownloadReport = () => {
    // Generate simulated PDF download
    const reportData = `QUANTINOX IT TECHNOLOGY - ANNUAL CSR & ESG SUSTAINABILITY REPORT 2025-2026\n\n` +
      `Global Stewardship & Community Impact Summary:\n` +
      `- Carbon Offset: 42,000+ Metric Tons CO2 via Carbon-Aware Compute\n` +
      `- Data Centers: 100% Renewable-Powered Tier-4 Green Facilities\n` +
      `- Students Upskilled: 14,200+ via Quantinox Tech Scholars Program\n` +
      `- Pro-Bono ERP Licenses: 120+ Healthcare & Humanitarian NGOs\n` +
      `- Volunteer Hours: 18,500+ Hours Donated by Quantinox Engineers\n\n` +
      `Ethical AI Charter: Zero Private Customer Data Used in Model Training. 100% Cryptographic Ledger Isolation.\n\n` +
      `Quantinox Corporate Social Responsibility Foundation, Bandra Kurla Complex, Mumbai 400051.`;
    
    const blob = new Blob([reportData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Quantinox-Annual-CSR-ESG-Report-2025-2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(hi ? 'CSR रिपोर्ट सफलतापूर्वक डाउनलोड हो गई!' : 'Annual CSR & ESG Report downloaded successfully!', 'success');
  };

  const handleGrantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantOrgName.trim() || !grantContactEmail.trim()) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    storageService.addLead({
      name: grantOrgName,
      company: grantOrgName,
      email: grantContactEmail,
      lead_type: 'contact',
      status: 'new',
      notes: `[CSR Grant Application] Category: ${grantCategory} | Details: ${grantDetails}`,
      score: 80,
      lang,
    });

    setSubmitted(true);
    showToast(hi ? 'आवेदन प्राप्त हुआ! हमारी CSR टीम जल्द संपर्क करेगी।' : 'Application received! Our CSR Foundation team will reach out within 48 hours.', 'success');
  };

  return (
    <div className="csr-page" style={{ paddingBottom: '80px' }}>
      {/* Hero Section */}
      <section className="section" style={{ background: 'var(--surface)', padding: '64px 0 48px', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
            <div className="pill" style={{ marginBottom: '16px', display: 'inline-flex', background: 'rgba(31, 122, 92, 0.1)', color: 'var(--ok)' }}>
              <Leaf size={14} /> {hi ? 'सस्टेनेबिलिटी व सामाजिक उत्तरदायित्व' : 'Corporate Social Responsibility & ESG'}
            </div>
            <h1 style={{ fontSize: '42px', lineHeight: 1.2, marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              {hi 
                ? 'सतत प्रौद्योगिकी और सामाजिक समानता का निर्माण' 
                : 'Pioneering Green Enterprise Cloud & Grassroots Community Equity'}
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '32px' }}>
              {hi
                ? 'Quantinox IT Technology का मानना है कि उच्च-प्रदर्शन एंटरप्राइज़ कंप्यूटिंग को पृथ्वी के पर्यावरण की रक्षा करनी चाहिए और समाज के हर वर्ग को आगे बढ़ाना चाहिए। जानिए हमारे कार्बन-न्यूट्रल क्लाउड, STEM शिक्षा स्कॉलरशिप और मुफ़्त NGO ERP कार्यक्रमों के बारे में।'
                : 'At Quantinox, we believe mission-critical enterprise systems must protect our planet and empower the communities where we operate. We dedicate 2% of cloud engineering capacity and corporate profits to carbon reduction, rural STEM education, and pro-bono healthcare ERP infrastructure.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button onClick={handleDownloadReport} className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={16} /> {hi ? 'वार्षिक CSR रिपोर्ट डाउनलोड करें' : 'Download Annual CSR Report'}
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('grant-application');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="btn btn-outline" 
                style={{ padding: '12px 24px', fontSize: '15px' }}
              >
                {hi ? 'मुफ़्त NGO लाइसेंस के लिए आवेदन' : 'Apply for NGO ERP Grant'}
              </button>
            </div>
          </div>

          {/* Impact Metrics Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '56px',
            padding: '28px 32px',
            background: 'var(--card)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid var(--line)'
          }}>
            {impactMetrics.map((m, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--ok)', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 600, marginBottom: '4px' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLAR 1: ENVIRONMENTAL SUSTAINABILITY */}
      <section className="section" style={{ padding: '64px 0 48px' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 48px', textAlign: 'center' }}>
            <div className="eyebrow" style={{ color: 'var(--ok)' }}>{hi ? 'पर्यावरण संरक्षण' : 'Environmental Stewardship'}</div>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>
              {hi ? 'कार्बन-न्यूट्रल क्लाउड और टिकाऊ विनिर्माण' : 'Carbon-Neutral Cloud Computing & Circular Supply Chains'}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
              {hi
                ? 'हमारा क्लाउड इंफ्रास्ट्रक्चर 100% नवीकरणीय ऊर्जा पर संचालित होता है और हमारे ERP टूल्स व्यवसायों को अपने उत्सर्जन को मापने और कम करने में मदद करते हैं।'
                : 'Modern ERP computing should not cost the Earth. We engineer hardware efficiency, dynamic solar-following job dispatch, and embedded carbon accounting into the core product.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {sustainabilityPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(31, 122, 92, 0.1)',
                      color: 'var(--ok)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}>
                      <Icon size={24} />
                    </div>
                    <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>{p.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PILLAR 2: COMMUNITY INVOLVEMENT & HUMANITARIAN ACTION */}
      <section className="section" style={{ background: 'var(--surface)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 48px', textAlign: 'center' }}>
            <div className="eyebrow" style={{ color: 'var(--accent)' }}>{hi ? 'सामुदायिक उत्थान' : 'Grassroots Community Involvement'}</div>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>
              {hi ? 'शिक्षा, स्वास्थ्य और ग्रामीण विकास में सक्रिय सहभागिता' : 'STEM Education, Rural Artisans & Humanitarian Relief'}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
              {hi
                ? 'प्रौद्योगिकी का असली उद्देश्य उन लोगों तक पहुँचना है जिन्हें इसकी सबसे अधिक आवश्यकता है। जानिए हमारे सामाजिक कार्यक्रमों के बारे में।'
                : 'Through employee volunteer sabbaticals, direct financial endowments, and software donation, we eliminate digital inequality in healthcare and vocational education.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            {communityPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'var(--accent-tint)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px'
                    }}>
                      <Icon size={24} />
                    </div>
                    <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--ink)' }}>{p.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPACT STORIES SPOTLIGHT */}
      <section className="section" style={{ padding: '64px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 48px', textAlign: 'center' }}>
            <div className="eyebrow">{hi ? 'मैदानी परिणाम' : 'Field Stories & Real Impact'}</div>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>
              {hi ? 'ज़मीनी स्तर पर सकारात्मक बदलाव' : 'How Quantinox Pro-Bono ERP Changes Lives'}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
              {hi
                ? 'देखें कि कैसे गैर-लाभकारी संस्थाएँ और सहकारी समितियाँ बिना किसी सॉफ़्टवेयर शुल्क के आधुनिक ERP का उपयोग कर रही हैं।'
                : 'Real non-profit and humanitarian organizations leveraging our sovereign cloud tools to save lives, distribute medicines, and pay rural weavers on time.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {impactStories.map((story, idx) => (
              <div key={idx} className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--ok)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                    {hi ? 'सत्यापित प्रभाव' : 'Verified Social Impact'}
                  </div>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px', color: 'var(--ink)' }}>{story.title}</h3>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent)', marginBottom: '14px' }}>
                    {story.impact}
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
                    {story.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRANT APPLICATION FORM SECTION */}
      <section id="grant-application" className="section" style={{ background: 'var(--surface)', padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="card" style={{ padding: '40px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-soft)' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div className="pill" style={{ marginBottom: '12px', display: 'inline-flex' }}>
                <Heart size={14} /> {hi ? 'अनुदान आवेदन' : 'Pro-Bono Software & Endowment Grants'}
              </div>
              <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>
                {hi ? 'मुफ़्त Cloud ERP या छात्रवृत्ति हेतु आवेदन करें' : 'Apply for Non-Profit ERP Licenses or STEM Grants'}
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
                {hi
                  ? 'यदि आप एक पंजीकृत गैर-लाभकारी अस्पताल, धर्मार्थ संस्था या शैक्षणिक संस्थान हैं, तो हमारी CSR टीम से जुड़ें।'
                  : 'Eligible 501(c)(3) or Section 8 NGOs, charitable rural clinics, and public vocational colleges receive 100% waived subscription and onboarding fees.'}
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <CheckCircle2 size={56} style={{ color: 'var(--ok)', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>{hi ? 'आवेदन सफलतापूर्वक दर्ज हुआ' : 'Application Received'}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '24px' }}>
                  {hi
                    ? 'हमारी सामाजिक उत्तरदायित्व समिति 48 कार्य घंटों के भीतर आपसे संपर्क करेगी।'
                    : 'Our CSR Foundation Committee reviews submissions weekly. An architect will reach out within 2 business days.'}
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                  {hi ? 'अन्य आवेदन दर्ज करें' : 'Submit Another Request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleGrantSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    {hi ? 'संस्था या ट्रस्ट का नाम *' : 'Organization or Trust Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rural Healthcare Foundation"
                    value={grantOrgName}
                    onChange={(e) => setGrantOrgName(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--surface-2)', fontSize: '15px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    {hi ? 'प्राधिकृत संपर्क ईमेल *' : 'Authorized Contact Work Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="director@foundation.org"
                    value={grantContactEmail}
                    onChange={(e) => setGrantContactEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--surface-2)', fontSize: '15px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    {hi ? 'सहायता की श्रेणी' : 'Grant Category Requested'}
                  </label>
                  <select
                    value={grantCategory}
                    onChange={(e) => setGrantCategory(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--surface-2)', fontSize: '15px' }}
                  >
                    <option value="Healthcare & Humanitarian Relief">Healthcare & Mobile Medical Relief Fleet</option>
                    <option value="Rural Artisans & Micro-Enterprise">Rural Artisan / Handloom Cooperative</option>
                    <option value="STEM Education & Student Fellowships">STEM Student Coding & ERP Fellowship</option>
                    <option value="Water & Environmental Conservation">Water & Ecological Conservation Watershed</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    {hi ? 'परियोजना का संक्षिप्त विवरण व उद्देश्य' : 'Project Summary & Beneficiary Scope'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current operations, beneficiaries served, and how cloud ERP automation will help..."
                    value={grantDetails}
                    onChange={(e) => setGrantDetails(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--surface-2)', fontSize: '15px', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  <Send size={16} /> {hi ? 'अनुदान प्रस्ताव जमा करें' : 'Submit Grant Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FINAL INVITATION CTA */}
      <section className="section" style={{ background: 'var(--ink)', color: '#FFFFFF', padding: '64px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <h2 style={{ fontSize: '36px', color: '#FFFFFF', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
            {hi ? 'सतत भविष्य के निर्माण में हमारे साझीदार बनें' : 'Partner with Quantinox for Sustainable Future Operations'}
          </h2>
          <p style={{ color: '#A9B2C7', fontSize: '17px', lineHeight: 1.6, marginBottom: '32px' }}>
            {hi
              ? 'चाहे आप अपने विनिर्माण संयंत्र के कार्बन उत्सर्जन को घटाना चाहते हों या हमारी सामुदायिक पहलों में भाग लेना चाहते हों, हम आपके साथ हैं।'
              : 'Whether you want to baseline and audit Scope 1-3 carbon emissions in your supply chain or collaborate on rural vocational STEM training, our sustainability architects are ready.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => setPage('contact')} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
              {hi ? 'CSR टीम से संपर्क करें' : 'Contact CSR Foundation Desk'}
            </button>
            <button 
              onClick={() => openAssistantWithPrompt(hi ? 'Quantinox की सस्टेनेबिलिटी और CSR पहलों के बारे में विस्तार से बताएं' : 'Explain Quantinox CSR initiatives, green cloud architecture, and STEM grants')} 
              className="btn btn-outline" 
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)', padding: '14px 28px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Sparkles size={16} /> {hi ? 'Quanta AI से पूछें' : 'Query Quanta AI on CSR'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CsrPage;

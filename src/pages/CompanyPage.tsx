import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, ShieldCheck, Award, Globe, Users, 
  MapPin, Phone, Mail, ArrowRight, CheckCircle2, 
  TrendingUp, Sparkles, Lock, Cpu, Server, FileText,
  ChevronRight, Calendar, HeartHandshake, Leaf, Briefcase
} from 'lucide-react';

export const CompanyPage: React.FC = () => {
  const { lang, setPage, openAssistantWithPrompt } = useApp();
  const hi = lang === 'hi';

  const [activeTab, setActiveTab] = useState<'overview' | 'story' | 'leadership' | 'locations' | 'trust' | 'careers'>('overview');

  const stats = [
    { value: '42+', label: hi ? 'देशों में सक्रिय ग्राहक' : 'Countries with Active Deployments' },
    { value: '1,800+', label: hi ? 'एंटरप्राइज़ कंपनियाँ' : 'Enterprise Customers' },
    { value: '99.99%', label: hi ? 'वित्तीय क्लाउड SLA' : 'Financial Ledger SLA Uptime' },
    { value: '90 Days', label: hi ? 'गारंटीड गो-लाइव माइलस्टोन' : 'Guaranteed Go-Live Deployment' },
    { value: '0%', label: hi ? 'AI डेटा लीकेज की गारंटी' : 'Model Training Data Leakage' },
  ];

  const leadership = [
    {
      name: 'Aman Sinha',
      role: hi ? 'चीफ़ एग्जीक्यूटिव ऑफिसर व सह-संस्थापक' : 'Chief Executive Officer & Co-Founder',
      pedigree: 'Ex-Industrial Automation Systems Architect, 16+ yrs in Enterprise Software',
      bio: hi 
        ? 'अमन ने जटिल विनिर्माण और सप्लाई चेन में पुराने लीगेसी ERP की कमियों को दूर करने के लिए Quantinox की स्थापना की।'
        : 'Aman founded Quantinox to eliminate multi-year implementation bloat and rigid customization lock-in in discrete manufacturing and distributed supply chains.',
      focus: hi ? 'कंपनी रणनीति, उत्पाद दूरदर्शिता व ग्लोबल पार्टनरशिप' : 'Corporate Strategy, Product Architecture & Global Strategic Alliances',
      initials: 'AS'
    },
    {
      name: 'Dr. Priya Ramanathan',
      role: hi ? 'चीफ़ टेक्नोलॉजी ऑफिसर' : 'Chief Technology Officer',
      pedigree: 'PhD in Distributed Systems & Concurrency, Former Principal Cloud Infrastructure Architect',
      bio: hi
        ? 'प्रिया Quanta ऑटोनॉमस एजेंट आर्किटेक्चर और सब-सेकंड डबल-एंट्री लेज़र इंजन की प्रमुख वास्तुकार हैं।'
        : 'Priya leads engineering of the real-time double-entry engine and deterministic multi-agent Quanta AI frameworks.',
      focus: hi ? 'डिस्ट्रिब्यूटेड लेज़र कोर, कोर AI अनुसंधान व स्केलेबिलिटी' : 'Core Distributed Ledger, Autonomous Agents & Sovereign Cloud IAC',
      initials: 'PR'
    },
    {
      name: 'Marcus Vance',
      role: hi ? 'चीफ़ फ़ाइनेंशियल ऑफिसर' : 'Chief Financial Officer & Governance Lead',
      pedigree: 'FCA, Former Big-4 ERP Transformation Audit Partner, 20+ yrs Corporate Finance',
      bio: hi
        ? 'मार्कस वैश्विक बहु-मुद्रा समेकन, IFRS/GAAP सांविधिक अनुपालन और रिस्क गवर्नेंस के विशेषज्ञ हैं।'
        : 'Marcus directs corporate financial controls, statutory consolidation engines across 14 currencies, and investor relations.',
      focus: hi ? 'फाइनेंस आर्किटेक्चर, कॉर्पोरेट गवर्नेंस व IFRS/GST कंप्लायंस' : 'Statutory Accounting Engines, Enterprise Risk & Capital Strategy',
      initials: 'MV'
    },
    {
      name: 'Elena Rostova',
      role: hi ? 'उपाध्यक्ष, उत्पाद व रेगुलेटरी कंप्लायंस' : 'VP of Product & Regulatory Compliance',
      pedigree: 'Biomedical Systems Validation Director, FDA 21 CFR Part 11 & GAMP5 Auditor',
      bio: hi
        ? 'ऐलेना फार्मास्युटिकल, बायोफार्मा और मेडिकल डिवाइसेज के लिए इलेक्ट्रॉनिक बैच रिकॉर्ड्स व ऑडिट ट्रेल्स की सुरक्षा सुनिश्चित करती हैं।'
        : 'Elena oversees product regulatory assurance for life sciences, cold chain validation, and computer systems compliance.',
      focus: hi ? 'लाइफ़ साइंसेज कंप्लायंस, CSV और क्वालिटी मैनेजमेंट' : 'Life Sciences CSV, Quality Assurance & FDA 21 CFR Part 11 Validation',
      initials: 'ER'
    },
    {
      name: 'Vikramaditya Sen',
      role: hi ? 'उपाध्यक्ष, कोर सिस्टम्स व क्लाउड इंफ्रास्ट्रक्चर' : 'VP of Core Systems & Cloud Infrastructure',
      pedigree: 'Ex-High-Frequency Trading Network Architect, Specialist in Zero-Downtime High Availability',
      bio: hi
        ? 'विक्रमादित्य 99.99% अपटाइम SLA के साथ मल्टी-रीजन एक्टिव-एक्टिव डेटाबेस क्लस्टर्स का संचालन करते हैं।'
        : 'Vikramaditya designs zero-jitter multi-tenant isolation, automated disaster failover, and millisecond database replication.',
      focus: hi ? 'क्लाउड अपटाइम, सुरक्षा प्रमाणीकरण व आपदा रिकवरी' : 'Cloud Architecture, 99.99% Availability & Disaster Recovery Topology',
      initials: 'VS'
    },
    {
      name: 'Sunil Mehta',
      role: hi ? 'उपाध्यक्ष, ग्राहक सफलता व समाधान वास्तुकला' : 'VP of Customer Success & Solutions Architecture',
      pedigree: 'Certified Enterprise Architect with 140+ Fortune 500 ERP Implementations',
      bio: hi
        ? 'सुनील हमारे समर्पित प्रिंसिपल सॉल्यूशन आर्किटेक्ट्स का नेतृत्व करते हैं जो 90-दिवसीय सफल गो-लाइव की गारंटी देते हैं।'
        : 'Sunil heads the Principal Solutions Architecture team responsible for on-time, fixed-budget 90-day enterprise deployments.',
      focus: hi ? '90-दिवसीय माइलस्टोन डिलीवरी, चेंज मैनेजमेंट व अपस्किलिंग' : '90-Day Implementation Milestone, Change Enablement & Value Realization',
      initials: 'SM'
    }
  ];

  const milestones = [
    {
      year: '2019',
      title: hi ? 'स्थापना व आर्किटेक्चर अनुसंधान' : 'Founding & Sub-Second Core Ledger R&D',
      desc: hi 
        ? 'मुंबई में स्थापना। पारंपरिक बैच-प्रोसेसिंग को समाप्त करने के लिए इवेंट-संचालित डबल-एंट्री लेज़र का पहला प्रोटोटाइप तैयार हुआ।'
        : 'Founded in Mumbai. Engineers set out to solve the root problem of enterprise software: eliminating batch reconciliations with an event-driven transactional core.'
    },
    {
      year: '2021',
      title: hi ? '100वें मैन्युफ़ैक्चरिंग प्लांट का गो-लाइव' : 'First 100 Manufacturing Plants Go Live',
      desc: hi 
        ? 'ऑटोमोटिव और हैवी इंजीनियरिंग क्षेत्र में 100 से अधिक औद्योगिक कारखानों ने SAP व पुराने सिस्टम से Quantinox MES को अपनाया।'
        : 'Crossed 100 discrete manufacturing deployments across automotive components, heavy tooling, and chemical processing facilities in APAC.'
    },
    {
      year: '2022',
      title: hi ? 'यूरोपीय मुख्यालय व ISO 27001 सर्टिफिकेशन' : 'European Expansion & ISO 27001 / SOC 2 Type II',
      desc: hi 
        ? 'लंदन (Bishopsgate) में क्षेत्रीय कार्यालय का उद्घाटन। वैश्विक सुरक्षा प्रमाणन और GDPR अनुपालन मानकों को प्राप्त किया।'
        : 'Opened London headquarters for EMEA operations. Earned ISO/IEC 27001:2022 and SOC 2 Type II compliance reports with zero exceptions.'
    },
    {
      year: '2023',
      title: hi ? 'Quanta AI ऑटोनॉमस एजेंटों का शुभारंभ' : 'Launch of Quanta Autonomous Agents',
      desc: hi 
        ? 'वित्तीय क्लोजिंग, डिमांड प्लानिंग और परचेज 3-वे मैचिंग को स्वचालित करने वाले Quanta एजेंटों की घोषणा। FDA 21 CFR Part 11 कंप्लायंस शामिल।'
        : 'Introduced sovereign, domain-specialized Quanta AI agents for continuous accounting close, supplier invoice matching, and shopfloor predictive maintenance.'
    },
    {
      year: '2024',
      title: hi ? 'सिलिकॉन वैली टेक सेंटर व 1,800+ ग्राहक' : 'Silicon Valley Tech Center & 42-Country Scale',
      desc: hi 
        ? 'सैन जोस (कैलिफ़ोर्निया) में अनुसंधान केंद्र की स्थापना। 42 देशों में 1,800 से अधिक सक्रिय एंटरप्राइज़ टेनेंट्स का विस्तार।'
        : 'Established North American R&D Center in San Jose, CA. Expanded footprint to 42 countries across North America, Europe, Middle East, and APAC.'
    },
    {
      year: '2025–2026',
      title: hi ? 'ऑटोनॉमस एंटरप्राइज़ का नया युग' : 'The Autonomous Enterprise Era',
      desc: hi 
        ? 'शॉप-फ्लोर IoT टेलीमेट्री और स्वचालित 48-घंटे की मासिक क्लोजिंग का वैश्विक मानक।'
        : 'Setting the gold standard for zero-latency business operations: financial close within 48 hours and sub-second shopfloor IoT synchronization.'
    }
  ];

  const offices = [
    {
      city: 'Mumbai, India',
      label: hi ? 'वैश्विक मुख्यालय व R&D सेंटर' : 'Global Corporate Headquarters & Core R&D',
      address: 'Quantinox Tower, Bandra Kurla Complex (BKC), G Block, Mumbai, Maharashtra 400051',
      phone: '+91 22 4900 8800',
      email: 'hq@quantinox.com',
      teams: hi ? 'एग्जीक्यूटिव लीडरशिप, कोर लेज़र इंजीनियरिंग, ग्लोबल NOC सहायता' : 'Executive Leadership, Distributed Ledger Engineering, 24/7 Global NOC'
    },
    {
      city: 'San Jose, CA, USA',
      label: hi ? 'उत्तरी अमेरिका टेक्नोलॉजी सेंटर' : 'North America Technology & AI Systems Center',
      address: '333 W San Carlos St, Suite 600, San Jose, CA 95110',
      phone: '+1 (408) 555-0199',
      email: 'us@quantinox.com',
      teams: hi ? 'Quanta AI अनुसंधान, एंटरप्राइज़ समाधान वास्तुकला' : 'Quanta AI Agent Research, North American Client Architecture, Alliance Alliances'
    },
    {
      city: 'London, United Kingdom',
      label: hi ? 'यूरोप, मध्य-पूर्व व अफ्रीका (EMEA) कार्यालय' : 'EMEA Regional Headquarters',
      address: '100 Bishopsgate, 19th Floor, London EC2N 4AG',
      phone: '+44 20 7946 0912',
      email: 'emea@quantinox.com',
      teams: hi ? 'IFRS/VAT टैक्स अनुपालन, यूरोपीय फील्ड ऑपरेशंस' : 'IFRS / VAT Statutory Engines, European Implementation Architecture, Enterprise Sales'
    },
    {
      city: 'Singapore',
      label: hi ? 'एशिया-प्रशांत लॉजिस्टिक्स हब' : 'Asia-Pacific Regional Hub',
      address: 'Marina Bay Financial Centre, Tower 2, Singapore 018983',
      phone: '+65 6800 9100',
      email: 'apac@quantinox.com',
      teams: hi ? 'ASEAN क्रॉस-बॉर्डर ट्रेड, 3PL और सप्लाई चेन हब' : 'Cross-Border ASEAN Trade Compliance, Multi-Modal Freight Logistics & Support'
    }
  ];

  const principles = [
    {
      icon: TrendingUp,
      title: hi ? 'जीरो-बैच बिज़नेस ट्रुथ' : 'Zero-Batch Business Truth',
      desc: hi
        ? 'हम रात के बैच प्रोसेस और एक्सेल की मैनुअल स्प्रेडशीट पर निर्भरता खत्म करते हैं। हर लेन-देन वास्तविक समय में पूरे एंटरप्राइज़ में सिंक होता है।'
        : 'Traditional ERPs force businesses to wait overnight for batch jobs. Quantinox streams transactions through an in-memory double-entry ledger instantaneously.'
    },
    {
      icon: Lock,
      title: hi ? 'सॉवरेन डेटा आइसोलेशन' : 'Cryptographic Data Sovereignty',
      desc: hi
        ? 'आपका डेटा केवल आपका है। हम कड़े अनुबंध के साथ गारंटी देते हैं कि आपका बिज़नेस डेटा कभी भी किसी सार्वजनिक AI मॉडल की ट्रेनिंग में उपयोग नहीं होगा।'
        : 'Every customer tenant operates in cryptographically separated, single-tenant or isolated multi-tenant enclaves. No customer data ever trains foundation AI models.'
    },
    {
      icon: Cpu,
      title: hi ? 'प्रैग्मैटिक ऑटोनॉमस एजेंट' : 'Deterministic Pragmatic AI',
      desc: hi
        ? 'काल्पनिक या भ्रामक चैटबॉट नहीं — Quanta एजेंट पूर्व-निर्धारित वित्तीय नियमों, दोहरे सत्यापन और ऑडिट ट्रेल्स के तहत काम करते हैं।'
        : 'No ungrounded AI hallucination. Quanta agents operate strictly inside verified chart-of-accounts schemas with double-approval escalation gates.'
    },
    {
      icon: HeartHandshake,
      title: hi ? 'पारदर्शी 90-दिवसीय डिलीवरी' : 'Guaranteed 90-Day Implementation',
      desc: hi
        ? 'सालों तक चलने वाले अनिश्चित कंसल्टिंग बिलों के बजाय, हमारे प्रिंसिपल आर्किटेक्ट निश्चित समयसीमा और स्पष्ट बजट में सिस्टम लाइव करते हैं।'
        : 'Enterprise implementations should not take three years. We pair every customer with a Principal Solutions Architect for a guaranteed 90-day go-live milestone.'
    }
  ];

  return (
    <div className="company-page" style={{ paddingBottom: '80px' }}>
      {/* Hero Section */}
      <section className="section" style={{ background: 'var(--surface)', padding: '60px 0 40px', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <div className="pill" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <Building2 size={14} /> {hi ? 'कंपनी की रूपरेखा व इतिहास' : 'Enterprise Heritage & Global Mission'}
            </div>
            <h1 style={{ fontSize: '44px', lineHeight: 1.2, marginBottom: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              {hi 
                ? 'स्वायत्त व आधुनिक औद्योगिक उद्यमों के लिए निर्मित Cloud ERP' 
                : 'Engineering Sovereign Cloud ERP for Global Autonomous Industry'}
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '32px' }}>
              {hi
                ? 'Quantinox IT Technology की स्थापना दशकों पुराने लीगेसी ERP सिस्टम्स के जटिल कस्टमाइज़ेशन, धीमे कार्यान्वयन और बिखरे हुए डेटा साइलोज़ को हमेशा के लिए समाप्त करने के उद्देश्य से की गई थी।'
                : 'Quantinox IT Technology was engineered to end multi-year implementation bloat, punitive user license taxes, and fragmented data silos. Today, we power over 1,800 mission-critical manufacturing and enterprise conglomerates worldwide.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button onClick={() => setPage('demo')} className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '15px' }}>
                {hi ? 'एग्जीक्यूटिव ब्रीफ़िंग बुक करें' : 'Schedule Executive Briefing'}
              </button>
              <button 
                onClick={() => openAssistantWithPrompt(hi ? 'Quantinox कंपनी की मुख्य विशेषताओं और आर्किटेक्चर के बारे में बताएं' : 'Tell me about Quantinox IT Technology history, leadership and enterprise architecture')} 
                className="btn btn-outline" 
                style={{ padding: '12px 24px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Sparkles size={16} /> {hi ? 'Quanta AI से पूछें' : 'Ask Quanta AI About Quantinox'}
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            marginTop: '56px',
            padding: '24px 32px',
            background: 'var(--card)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid var(--line)'
          }}>
            {stats.map((s, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anchor Navigation Bar */}
      <div style={{
        position: 'sticky',
        top: '72px',
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--line)',
        padding: '8px 0'
      }}>
        <div className="container" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'overview', label: hi ? 'कंपनी अवलोकन' : 'Overview & Principles' },
            { id: 'story', label: hi ? 'इतिहास व माइलस्टोन्स' : 'Our Story & Milestones' },
            { id: 'leadership', label: hi ? 'नेतृत्व व बोर्ड' : 'Leadership & Board' },
            { id: 'locations', label: hi ? 'वैश्विक केंद्र व कार्यालय' : 'Global Presence & Offices' },
            { id: 'trust', label: hi ? 'ट्रस्ट व सुरक्षा सर्टिफिकेशन' : 'Trust, Security & ESG' },
            { id: 'careers', label: hi ? 'करियर व संस्कृति' : 'Careers & Culture' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                const el = document.getElementById(tab.id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--text)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: OVERVIEW & OPERATING PRINCIPLES */}
      <section id="overview" className="section" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <div style={{ maxWidth: '780px', margin: '0 auto 40px', textAlign: 'center' }}>
            <div className="eyebrow">{hi ? 'हमारा ध्येय' : 'Core Operating Creed'}</div>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>
              {hi ? 'व्यवसाय संचालन के मौलिक सिद्धांत' : 'Engineered on Principles of Precision & Autonomy'}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
              {hi
                ? 'हम सॉफ्टवेयर को केवल रिकॉर्ड रखने का माध्यम नहीं, बल्कि एक सक्रिय केंद्रीय तंत्रिका तंत्र (Nervous System) मानते हैं।'
                : 'Enterprise software should not be an inert digital filing cabinet. We engineer Quantinox as an active sensory and transactional nervous system that predicts bottlenecks and closes books autonomously.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {principles.map((p, idx) => {
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

      {/* SECTION 2: OUR STORY & TIMELINE */}
      <section id="story" className="section" style={{ background: 'var(--surface)', padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 48px', textAlign: 'center' }}>
            <div className="eyebrow">{hi ? 'हमारी यात्रा' : 'Our Story & Milestones'}</div>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>
              {hi ? 'लीगेसी एकाधिकार से आधुनिक स्वायत्त क्रांति तक' : 'From Broken Monoliths to Autonomous ERP'}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
              {hi
                ? 'जानें कि कैसे 2019 में शुरू हुई एक तकनीकी खोज आज 42 देशों में विनिर्माण और व्यापार को संचालित करने वाली महाशक्ति बनी।'
                : 'How a passionate group of distributed systems engineers and corporate audit partners re-imagined the enterprise ledger from first principles.'}
            </p>
          </div>

          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {milestones.map((m, idx) => (
              <div 
                key={idx} 
                className="card" 
                style={{ 
                  padding: '28px 32px', 
                  display: 'flex', 
                  gap: '24px', 
                  alignItems: 'flex-start',
                  borderLeft: '4px solid var(--accent)'
                }}
              >
                <div style={{ 
                  minWidth: '90px', 
                  fontSize: '22px', 
                  fontWeight: 800, 
                  color: 'var(--accent)', 
                  fontFamily: 'var(--font-display)' 
                }}>
                  {m.year}
                </div>
                <div>
                  <h3 style={{ fontSize: '19px', marginBottom: '6px', color: 'var(--ink)' }}>{m.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: LEADERSHIP & BOARD */}
      <section id="leadership" className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 48px', textAlign: 'center' }}>
            <div className="eyebrow">{hi ? 'नेतृत्व' : 'Executive Leadership'}</div>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>
              {hi ? 'उद्योग विशेषज्ञों व आर्किटेक्ट्स का नेतृत्व' : 'Led by Engineers, Auditors & Systems Architects'}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
              {hi
                ? 'हमारी नेतृत्व टीम के पास फॉर्च्यून 500 एंटरप्राइज़ सिस्टम्स और औद्योगिक स्वचालन का दशकों का व्यावहारिक अनुभव है।'
                : 'Our leadership pairs deep distributed database engineering with battle-tested audit and regulatory experience across manufacturing, pharma, and global trade.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {leadership.map((l, idx) => (
              <div key={idx} className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'var(--ink)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '18px',
                      fontFamily: 'var(--font-display)'
                    }}>
                      {l.initials}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '19px', marginBottom: '4px' }}>{l.name}</h3>
                      <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>{l.role}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                    {l.pedigree}
                  </div>

                  <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                    {l.bio}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>
                  <strong style={{ color: 'var(--ink)' }}>{hi ? 'प्राथमिक फोकस:' : 'Core Domain:'}</strong> {l.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: GLOBAL OFFICES & PRESENCE */}
      <section id="locations" className="section" style={{ background: 'var(--surface)', padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 48px', textAlign: 'center' }}>
            <div className="eyebrow">{hi ? 'वैश्विक उपस्थिति' : 'Worldwide Infrastructure'}</div>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>
              {hi ? 'चार महाद्वीपों में वैश्विक परिचालन केंद्र' : 'Global Operational Presence Across 4 Continents'}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
              {hi
                ? 'हमारे क्षेत्रीय कार्यालय स्थानीय टैक्स अनुपालन (GST, VAT, Sales Tax) और 24/7 फॉलो-द-सन सहायता प्रदान करते हैं।'
                : 'With multi-region cloud edge deployments in Mumbai, Northern Virginia, Frankfurt, and Singapore, your operations remain responsive with single-digit millisecond latency.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {offices.map((o, idx) => (
              <div key={idx} className="card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '8px' }}>
                    <MapPin size={18} />
                    <span style={{ fontWeight: 700, fontSize: '16px' }}>{o.city}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginBottom: '10px' }}>
                    {o.label}
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '16px' }}>
                    {o.address}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                  <div><strong style={{ color: 'var(--ink)' }}>Phone:</strong> {o.phone}</div>
                  <div><strong style={{ color: 'var(--ink)' }}>Email:</strong> <a href={`mailto:${o.email}`}>{o.email}</a></div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                    <strong>Focus:</strong> {o.teams}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: TRUST, SECURITY & CERTIFICATIONS */}
      <section id="trust" className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 48px', textAlign: 'center' }}>
            <div className="eyebrow">{hi ? 'सुरक्षा व अनुपालन' : 'Enterprise Trust Center'}</div>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>
              {hi ? 'सख्त सुरक्षा, डेटा संप्रभुता व ESG प्रतिबद्धता' : 'Rigorous Security, Compliance & Data Sovereignty'}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
              {hi
                ? 'हम वित्तीय और विनिर्माण डेटा की अखंडता को सर्वोपरि रखते हैं। हर टेनेंट कड़े क्रिप्टोग्राफ़िक अलगाव के साथ सुरक्षित है।'
                : 'Enterprise trust is non-negotiable. We subject our systems to continuous automated pen-testing, annual SOC 2 Type II audits, and zero-trust perimeter isolation.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <ShieldCheck size={28} style={{ color: 'var(--ok)', marginBottom: '12px' }} />
              <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>ISO/IEC 27001:2022</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
                Fully certified Information Security Management System (ISMS) covering cloud operations, source code access, and employee vetting.
              </p>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <Lock size={28} style={{ color: 'var(--accent)', marginBottom: '12px' }} />
              <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>SOC 1 & SOC 2 Type II</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
                Annual independent third-party examination verifying security, confidentiality, availability, and financial reporting controls.
              </p>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <Award size={28} style={{ color: '#E11D48', marginBottom: '12px' }} />
              <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>FDA 21 CFR Part 11</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
                Validated electronic signatures, computerized system validation (CSV), and immutable audit trails for pharmaceutical batch records.
              </p>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <Leaf size={28} style={{ color: '#059669', marginBottom: '12px' }} />
              <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>ESG & Carbon Ledgers</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>
                100% renewable-powered data centers with embedded Scope 1, 2, and 3 emission reporting inside the Quantinox supply chain module.
              </p>
            </div>
          </div>

          {/* Quick links to CSR and Investor Relations */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            padding: '24px',
            background: 'var(--surface)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--line)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>
                  {hi ? 'निवेशक संबंध एवं शेयर (QNTX)' : 'Investor Relations & Financial Performance'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
                  {hi ? 'अर्निंग्स रिलीज, 10-Q/वार्षिक फाइलिंग और स्टॉक कोट' : 'Quarterly earnings releases, stock quotes, and governance charters.'}
                </p>
              </div>
              <button
                onClick={() => setPage('investor-relations')}
                className="btn btn-outline"
                style={{ fontSize: '13px', padding: '8px 16px', whiteSpace: 'nowrap' }}
              >
                {hi ? 'आईआर देखें' : 'View IR Desk'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>
                  {hi ? 'कॉर्पोरेट सामाजिक उत्तरदायित्व (CSR)' : 'Sustainability & CSR Initiatives'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
                  {hi ? 'ग्रीन क्लाउड इनिशिएटिव और गैर-लाभकारी अनुदान' : 'Zero-carbon compute, education fellowships, and NGO software grants.'}
                </p>
              </div>
              <button
                onClick={() => setPage('csr')}
                className="btn btn-outline"
                style={{ fontSize: '13px', padding: '8px 16px', whiteSpace: 'nowrap' }}
              >
                {hi ? 'CSR देखें' : 'Explore CSR'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CAREERS & CULTURE */}
      <section id="careers" className="section" style={{ background: 'var(--surface)', padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 40px', textAlign: 'center' }}>
            <div className="eyebrow">{hi ? 'करियर व अवसर' : 'Join Our Engineering Guild'}</div>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>
              {hi ? 'जटिल एंटरप्राइज़ समस्याओं को सुलझाने वाले इंजीनियरों का स्वागत है' : 'Build Systems that Power the Global Economy'}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6 }}>
              {hi
                ? 'हम ऐसे सॉफ्टवेयर कारीगरों की तलाश में हैं जो हाई-थ्रूपुट लेज़र, वितरित डेटाबेस और एजेंटिक AI सिस्टम्स में रुचि रखते हैं।'
                : 'Join our team of distributed systems engineers, compilers enthusiasts, and supply chain specialists solving non-trivial, mission-critical infrastructure problems.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '960px', margin: '0 auto 32px' }}>
            {[
              { title: 'Senior Distributed Ledger Engineer', team: 'Core Infrastructure', loc: 'Mumbai / Remote', type: 'Full-time' },
              { title: 'Principal Solution Architect (Manufacturing MES)', team: 'Customer Success', loc: 'San Jose, CA / Hybrid', type: 'Full-time' },
              { title: 'Quanta AI Autonomous Agents Researcher', team: 'Applied AI Lab', loc: 'London / Remote', type: 'Full-time' },
              { title: 'Enterprise Security & Compliance Lead (SOC2/FDA)', team: 'Trust & Governance', loc: 'Mumbai / London', type: 'Full-time' },
            ].map((job, idx) => (
              <div key={idx} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 700, marginBottom: '6px' }}>{job.team}</div>
                  <h4 style={{ fontSize: '17px', marginBottom: '8px' }}>{job.title}</h4>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
                    {job.loc} • {job.type}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setPage('careers');
                  }} 
                  className="btn btn-outline" 
                  style={{ fontSize: '13px', padding: '6px 14px', alignSelf: 'flex-start' }}
                >
                  {hi ? 'विस्तार व आवेदन देखें →' : 'View Role & Apply →'}
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setPage('careers')}
              className="btn btn-primary"
              style={{ padding: '12px 28px', fontSize: '15px', marginBottom: '16px' }}
            >
              {hi ? 'सभी 12+ पद एवं संस्कृति लाभ देखें →' : 'Explore All Positions & Culture Benefits →'}
            </button>
            <p style={{ fontSize: '14px', color: 'var(--muted)' }}>
              Don't see your exact role? Send your CV & engineering GitHub to{' '}
              <a href="mailto:careers@quantinox.com" style={{ fontWeight: 600 }}>careers@quantinox.com</a>.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="section" style={{ background: 'var(--ink)', color: '#FFFFFF', padding: '60px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <h2 style={{ fontSize: '36px', color: '#FFFFFF', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
            {hi ? 'क्या आप अपने एंटरप्राइज़ को बदलने के लिए तैयार हैं?' : 'Ready to Modernize Your Enterprise ERP Landscape?'}
          </h2>
          <p style={{ color: '#A9B2C7', fontSize: '17px', lineHeight: 1.6, marginBottom: '32px' }}>
            {hi
              ? 'हमारे सीनियर आर्किटेक्ट से सीधे बात करें या 30 सेकंड में अपनी कंपनी के लिए अनुकूलित समाधान तैयार करें।'
              : 'Speak directly with a Principal Solutions Architect or explore how Quantinox autonomous agents can eliminate month-end closing chaos.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => setPage('demo')} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
              {hi ? 'लाइव डेमो अनुरोध करें' : 'Request Dedicated Product Demo'}
            </button>
            <button onClick={() => setPage('ai-advisor')} className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)', padding: '14px 28px', fontSize: '16px' }}>
              {hi ? 'AI एडवाइज़र से योजना बनाएँ' : 'Build Custom Roadmap with AI Advisor'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CompanyPage;

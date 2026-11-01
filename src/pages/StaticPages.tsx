import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storage';
import { 
  Building2, Users, Award, ShieldCheck, Download, 
  Calendar, MapPin, Mail, Phone, CheckCircle2, 
  ExternalLink, ArrowRight, HelpCircle, FileText, 
  Globe, MessageSquare, Terminal, HeartHandshake, Eye
} from 'lucide-react';

/* -------------------------------------------------------------
   ABOUT PAGE
------------------------------------------------------------- */
export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="section" style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto 48px', textAlign: 'center' }}>
          <div className="eyebrow">Enterprise Heritage & Vision</div>
          <h1 style={{ fontSize: '42px', marginBottom: '20px' }}>
            Engineering the Next Epoch of Autonomous Enterprise Systems
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: 1.6 }}>
            Quantinox IT Technology builds sovereign, intelligent ERP foundations for mid-market and multinational manufacturers, distributors, and service conglomerates across 42 countries.
          </p>
        </div>

        {/* Core Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          <div className="card" style={{ padding: '32px' }}>
            <div className="pill" style={{ marginBottom: '16px' }}><ShieldCheck size={14} /> Mission</div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Zero-Latency Business Truth</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
              We eliminate batch processing and fragmented departmental silos by providing a single, transactional double-entry ledger that synchronizes shop floors, field logistics, and corporate balance sheets instantaneously.
            </p>
          </div>

          <div className="card" style={{ padding: '32px' }}>
            <div className="pill" style={{ marginBottom: '16px' }}><Award size={14} /> Global Standards</div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Enterprise Governance & Trust</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
              Compliant with ISO 27001, SOC 2 Type II, HIPAA, and India's Digital Personal Data Protection Act 2023. Our multi-tenant architecture keeps your data cryptographically isolated.
            </p>
          </div>

          <div className="card" style={{ padding: '32px' }}>
            <div className="pill" style={{ marginBottom: '16px' }}><Users size={14} /> Co-Engineering</div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Customer-Centric Deployment</h3>
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
              Every customer is paired with a dedicated Principal Solution Architect who remains on-site or in-region throughout the 90-day go-live milestone, ensuring a guaranteed 100% on-time deployment.
            </p>
          </div>
        </div>

        {/* Executive Leadership & Offices */}
        <div className="card" style={{ padding: '40px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Global Operational Presence</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div>
              <h4 style={{ fontSize: '16px', color: 'var(--accent)', marginBottom: '8px' }}>Global Headquarters (India)</h4>
              <p style={{ fontSize: '14px', color: 'var(--text)' }}>
                Quantinox Tower, Bandra Kurla Complex (BKC)<br />
                Mumbai, Maharashtra 400051<br />
                <span style={{ color: 'var(--muted)' }}>+91 22 4900 8800</span>
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', color: 'var(--accent)', marginBottom: '8px' }}>North America Technology Center</h4>
              <p style={{ fontSize: '14px', color: 'var(--text)' }}>
                333 W San Carlos St, Suite 600<br />
                San Jose, CA 95110, USA<br />
                <span style={{ color: 'var(--muted)' }}>+1 (408) 555-0199</span>
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', color: 'var(--accent)', marginBottom: '8px' }}>Europe & UK Operations</h4>
              <p style={{ fontSize: '14px', color: 'var(--text)' }}>
                100 Bishopsgate, 19th Floor<br />
                London EC2N 4AG, United Kingdom<br />
                <span style={{ color: 'var(--muted)' }}>+44 20 7946 0912</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   CUSTOMERS & CASE STUDIES PAGE
------------------------------------------------------------- */
export const CustomersPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const caseStudies = [
    {
      company: 'Apex Precision Metals Ltd.',
      industry: 'manufacturing',
      logo: 'APM',
      metric: '41% Reduction in Shopfloor WIP Inventory',
      desc: 'Migrated 6 stamping facilities from an aging on-premises SAP R/3 installation to Quantinox Manufacturing Cloud in 14 weeks without missing a single tier-1 automotive delivery deadline.',
      quote: 'Quantinox delivered the real-time MES traceability we had been promised by legacy vendors for over a decade.',
      author: 'Rajesh Kulkarni, Chief Operating Officer'
    },
    {
      company: 'Vanguard Biopharma Inc.',
      industry: 'life-sciences',
      logo: 'VBI',
      metric: '100% FDA 21 CFR Part 11 Audit Cleanliness',
      desc: 'Automated batch release genealogy, electronic signatures, and computerized system validation (CSV) across clinical trial packaging and cold-chain temperature monitoring.',
      quote: 'Our regulatory submission cycle collapsed from 3 weeks per batch to 4 hours with Quanta automated compliance checks.',
      author: 'Dr. Elena Rostova, VP Quality Assurance'
    },
    {
      company: 'MetroRetail Group (140+ Hypermarkets)',
      industry: 'retail',
      logo: 'MRG',
      metric: '99.4% On-Shelf Availability across 45,000 SKUs',
      desc: 'Unified omnichannel point-of-sale, warehouse distribution centers, and real-time vendor dropship replenishment using Quanta autonomous demand forecasting.',
      quote: 'Quantinox handles our Black Friday peak of 3,200 orders per second without breaking a sweat.',
      author: 'Sunil Mehta, Chief Information Officer'
    },
    {
      company: 'OmniLogistics Global Freight',
      industry: 'wholesale',
      logo: 'OLG',
      metric: '18% Freight Route Cost Savings',
      desc: 'Interconnected ocean carrier APIs, customs clearance documentation, bonded warehouses, and automated multi-currency billing.',
      quote: 'Billing errors dropped to virtually zero, saving our finance department over 1,200 hours of manual reconciliation each month.',
      author: 'Marcus Vance, CFO'
    }
  ];

  const filtered = filter === 'all' ? caseStudies : caseStudies.filter(c => c.industry === filter);

  return (
    <div className="section" style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '780px', margin: '0 auto 40px', textAlign: 'center' }}>
          <div className="eyebrow">Proven Field Outcomes</div>
          <h1 style={{ fontSize: '40px', marginBottom: '16px' }}>Enterprise Customer Success Stories</h1>
          <p style={{ color: 'var(--muted)', fontSize: '18px' }}>
            Discover how market leaders scale production, compress financial close cycles, and deploy autonomous Quanta workflows.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {['all', 'manufacturing', 'life-sciences', 'retail', 'wholesale'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="btn"
              style={{
                borderRadius: '999px',
                padding: '8px 20px',
                fontSize: '14px',
                background: filter === cat ? 'var(--accent)' : 'var(--chip-bg)',
                color: filter === cat ? '#fff' : 'var(--text)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {cat === 'all' ? 'All Industries' : cat.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {filtered.map((cs, idx) => (
            <div key={idx} className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: 'var(--accent-tint)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '16px'
                  }}>
                    {cs.logo}
                  </div>
                  <span className="pill" style={{ textTransform: 'capitalize' }}>{cs.industry.replace('-', ' ')}</span>
                </div>

                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{cs.company}</h3>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ok)', marginBottom: '12px' }}>
                  {cs.metric}
                </div>
                <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                  {cs.desc}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', fontStyle: 'italic', fontSize: '13px', color: 'var(--muted)' }}>
                "{cs.quote}"
                <div style={{ fontWeight: 600, fontStyle: 'normal', color: 'var(--ink)', marginTop: '6px' }}>
                  — {cs.author}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   RESOURCES & CHECKLIST DOWNLOAD PAGE
------------------------------------------------------------- */
export const ResourcesPage: React.FC = () => {
  const { setNotification } = useApp();

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/assets/docs/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setNotification(`Downloaded ${filename}`, 'success');
  };

  return (
    <div className="section" style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto 40px', textAlign: 'center' }}>
          <div className="eyebrow">Enterprise Intelligence & Toolkits</div>
          <h1 style={{ fontSize: '40px', marginBottom: '16px' }}>Whitepapers, RFP Templates & Guides</h1>
          <p style={{ color: 'var(--muted)', fontSize: '18px' }}>
            Empower your steering committee with pragmatic, vendor-neutral evaluation frameworks.
          </p>
        </div>

        {/* Featured Downloads */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '48px' }}>
          <div className="card" style={{ padding: '32px', border: '2px solid var(--accent)' }}>
            <div className="pill" style={{ marginBottom: '14px' }}>Essential Toolkit</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>The Enterprise ERP Buyer's Evaluation Checklist</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.6 }}>
              A 48-point diagnostic scorecard covering total cost of ownership (TCO), database sovereignty, cloud latency, MES integration, and API security.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleDownload('erp-buyers-checklist-en.pdf')}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}
              >
                <Download size={16} /> Download in English (PDF)
              </button>
              <button
                onClick={() => handleDownload('erp-buyers-checklist-hi.pdf')}
                className="btn btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}
              >
                <Download size={16} /> हिन्दी में डाउनलोड करें (PDF)
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: '32px' }}>
            <div className="pill" style={{ marginBottom: '14px' }}>Whitepaper</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>Autonomous Financial Orchestration</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.6 }}>
              How multi-agent AI networks reconcile intercompany balances across 14 currencies and complete audit-grade statutory books in under 48 hours.
            </p>
            <button
              onClick={() => handleDownload('erp-buyers-checklist-en.pdf')}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}
            >
              <Download size={16} /> Download Whitepaper (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   EVENTS & WEBINARS PAGE
------------------------------------------------------------- */
export const EventsPage: React.FC = () => {
  const { setNotification } = useApp();
  const [registeredEvent, setRegisteredEvent] = useState<string | null>(null);

  const events = [
    {
      title: 'Autonomous Enterprise World Summit 2025',
      date: 'April 24, 2025',
      time: '09:00 AM IST / 11:30 AM SGT',
      type: 'Virtual Global Conference',
      desc: 'Join 1,200+ CIOs and CFOs discussing agentic AI architectures in discrete manufacturing and life sciences.',
      speakers: 'Featuring Gartner Analysts & Quantinox Engineering Principals'
    },
    {
      title: 'Live Workshop: Closing the Books in 48 Hours',
      date: 'May 8, 2025',
      time: '02:00 PM EST / 11:00 AM PST',
      type: 'Interactive Technical Masterclass',
      desc: 'Hands-on demonstration configuring automated bank reconciliation, FX hedging revaluations, and GST/VAT auto-filing.',
      speakers: 'Quantinox Solutions Architecture Team'
    },
    {
      title: 'Hannover Messe Industrial Tech Exhibition',
      date: 'June 12-16, 2025',
      time: 'Booth Hall 4, Stand B32',
      type: 'In-Person Exhibition (Hannover, Germany)',
      desc: 'See live robotics cell telemetry stream into Quantinox MES with zero-jitter OPC-UA edge connectors.',
      speakers: 'In-person product engineers'
    }
  ];

  return (
    <div className="section" style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '780px', margin: '0 auto 40px', textAlign: 'center' }}>
          <div className="eyebrow">Knowledge Sharing</div>
          <h1 style={{ fontSize: '40px', marginBottom: '16px' }}>Upcoming Summits & Technical Masterclasses</h1>
          <p style={{ color: 'var(--muted)', fontSize: '18px' }}>
            Meet our systems architects, explore live interactive sandboxes, and learn best practices.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '860px', margin: '0 auto' }}>
          {events.map((ev, idx) => (
            <div key={idx} className="card" style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <span className="pill" style={{ fontSize: '12px' }}><Calendar size={12} /> {ev.date}</span>
                  <span className="pill" style={{ fontSize: '12px' }}>{ev.type}</span>
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '6px' }}>{ev.title}</h3>
                <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600, marginBottom: '8px' }}>{ev.time}</div>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '8px' }}>{ev.desc}</p>
                <div style={{ fontSize: '12px', color: 'var(--text)', fontStyle: 'italic' }}>{ev.speakers}</div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setRegisteredEvent(ev.title);
                    setNotification(`Registered for: ${ev.title}`, 'success');
                  }}
                  className={registeredEvent === ev.title ? "btn btn-outline" : "btn btn-primary"}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '160px', justifyContent: 'center' }}
                >
                  {registeredEvent === ev.title ? (
                    <>
                      <CheckCircle2 size={16} /> Pass Reserved
                    </>
                  ) : (
                    'Register Free Pass'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   CONTACT PAGE
------------------------------------------------------------- */
export const ContactPage: React.FC = () => {
  const { setNotification, navigate } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('Enterprise Sales Enquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.createLead({
      name,
      email,
      company,
      notes: `[Subject: ${subject}] ${message}`
    });
    setSent(true);
    setNotification('Message delivered to enterprise advisory team', 'success');
  };

  return (
    <div className="section" style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto 40px', textAlign: 'center' }}>
          <div className="eyebrow">Direct Engagement</div>
          <h1 style={{ fontSize: '40px', marginBottom: '16px' }}>Connect with Quantinox Enterprise</h1>
          <p style={{ color: 'var(--muted)', fontSize: '18px' }}>
            Speak directly with a regional Solution Architect or submit an RFP for rapid turnaround.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Contact Details */}
          <div className="card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Global Escalation Desk</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <Mail size={20} style={{ color: 'var(--accent)', marginTop: '3px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--ink)' }}>Enterprise Sales</strong>
                  <a href="mailto:sales@quantinox.com">sales@quantinox.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <Phone size={20} style={{ color: 'var(--accent)', marginTop: '3px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--ink)' }}>Direct Phone Lines</strong>
                  <div>India: +91 22 4900 8800</div>
                  <div>US / Canada: +1 (800) 555-0199</div>
                  <div>UK & EMEA: +44 20 7946 0912</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <MapPin size={20} style={{ color: 'var(--accent)', marginTop: '3px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--ink)' }}>Headquarters</strong>
                  <p style={{ color: 'var(--muted)', marginTop: '4px' }}>
                    Quantinox Tower, Bandra Kurla Complex (BKC), G Block, Mumbai 400051
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
              <button onClick={() => navigate('demo')} className="btn btn-primary" style={{ width: '100%' }}>
                Request Dedicated Product Demo
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: '36px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={56} style={{ color: 'var(--ok)', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Thank You for Reaching Out</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
                  Your inquiry has been routed to our senior advisory desk. An architect will contact you within 2 business hours.
                </p>
                <button onClick={() => setSent(false)} className="btn btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>Send Direct Inquiry</h3>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-2)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-2)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Organization *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-2)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Inquiry Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-2)' }}
                  >
                    <option value="Enterprise Sales Enquiry">Enterprise Sales Enquiry</option>
                    <option value="RFP / RFI Submission">RFP / RFI Submission</option>
                    <option value="Alliance & SI Partnership">Alliance & SI Partnership</option>
                    <option value="Technical Architecture Deep-Dive">Technical Architecture Deep-Dive</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your current system landscape, timeline, or key objectives..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-2)', resize: 'vertical' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   LEGAL / PRIVACY / TERMS / ACCESSIBILITY
------------------------------------------------------------- */
export const LegalPage: React.FC = () => (
  <div className="section" style={{ padding: '60px 0' }}>
    <div className="container" style={{ maxWidth: '840px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Master Legal Notice & Compliance Overview</h1>
      <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '32px' }}>Effective Date: January 1, 2025</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.7, fontSize: '15px' }}>
        <p>
          Quantinox IT Technology Private Limited ("Quantinox", "we", "us") operates the Quantinox Cloud ERP Platform, Quanta AI Autonomous Agents, and related customer portals. All services are governed by strict contractual enterprise SLAs, statutory compliance, and cryptographic multi-tenant separation.
        </p>

        <h3>1. Regulatory Compliance Framework</h3>
        <p>
          Quantinox software complies with India's Digital Personal Data Protection (DPDP) Act 2023, EU General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA/CPRA), and US FDA 21 CFR Part 11 requirements for electronic records and signatures.
        </p>

        <h3>2. Intellectual Property Rights</h3>
        <p>
          All proprietary algorithms, including the Quanta Autonomous Agent Framework, BM25 semantic retrieval indexes, and workflow execution graph components, are the exclusive intellectual property of Quantinox IT Technology.
        </p>
      </div>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="section" style={{ padding: '60px 0' }}>
    <div className="container" style={{ maxWidth: '840px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Privacy Policy & Data Sovereign Architecture</h1>
      <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '32px' }}>Last Updated: January 2025</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.7, fontSize: '15px' }}>
        <p>
          At Quantinox, data protection is an engineering tenet. We do not monetize, broker, or scrape customer enterprise data.
        </p>
        <h3>Data Isolation & Zero Model Leakage</h3>
        <p>
          All prompt telemetry, transactional ledgers, vendor catalogs, and employee payroll logs stored within your Quantinox tenant remain strictly confidential. We explicitly contractually guarantee that enterprise customer records are never used to train public or foundation AI models.
        </p>
        <h3>Right to Portability & Erasure</h3>
        <p>
          Tenants may at any time export their complete database snapshot in standard JSON/SQL format or invoke full account purge under GDPR Article 17 directly within the customer account portal.
        </p>
      </div>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="section" style={{ padding: '60px 0' }}>
    <div className="container" style={{ maxWidth: '840px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Enterprise Terms of Service</h1>
      <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '32px' }}>Version 4.2</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.7, fontSize: '15px' }}>
        <p>
          By accessing or utilizing the Quantinox Cloud ERP suite, your organization agrees to these Enterprise Terms of Service.
        </p>
        <h3>Service Level Guarantee</h3>
        <p>
          Quantinox maintains a minimum 99.99% monthly availability SLA for all production database nodes, supported by hot standby replicas in geographically separate availability zones.
        </p>
      </div>
    </div>
  </div>
);

export const AccessibilityPage: React.FC = () => (
  <div className="section" style={{ padding: '60px 0' }}>
    <div className="container" style={{ maxWidth: '840px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Accessibility Conformance Statement</h1>
      <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '32px' }}>WCAG 2.1 Level AA Compliance</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.7, fontSize: '15px' }}>
        <p>
          Quantinox is dedicated to ensuring that digital accessibility is an intrinsic property of all enterprise software. We design and test against the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA criteria.
        </p>
        <h3>Key Architectural Features</h3>
        <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>Full keyboard operability across all forms, tables, modals, and Quanta Assistant drawers.</li>
          <li>Contrast ratios exceeding 4.5:1 for standard text and 3:1 for large graphical components.</li>
          <li>Screen-reader optimized ARIA landmarks and live regions for dynamic AI agent updates.</li>
        </ul>
      </div>
    </div>
  </div>
);

import React, { useState, useId } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, MapPin, DollarSign, Clock, Users, Sparkles, 
  CheckCircle2, ArrowRight, Search, Filter, ShieldCheck, 
  Heart, Laptop, Globe, GraduationCap, Coffee, Award, 
  Send, X, UploadCloud, ChevronRight, HelpCircle
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Remote' | 'Hybrid' | 'On-site';
  experience: 'Mid-Level' | 'Senior' | 'Staff / Principal' | 'Lead';
  salaryUSD: string;
  salaryINR: string;
  description: string;
  tags: string[];
}

export const CareersPage: React.FC = () => {
  const { lang, setPage, showToast, openAssistantWithPrompt } = useApp();
  const hi = lang === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  
  // Application Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantLinkedin, setApplicantLinkedin] = useState('');
  const [applicantGithub, setApplicantGithub] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  const fileInputId = useId();

  const departments = [
    'All',
    'Engineering & Infrastructure',
    'Quanta AI & Data Science',
    'Product & Design',
    'Solutions & Architecture',
    'Enterprise Sales & Marketing'
  ];

  const locations = [
    'All',
    'Global Remote',
    'Mumbai / Gurugram, India',
    'San Jose / San Francisco, CA',
    'London, UK',
    'Singapore'
  ];

  const jobs: JobPosting[] = [
    {
      id: 'job-1',
      title: hi ? 'प्रिंसिपल डिस्ट्रीब्यूटेड सिस्टम्स आर्किटेक्ट (कोर लेज़र)' : 'Principal Distributed Systems Architect (Core Ledger)',
      department: 'Engineering & Infrastructure',
      location: 'Global Remote',
      type: 'Remote',
      experience: 'Staff / Principal',
      salaryUSD: '$210,000 – $265,000 + Equity',
      salaryINR: '₹75,00,000 – ₹95,00,000 + Equity',
      description: hi
        ? 'सब-सेकंड डबल-एंट्री लेज़र इंजन, वितरित सर्वसम्मति (Raft/Paxos) और मिलिसेकंड मल्टी-टेनेंट कैशिंग का डिज़ाइन और नेतृत्व करें।'
        : 'Architect the ultra-low latency sub-second double-entry transactional engine and multi-region Raft-based ledger replication.',
      tags: ['Rust', 'Go', 'Distributed Systems', 'Raft', 'PostgreSQL', 'High-Throughput']
    },
    {
      id: 'job-2',
      title: hi ? 'स्टाफ़ मशीन लर्निंग इंजीनियर (Quanta ऑटोनॉमस एजेंट्स)' : 'Staff Machine Learning Engineer (Quanta Autonomous Agents)',
      department: 'Quanta AI & Data Science',
      location: 'San Jose / San Francisco, CA',
      type: 'Hybrid',
      experience: 'Staff / Principal',
      salaryUSD: '$220,000 – $280,000 + Equity',
      salaryINR: '₹80,00,000 – ₹1,05,00,000 + Equity',
      description: hi
        ? 'आपूर्ति श्रृंखला भविष्यवाणी, मांग पूर्वानुमान और वित्तीय विसंगतियों का पता लगाने वाले स्वायत्त Quanta एजेंट्स को प्रशिक्षित और तैनात करें।'
        : 'Train and orchestrate deterministic multi-agent systems for autonomous supply chain forecasting, demand sensing, and audit reconciliation.',
      tags: ['Python', 'PyTorch', 'Agentic Workflows', 'LLM Fine-Tuning', 'vLLM', 'Distributed Training']
    },
    {
      id: 'job-3',
      title: hi ? 'सीनियर फुल-स्टैक इंजीनियर (प्लेटफॉर्म एवं वेब कोर)' : 'Senior Full-Stack Engineer (Platform & Web Core)',
      department: 'Engineering & Infrastructure',
      location: 'Mumbai / Gurugram, India',
      type: 'Hybrid',
      experience: 'Senior',
      salaryUSD: '$130,000 – $165,000 + Equity',
      salaryINR: '₹38,00,000 – ₹55,00,000 + Equity',
      description: hi
        ? 'रिएक्ट, टाइपस्क्रिप्ट और आधुनिक डिस्ट्रीब्यूटेड एपीआई का उपयोग करके तेज, सुलभ और जटिल एंटरप्राइज वर्कफ्लो इंटरफेस का निर्माण करें।'
        : 'Build high-performance, modular ERP interfaces with React 19, TypeScript, virtualization for million-row tables, and real-time WebSockets.',
      tags: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'WebSockets', 'Design Systems']
    },
    {
      id: 'job-4',
      title: hi ? 'डेटाबेस रिलायबिलिटी एवं इंफ्रास्ट्रक्चर लीड' : 'Database Reliability & Cloud Infrastructure Lead',
      department: 'Engineering & Infrastructure',
      location: 'Global Remote',
      type: 'Remote',
      experience: 'Senior',
      salaryUSD: '$170,000 – $210,000 + Equity',
      salaryINR: '₹55,00,000 – ₹72,00,000 + Equity',
      description: hi
        ? '99.99% अपटाइम SLA के साथ मल्टी-क्लाउड टेराफॉर्म, कुबेरनेट्स और स्वचालित आपदा रिकवरी (DR) का संचालन करें।'
        : 'Own zero-downtime database migrations, automated disaster failover topologies, and multi-cloud Kubernetes clusters across 14 global regions.',
      tags: ['Kubernetes', 'Terraform', 'PostgreSQL Internals', 'Linux Kernel', 'Chaos Engineering']
    },
    {
      id: 'job-5',
      title: hi ? 'लीड प्रोडक्ट डिज़ाइनर (एंटरप्राइज UX एवं डेटा विज़ुअलाइज़ेशन)' : 'Lead Product Designer (Enterprise Systems & Data UX)',
      department: 'Product & Design',
      location: 'London, UK',
      type: 'Hybrid',
      experience: 'Lead',
      salaryUSD: '$160,000 – $195,000 + Equity',
      salaryINR: '₹50,00,000 – ₹68,00,000 + Equity',
      description: hi
        ? 'जटिल औद्योगिक इन्वेंटरी, वित्तीय रिपोर्टिंग और AI ऑटोनॉमस वर्कफ़्लो को सहज, सुंदर और उपयोग में सरल डैशबोर्ड में बदलें।'
        : 'Transform dense financial ledgers, shopfloor MES scheduling, and supply chain logistics flows into intuitive, world-class user experiences.',
      tags: ['Figma', 'Design Systems', 'Data Visualization', 'User Research', 'Information Architecture']
    },
    {
      id: 'job-6',
      title: hi ? 'प्रिंसिपल सॉल्यूशंस आर्किटेक्ट (विनिर्माण एवं MES)' : 'Principal Solutions Architect (Manufacturing & MES)',
      department: 'Solutions & Architecture',
      location: 'Mumbai / Gurugram, India',
      type: 'Hybrid',
      experience: 'Staff / Principal',
      salaryUSD: '$165,000 – $215,000 + Equity',
      salaryINR: '₹58,00,000 – ₹78,00,000 + Equity',
      description: hi
        ? 'फॉर्च्यून 500 विनिर्माण ग्राहकों के साथ मिलकर 90-दिन के त्वरित गो-लाइव माइलस्टोन का नेतृत्व करें और लेगेसी सिस्टम्स को माइग्रेट करें।'
        : 'Guide Fortune 500 manufacturing leaders through end-to-end ERP modernizations, integrating shopfloor PLCs, SCADA, and automated MRP runs.',
      tags: ['Manufacturing ERP', 'MES', 'Shopfloor IoT', 'Supply Chain Planning', 'SAP Cutover']
    },
    {
      id: 'job-7',
      title: hi ? 'साइबर सुरक्षा व शून्य-विश्वास (Zero-Trust) लीड' : 'Cybersecurity & Zero-Trust Infrastructure Lead',
      department: 'Engineering & Infrastructure',
      location: 'San Jose / San Francisco, CA',
      type: 'Remote',
      experience: 'Senior',
      salaryUSD: '$190,000 – $240,000 + Equity',
      salaryINR: '₹65,00,000 – ₹85,00,000 + Equity',
      description: hi
        ? 'क्रिप्टोग्राफ़िक टेनेंट आइसोलेशन, mTLS, SOC 2 Type II और FDA 21 CFR Part 11 सुरक्षा मानकों का ऑडिट और सुदृढ़ीकरण करें।'
        : 'Lead tenant cryptographic boundary isolation, cryptographic key rotations, pen-testing, and compliance enforcement across all sovereign tiers.',
      tags: ['Zero Trust', 'SOC 2 Type II', 'ISO 27001', 'Cryptography', 'SIEM', 'Cloud Security']
    },
    {
      id: 'job-8',
      title: hi ? 'सीनियर प्रोडक्ट मैनेजर (सप्लाई चेन व लॉजिस्टिक्स)' : 'Senior Product Manager (Supply Chain & Logistics)',
      department: 'Product & Design',
      location: 'Singapore',
      type: 'Hybrid',
      experience: 'Senior',
      salaryUSD: '$175,000 – $220,000 + Equity',
      salaryINR: '₹60,00,000 – ₹78,00,000 + Equity',
      description: hi
        ? 'वैश्विक आपूर्ति श्रृंखला, बहु-मोडल लॉजिस्टिक्स ट्रैकिंग और ऑटोमेटेड वेयरहाउसिंग रोडमैप का संचालन करें।'
        : 'Define product vision and execution for autonomous inventory replenishment, multi-currency customs compliance, and intelligent freight matching.',
      tags: ['Supply Chain', 'Logistics Management', 'Product Strategy', 'Customer Empathy', 'SaaS Roadmapping']
    },
    {
      id: 'job-9',
      title: hi ? 'ग्लोबल एंटरप्राइज़ अकाउंट एक्ज़ीक्यूटिव (APAC)' : 'Global Enterprise Account Executive (APAC & Middle East)',
      department: 'Enterprise Sales & Marketing',
      location: 'Singapore',
      type: 'Hybrid',
      experience: 'Senior',
      salaryUSD: '$180,000 – $320,000 OTE + Equity',
      salaryINR: '₹65,00,000 – ₹1,10,00,000 OTE + Equity',
      description: hi
        ? 'शीर्ष विनिर्माण, खुदरा और ऊर्जा कंपनियों के साथ बहु-वर्षीय क्लाउड ईआरपी सौदों का नेतृत्व करें और दीर्घकालिक संबंध बनाएं।'
        : 'Drive multi-million dollar annual contract values across industrial conglomerates in Southeast Asia, India, and the GCC region.',
      tags: ['Enterprise Sales', 'Complex B2B', 'C-Level Selling', 'Cloud ERP', 'Deal Strategy']
    }
  ];

  // Filter jobs based on query, department, and location
  const filteredJobs = jobs.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesLoc = selectedLocation === 'All' || job.location === selectedLocation;
    const matchesQuery = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesLoc && matchesQuery;
  });

  const handleOpenApplication = (job?: JobPosting) => {
    setSelectedJob(job || null);
    setApplicantNote('');
    setSubmittedAppId(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
      showToast(hi ? `फ़ाइल संलग्न: ${e.target.files[0].name}` : `Attached: ${e.target.files[0].name}`);
    }
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      showToast(hi ? 'कृपया नाम और ईमेल भरें।' : 'Please enter your name and email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `QNX-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedAppId(generatedId);
      showToast(hi ? `आवेदन प्राप्त! संदर्भ संख्या: ${generatedId}` : `Application submitted! Reference: ${generatedId}`);
    }, 600);
  };

  const cultureBenefits = [
    {
      icon: DollarSign,
      title: hi ? 'उदार इक्विटी एवं पारदर्शी वेतन' : 'Substantial Equity & Clear Salary Bands',
      desc: hi
        ? 'हर कर्मचारी को कंपनी में वास्तविक हिस्सेदारी मिलती है। 10-वर्षीय एक्सरसाइज विंडो के साथ पारदर्शी स्टॉक विकल्प।'
        : 'Every team member receives meaningful equity grants with a generous 10-year exercise window and standardized, non-negotiated fair pay bands.'
    },
    {
      icon: Laptop,
      title: hi ? 'रिमोट-फर्स्ट लचीलापन एवं होम ऑफिस फंड' : 'Remote-First Freedom & Home Desk Grant',
      desc: hi
        ? 'जहाँ आप सबसे अच्छा काम करते हैं वहाँ से काम करें। हम $2,000 का होम ऑफिस फंड और टॉप-स्पेक मैकबुक प्रो या लिनक्स वर्कस्टेशन प्रदान करते हैं।'
        : 'Work from our hubs or anywhere in the world. We equip you with a high-spec M-series MacBook or ThinkPad plus a $2,000 ergonomic setup allowance.'
    },
    {
      icon: Heart,
      title: hi ? 'समग्र स्वास्थ्य, परिवार व मानसिक कल्याण' : 'World-Class Healthcare & 26-Week Parental Leave',
      desc: hi
        ? 'आपके और आपके परिवार के लिए 100% प्रीमियम-कवर मेडिकल, डेंटल, विज़न और 26 सप्ताह की सवैतनिक पैतृक छुट्टी।'
        : 'Full premium health coverage for you and your dependents, unlimited mental wellness coaching, and 26 weeks of equal paid parental leave for all parents.'
    },
    {
      icon: GraduationCap,
      title: hi ? '$8,000 वार्षिक शिक्षण व सम्मेलन निधि' : '$8,000 Annual Learning & Conference Endowment',
      desc: hi
        ? 'किताबों, तकनीकी प्रमाणन, सम्मेलनों (AWS, RustConf, NeurIPS) और शोध पत्र प्रकाशन के लिए असीमित समर्थन।'
        : 'Annual no-questions-asked budget for global engineering conferences, books, cloud sandbox certifications, and advanced degrees.'
    },
    {
      icon: Clock,
      title: hi ? '20% इनोवेशन समय एवं स्वायत्तता' : '20% Open Innovation Sprints',
      desc: hi
        ? 'हर दो सप्ताह में एक दिन पूरी तरह से ओपन-सोर्स योगदान, आंतरिक टूलींग सुधार या नए Quanta AI मॉडल प्रयोगों के लिए समर्पित है।'
        : 'Engineers dedicate 20% of their sprints to open-source contributions, experimental AI tools, latency profiling, and internal developer tooling.'
    },
    {
      icon: Coffee,
      title: hi ? 'वार्षिक वैश्विक टीम सम्मेलन' : 'Bi-Annual Global Engineering Retreats',
      desc: hi
        ? 'साल में दो बार हमारी पूरी वैश्विक टीम तकनीक मंथन, हैकथॉन और बॉन्डिंग के लिए खूबसूरत गंतव्यों में एक साथ मिलती है।'
        : 'Twice a year we bring the entire global team together for a week of collaborative hackathons, keynote discussions, and adventure.'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Top Breadcrumb Navigation */}
      <section className="border-b border-[var(--line)] bg-[var(--surface)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <button onClick={() => setPage('home')} className="hover:text-[var(--accent)] transition-colors">
              {hi ? 'होम' : 'Home'}
            </button>
            <span>/</span>
            <button onClick={() => setPage('company')} className="hover:text-[var(--accent)] transition-colors">
              {hi ? 'कंपनी' : 'Company'}
            </button>
            <span>/</span>
            <span className="text-[var(--ink)] font-semibold">{hi ? 'करियर' : 'Careers & Culture'}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{jobs.length} {hi ? 'सक्रिय पद खुले हैं' : 'Open Positions Globally'}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-tint)] text-[var(--accent)] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {hi ? 'क्वांटिनॉक्स इंजीनियरिंग संस्कृति' : 'Quantinox Engineering & Culture'}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--ink)] font-display max-w-4xl mx-auto leading-[1.12]">
            {hi
              ? 'वैश्विक उद्योग को संचालित करने वाले सब-सेकंड इंजन का निर्माण करें'
              : 'Build the Sub-Second Software Core Powering Global Industry'}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[var(--text)] max-w-3xl mx-auto leading-relaxed">
            {hi
              ? 'हम 42+ देशों में 1,840+ औद्योगिक विनिर्माताओं, फार्मा कंपनियों और आपूर्ति श्रृंखलाओं के लिए अगली पीढ़ी का स्वायत्त ERP तैयार कर रहे हैं। जटिल समस्याओं को हल करने वाले असाधारण इंजीनियरों का स्वागत है।'
              : 'Join a tight-knit team of distributed systems builders, ML researchers, and enterprise architects replacing decades of brittle legacy software with real-time, deterministic autonomy.'}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#openings"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius-sm)] bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-md active:scale-95 text-sm"
            >
              <Briefcase className="w-4 h-4" />
              {hi ? `वर्तमान रिक्तियां देखें (${jobs.length})` : `Explore ${jobs.length} Open Roles`}
            </a>
            <button
              onClick={() => handleOpenApplication()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] font-semibold hover:bg-[var(--surface)] transition-all shadow-sm text-sm"
            >
              <Send className="w-4 h-4 text-[var(--accent)]" />
              {hi ? 'सामान्य आवेदन सबमिट करें' : 'Submit General Application'}
            </button>
          </div>

          {/* High-level Culture Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
              <div className="text-3xl font-extrabold text-[var(--ink)] font-display">4.9 / 5.0</div>
              <div className="text-xs text-[var(--muted)] font-medium mt-1">
                {hi ? 'ग्लासडोर व टीम संतुष्टि स्कोर' : 'Glassdoor & Verified Team Rating'}
              </div>
            </div>
            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
              <div className="text-3xl font-extrabold text-[var(--accent)] font-display">$8,000</div>
              <div className="text-xs text-[var(--muted)] font-medium mt-1">
                {hi ? 'वार्षिक शिक्षण व शोध बजट' : 'Annual Learning & Research Endowment'}
              </div>
            </div>
            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
              <div className="text-3xl font-extrabold text-[var(--ink)] font-display">100%</div>
              <div className="text-xs text-[var(--muted)] font-medium mt-1">
                {hi ? 'परिवार स्वास्थ्य बीमा कवरेज' : 'Company-Paid Family Healthcare'}
              </div>
            </div>
            <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)]">
              <div className="text-3xl font-extrabold text-emerald-600 font-display">26 Wks</div>
              <div className="text-xs text-[var(--muted)] font-medium mt-1">
                {hi ? 'समान सवैतनिक पैतृक अवकाश' : 'Equal Paid Parental Leave'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture, Core Values & Benefits */}
      <section className="py-20 lg:py-28 bg-[var(--surface)] border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              {hi ? 'हमारा कार्य वातावरण' : 'Why Engineers & Leaders Love Quantinox'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--ink)] mt-2">
              {hi ? 'स्वायत्तता, बौद्धिक चुनौती और दीर्घकालिक विकास' : 'Radical Ownership, Deep Focus & Sustainable Excellence'}
            </h2>
            <p className="mt-4 text-base text-[var(--text)] leading-relaxed">
              {hi
                ? 'हम बेकार की मीटिंग्स, आंतरिक राजनीति और अनावश्यक नौकरशाही से बचते हैं। हमारा ध्यान उच्च-गुणवत्ता वाले कोड, सटीक आर्किटेक्चर और ग्राहकों के लिए वास्तविक मूल्य निर्माण पर है।'
                : 'We minimize performative meetings, bureaucracy, and ticket churning. Instead, we assemble high-trust, autonomous squads equipped with top-tier tools to solve hard computational and enterprise engineering challenges.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="p-8 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm hover:border-[var(--accent)] transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--ink)] mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Job Openings Directory */}
      <section id="openings" className="py-20 lg:py-28 border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                {hi ? 'खुले अवसर' : 'Open Opportunities'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--ink)] mt-2">
                {hi ? 'हमारे वैश्विक दस्ते में शामिल हों' : 'Find Your Next High-Impact Mission'}
              </h2>
              <p className="text-sm text-[var(--muted)] mt-2">
                {hi ? `वर्तमान में ${filteredJobs.length} भूमिकाएं उपलब्ध हैं` : `Showing ${filteredJobs.length} of ${jobs.length} open positions`}
              </p>
            </div>

            {/* Quick General Application Button */}
            <button
              onClick={() => handleOpenApplication()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] text-xs font-bold hover:bg-[var(--surface)] text-[var(--ink)] transition-colors self-start md:self-auto"
            >
              <Send className="w-3.5 h-3.5 text-[var(--accent)]" />
              {hi ? 'क्या आपकी भूमिका नहीं दिखी? सामान्य आवेदन दें' : "Don't see your role? Apply Speculatively"}
            </button>
          </div>

          {/* Interactive Search & Filter Controls */}
          <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] mb-10 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Keyword Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={hi ? 'शीर्षक, भाषा (Rust, React, Python) या कौशल द्वारा खोजें...' : 'Search by role title, tech stack (Rust, Go, Python, React), or keyword...'}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] hover:text-[var(--ink)]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Department Dropdown */}
              <div className="w-full md:w-64">
                <select
                  value={selectedDept}
                  onChange={e => setSelectedDept(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'All' ? (hi ? 'सभी विभाग (All Departments)' : 'All Departments') : dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Dropdown */}
              <div className="w-full md:w-64">
                <select
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>
                      {loc === 'All' ? (hi ? 'सभी स्थान (All Locations)' : 'All Locations') : loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings Grid */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)]">
              <Briefcase className="w-12 h-12 text-[var(--muted)] mx-auto mb-3 opacity-40" />
              <h3 className="text-lg font-bold text-[var(--ink)]">
                {hi ? 'कोई पद मेल नहीं खाया' : 'No matching positions found'}
              </h3>
              <p className="text-sm text-[var(--muted)] mt-1 max-w-md mx-auto">
                {hi ? 'कृपया अपने खोज फ़िल्टर बदलें या सामान्य इंजीनियरिंग पूल के लिए आवेदन करें।' : 'Try clearing your search query or submit a general speculative application.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDept('All');
                  setSelectedLocation('All');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded bg-[var(--surface)] text-[var(--accent)] hover:bg-[var(--line)] transition-colors"
              >
                {hi ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="p-6 sm:p-7 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] hover:border-[var(--accent)] transition-all shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--muted)] mb-2">
                      <span className="text-[var(--accent)]">{job.department}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-[var(--ink)]">
                        <MapPin className="w-3.5 h-3.5 text-[var(--muted)]" />
                        {job.location} ({job.type})
                      </span>
                      <span>·</span>
                      <span className="text-[var(--muted)]">{job.experience}</span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                      {job.title}
                    </h3>

                    <p className="text-sm text-[var(--text)] mt-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {job.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-xs rounded bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)] font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:text-right shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[var(--line)] flex flex-col justify-between items-start lg:items-end gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                        {hi ? 'पारदर्शी पारिश्रमिक' : 'Comp & Equity'}
                      </div>
                      <div className="text-sm font-bold text-emerald-600 font-mono mt-0.5">
                        {job.salaryUSD}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenApplication(job)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--accent)] text-white text-xs font-bold hover:bg-[var(--accent-hover)] transition-all shadow-sm active:scale-95"
                    >
                      {hi ? 'इस पद के लिए आवेदन करें' : 'Apply for this Role'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Transparent Interview Process */}
      <section className="py-20 lg:py-24 bg-[var(--surface)] border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              {hi ? 'साक्षात्कार प्रक्रिया' : 'Transparent Hiring Journey'}
            </div>
            <h2 className="text-3xl font-bold font-display text-[var(--ink)] mt-2">
              {hi ? 'कोई रहस्य नहीं, कोई लीटकोड नौटंकी नहीं — वास्तविक काम पर चर्चा' : 'Respectful, High-Signal & Fast: No LeetCode Tricks'}
            </h2>
            <p className="mt-3 text-base text-[var(--text)]">
              {hi
                ? 'हम आपके समय का सम्मान करते हैं। पूरी प्रक्रिया 2 सप्ताह से कम समय में पूरी होती है और हर चरण में स्पष्ट प्रतिक्रिया दी जाती है।'
                : 'We respect your time. Our hiring journey takes under 14 days from initial screen to final offer, focusing exclusively on real-world architecture, systems design, and craft.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: hi ? '30-मिनट अलाइनमेंट कॉल' : 'Alignment & Craft Conversation',
                duration: '30 mins',
                desc: hi ? 'हायरिंग मैनेजर के साथ पृष्ठभूमि, तकनीकी प्राथमिकताओं और आपसी उपयुक्तता पर खुली बातचीत।' : 'Casual 30-minute chat with your future squad lead about past triumphs, what gives you energy, and mutual fit.'
              },
              {
                step: '02',
                title: hi ? 'सिस्टम्स आर्किटेक्चर डीप-डाइव' : 'Practical Architecture Deep-Dive',
                duration: '60 mins',
                desc: hi ? 'एक वास्तविक एंटरप्राइज डिस्ट्रीब्यूटेड लेज़र या Quanta AI वर्कफ़्लो समस्या को एक साथ डिज़ाइन करना।' : 'Collaborative whiteboarding on a real-world Quantinox problem (e.g. designing idempotent double-entry or edge MES sync).'
              },
              {
                step: '03',
                title: hi ? 'टीम पेयर-प्रोग्रामिंग' : 'Team Pair-Programming',
                duration: '60 mins',
                desc: hi ? 'हमारी टीम के साथ एक वास्तविक कोडबेस फीचर या बग पर पेयरिंग — कोई कृत्रिम पहेलियां नहीं।' : 'Hands-on pairing on an open repo task with your prospective teammates using the tools and IDE you love.'
              },
              {
                step: '04',
                title: hi ? 'पारदर्शी प्रस्ताव व नेतृत्व वार्ता' : 'Executive Meet & Transparent Offer',
                duration: '48 hours turnaround',
                desc: hi ? 'अमन या मार्कस के साथ विज़न चर्चा और स्पष्ट इक्विटी व वेतन विवरण के साथ 48 घंटे में ऑफ़र।' : 'Meet co-founder Aman or CTO Priya, followed by a written offer with standardized, top-of-market equity & salary within 48h.'
              }
            ].map((p, idx) => (
              <div key={idx} className="p-6 rounded-[var(--radius)] bg-[var(--card)] border border-[var(--line)] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black font-display text-[var(--accent)] mb-3">
                    {p.step}
                  </div>
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    {p.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--muted)] mt-1">
                    {p.duration}
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-3 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Application Modal / Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--line)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--ink)] font-display">
                  {selectedJob 
                    ? (hi ? `आवेदन: ${selectedJob.title}` : `Apply for ${selectedJob.title}`)
                    : (hi ? 'सामान्य इंजीनियरिंग आवेदन' : 'General Speculative Application')}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  {selectedJob ? `${selectedJob.department} · ${selectedJob.location}` : 'Join the Quantinox Talent Network'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--line)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
              {submittedAppId ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-[var(--ink)]">
                    {hi ? 'आवेदन सफलतापूर्वक प्राप्त हुआ!' : 'Application Submitted Successfully!'}
                  </h4>
                  <p className="text-sm text-[var(--muted)] mt-2 max-w-md mx-auto">
                    {hi 
                      ? `धन्यवाद ${applicantName}! आपकी आवेदन संदर्भ संख्या ${submittedAppId} है। हमारी प्रतिभा टीम 48 घंटे के भीतर संपर्क करेगी।`
                      : `Thank you, ${applicantName}! Your application reference is ${submittedAppId}. A human squad lead reviews every profile and will follow up within 48 hours.`}
                  </p>
                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 rounded-[var(--radius-sm)] bg-[var(--accent)] text-white text-xs font-bold hover:bg-[var(--accent-hover)] transition-colors"
                    >
                      {hi ? 'बंद करें' : 'Done'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4 text-left">
                  {/* Role Selector if general or allow switching */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
                      {hi ? 'लक्षित पद' : 'Target Role'} *
                    </label>
                    <select
                      value={selectedJob?.id || 'general'}
                      onChange={e => {
                        const target = jobs.find(j => j.id === e.target.value);
                        setSelectedJob(target || null);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none"
                    >
                      <option value="general">{hi ? 'सामान्य इंजीनियरिंग आवेदन (General Application)' : 'General Speculative Application'}</option>
                      {jobs.map(j => (
                        <option key={j.id} value={j.id}>{j.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
                        {hi ? 'पूरा नाम' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={e => setApplicantName(e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
                        {hi ? 'ईमेल पता' : 'Email Address'} *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={e => setApplicantEmail(e.target.value)}
                        placeholder="alex@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
                        {hi ? 'फोन नंबर' : 'Phone Number'}
                      </label>
                      <input
                        type="tel"
                        value={applicantPhone}
                        onChange={e => setApplicantPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
                        LinkedIn / Portfolio
                      </label>
                      <input
                        type="url"
                        value={applicantLinkedin}
                        onChange={e => setApplicantLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
                      GitHub / GitLab / Personal Code Repo
                    </label>
                    <input
                      type="url"
                      value={applicantGithub}
                      onChange={e => setApplicantGithub(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none"
                    />
                  </div>

                  {/* Resume Upload Simulation */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
                      {hi ? 'बायोडाटा / रिज़्यूमे संलग्न करें (PDF या DOCX)' : 'Attach Resume / CV (PDF or DOCX)'}
                    </label>
                    <div className="flex items-center gap-3">
                      <label 
                        htmlFor={fileInputId}
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-sm)] border border-dashed border-[var(--line)] hover:border-[var(--accent)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] transition-colors"
                      >
                        <UploadCloud className="w-4 h-4 text-[var(--accent)]" />
                        {resumeFileName ? resumeFileName : (hi ? 'फ़ाइल चुनें...' : 'Select File...')}
                      </label>
                      <input
                        id={fileInputId}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      {resumeFileName && (
                        <button
                          type="button"
                          onClick={() => setResumeFileName('')}
                          className="text-xs text-rose-500 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-1">
                      {hi ? 'आपके बारे में या रुचि (वैकल्पिक)' : 'Why Quantinox & What You Love Building (Optional)'}
                    </label>
                    <textarea
                      rows={3}
                      value={applicantNote}
                      onChange={e => setApplicantNote(e.target.value)}
                      placeholder={hi ? 'आपने हाल ही में किस दिलचस्प सिस्टम या समस्या पर काम किया है?' : 'Tell us about an interesting distributed system, bug, or project you built recently...'}
                      className="w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--bg)] text-sm focus:border-[var(--accent)] outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-[var(--radius-sm)] bg-[var(--accent)] text-white font-bold text-sm hover:bg-[var(--accent-hover)] transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>{hi ? 'आवेदन भेजा जा रहा है...' : 'Transmitting Application...'}</span>
                      ) : (
                        <>
                          <span>{hi ? 'आवेदन सबमिट करें' : 'Submit Application'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-[var(--muted)] text-center pt-2">
                    {hi
                      ? 'हम किसी भी आवेदक के साथ लिंग, जाति या पृष्ठभूमि के आधार पर भेदभाव नहीं करते हैं।'
                      : 'Quantinox is an equal-opportunity builder. We hire purely on craft, clarity, and contribution.'}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

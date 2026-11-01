import React from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';

export const IndustryPage: React.FC<{ industryId: string }> = ({ industryId }) => {
  const { lang, setPage } = useApp();
  const hi = lang === 'hi';

  const industryData: Record<string, { title: { en: string; hi: string }; subtitle: { en: string; hi: string }; challenges: { en: string; hi: string }[]; capabilities: { en: string; hi: string }[] }> = {
    'industry-manufacturing': {
      title: { en: 'Cloud ERP for Industrial Manufacturing', hi: 'इंडस्ट्रियल मैन्युफ़ैक्चरिंग के लिए Cloud ERP' },
      subtitle: {
        en: 'Synchronize production schedules, machine telemetry, shop-floor quality, and inventory in real time.',
        hi: 'उत्पादन शेड्यूल, मशीन टेलीमेट्री, गुणवत्ता नियंत्रण और इन्वेंटरी को रियल टाइम में सिंक करें।',
      },
      challenges: [
        { en: 'Machine downtime and unpredictable spare parts delivery.', hi: 'मशीन ब्रेकडाउन और अनिश्चित स्पेयर पार्ट्स डिलीवरी।' },
        { en: 'Multi-level Bill of Materials (BOM) complexity and frequent design engineering changes.', hi: 'मल्टी-लेवल बिल ऑफ़ मटेरियल्स (BOM) और बार-बार होने वाले इंजीनियरिंग बदलाव।' },
        { en: 'Difficulty matching shop-floor actual costs to general ledger accounts.', hi: 'शॉप-फ़्लोर की वास्तविक लागत का लेज़र से सटीक मिलान न हो पाना।' },
      ],
      capabilities: [
        { en: 'Finite & Infinite capacity MRP scheduling algorithms', hi: 'परिमित व अपरिमित क्षमता MRP शेड्यूलिंग' },
        { en: 'IoT vibration & temperature sensor telemetry integration for predictive maintenance', hi: 'प्रेडिक्टिव मेंटेनेंस के लिए IoT सेंसर टेलीमेट्री' },
        { en: 'Barcode & RFID component traceability across shop floor kiosks', hi: 'शॉप फ़्लोर पर बारकोड व RFID कंपोनेंट ट्रेसिंग' },
        { en: 'Quanta AI production re-planning when lines experience emergency stop', hi: 'इमरजेंसी स्टॉप होने पर Quanta AI द्वारा तुरंत रि-प्लानिंग' },
      ],
    },
    'industry-retail': {
      title: { en: 'Cloud ERP for Retail & Unified Commerce', hi: 'रिटेल और यूनिफ़ाइड कॉमर्स के लिए Cloud ERP' },
      subtitle: {
        en: 'Connect retail stores, warehouse logistics, e-commerce channels, and centralized inventory.',
        hi: 'रिटेल स्टोर, वेयरहाउस लॉजिस्टिक्स, ई-कॉमर्स चैनल और केंद्रीकृत स्टॉक को एक साथ जोड़ें।',
      },
      challenges: [
        { en: 'Stockouts on fast-selling SKUs while dead inventory sits in regional stores.', hi: 'तेज़ बिकने वाले स्टॉक की कमी जबकि क्षेत्रीय दुकानों में अप्रयुक्त माल पड़ा रहना।' },
        { en: 'Disconnected POS, loyalty points, and online return reconciliations.', hi: 'बिखरे हुए POS, लॉयल्टी पॉइंट्स और ऑनलाइन रिटर्न का जटिल मिलान।' },
        { en: 'Margin leakage across complex promotional tiers and discount vouchers.', hi: 'जटिल डिस्काउंट और प्रोमोशन के कारण मार्जिन का क्षरण।' },
      ],
      capabilities: [
        { en: 'Unified inventory view with real-time available-to-promise across all outlets', hi: 'सभी आउटलेट्स में रीयल-टाइम स्टॉक विजिबिलिटी' },
        { en: 'Automatic replenishment orders triggered by POS sell-through velocities', hi: 'POS बिक्री की गति से चलने वाले स्वचालित पुनःपूर्ति आदेश' },
        { en: 'Omnichannel returns and store-pickup order routing', hi: 'ओमनीचैनल रिटर्न और स्टोर-पिकअप ऑर्डर रूटिंग' },
        { en: 'Quanta AI inventory rebalancing across high-velocity micro-fulfillment hubs', hi: 'हाई-डिमांड हब्स के बीच Quanta AI इन्वेंटरी रीबैलेंसिंग' },
      ],
    },
    'industry-wholesale': {
      title: { en: 'Cloud ERP for Wholesale Distribution', hi: 'होलसेल डिस्ट्रीब्यूशन के लिए Cloud ERP' },
      subtitle: {
        en: 'Maximize bulk trading margins, manage supplier rebates, and optimize multi-warehouse distribution.',
        hi: 'थोक ट्रेडिंग मार्जिन बढ़ाएँ, सप्लायर रिबेट्स संभालें और मल्टी-वेयरहाउस वितरण अनुकूलित करें।',
      },
      challenges: [
        { en: 'Narrow wholesale margins vulnerable to fluctuating freight and commodity costs.', hi: 'कच्चे माल और भाड़े के उतार-चढ़ाव से थोक मार्जिन पर सीधा असर।' },
        { en: 'Complex retroactive vendor volume rebates tracked on fragmented spreadsheets.', hi: 'स्प्रेडशीट पर बिखरे हुए वेंडर वॉल्यूम रिबेट्स का प्रबंधन।' },
        { en: 'Warehouse congestion and slow pick-pack-ship cycle times.', hi: 'वेयरहाउस में जाम और पिक-पैक-शिप की धीमी गति।' },
      ],
      capabilities: [
        { en: 'Automated vendor volume rebate accruals and settlement tracking', hi: 'स्वचालित वेंडर रिबेट एक्रुअल्स और सेटलमेंट ट्रैकिंग' },
        { en: 'Dynamic wave and batch picking routes inside distribution centers', hi: 'डिस्ट्रीब्यूशन सेंटरों में डायनामिक वेव और बैच पिकिंग' },
        { en: 'Direct B2B dealer ordering portal with customer-specific price books', hi: 'डीलरों के लिए व्यक्तिगत मूल्य सूची वाला सीधा B2B पोर्टल' },
        { en: 'Quanta AI supplier confirmation and alternative source finder', hi: 'सप्लायर पुष्टि व वैकल्पिक आपूर्तिकर्ता खोजने वाला Quanta AI एजेंट' },
      ],
    },
    'industry-life-sciences': {
      title: { en: 'Cloud ERP for Life Sciences & Pharma', hi: 'लाइफ़ साइंसेज़ और फ़ार्मा के लिए Cloud ERP' },
      subtitle: {
        en: 'Ensure GMP compliance, automated batch release, expiration dating, and global validation.',
        hi: 'GMP अनुपालन, स्वचालित बैच रिलीज़, समाप्ति तिथि प्रबंधन और वैश्विक सत्यापन सुनिश्चित करें।',
      },
      challenges: [
        { en: 'Strict regulatory audits and electronic record integrity requirements (21 CFR Part 11).', hi: 'सख्त नियामक ऑडिट और इलेक्ट्रॉनिक रिकॉर्ड सुरक्षा आवश्यकताएँ।' },
        { en: 'Perishable active ingredient batch tracking and recall vulnerability.', hi: 'सक्रिय सामग्री की सीमित शेल्फ-लाइफ और रिकॉल का जोखिम।' },
        { en: 'Complex quality inspection approvals delaying product shipping.', hi: 'जटिल गुणवत्ता निरीक्षण मंज़ूरी से शिपमेंट में देरी।' },
      ],
      capabilities: [
        { en: 'Complete electronic batch records (eBR) and digital signatures', hi: 'पूर्ण इलेक्ट्रॉनिक बैच रिकॉर्ड (eBR) और डिजिटल हस्ताक्षर' },
        { en: 'FEFO (First-Expired, First-Out) inventory allocation engine', hi: 'समाप्ति तिथि आधारित FEFO स्टॉक आवंटन' },
        { en: 'Automated certificate of analysis (CoA) capture and release workflows', hi: 'स्वचालित विश्लेषण प्रमाणपत्र (CoA) और रिलीज़ वर्कफ़्लो' },
        { en: 'Built-in audit trail with change logging on every critical operational field', hi: 'हर महत्वपूर्ण ऑपरेशनल फ़ील्ड पर अपरिवर्तनीय ऑडिट ट्रेल' },
      ],
    },
    'industry-professional-services': {
      title: { en: 'Cloud ERP for Professional Services Firms', hi: 'प्रोफ़ेशनल सर्विसेज़ फ़र्मों के लिए Cloud ERP' },
      subtitle: {
        en: 'Maximize billable resource utilization, automate project accounting, and accelerate milestone billing.',
        hi: 'बिल करने योग्य कर्मचारियों का उपयोग अधिकतम करें और माइलस्टोन बिलिंग को गति दें।',
      },
      challenges: [
        { en: 'Suboptimal consultant utilization and delayed timesheet submissions.', hi: 'कंसल्टेंट उपयोग का कम होना और लेट टाइमशीट सबमिशन।' },
        { en: 'Revenue leakage due to unbilled out-of-scope project expenses.', hi: 'प्रोजेक्ट के अतिरिक्त खर्चों की बिलिंग छूट जाने से राजस्व हानि।' },
        { en: 'Inaccurate fixed-price project cost forecasting.', hi: 'फिक्स्ड-प्राइस प्रोजेक्ट्स की लागत का गलत अनुमान।' },
      ],
      capabilities: [
        { en: 'Resource staffing matrix with skills-based matching', hi: 'हुनर-आधारित स्टाफिंग मैट्रिक्स और उपलब्धता शेड्यूलिंग' },
        { en: 'Mobile receipt capture and automated milestone billing triggers', hi: 'मोबाइल रसीद स्कैनिंग और माइलस्टोन बिलिंग ट्रिगर' },
        { en: 'Real-time project margin and burn-rate tracking against contract caps', hi: 'अनुबंध सीमा के विरुद्ध लाइव प्रोजेक्ट मार्जिन और बर्न-रेट' },
        { en: 'Quanta AI staffing optimization and invoice reconciliation', hi: 'Quanta AI स्टाफिंग अनुकूलन और इनवॉइस मिलान' },
      ],
    },
  };

  if (industryId === 'industries') {
    // All 30 industries master overview
    return (
      <main id="main">
        <section className="hero hero-sub">
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="pill">{hi ? 'उद्योग समाधान' : 'Industry Solutions'}</span>
              <h1 className="display-sm">{hi ? '30 उद्योगों के लिए विशेष रूप से डिज़ाइन' : 'Engineered for 30 Specialized Industries'}</h1>
              <p className="lead">
                {hi
                  ? 'सामान्य ERP के बजाय अपनी उद्योग-विशिष्ट शब्दावली, अनुपालन और प्रक्रियाओं के साथ शुरुआत करें।'
                  : 'Start with pre-built best practices, statutory rules and process workflows tailored to your sector.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { title: 'Industrial Manufacturing', desc: 'Machinery, automotive, aerospace and discrete fabrication.', page: 'industry-manufacturing' },
                { title: 'Retail & Omnichannel', desc: 'Unified commerce, retail stores, e-commerce and POS.', page: 'industry-retail' },
                { title: 'Wholesale Distribution', desc: 'B2B bulk trading, rebates, logistics and supply chain.', page: 'industry-wholesale' },
                { title: 'Life Sciences & Pharma', desc: 'Batch traceability, GMP validation, FEFO and regulatory compliance.', page: 'industry-life-sciences' },
                { title: 'Professional Services', desc: 'Consulting, legal, agencies, timesheets and milestone billing.', page: 'industry-professional-services' },
                { title: 'Energy, Oil & Utilities', desc: 'Transmission grid, predictive asset care, pipeline maintenance and contracts.', page: 'industries' },
                { title: 'Chemicals & Process', desc: 'Recipe management, hazardous material logistics and batch formulas.', page: 'industries' },
                { title: 'Banking & Financial NBFCs', desc: 'Treasury operations, multi-entity books, lending and statutory reporting.', page: 'industries' },
                { title: 'Public Sector & Healthcare', desc: 'Patient logistics, public procurement, grants and fund accounting.', page: 'industries' },
              ].map((ind, idx) => (
                <div key={idx} className="card" style={{ padding: '24px' }}>
                  <h3 className="h3" style={{ fontSize: '18px', marginBottom: '8px' }}>{ind.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>{ind.desc}</p>
                  <button
                    type="button"
                    className="link-arrow"
                    onClick={() => setPage(ind.page as PageId)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
                  >
                    {hi ? 'विस्तार से देखें →' : 'Explore industry suite →'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  const current = industryData[industryId] || industryData['industry-manufacturing'];

  return (
    <main id="main">
      <section className="hero hero-sub">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill">{hi ? 'उद्योग विशेषज्ञता' : 'Industry Focus'}</span>
            <h1 className="display-sm">{current.title[lang]}</h1>
            <p className="lead">{current.subtitle[lang]}</p>
            <div className="btn-row">
              <button type="button" className="btn btn-lg btn-primary" onClick={() => setPage('demo')}>
                {hi ? 'इस उद्योग का डेमो बुक करें' : 'Book Industry Demo'}
              </button>
              <button type="button" className="btn btn-lg btn-outline" onClick={() => setPage('pricing')}>
                {hi ? 'कीमतें देखें' : 'See Pricing'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {/* Challenges */}
            <div className="card" style={{ padding: '32px' }}>
              <p className="eyebrow" style={{ color: 'var(--warn)' }}>{hi ? 'उद्योग की चुनौतियाँ' : 'Sector Challenges'}</p>
              <h2 className="h3" style={{ marginBottom: '20px' }}>
                {hi ? 'पारंपरिक ERP कहाँ असफल होते हैं' : 'Where Generic ERPs Fall Short'}
              </h2>
              <ul className="bullets" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {current.challenges.map((c, idx) => (
                  <li key={idx} style={{ fontSize: '15px' }}>{c[lang]}</li>
                ))}
              </ul>
            </div>

            {/* Quantinox Capabilities */}
            <div className="card" style={{ padding: '32px', borderLeft: '6px solid var(--accent)' }}>
              <p className="eyebrow">{hi ? 'Quantinox समाधान' : 'Quantinox Solution'}</p>
              <h2 className="h3" style={{ marginBottom: '20px' }}>
                {hi ? 'बिल्ट-इन सर्वोत्तम प्रक्रियाएँ' : 'Embedded Industry Capabilities'}
              </h2>
              <ul className="bullets" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {current.capabilities.map((c, idx) => (
                  <li key={idx} style={{ fontSize: '15px' }}>{c[lang]}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <button type="button" className="btn btn-lg btn-primary" onClick={() => setPage('demo')}>
              {hi ? 'इंडस्ट्री विशेषज्ञ से बात करें' : 'Talk with an Industry Solution Specialist'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export const IndustryDetailPage = IndustryPage;

export const IndustryHubPage: React.FC = () => {
  const { lang, setPage } = useApp();
  const hi = lang === 'hi';

  const sectors = [
    { id: 'industry-manufacturing', title: hi ? 'इंडस्ट्रियल मैन्युफ़ैक्चरिंग' : 'Industrial Manufacturing', desc: hi ? 'उत्पादन, मशीन शेड्यूलिंग और शॉप-फ़्लोर' : 'Precision engineering, automotive, MRP, IoT & shop-floor MES' },
    { id: 'industry-retail', title: hi ? 'रिटेल और यूनिफ़ाइड कॉमर्स' : 'Retail & Omnichannel Commerce', desc: hi ? 'POS, मल्टी-स्टोर इन्वेंटरी और ई-कॉमर्स' : 'POS integration, omnichannel replenishment, automated promotions' },
    { id: 'industry-wholesale', title: hi ? 'थोक व्यापार और वितरण' : 'Wholesale & Distribution', desc: hi ? 'मल्टी-वेयरहाउस लॉजिस्टिक्स और 3PL' : '3PL integration, cross-docking, automated vendor drop-shipping' },
    { id: 'industry-life-sciences', title: hi ? 'लाइफ़ साइंसेज और फार्मा' : 'Life Sciences & Pharma', desc: hi ? 'FDA 21 CFR Part 11 और इलेक्ट्रॉनिक बैच रिकॉर्ड' : '21 CFR Part 11 compliance, electronic batch records & cold chain' },
    { id: 'industry-professional-services', title: hi ? 'प्रोफेशनल सर्विसेज़ और IT' : 'Professional Services & IT', desc: hi ? 'प्रोजेक्ट बिलिंग और रिसोर्स यूटिलाइजेशन' : 'Time & material billing, PSA resource scheduling & milestone revenue' },
  ];

  return (
    <main className="main-content">
      <section className="hero">
        <div className="container">
          <div className="hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow">{hi ? 'उद्योग समाधान' : 'Industry Solutions'}</p>
            <h1 className="h1">{hi ? '30+ उद्योगों के लिए विशिष्ट ERP' : 'Engineered for 30+ Enterprise Verticals'}</h1>
            <p className="lead">
              {hi
                ? 'बिना जटिल कस्टमाइज़ेशन के अपने उद्योग की विशिष्ट आवश्यकताओं को पूरा करें।'
                : 'Pre-configured chart of accounts, compliance engines, and Quanta AI agents customized for your exact sector.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {sectors.map((s) => (
              <div key={s.id} className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{s.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>{s.desc}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setPage(s.id as any)}
                  style={{ alignSelf: 'flex-start' }}
                >
                  {hi ? 'विस्तार से देखें →' : 'Explore Industry Blueprint →'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};


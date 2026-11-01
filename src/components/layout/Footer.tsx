import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { StorageService } from '../../services/storage';

export const Footer: React.FC = () => {
  const { lang, toggleLang, setPage, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid work email', 'error');
      return;
    }
    StorageService.addLead({
      lead_type: 'newsletter',
      name: newsletterEmail.split('@')[0],
      email: newsletterEmail.trim(),
      lang,
    });
    setNewsletterSent(true);
    setNewsletterEmail('');
    showToast('Subscribed to the Quantinox newsletter!', 'success');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" style={{ background: 'var(--dark)', color: '#A9B2C7', padding: '64px 0 32px', borderTop: '1px solid #252D45' }}>
      <div className="container">
        {/* Newsletter & Headline row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '32px', paddingBottom: '48px', borderBottom: '1px solid #252D45', marginBottom: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', marginBottom: '8px' }}>
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <rect x="1" y="1" width="34" height="34" rx="9" fill="#2F54EB" />
                <circle cx="17" cy="17" r="8" fill="none" stroke="#FFFFFF" strokeWidth="3" />
                <path d="M21 21 L27 27" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', letterSpacing: '0.04em' }}>
                QUANTINOX IT TECHNOLOGY
              </span>
            </div>
            <p style={{ maxWidth: '480px', color: '#8A95AF', fontSize: '14px' }}>
              {lang === 'en'
                ? 'Intelligent Cloud ERP built with native Quanta AI agents to automate and run finance, manufacturing, supply chain and operations.'
                : 'फ़ाइनेंस, मैन्युफ़ैक्चरिंग, सप्लाई चेन और ऑपरेशंस को स्वचालित करने के लिए बिल्ट-इन Quanta AI एजेंटों के साथ इंटेलिजेंट क्लाउड ERP।'}
            </p>
          </div>

          <form onSubmit={handleNewsletter} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', minWidth: '300px' }}>
            {newsletterSent ? (
              <span style={{ color: '#7FE3CF', fontWeight: 600, fontSize: '14px' }}>
                {lang === 'en' ? '✓ You are subscribed to our monthly ERP briefing.' : '✓ आप हमारे मासिक ERP ब्रीफ़िंग के सदस्य बन गए हैं।'}
              </span>
            ) : (
              <>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={lang === 'en' ? 'Your work email for updates' : 'अपडेट के लिए अपना कार्य ईमेल'}
                  required
                  style={{ background: '#131A2E', border: '1px solid #252D45', color: '#fff', borderRadius: '10px', padding: '0 16px', minHeight: '44px', minWidth: '240px' }}
                />
                <button type="submit" className="btn btn-primary">
                  {lang === 'en' ? 'Subscribe' : 'सब्सक्राइब करें'}
                </button>
              </>
            )}
          </form>
        </div>

        {/* Multi-column navigation links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', marginBottom: '48px', fontSize: '14px' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
              {lang === 'en' ? 'Applications' : 'एप्लिकेशन'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['finance', 'supply-chain', 'manufacturing', 'procurement', 'sales', 'services', 'asset-management', 'hr'].map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setPage(id as PageId)}
                    style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit', textAlign: 'left' }}
                  >
                    {id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
              {lang === 'en' ? 'Quanta AI & Platform' : 'Quanta AI व प्लेटफ़ॉर्म'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button type="button" onClick={() => setPage('ai')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Quanta AI Assistant
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('ai-advisor')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  AI Solution Advisor
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('platform')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Quantinox Platform
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('tour')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Product Tour
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('value-calculator')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Value Calculator
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
              {lang === 'en' ? 'Industries' : 'उद्योग'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button type="button" onClick={() => setPage('industry-manufacturing')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Industrial Manufacturing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('industry-retail')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Retail & Omnichannel
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('industry-wholesale')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Wholesale Distribution
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('industry-life-sciences')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Life Sciences & Pharma
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('industry-professional-services')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Professional Services
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('industries')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  All 30 Industries
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
              {lang === 'en' ? 'Resources & Company' : 'संसाधन व कंपनी'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button type="button" onClick={() => setPage('customers')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Customer Stories
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('resources')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  ERP Buyer's Checklist
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('events')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Events & Webinars
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('pricing')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Plans & Pricing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('company')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  {lang === 'en' ? 'Company Overview' : 'कंपनी अवलोकन'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('company')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  {lang === 'en' ? 'About Quantinox' : 'हमारे बारे में'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('csr')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  {lang === 'en' ? 'Sustainability & CSR' : 'सस्टेनेबिलिटी व CSR'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('investor-relations')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  {lang === 'en' ? 'Investor Relations' : 'निवेशक संबंध'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('careers')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  {lang === 'en' ? 'Careers & Culture' : 'करियर व संस्कृति'}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setPage('contact')} style={{ background: 'none', border: 'none', color: '#A9B2C7', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  {lang === 'en' ? 'Contact Us' : 'संपर्क करें'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright, legal & language toggle */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', paddingTop: '24px', borderTop: '1px solid #252D45', fontSize: '13px' }}>
          <div>
            © {currentYear} Quantinox IT Technology. All rights reserved.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <button type="button" onClick={() => setPage('privacy')} style={{ background: 'none', border: 'none', color: '#8A95AF', cursor: 'pointer', padding: 0, font: 'inherit' }}>
              Privacy Policy
            </button>
            <button type="button" onClick={() => setPage('terms')} style={{ background: 'none', border: 'none', color: '#8A95AF', cursor: 'pointer', padding: 0, font: 'inherit' }}>
              Terms of Use
            </button>
            <button type="button" onClick={() => setPage('accessibility')} style={{ background: 'none', border: 'none', color: '#8A95AF', cursor: 'pointer', padding: 0, font: 'inherit' }}>
              Accessibility
            </button>
            <button type="button" onClick={() => setPage('legal')} style={{ background: 'none', border: 'none', color: '#8A95AF', cursor: 'pointer', padding: 0, font: 'inherit' }}>
              Legal Notice
            </button>
            <button
              type="button"
              onClick={toggleLang}
              style={{ background: '#1D253B', border: '1px solid #36415F', color: '#fff', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', font: 'inherit' }}
            >
              {lang === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

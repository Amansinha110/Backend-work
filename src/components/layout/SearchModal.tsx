import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';

interface SearchItem {
  label: string;
  context: string;
  page: PageId;
  hash?: string;
  keywords: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  { label: 'Financial Management', context: 'Products › Applications', page: 'finance', keywords: 'accounting ledger general ledger gst taxes close receivables payables treasury cash flow balance sheet' },
  { label: 'Spend & Procurement', context: 'Products › Applications', page: 'procurement', keywords: 'purchase orders requisitions vendor supplier spend 3-way matching contract buying' },
  { label: 'Supply Chain Management', context: 'Products › Applications', page: 'supply-chain', keywords: 'inventory warehouse stock logistics delivery batch tracking serial available to promise' },
  { label: 'Manufacturing', context: 'Products › Applications', page: 'manufacturing', keywords: 'mrp production shop floor bom bill of materials work orders quality control machine variant configuration' },
  { label: 'Sales & Billing', context: 'Products › Applications', page: 'sales', keywords: 'quote to cash crm order fulfillment subscriptions contracts discounts revenue recognition' },
  { label: 'Projects & Services', context: 'Products › Applications', page: 'services', keywords: 'timesheets billable consulting project management resource staffing milestone billing' },
  { label: 'Asset Management', context: 'Products › Applications', page: 'asset-management', keywords: 'preventive maintenance work orders machine breakdown iot field service equipment technical registry' },
  { label: 'People & HR', context: 'Products › Applications', page: 'hr', keywords: 'payroll salary employee attendance leave hiring statutory compliance tax provident fund pf' },
  { label: 'Quantinox Platform', context: 'Platform', page: 'platform', keywords: 'cloud infrastructure api integrations security low code extensibility analytics tenant isolation' },
  { label: 'Quanta AI Assistant & Agents', context: 'Artificial Intelligence', page: 'ai', keywords: 'quanta ai assistant conversational chat autonomous agents agent builder audit trail' },
  { label: 'AI Solution Advisor', context: 'AI & Planning', page: 'ai-advisor', keywords: 'advisor plan recommendation phased rollout quick wins erp scoping sizing' },
  { label: 'Product Tour', context: 'Explore', page: 'tour', keywords: 'tour interactive screens walk through walkthrough live demo' },
  { label: 'Business Value Calculator', context: 'Tools', page: 'value-calculator', keywords: 'roi calculator savings financial savings cost reduction hours saved fte' },
  { label: 'Pricing & Packages', context: 'Plans', page: 'pricing', keywords: 'pricing cost license fees finance essentials business suite enterprise private per user per month' },
  { label: 'Book a Live Demo', context: 'Sales', page: 'demo', keywords: 'book demo live demonstration contact sales talk to team schedule meeting' },
  { label: 'Request a Free Trial', context: 'Try', page: 'trials', keywords: 'trial sandbox test environment sample company data free account' },
  { label: 'Industrial Manufacturing', context: 'Industries', page: 'industry-manufacturing', keywords: 'machinery automotive fabrication aerospace defense precision discrete manufacturing' },
  { label: 'Retail & Omnichannel', context: 'Industries', page: 'industry-retail', keywords: 'retail pos stores omnichannel e-commerce inventory unified commerce' },
  { label: 'Wholesale Distribution', context: 'Industries', page: 'industry-wholesale', keywords: 'wholesale distribution logistics supply chain margin trading b2b delivery' },
  { label: 'Life Sciences & Pharma', context: 'Industries', page: 'industry-life-sciences', keywords: 'pharma life sciences batch tracking fda compliance gmp validation expiry' },
  { label: 'Professional Services', context: 'Industries', page: 'industry-professional-services', keywords: 'consulting legal accounting it agencies staffing billable utilization' },
  { label: 'Company Overview & Mission', context: 'About', page: 'company', keywords: 'company about quantinox history mission story founded enterprise values heritage' },
  { label: 'Executive Leadership & Board', context: 'About › Company', page: 'company', hash: 'leadership', keywords: 'leadership board executives aman sinha priya ramanathan marcus vance elena rostova founders' },
  { label: 'Global Offices & Locations', context: 'About › Company', page: 'company', hash: 'locations', keywords: 'offices locations headquarters mumbai san jose london singapore contact address' },
  { label: 'Trust & Security Certifications', context: 'About › Company', page: 'company', hash: 'trust', keywords: 'trust security compliance iso 27001 soc 2 fda 21 cfr part 11 esg certifications' },
  { label: 'Corporate Social Responsibility (CSR)', context: 'About', page: 'csr', keywords: 'csr corporate social responsibility sustainability green environment community carbon ngo fellowship grants esg' },
  { label: 'Investor Relations & Stock (QNTX)', context: 'About › Company', page: 'investor-relations', keywords: 'investor relations stock qntx nasdaq nse share price financial results earnings annual report arr nrr ebitda revenue sec sebi filings' },
  { label: 'Careers & Engineering Openings', context: 'Company › Careers', page: 'careers', keywords: 'careers jobs hiring engineers culture opportunities open positions rust python react systems devops salary benefits apply' },
  { label: 'Customer Stories', context: 'Case Studies', page: 'customers', keywords: 'case studies customer stories testimonials results benchmark proof' },
  { label: 'Resource Library', context: 'Downloads', page: 'resources', keywords: 'erp buyers checklist whitepaper pdf download guides' },
  { label: 'Customer Support & Status', context: 'Support', page: 'support', keywords: 'support help desk tickets system status knowledge base release notes' },
  { label: 'Customer Account Login', context: 'Account', page: 'login', keywords: 'login sign in access account credentials password' },
  { label: 'Customer Registration', context: 'Account', page: 'signup', keywords: 'sign up create account register join' },
  { label: 'Admin Portal', context: 'System', page: 'admin', keywords: 'admin portal leads crm settings audit user management' },
];

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, setPage, lang } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/).filter(Boolean);

  const results = terms.length
    ? SEARCH_ITEMS.filter((item) => {
        const text = `${item.label} ${item.context} ${item.keywords}`.toLowerCase();
        return terms.every((t) => text.includes(t));
      }).slice(0, 8)
    : SEARCH_ITEMS.slice(0, 6);

  const handleSelect = (item: SearchItem) => {
    setSearchOpen(false);
    setPage(item.page);
    if (item.hash) {
      setTimeout(() => {
        const el = document.getElementById(item.hash!);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search the site"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSearchOpen(false);
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(11, 16, 32, 0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 16px',
      }}
    >
      <div
        className="search-box"
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'var(--card)',
          borderRadius: '16px',
          border: '1px solid var(--line)',
          boxShadow: '0 24px 60px rgba(11, 16, 32, 0.25)',
          overflow: 'hidden',
        }}
      >
        <div
          className="search-field"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={lang === 'en' ? 'Search products, modules, industries, pricing…' : 'प्रोडक्ट, मॉड्यूल, उद्योग, कीमतें खोजें…'}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '17px',
              color: 'var(--ink)',
            }}
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            style={{
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              borderRadius: '6px',
              padding: '2px 8px',
              fontSize: '12px',
              color: 'var(--muted)',
              cursor: 'pointer',
            }}
          >
            Esc
          </button>
        </div>

        <ul className="search-results" style={{ listStyle: 'none', margin: 0, padding: '12px 0', maxHeight: '420px', overflowY: 'auto' }}>
          {results.length === 0 ? (
            <li style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', fontSize: '15px' }}>
              {lang === 'en' ? 'No matches found. Try asking Quanta AI or book a demo.' : 'कोई मेल नहीं मिला। Quanta AI से पूछें या डेमो बुक करें।'}
            </li>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <li key={idx} style={{ padding: '0 8px' }}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: isSelected ? 'var(--accent-tint)' : 'transparent',
                      border: 'none',
                      color: isSelected ? 'var(--accent)' : 'var(--ink)',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <strong style={{ display: 'block', fontSize: '15px', fontWeight: 600 }}>{item.label}</strong>
                      <small style={{ color: 'var(--muted)', fontSize: '12px' }}>{item.context}</small>
                    </div>
                    <span style={{ fontSize: '18px', color: 'var(--muted)' }}>→</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

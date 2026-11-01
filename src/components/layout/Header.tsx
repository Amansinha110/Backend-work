import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { NAV_ITEMS, STRINGS } from '../../data/content';
import { PageId } from '../../types';

export const Header: React.FC = () => {
  const { lang, toggleLang, theme, toggleTheme, page, setPage, setAssistantOpen, setSearchOpen, customer, admin, logoutCustomer } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const t = STRINGS[lang];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleNavClick = (pageId: PageId, href?: string) => {
    setActiveMega(null);
    setMobileMenuOpen(false);
    if (pageId) {
      setPage(pageId);
      if (href && href.includes('#')) {
        const hash = href.split('#')[1];
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skipToContent}
      </a>

      {/* Top bar */}
      <div className="topbar">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
          <span>{t.topbarNotice}</span>
          <div className="topbar-links" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setPage('pricing')}
              style={{ background: 'none', border: 'none', color: '#C9D1E3', cursor: 'pointer', padding: 0, font: 'inherit' }}
            >
              {t.pricing}
            </button>
            <button
              type="button"
              onClick={() => setPage('demo')}
              style={{ background: 'none', border: 'none', color: '#C9D1E3', cursor: 'pointer', padding: 0, font: 'inherit' }}
            >
              {t.contactSales}
            </button>
            <button
              type="button"
              onClick={() => setPage('digital-twin')}
              style={{ background: 'rgba(47, 84, 235, 0.25)', border: '1px solid #36415F', color: '#7FE3CF', cursor: 'pointer', padding: '2px 8px', borderRadius: '4px', font: 'inherit', fontSize: '11px', fontWeight: 600 }}
            >
              ✦ 3D Digital Twin
            </button>
            <button
              type="button"
              onClick={() => setPage('gemini-chat')}
              style={{ background: 'rgba(127, 227, 207, 0.15)', border: '1px solid #252D45', color: '#FFFFFF', cursor: 'pointer', padding: '2px 8px', borderRadius: '4px', font: 'inherit', fontSize: '11px', fontWeight: 600 }}
            >
              Gemini AI Chat
            </button>

            {customer ? (
              <>
                <button
                  type="button"
                  onClick={() => setPage('account')}
                  style={{ background: 'none', border: 'none', color: '#7FE3CF', cursor: 'pointer', padding: 0, font: 'inherit', fontWeight: 600 }}
                >
                  {customer.firstName} ({t.myAccount})
                </button>
                <button
                  type="button"
                  onClick={logoutCustomer}
                  style={{ background: 'none', border: 'none', color: '#C9D1E3', cursor: 'pointer', padding: 0, font: 'inherit' }}
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setPage('signup')}
                  style={{ background: 'none', border: 'none', color: '#C9D1E3', cursor: 'pointer', padding: 0, font: 'inherit' }}
                >
                  {t.signup}
                </button>
                <button
                  type="button"
                  onClick={() => setPage('login')}
                  style={{ background: 'none', border: 'none', color: '#C9D1E3', cursor: 'pointer', padding: 0, font: 'inherit' }}
                >
                  {t.login}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setPage('admin')}
              style={{ background: 'none', color: admin ? '#7F99FF' : '#8A95AF', cursor: 'pointer', padding: '2px 8px', borderRadius: '4px', border: '1px solid #36415F', font: 'inherit', fontSize: '11px' }}
            >
              {admin ? `Admin: ${admin.name}` : 'Admin Portal'}
            </button>

            {/* Language Switch */}
            <button
              type="button"
              className="lang-switch"
              onClick={toggleLang}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 600, padding: 0, font: 'inherit' }}
            >
              {lang === 'en' ? 'हिन्दी' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner" ref={navRef}>
          <button
            type="button"
            className="brand"
            onClick={() => handleNavClick('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
            aria-label="Quantinox IT Technology home"
          >
            <svg className="brand-mark" viewBox="0 0 36 36" aria-hidden="true" focusable="false">
              <rect x="1" y="1" width="34" height="34" rx="9" fill="#2F54EB" />
              <circle cx="17" cy="17" r="8" fill="none" stroke="#FFFFFF" strokeWidth="3" />
              <path d="M21 21 L27 27" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="brand-text">
              <span className="brand-name">{t.brandName}</span>
              <span className="brand-sub">{t.brandSub}</span>
            </span>
          </button>

          {/* Quick Action Icon Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Ask Quanta AI */}
            <button
              className="theme-toggle ai-toggle"
              type="button"
              onClick={() => setAssistantOpen(true)}
              aria-expanded="false"
              aria-label={t.askAiAria}
              title={t.askAiAria}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
              </svg>
            </button>

            {/* Search */}
            <button
              className="theme-toggle search-toggle"
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t.searchSiteAria}
              title={t.searchSiteAria}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>

            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={t.themeToggleAria}
              title={t.themeToggleAria}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? (
                <svg className="i-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg className="i-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
              )}
            </button>

            {/* Mobile Nav Toggle */}
            <button
              className="nav-toggle"
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="nav-panel"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>

          {/* Navigation Panel */}
          <div className={`nav-panel ${mobileMenuOpen ? 'is-open' : ''}`} id="nav-panel">
            <nav className="main-nav" aria-label="Main">
              <ul>
                {NAV_ITEMS.map((item) => {
                  const isOpen = activeMega === item.id;
                  const cols = item.cols[lang];
                  return (
                    <li
                      key={item.id}
                      className={`has-menu ${item.isNarrow ? 'is-narrow' : ''} ${isOpen ? 'is-open' : ''}`}
                      onMouseEnter={() => setActiveMega(item.id)}
                      onMouseLeave={() => setActiveMega(null)}
                    >
                      <button
                        className="menu-trigger"
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setActiveMega(isOpen ? null : item.id)}
                      >
                        {item.label[lang]}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {isOpen && (
                        <div className={`mega ${item.isNarrow ? '' : 'mega-wide'}`} id={`menu-${item.id}`}>
                          <div className="mega-cols" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length}, 1fr)`, gap: '24px' }}>
                            {cols.map((col, idx) => (
                              <div className="mega-col" key={idx}>
                                {col.href ? (
                                  <button
                                    type="button"
                                    className="mega-head"
                                    onClick={() => handleNavClick((col.items && col.items[0] ? col.items[0].page : 'products') as PageId)}
                                    style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                                  >
                                    {col.title}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M9 6l6 6-6 6" />
                                    </svg>
                                  </button>
                                ) : (
                                  <p className="mega-head">{col.title}</p>
                                )}

                                {col.groups ? (
                                  col.groups.map((grp, gIdx) => (
                                    <React.Fragment key={gIdx}>
                                      {grp.name && <p className="mega-group">{grp.name}</p>}
                                      <ul className="mega-list is-sub">
                                        {grp.items.map((sub, sIdx) => (
                                          <li key={sIdx}>
                                            <button
                                              type="button"
                                              onClick={() => handleNavClick(sub.page as PageId)}
                                              style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', padding: 0, font: 'inherit' }}
                                            >
                                              {sub.label}
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    </React.Fragment>
                                  ))
                                ) : (
                                  <ul className="mega-list">
                                    {(col.items || []).map((sub, sIdx) => (
                                      <li key={sIdx}>
                                        <button
                                          type="button"
                                          onClick={() => handleNavClick(sub.page as PageId)}
                                          style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', padding: 0, font: 'inherit' }}
                                        >
                                          {sub.label}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>

                          {item.footerText && item.footerLink && (
                            <div className="mega-foot">
                              <span>
                                {item.footerText[lang]}{' '}
                                <button
                                  type="button"
                                  onClick={() => handleNavClick(item.footerLink![lang].page as PageId)}
                                  style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', padding: 0, font: 'inherit' }}
                                >
                                  {item.footerLink![lang].label} <span aria-hidden="true">→</span>
                                </button>
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="header-actions">
              {customer ? (
                <button type="button" className="btn btn-outline" onClick={() => handleNavClick('account')}>
                  {t.myAccount}
                </button>
              ) : (
                <button type="button" className="btn btn-outline" onClick={() => handleNavClick('login')}>
                  {t.login}
                </button>
              )}
              <button type="button" className="btn btn-primary" onClick={() => handleNavClick('demo')}>
                {t.bookDemo}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

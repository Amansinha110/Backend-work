import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { QuantaAssistant } from './components/assistant/QuantaAssistant';

// Pages
import { HomePage } from './pages/HomePage';
import { ModulePage } from './pages/ModulePage';
import { AiAdvisorPage } from './pages/AiAdvisorPage';
import { ValueCalculatorPage } from './pages/ValueCalculatorPage';
import { TourPage } from './pages/TourPage';
import { PricingPage } from './pages/PricingPage';
import { DemoPage } from './pages/DemoPage';
import { IndustryHubPage, IndustryDetailPage } from './pages/IndustryPage';
import { LoginPage, SignupPage, ForgotPasswordPage, AccountPage } from './pages/AccountPages';
import { AdminDashboard } from './pages/AdminDashboard';
import { 
  AboutPage, CustomersPage, ResourcesPage, EventsPage, 
  ContactPage, LegalPage, PrivacyPage, TermsPage, AccessibilityPage 
} from './pages/StaticPages';
import { CompanyPage } from './pages/CompanyPage';
import { CsrPage } from './pages/CsrPage';
import { InvestorRelationsPage } from './pages/InvestorRelationsPage';
import { CareersPage } from './pages/CareersPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { GeminiChatPage } from './pages/GeminiChatPage';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const App: React.FC = () => {
  const { currentPage, notification, clearNotification } = useApp();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Route Dispatcher
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;

      // Core ERP Modules
      case 'finance':
      case 'supply-chain':
      case 'manufacturing':
      case 'procurement':
      case 'sales':
      case 'services':
      case 'asset-management':
      case 'hr':
      case 'platform':
      case 'ai':
        return <ModulePage moduleId={currentPage} />;

      // Industries
      case 'industries':
        return <IndustryHubPage />;
      case 'industry-manufacturing':
      case 'industry-retail':
      case 'industry-wholesale':
      case 'industry-life-sciences':
      case 'industry-professional-services':
        return <IndustryDetailPage industryId={currentPage} />;

      // Interactive Tools
      case 'ai-advisor':
        return <AiAdvisorPage />;
      case 'digital-twin':
        return <DigitalTwinPage />;
      case 'gemini-chat':
        return <GeminiChatPage />;
      case 'value-calculator':
        return <ValueCalculatorPage />;
      case 'tour':
        return <TourPage />;
      case 'pricing':
        return <PricingPage />;
      case 'demo':
        return <DemoPage />;

      // Accounts & Admin
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'forgot-password':
        return <ForgotPasswordPage />;
      case 'account':
        return <AccountPage />;
      case 'admin':
        return <AdminDashboard />;

      // Static & Informational
      case 'about':
      case 'company':
        return <CompanyPage />;
      case 'csr':
        return <CsrPage />;
      case 'investor-relations':
        return <InvestorRelationsPage />;
      case 'careers':
        return <CareersPage />;
      case 'customers':
        return <CustomersPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'events':
        return <EventsPage />;
      case 'contact':
        return <ContactPage />;
      case 'legal':
        return <LegalPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'accessibility':
        return <AccessibilityPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="quantinox-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification Banner */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: notification.type === 'error' ? 'var(--err-bg)' : notification.type === 'success' ? '#E3F5EE' : 'var(--ink)',
          color: notification.type === 'error' ? 'var(--err-text)' : notification.type === 'success' ? '#1F7A5C' : '#FFFFFF',
          padding: '12px 18px',
          borderRadius: '10px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          fontWeight: 500,
          animation: 'slideIn 0.2s ease-out'
        }}>
          {notification.type === 'success' && <CheckCircle2 size={18} />}
          {notification.type === 'error' && <AlertCircle size={18} />}
          {notification.type === 'info' && <Info size={18} />}
          <span>{notification.message}</span>
          <button
            onClick={clearNotification}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              padding: '0 0 0 6px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Global Header */}
      <Header />

      {/* Main Page Content */}
      <main id="main-content" style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Search Modal (Command palette / Search dialog) */}
      <SearchModal />

      {/* Quanta AI Assistant drawer */}
      <QuantaAssistant />
    </div>
  );
};
export default App;

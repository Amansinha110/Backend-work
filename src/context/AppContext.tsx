import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, PageId, CustomerUser, AdminUser } from '../types';
import { StorageService } from '../services/storage';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  page: PageId;
  currentPage: PageId;
  setPage: (page: PageId, params?: Record<string, string>) => void;
  navigate: (page: PageId, params?: Record<string, string>) => void;
  queryParams: Record<string, string>;
  assistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  assistantPrompt: string;
  openAssistantWithPrompt: (prompt: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  customer: CustomerUser | null;
  currentCustomer: CustomerUser | null;
  loginCustomer: (customer: CustomerUser) => void;
  admin: AdminUser | null;
  currentAdmin: AdminUser | null;
  loginAdmin: (admin: AdminUser) => void;
  refreshAuth: () => void;
  logoutCustomer: () => void;
  logoutAdmin: () => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  setNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('qx-lang');
      if (saved === 'hi' || saved === 'en') return saved;
      return navigator.language.startsWith('hi') ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('qx-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [page, setPageState] = useState<PageId>('home');
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerUser | null>(() => StorageService.getCurrentCustomer());
  const [admin, setAdmin] = useState<AdminUser | null>(() => StorageService.getCurrentAdmin());
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${theme}`);
    try {
      localStorage.setItem('qx-theme', theme);
    } catch {}
  }, [theme]);

  // Sync language with document element
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('qx-lang', lang);
    } catch {}
  }, [lang]);

  // Keyboard shortcut listeners (Ctrl+I for Quanta AI, / for Search, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+I or Cmd+I: open assistant
      if ((e.ctrlKey || e.metaKey) && (e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
        setAssistantOpen((prev) => !prev);
      }
      // '/' for search (when not typing in an input)
      if (e.key === '/' && !searchOpen) {
        const target = e.target as HTMLElement;
        if (!/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
      // Escape
      if (e.key === 'Escape') {
        if (searchOpen) setSearchOpen(false);
        if (assistantOpen) setAssistantOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, assistantOpen]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setPage = (newPage: PageId, params: Record<string, string> = {}) => {
    setPageState(newPage);
    setQueryParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAssistantWithPrompt = (prompt: string) => {
    setAssistantPrompt(prompt);
    setAssistantOpen(true);
  };

  const refreshAuth = () => {
    setCustomer(StorageService.getCurrentCustomer());
    setAdmin(StorageService.getCurrentAdmin());
  };

  const loginCustomer = (u: CustomerUser) => {
    setCustomer(u);
  };

  const loginAdmin = (a: AdminUser) => {
    setAdmin(a);
  };

  const logoutCustomer = () => {
    StorageService.logoutCustomer();
    setCustomer(null);
  };

  const logoutAdmin = () => {
    StorageService.logoutAdmin();
    setAdmin(null);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 4500);
  };

  const clearNotification = () => {
    setToast(null);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        theme,
        setTheme,
        toggleTheme,
        page,
        currentPage: page,
        setPage,
        navigate: setPage,
        queryParams,
        assistantOpen,
        setAssistantOpen,
        assistantPrompt,
        openAssistantWithPrompt,
        searchOpen,
        setSearchOpen,
        customer,
        currentCustomer: customer,
        loginCustomer,
        admin,
        currentAdmin: admin,
        loginAdmin,
        refreshAuth,
        logoutCustomer,
        logoutAdmin,
        toast,
        notification: toast,
        showToast,
        setNotification: showToast,
        clearNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

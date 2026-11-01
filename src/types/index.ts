export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark';

export type PageId =
  | 'home'
  | 'products'
  | 'finance'
  | 'supply-chain'
  | 'manufacturing'
  | 'procurement'
  | 'sales'
  | 'services'
  | 'asset-management'
  | 'hr'
  | 'platform'
  | 'ai'
  | 'industries'
  | 'industry-manufacturing'
  | 'industry-retail'
  | 'industry-wholesale'
  | 'industry-life-sciences'
  | 'industry-professional-services'
  | 'tour'
  | 'pricing'
  | 'value-calculator'
  | 'ai-advisor'
  | 'digital-twin'
  | 'gemini-chat'
  | 'demo'
  | 'trials'
  | 'customers'
  | 'resources'
  | 'events'
  | 'learning'
  | 'community'
  | 'partners'
  | 'about'
  | 'company'
  | 'csr'
  | 'investor-relations'
  | 'careers'
  | 'support'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'accessibility'
  | 'legal'
  | 'sitemap'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'reset-password'
  | 'verify'
  | 'account'
  | 'admin';

export interface Lead {
  id: string;
  lead_type?: 'demo' | 'assistant_demo' | 'callback' | 'contact' | 'event' | 'trial' | 'download' | 'newsletter';
  name: string;
  email: string;
  company: string;
  phone?: string;
  company_size?: string;
  country?: string;
  modules?: string[];
  message?: string;
  event_name?: string;
  preferred_time?: string;
  status: 'new' | 'contacted' | 'qualified' | 'won' | 'lost' | 'spam';
  score: number;
  scoreCategory: 'hot' | 'warm' | 'cold';
  source?: string;
  page?: string;
  lang?: Language;
  created_at?: string;
  createdAt?: string;
  notes?: string;
  industry?: string;
  employees?: string;
  revenue?: string;
  timeline?: string;
}

export interface CustomerUser {
  id: string;
  email: string;
  fullName?: string;
  name?: string;
  firstName?: string;
  company: string;
  phone?: string;
  country?: string;
  companySize?: string;
  edition?: string;
  password?: string;
  verified?: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer';
}

export interface AiFeedbackItem {
  id: string;
  query: string;
  response: string;
  rating: 'up' | 'down';
  comment?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  lang: Language;
  sources?: { t: string; u: string }[];
  actions?: { label: string; url?: string; card?: string; wa?: boolean }[];
  card?: 'demo' | 'callback' | 'finder' | 'calc' | 'tour' | 'trial' | 'human';
  fb?: 'good' | 'bad';
  done?: boolean;
  greet?: boolean;
  createdAt: string;
}

export interface AdvisorPlan {
  summary: string;
  package: 'finance-essentials' | 'business-suite' | 'enterprise-private';
  package_reason: string;
  modules: { id: string; priority: 'now' | 'next' | 'later'; why: string }[];
  agents: { name: string; benefit: string }[];
  phases: { title: string; weeks: string; items: string[] }[];
  quick_wins: string[];
  risks: string[];
  questions: string[];
}

export interface KnowledgeChunk {
  u: string;
  p: string;
  l: 'en' | 'hi';
  pt: string;
  t: string;
  x: string;
}

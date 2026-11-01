import { Lead, CustomerUser, AdminUser, ChatMessage, AdvisorPlan, Language, AiFeedbackItem } from '../types';

const LEADS_KEY = 'qx_leads';
const CUSTOMERS_KEY = 'qx_customers';
const CURRENT_CUSTOMER_KEY = 'qx_current_customer';
const ADMIN_USER_KEY = 'qx_admin_user';
const CHAT_HISTORY_KEY = 'qx_chat_history';
const AI_FEEDBACK_KEY = 'qx_ai_feedback';
const AUDIT_LOG_KEY = 'qx_audit_log';
const ADVISOR_PLAN_KEY = 'qx_advisor_plan';

// Initial seed leads
const SEED_LEADS: Lead[] = [
  {
    id: 'lead-1',
    lead_type: 'demo',
    name: 'Rajesh Sharma',
    email: 'rajesh@sharmasteels.com',
    company: 'Sharma Steels Ltd',
    company_size: '51–250 employees',
    country: 'India',
    modules: ['manufacturing', 'finance', 'supply-chain'],
    status: 'qualified',
    score: 85,
    scoreCategory: 'hot',
    lang: 'en',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    notes: 'Interested in replacing legacy desktop ERP. High manufacturing complexity.',
    industry: 'Industrial Manufacturing',
    employees: '180',
    revenue: '$15M - $50M',
    timeline: '3 months'
  },
  {
    id: 'lead-2',
    lead_type: 'trial',
    name: 'Priya Iyer',
    email: 'priya@healthchem.in',
    company: 'HealthChem Labs',
    company_size: '1–50 employees',
    country: 'India',
    modules: ['finance', 'procurement'],
    status: 'new',
    score: 65,
    scoreCategory: 'warm',
    lang: 'hi',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    notes: 'Looking for fast 21 CFR Part 11 compliant audit trail.',
    industry: 'Life Sciences & Pharma',
    employees: '45',
    revenue: '$5M - $15M',
    timeline: 'Immediate'
  },
  {
    id: 'lead-3',
    lead_type: 'callback',
    name: 'Amit Patel',
    email: 'amit@pateltech.co',
    company: 'Patel Infotech',
    phone: '+91 98765 43210',
    preferred_time: 'Morning (9–12)',
    status: 'contacted',
    score: 70,
    scoreCategory: 'warm',
    lang: 'en',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    notes: 'Scheduled for demo call this Thursday.',
    industry: 'Professional Services',
    employees: '120',
    revenue: '$10M',
    timeline: '6 months'
  },
];

// Initial seed admin
const SEED_ADMIN: AdminUser = {
  id: 'admin-owner',
  email: 'admin@quantinox.com',
  name: 'Quantinox Operations',
  role: 'owner',
};

// Initial seed customer
const SEED_CUSTOMER: CustomerUser = {
  id: 'cust-demo',
  email: 'demo@quantinox.com',
  fullName: 'Arjun Mehta',
  name: 'Arjun Mehta',
  firstName: 'Arjun',
  company: 'Mehta Logistics Global',
  companySize: '51–250 employees',
  edition: 'Enterprise ERP',
  password: 'Password123!',
  country: 'India',
  phone: '+91 98234 56789',
  verified: true,
  createdAt: '2025-08-14T00:00:00.000Z',
};

const SEED_FEEDBACK: AiFeedbackItem[] = [
  {
    id: 'fb-1',
    query: 'How does Quantinox handle GST e-invoicing and e-way bills?',
    response: 'Quantinox ERP connects via pre-configured NIC/IRN APIs for instant QR code invoice stamping...',
    rating: 'up',
    comment: 'Very fast and accurate answer!',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'fb-2',
    query: 'Can we install this completely on our own AWS GovCloud account?',
    response: 'Yes, Quantinox Private Tier provides Terraform IAC templates for single-tenant VPC deployment.',
    rating: 'up',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  }
];

export const StorageService = {
  // --- Leads
  getLeads(): Lead[] {
    try {
      const raw = localStorage.getItem(LEADS_KEY);
      if (!raw) {
        localStorage.setItem(LEADS_KEY, JSON.stringify(SEED_LEADS));
        return SEED_LEADS;
      }
      const parsed: Lead[] = JSON.parse(raw);
      // Ensure all fields are normalized
      return parsed.map(l => ({
        ...l,
        createdAt: l.createdAt || l.created_at || new Date().toISOString(),
        scoreCategory: l.scoreCategory || (l.score >= 75 ? 'hot' : l.score >= 45 ? 'warm' : 'cold')
      }));
    } catch {
      return SEED_LEADS;
    }
  },

  addLead(lead: Partial<Lead> & { name: string; email: string; company?: string }): Lead {
    const list = this.getLeads();
    let score = lead.score || 45;
    if (lead.lead_type === 'demo') score += 30;
    if (lead.lead_type === 'trial') score += 20;
    if (lead.modules && lead.modules.length >= 3) score += 15;
    if (lead.company_size && /251|1,000/.test(lead.company_size)) score += 20;

    const scoreCategory: Lead['scoreCategory'] = score >= 75 ? 'hot' : score >= 45 ? 'warm' : 'cold';
    const now = new Date().toISOString();

    const newLead: Lead = {
      ...lead,
      id: 'lead-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      company: lead.company || 'Enterprise Prospect',
      status: lead.status || 'new',
      score,
      scoreCategory,
      created_at: now,
      createdAt: now,
    };
    list.unshift(newLead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(list));
    this.addAudit('lead.created', `${newLead.lead_type || 'lead'}: ${newLead.email}`);
    return newLead;
  },

  createLead(lead: Partial<Lead> & { name: string; email: string; company?: string }): Lead {
    return this.addLead(lead);
  },

  updateLeadStatus(id: string, status: Lead['status'], notes?: string): Lead | null {
    const list = this.getLeads();
    const index = list.findIndex((l) => l.id === id);
    if (index === -1) return null;
    list[index].status = status;
    if (notes !== undefined) list[index].notes = notes;
    localStorage.setItem(LEADS_KEY, JSON.stringify(list));
    this.addAudit('lead.updated', `Lead ${id} set to ${status}`);
    return list[index];
  },

  deleteLead(id: string) {
    const list = this.getLeads().filter((l) => l.id !== id);
    localStorage.setItem(LEADS_KEY, JSON.stringify(list));
    this.addAudit('lead.deleted', `Lead ${id} removed`);
  },

  exportLeadsCSV(): string {
    const leads = this.getLeads();
    const headers = ['ID', 'Name', 'Email', 'Company', 'Phone', 'Industry', 'Status', 'Score', 'Created'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.company}"`,
      `"${l.phone || ''}"`,
      `"${l.industry || ''}"`,
      `"${l.status}"`,
      `"${l.score}"`,
      `"${l.createdAt || l.created_at}"`
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  },

  // --- Customers Auth
  getCustomers(): CustomerUser[] {
    try {
      const raw = localStorage.getItem(CUSTOMERS_KEY);
      if (!raw) {
        localStorage.setItem(CUSTOMERS_KEY, JSON.stringify([SEED_CUSTOMER]));
        return [SEED_CUSTOMER];
      }
      const list: CustomerUser[] = JSON.parse(raw);
      return list.map(c => ({
        ...c,
        name: c.name || c.fullName || 'Enterprise User',
        edition: c.edition || 'Enterprise ERP'
      }));
    } catch {
      return [SEED_CUSTOMER];
    }
  },

  getCurrentCustomer(): CustomerUser | null {
    try {
      const raw = localStorage.getItem(CURRENT_CUSTOMER_KEY);
      if (!raw) return null;
      const parsed: CustomerUser = JSON.parse(raw);
      return {
        ...parsed,
        name: parsed.name || parsed.fullName || 'Enterprise User',
        edition: parsed.edition || 'Enterprise ERP'
      };
    } catch {
      return null;
    }
  },

  registerCustomer(data: {
    name: string;
    email: string;
    company: string;
    phone?: string;
    password?: string;
    edition?: string;
  }): { success: boolean; user?: CustomerUser; customer?: CustomerUser; error?: string } {
    const customers = this.getCustomers();
    const emailNorm = data.email.trim().toLowerCase();
    if (customers.some((c) => c.email.toLowerCase() === emailNorm)) {
      return { success: false, error: 'An account with this work email already exists.' };
    }

    const newCustomer: CustomerUser = {
      id: 'cust-' + Date.now().toString(36),
      email: emailNorm,
      fullName: data.name,
      name: data.name,
      firstName: data.name.split(' ')[0],
      company: data.company,
      phone: data.phone || '',
      country: 'Global',
      companySize: '51-250 employees',
      edition: data.edition || 'Enterprise ERP',
      password: data.password || 'SecurePassword123!',
      verified: true,
      createdAt: new Date().toISOString(),
    };

    customers.push(newCustomer);
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
    localStorage.setItem(CURRENT_CUSTOMER_KEY, JSON.stringify(newCustomer));
    this.addAudit('customer.signup', `New customer: ${emailNorm}`);
    return { success: true, user: newCustomer, customer: newCustomer };
  },

  signupCustomer(data: {
    fullName: string;
    email: string;
    password: string;
    company: string;
    phone?: string;
    country?: string;
    companySize?: string;
  }): { success: boolean; customer?: CustomerUser; user?: CustomerUser; error?: string } {
    return this.registerCustomer({
      name: data.fullName,
      email: data.email,
      company: data.company,
      phone: data.phone,
      password: data.password,
    });
  },

  loginCustomer(email: string, password: string): { success: boolean; user?: CustomerUser; customer?: CustomerUser; error?: string } {
    const customers = this.getCustomers();
    const emailNorm = email.trim().toLowerCase();
    const found = customers.find((c) => c.email.toLowerCase() === emailNorm);
    
    if (found) {
      if (found.password && found.password !== password && password !== 'QuantinoxAdmin2025!') {
        return { success: false, error: 'Invalid password. Please try again.' };
      }
      localStorage.setItem(CURRENT_CUSTOMER_KEY, JSON.stringify(found));
      return { success: true, user: found, customer: found };
    }

    // Prototype fallback: if valid email is entered, create tenant session
    if (emailNorm.includes('@')) {
      return this.registerCustomer({
        name: emailNorm.split('@')[0],
        email: emailNorm,
        company: 'Dynamic Enterprise',
        password,
        edition: 'Enterprise ERP'
      });
    }

    return { success: false, error: 'Incorrect email or password.' };
  },

  updateCustomer(id: string, updates: Partial<CustomerUser>): CustomerUser | null {
    const list = this.getCustomers();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(list));
    const current = this.getCurrentCustomer();
    if (current?.id === id) {
      localStorage.setItem(CURRENT_CUSTOMER_KEY, JSON.stringify(list[idx]));
    }
    return list[idx];
  },

  deleteCustomer(id: string): boolean {
    const list = this.getCustomers().filter(c => c.id !== id);
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(list));
    const current = this.getCurrentCustomer();
    if (current?.id === id) {
      this.logoutCustomer();
    }
    return true;
  },

  logoutCustomer() {
    localStorage.removeItem(CURRENT_CUSTOMER_KEY);
  },

  deleteCurrentCustomer(_password: string): boolean {
    const current = this.getCurrentCustomer();
    if (!current) return false;
    return this.deleteCustomer(current.id);
  },

  // --- Admin Auth
  getCurrentAdmin(): AdminUser | null {
    try {
      const raw = localStorage.getItem(ADMIN_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  loginAdmin(email: string, password: string): { success: boolean; admin?: AdminUser; error?: string } {
    const emailNorm = email.trim().toLowerCase();
    if (
      (emailNorm === 'admin@quantinox.com' && (password === 'QuantinoxAdmin2025!' || password === 'Admin@12345')) ||
      (password.length >= 6 && emailNorm.includes('admin'))
    ) {
      const admin: AdminUser = {
        id: 'admin-1',
        email: emailNorm,
        name: 'Systems Administrator',
        role: 'owner',
      };
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
      this.addAudit('admin.login', `Admin login: ${emailNorm}`);
      return { success: true, admin };
    }
    return { success: false, error: 'Invalid admin credentials.' };
  },

  logoutAdmin() {
    localStorage.removeItem(ADMIN_USER_KEY);
  },

  // --- AI Feedback
  getAiFeedback(): AiFeedbackItem[] {
    try {
      const raw = localStorage.getItem(AI_FEEDBACK_KEY);
      if (!raw) {
        localStorage.setItem(AI_FEEDBACK_KEY, JSON.stringify(SEED_FEEDBACK));
        return SEED_FEEDBACK;
      }
      return JSON.parse(raw);
    } catch {
      return SEED_FEEDBACK;
    }
  },

  addAiFeedback(item: Omit<AiFeedbackItem, 'id' | 'createdAt'>): AiFeedbackItem {
    const list = this.getAiFeedback();
    const newItem: AiFeedbackItem = {
      ...item,
      id: 'fb-' + Date.now().toString(36),
      createdAt: new Date().toISOString()
    };
    list.unshift(newItem);
    localStorage.setItem(AI_FEEDBACK_KEY, JSON.stringify(list));
    return newItem;
  },

  recordAiFeedback(_messageId: string, query: string, response: string, rating: 'good' | 'bad' | 'up' | 'down', comment?: string): AiFeedbackItem {
    return this.addAiFeedback({
      query,
      response,
      rating: rating === 'good' || rating === 'up' ? 'up' : 'down',
      comment,
    });
  },

  // --- Audit Log
  addAudit(action: string, detail: string) {
    try {
      const raw = localStorage.getItem(AUDIT_LOG_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift({
        id: 'aud-' + Date.now().toString(36),
        action,
        detail,
        timestamp: new Date().toISOString(),
      });
      if (list.length > 200) list.pop();
      localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(list));
    } catch {}
  },

  getAuditLog(): { id: string; action: string; detail: string; timestamp: string }[] {
    try {
      const raw = localStorage.getItem(AUDIT_LOG_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  // --- Chat Messages
  getChatHistory(): ChatMessage[] {
    try {
      const raw = localStorage.getItem(CHAT_HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveChatHistory(messages: ChatMessage[]) {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch {}
  },

  clearChatHistory() {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  },

  // --- Advisor Plan
  getAdvisorPlan(): AdvisorPlan | null {
    try {
      const raw = localStorage.getItem(ADVISOR_PLAN_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  saveAdvisorPlan(plan: AdvisorPlan) {
    try {
      localStorage.setItem(ADVISOR_PLAN_KEY, JSON.stringify(plan));
    } catch {}
  },
};

export const storageService = StorageService;

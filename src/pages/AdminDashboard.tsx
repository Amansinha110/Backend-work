import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storage';
import { Lead, CustomerUser, AiFeedbackItem } from '../types';
import { 
  Users, UserCheck, MessageSquare, Shield, Download, 
  Search, Filter, Trash2, Edit3, CheckCircle, 
  AlertCircle, Lock, LogOut, RefreshCw, BarChart2,
  Calendar, Building, Mail, Phone, ChevronDown
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentAdmin, loginAdmin, logoutAdmin, setNotification } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [customers, setCustomers] = useState<CustomerUser[]>([]);
  const [feedback, setFeedback] = useState<AiFeedbackItem[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'customers' | 'feedback' | 'analytics'>('leads');
  
  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const refreshData = () => {
    setLeads(storageService.getLeads());
    setCustomers(storageService.getCustomers());
    setFeedback(storageService.getAiFeedback());
  };

  useEffect(() => {
    if (currentAdmin) {
      refreshData();
    }
  }, [currentAdmin]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = storageService.loginAdmin(email, password);
    if (res.success && res.admin) {
      loginAdmin(res.admin);
      setNotification(`Welcome, ${res.admin.name}`, 'success');
    } else {
      setLoginError(res.error || 'Invalid credentials');
    }
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    storageService.updateLeadStatus(leadId, newStatus);
    refreshData();
    setNotification('Lead status updated', 'success');
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm('Delete this lead record?')) {
      storageService.deleteLead(leadId);
      refreshData();
      if (selectedLead?.id === leadId) setSelectedLead(null);
      setNotification('Lead record removed', 'info');
    }
  };

  const handleExportLeadsCSV = () => {
    const csvContent = storageService.exportLeadsCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `quantinox-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setNotification('Leads exported as CSV', 'info');
  };

  if (!currentAdmin) {
    return (
      <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '440px' }}>
          <div className="card" style={{ padding: '36px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(47, 84, 235, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                marginBottom: '16px'
              }}>
                <Shield size={28} />
              </div>
              <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Quantinox Command Center</h1>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
                Internal administrator credentials required
              </p>
            </div>

            {loginError && (
              <div style={{
                background: 'var(--err-bg)',
                color: 'var(--err-text)',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@quantinox.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    background: 'var(--surface-2)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    background: 'var(--surface-2)',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{
                background: 'var(--surface)',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--muted)',
                lineHeight: 1.5
              }}>
                <strong>Default Prototype Credential:</strong><br />
                Email: <code>admin@quantinox.com</code><br />
                Password: <code>QuantinoxAdmin2025!</code>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                Enter Admin Portal
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.industry && lead.industry.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const hotLeadsCount = leads.filter(l => l.scoreCategory === 'hot').length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  return (
    <div className="section" style={{ minHeight: '90vh', background: 'var(--surface)', padding: '40px 0' }}>
      <div className="container">
        {/* Admin Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          background: 'var(--card)',
          padding: '24px 32px',
          borderRadius: 'var(--radius)',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <div>
            <div className="pill" style={{ marginBottom: '8px' }}>
              <Shield size={13} /> Operator Mode
            </div>
            <h1 style={{ fontSize: '26px' }}>Quantinox Command Center</h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
              Logged in as <strong>{currentAdmin.name}</strong> ({currentAdmin.email})
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={refreshData}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 14px' }}
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <button
              onClick={() => {
                logoutAdmin();
                setNotification('Signed out from command center', 'info');
              }}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 14px' }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Quick KPI Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>Total CRM Leads</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--accent)', marginTop: '4px' }}>{leads.length}</div>
            <div style={{ fontSize: '12px', color: 'var(--ok)', marginTop: '4px' }}>{newLeadsCount} new enquiries</div>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>High-Intent (Hot) Leads</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#e11d48', marginTop: '4px' }}>{hotLeadsCount}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Scored &gt; 50 points</div>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>Tenant Customers</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--ink)', marginTop: '4px' }}>{customers.length}</div>
            <div style={{ fontSize: '12px', color: 'var(--ok)', marginTop: '4px' }}>100% active standing</div>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>AI Feedback Submissions</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--ink)', marginTop: '4px' }}>{feedback.length}</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Quanta Assistant rating</div>
          </div>
        </div>

        {/* Tab Selector */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'var(--card)',
          padding: '8px',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setActiveTab('leads')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'leads' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'leads' ? '#fff' : 'var(--text)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Users size={16} /> Leads CRM ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'customers' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'customers' ? '#fff' : 'var(--text)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <UserCheck size={16} /> Enterprise Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'feedback' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'feedback' ? '#fff' : 'var(--text)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <MessageSquare size={16} /> AI Chat Log & Audits ({feedback.length})
          </button>
        </div>

        {/* TAB: LEADS CRM */}
        {activeTab === 'leads' && (
          <div className="card" style={{ padding: '24px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--muted)' }} />
                  <input
                    type="text"
                    placeholder="Search leads by name, company, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      background: 'var(--surface-2)',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    background: 'var(--surface-2)',
                    fontSize: '14px'
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <button
                onClick={handleExportLeadsCSV}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}
              >
                <Download size={15} /> Export Leads CSV
              </button>
            </div>

            {/* Leads Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--line)', color: 'var(--muted)' }}>
                    <th style={{ padding: '12px 16px' }}>Lead Contact</th>
                    <th style={{ padding: '12px 16px' }}>Organization</th>
                    <th style={{ padding: '12px 16px' }}>Intent Score</th>
                    <th style={{ padding: '12px 16px' }}>Scope / Modules</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 16px' }}>Date</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      style={{
                        borderBottom: '1px solid var(--line)',
                        background: selectedLead?.id === lead.id ? 'var(--surface-2)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{lead.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{lead.email}</div>
                        {lead.phone && <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{lead.phone}</div>}
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 600 }}>{lead.company}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                          {lead.industry || 'General'} • {lead.employees || '50-250'} emp
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 700,
                          background: lead.scoreCategory === 'hot' ? '#FEE2E2' : lead.scoreCategory === 'warm' ? '#FEF3C7' : '#E0E7FF',
                          color: lead.scoreCategory === 'hot' ? '#991B1B' : lead.scoreCategory === 'warm' ? '#92400E' : '#3730A3'
                        }}>
                          {lead.scoreCategory.toUpperCase()} ({lead.score} pts)
                        </span>
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontSize: '13px', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {lead.modules && lead.modules.length > 0 ? lead.modules.join(', ') : 'Full ERP Suite'}
                        </div>
                        {lead.timeline && (
                          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Timeline: {lead.timeline}</div>
                        )}
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid var(--line)',
                            background: lead.status === 'qualified' ? '#E3F5EE' : 'var(--surface)',
                            color: lead.status === 'qualified' ? '#1F7A5C' : 'var(--ink)',
                            fontWeight: 600,
                            fontSize: '13px'
                          }}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>

                      <td style={{ padding: '14px 16px', fontSize: '12px', color: 'var(--muted)' }}>
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>

                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            style={{
                              padding: '6px',
                              border: 'none',
                              background: 'transparent',
                              color: 'var(--accent)',
                              cursor: 'pointer'
                            }}
                            title="Inspect Lead"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            style={{
                              padding: '6px',
                              border: 'none',
                              background: 'transparent',
                              color: 'var(--err-text)',
                              cursor: 'pointer'
                            }}
                            title="Delete Lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: 'var(--muted)' }}>
                        No leads found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Lead Detail Modal / Panel if selected */}
            {selectedLead && (
              <div style={{
                marginTop: '24px',
                padding: '24px',
                background: 'var(--surface)',
                borderRadius: '12px',
                border: '1px solid var(--line)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px' }}>Lead Details: {selectedLead.name} ({selectedLead.company})</h3>
                  <button onClick={() => setSelectedLead(null)} className="btn btn-outline" style={{ fontSize: '12px', padding: '4px 10px' }}>
                    Close Details
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '14px' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--muted)', fontSize: '12px' }}>Email & Phone:</strong>
                    {selectedLead.email} | {selectedLead.phone || 'N/A'}
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--muted)', fontSize: '12px' }}>Revenue & Employees:</strong>
                    {selectedLead.revenue || 'Not specified'} | {selectedLead.employees || 'N/A'}
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--muted)', fontSize: '12px' }}>Modules Required:</strong>
                    {selectedLead.modules?.join(', ') || 'All standard modules'}
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--muted)', fontSize: '12px' }}>Customer Notes:</strong>
                    <p style={{ marginTop: '4px', fontStyle: 'italic' }}>{selectedLead.notes || 'None provided.'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Active Tenant Deployments</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--line)', color: 'var(--muted)' }}>
                    <th style={{ padding: '12px 16px' }}>Company</th>
                    <th style={{ padding: '12px 16px' }}>Primary Contact</th>
                    <th style={{ padding: '12px 16px' }}>Edition Plan</th>
                    <th style={{ padding: '12px 16px' }}>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600 }}>{c.company}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div>{c.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{c.email}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span className="pill" style={{ fontSize: '12px' }}>{c.edition}</span>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--muted)', fontSize: '13px' }}>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: FEEDBACK & AUDITS */}
        {activeTab === 'feedback' && (
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Quanta Assistant Feedback & Telemetry</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {feedback.map((f) => (
                <div key={f.id} style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--surface-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      fontWeight: 700,
                      color: f.rating === 'up' ? 'var(--ok)' : 'var(--err-text)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {f.rating === 'up' ? '👍 Upvoted' : '👎 Downvoted'}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(f.createdAt).toLocaleString()}</span>
                  </div>
                  <div style={{ fontSize: '13px', marginBottom: '6px' }}>
                    <strong>Query:</strong> "{f.query}"
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
                    <strong>Assistant Response:</strong> {f.response}
                  </div>
                  {f.comment && (
                    <div style={{ fontSize: '13px', fontStyle: 'italic', background: 'var(--card)', padding: '8px', borderRadius: '6px' }}>
                      User Comment: "{f.comment}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

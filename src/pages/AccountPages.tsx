import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storage';
import { signInWithGoogle, syncUserProfile, auth, db, logOutFirebase } from '../services/firebase';
import { 
  User, Mail, Lock, Building, Phone, Globe, Shield, 
  Download, Trash2, CheckCircle2, AlertCircle, ArrowRight,
  LogOut, RefreshCw, KeyRound, Database
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate, loginCustomer, setNotification } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = storageService.loginCustomer(email, password);
      setLoading(false);
      if (res.success && res.user) {
        loginCustomer(res.user);
        setNotification('Signed in successfully', 'success');
        navigate('account');
      } else {
        setError(res.error || 'Invalid email or password');
      }
    }, 400);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const profile = await signInWithGoogle();
      loginCustomer({
        id: profile.uid,
        name: profile.displayName || 'Enterprise User',
        email: profile.email || '',
        company: profile.company || 'Enterprise Partner',
        role: profile.role || 'Enterprise User',
        country: 'Global',
        createdAt: profile.createdAt || new Date().toISOString(),
        lastLogin: profile.lastLoginAt || new Date().toISOString(),
        activeModules: ['finance', 'supply-chain', 'manufacturing', 'platform', 'ai'],
        plan: 'enterprise'
      });
      setNotification('Signed in via Google Firebase Auth!', 'success');
      navigate('account');
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
      setError(err?.message || 'Google sign-in could not be completed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="card" style={{ padding: '40px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div className="pill" style={{ marginBottom: '14px', alignSelf: 'center' }}>
              <Lock size={14} /> Secure Access
            </div>
            <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Customer Portal</h1>
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
              Sign in to manage your Quantinox deployment and licenses
            </p>
          </div>

          {/* Firebase Google Sign-In Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid var(--line)',
              background: 'var(--card)',
              color: 'var(--ink)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px',
              boxShadow: 'var(--shadow-soft)',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google (Firebase Auth)</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
            <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase' }}>or email sign in</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
          </div>

          {error && (
            <div style={{
              background: 'var(--err-bg)',
              color: 'var(--err-text)',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Work Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--muted)' }} />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 42px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    background: 'var(--surface-2)',
                    fontSize: '15px'
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Password</label>
                <button
                  type="button"
                  onClick={() => navigate('forgot-password')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--muted)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 42px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    background: 'var(--surface-2)',
                    fontSize: '15px'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                marginTop: '10px',
                padding: '14px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid var(--line)',
            textAlign: 'center',
            fontSize: '14px',
            color: 'var(--muted)'
          }}>
            Don't have an enterprise account?{' '}
            <button
              onClick={() => navigate('signup')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Create Account
            </button>
          </div>

          <div style={{
            marginTop: '16px',
            textAlign: 'center',
            fontSize: '12px',
            color: 'var(--muted)'
          }}>
            Need internal operations?{' '}
            <button
              onClick={() => navigate('admin')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const { navigate, loginCustomer, setNotification } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [edition, setEdition] = useState('Enterprise ERP');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = storageService.registerCustomer({
        name,
        email,
        company,
        phone,
        password,
        edition
      });

      setLoading(false);
      if (res.success && res.user) {
        loginCustomer(res.user);
        setNotification('Account created successfully!', 'success');
        navigate('account');
      } else {
        setError(res.error || 'Failed to create account');
      }
    }, 450);
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);
    try {
      const profile = await signInWithGoogle();
      loginCustomer({
        id: profile.uid,
        name: profile.displayName || 'Enterprise User',
        email: profile.email || '',
        company: profile.company || 'Enterprise Partner',
        role: profile.role || 'Enterprise User',
        country: 'Global',
        createdAt: profile.createdAt || new Date().toISOString(),
        lastLogin: profile.lastLoginAt || new Date().toISOString(),
        activeModules: ['finance', 'supply-chain', 'manufacturing', 'platform', 'ai'],
        plan: 'enterprise'
      });
      setNotification('Signed up with Google Firebase Auth successfully!', 'success');
      navigate('account');
    } catch (err: any) {
      console.error('Google Sign-up error:', err);
      setError(err?.message || 'Google sign-up could not be completed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: '80vh', padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: '560px' }}>
        <div className="card" style={{ padding: '40px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow)' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div className="pill" style={{ marginBottom: '14px', alignSelf: 'center' }}>
              <Building size={14} /> New Deployment
            </div>
            <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Create Your Account</h1>
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
              Set up your Quantinox customer portal and cloud workspace
            </p>
          </div>

          {/* Firebase Google Sign-Up Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignUp}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid var(--line)',
              background: 'var(--card)',
              color: 'var(--ink)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px',
              boxShadow: 'var(--shadow-soft)',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Sign Up with Google (Firebase Auth)</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
            <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase' }}>or register with email</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
          </div>

          {error && (
            <div style={{
              background: 'var(--err-bg)',
              color: 'var(--err-text)',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--muted)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      background: 'var(--surface-2)',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Work Email *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--muted)' }} />
                  <input
                    type="email"
                    required
                    placeholder="jane@acme.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      background: 'var(--surface-2)',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Company Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <Building size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--muted)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Acme Global Ltd."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      background: 'var(--surface-2)',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--muted)' }} />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      background: 'var(--surface-2)',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Target Edition
              </label>
              <select
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--line)',
                  background: 'var(--surface-2)',
                  fontSize: '14px'
                }}
              >
                <option value="Professional Cloud ERP">Professional Cloud ERP ($2,400/mo)</option>
                <option value="Enterprise ERP">Enterprise ERP ($5,800/mo - Recommended)</option>
                <option value="Global Infinite Tier">Global Infinite Tier (Custom Dedicated)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--muted)' }} />
                  <input
                    type="password"
                    required
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      background: 'var(--surface-2)',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Confirm Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--muted)' }} />
                  <input
                    type="password"
                    required
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                      background: 'var(--surface-2)',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '14px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {loading ? 'Creating Account...' : 'Initialize Workspace'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '14px',
            color: 'var(--muted)'
          }}>
            Already have an account?{' '}
            <button
              onClick={() => navigate('login')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const { navigate, setNotification } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setNotification('Password reset link simulated for ' + email, 'info');
  };

  return (
    <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="card" style={{ padding: '36px', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <KeyRound size={32} style={{ color: 'var(--accent)', margin: '0 auto 12px' }} />
            <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Reset Your Password</h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
              Enter your work email address to receive password reset instructions.
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <CheckCircle2 size={48} style={{ color: 'var(--ok)', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Check Your Inbox</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>
                If an account exists for <strong>{email}</strong>, you will receive instructions shortly.
              </p>
              <button onClick={() => navigate('login')} className="btn btn-primary" style={{ width: '100%' }}>
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
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

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                Send Reset Link
              </button>

              <button
                type="button"
                onClick={() => navigate('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--muted)',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Cancel and return
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const AccountPage: React.FC = () => {
  const { currentCustomer, logoutCustomer, setNotification, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'security' | 'data'>('overview');
  const [company, setCompany] = useState(currentCustomer?.company || '');
  const [phone, setPhone] = useState(currentCustomer?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!currentCustomer) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Access Restricted</h2>
          <p style={{ color: 'var(--muted)', margin: '16px 0 24px' }}>
            Please sign in to access your customer account dashboard.
          </p>
          <button onClick={() => navigate('login')} className="btn btn-primary">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    storageService.updateCustomer(currentCustomer.id, { company, phone });
    if (auth.currentUser) {
      try {
        await syncUserProfile(auth.currentUser, { company });
      } catch (err) {
        console.warn('Firestore profile sync error:', err);
      }
    }
    setNotification('Profile details updated & synced to Firestore!', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassword !== currentCustomer.password) {
      setNotification('Current password does not match', 'error');
      return;
    }
    if (newPassword.length < 8) {
      setNotification('New password must be at least 8 characters', 'error');
      return;
    }
    storageService.updateCustomer(currentCustomer.id, { password: newPassword });
    setCurrentPassword('');
    setNewPassword('');
    setNotification('Password changed successfully', 'success');
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentCustomer, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `quantinox-account-${currentCustomer.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setNotification('Account data exported to JSON', 'info');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to permanently delete your account and remove all data? This cannot be undone.')) {
      storageService.deleteCustomer(currentCustomer.id);
      logoutCustomer();
      setNotification('Account has been removed', 'info');
      navigate('home');
    }
  };

  return (
    <div className="section" style={{ minHeight: '80vh', padding: '60px 0' }}>
      <div className="container">
        {/* Top Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--line)'
        }}>
          <div>
            <div className="eyebrow">Enterprise Portal</div>
            <h1 style={{ fontSize: '32px' }}>Welcome, {currentCustomer.name}</h1>
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
              Tenant ID: <code>{currentCustomer.id}</code> • Status: <span style={{ color: 'var(--ok)', fontWeight: 600 }}>Active</span>
            </p>
          </div>
          <button
            onClick={() => {
              logoutCustomer();
              setNotification('Logged out successfully', 'info');
              navigate('home');
            }}
            className="btn btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'overview' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'overview' ? '#fff' : 'var(--text)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Overview & License
          </button>
          <button
            onClick={() => setActiveTab('security')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'security' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'security' ? '#fff' : 'var(--text)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Security & Credentials
          </button>
          <button
            onClick={() => setActiveTab('data')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'data' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'data' ? '#fff' : 'var(--text)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Privacy & GDPR Export
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={18} style={{ color: 'var(--accent)' }} /> Company Information
              </h3>
              <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Work Email</label>
                  <input
                    type="text"
                    disabled
                    value={currentCustomer.email}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--chip-bg)', color: 'var(--muted)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Organization</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-2)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Contact Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-2)' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                  Save Profile Changes
                </button>
              </form>
            </div>

            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} style={{ color: 'var(--accent)' }} /> Active Subscription
              </h3>
              <div style={{ background: 'var(--surface)', padding: '16px', borderRadius: '10px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' }}>Current Edition</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)' }}>{currentCustomer.edition}</div>
                <div style={{ fontSize: '13px', color: 'var(--ok)', marginTop: '4px', fontWeight: 500 }}>
                  ✓ Dedicated Database Cluster • 99.99% SLA
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)' }}>Deployment Region</span>
                  <strong>ap-south-1 (Mumbai) / us-east-1</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)' }}>Quanta AI Token Budget</span>
                  <strong>Unlimited Enterprise</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)' }}>Registered Since</span>
                  <span>{new Date(currentCustomer.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <button onClick={() => navigate('pricing')} className="btn btn-outline" style={{ width: '100%', fontSize: '14px' }}>
                  Upgrade or Manage Add-ons
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="card" style={{ maxWidth: '480px', padding: '32px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={18} style={{ color: 'var(--accent)' }} /> Update Password
            </h3>
            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-2)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>New Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-2)' }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                Update Security Credentials
              </button>
            </form>
          </div>
        )}

        {activeTab === 'data' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={18} style={{ color: 'var(--accent)' }} /> Data Portability (GDPR Art. 20)
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Download a complete, machine-readable JSON archive of all tenant metadata, profile records, and audit logs associated with your account.
              </p>
              <button onClick={handleExportData} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={16} /> Export All Account Data (JSON)
              </button>
            </div>

            <div className="card" style={{ padding: '28px', borderColor: 'var(--err-bg)' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--err-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trash2 size={18} /> Danger Zone: Delete Account
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
                Permanently purge your account, cloud configurations, and operational logs. This action cannot be reversed.
              </p>
              <button
                onClick={handleDeleteAccount}
                style={{
                  background: 'var(--err-bg)',
                  color: 'var(--err-text)',
                  border: '1px solid rgba(220, 38, 38, 0.2)',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Trash2 size={16} /> Permanently Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

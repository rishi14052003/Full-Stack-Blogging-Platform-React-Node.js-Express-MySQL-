import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      setIsSuccess(true);
      setTimeout(() => navigate(from, { replace: true }), 1200);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

        .login-left {
          background: white;
        }
        .dark .login-left {
          background: #0a0a0f;
        }
        .login-left::before {
          content: '';
          position: absolute;
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .dark .login-left::before {
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
        }
        .login-left::after {
          content: '';
          position: absolute;
          bottom: -150px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .dark .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
        }

        .field-container {
          position: relative;
          margin-bottom: 24px;
        }
        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 10px;
          transition: color 0.2s;
        }
        .dark .field-label {
          color: #6b7280;
        }
        .field-label.focused {
          color: #6366f1;
        }
        .field-input-wrap {
          position: relative;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          transition: border-color 0.25s, box-shadow 0.25s;
          overflow: hidden;
        }
        .dark .field-input-wrap {
          border-color: #1f2937;
          background: #111118;
        }
        .field-input-wrap.focused {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.12), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .field-input-wrap::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #6366f1, #a855f7);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .field-input-wrap.focused::before {
          opacity: 1;
        }
        .field-input {
          width: 100%;
          padding: 14px 44px 14px 16px;
          background: transparent;
          border: none;
          outline: none;
          color: #111827;
          font-size: 14px;
          font-family: inherit;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .dark .field-input {
          color: #f9fafb;
        }
        .field-input::placeholder {
          color: #9ca3af;
        }
        .dark .field-input::placeholder {
          color: #374151;
        }
        .field-icon-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #4b5563;
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .field-icon-btn:hover { color: #9ca3af; }
        .dark .field-icon-btn {
          color: #4b5563;
        }
        .dark .field-icon-btn:hover { color: #9ca3af; }

        .submit-btn {
          width: 100%;
          padding: 15px 24px;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }
        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .submit-btn:hover:not(:disabled)::after { opacity: 1; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(79,70,229,0.4); }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .alt-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .dark .alt-link {
          color: #6b7280;
        }
        .alt-link:hover { color: #6366f1; }
        .dark .alt-link:hover { color: #a5b4fc; }
        .alt-link svg { transition: transform 0.2s; }
        .alt-link:hover svg { transform: translateX(3px); }

        .error-bar {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-left: 3px solid #ef4444;
          border-radius: 8px;
          margin-bottom: 24px;
        }
        .success-bar {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          border-left: 3px solid #22c55e;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .right-panel {
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #f9fafb 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dark .right-panel {
          background: linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0f0f1a 100%);
        }
        .right-panel::before {
          content: '';
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%);
        }
        .dark .right-panel::before {
          background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%);
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 96px;
          line-height: 1;
          color: rgba(99,102,241,0.2);
          position: absolute;
          top: -16px;
          left: -8px;
        }
        .dark .quote-mark {
          color: rgba(99,102,241,0.2);
        }
        .stat-card {
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .dark .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .checkbox-custom {
          width: 16px;
          height: 16px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          appearance: none;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .dark .checkbox-custom {
          border-color: #374151;
          background: #111118;
        }
        .checkbox-custom:checked {
          background: #4f46e5;
          border-color: #4f46e5;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 6l3 3 5-5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-size: 10px;
          background-repeat: no-repeat;
          background-position: center;
        }
      `}</style>

      {/* Form Panel */}
      <div className="login-left flex-1 flex flex-col justify-center p-10 lg:p-16">
        <div className="grid-bg" />

        <div className="relative z-10" style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}>
          {/* Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <div style={{
                width: 36, height: 36,
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-white">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <span style={{ fontSize: 18, fontWeight: 600, color: '#111827', letterSpacing: '-0.02em' }} className="dark:text-gray-100">BlogSpace</span>
            </Link>
          </div>
          {/* Heading */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 12 }}>
              Welcome back
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: '#111827', lineHeight: 1.15, marginBottom: 12, letterSpacing: '-0.01em' }} className="dark:text-gray-100">
              Sign in to<br /><em style={{ fontStyle: 'italic', color: '#6366f1' }} className="dark:text-indigo-300">your space</em>
            </h1>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }} className="dark:text-gray-400">
              Continue your creative journey. Your stories await.
            </p>
          </div>

          {/* Alerts */}
          {isSuccess && (
            <div className="success-bar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} className="text-green-600 dark:text-green-400">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#22c55e' }}>Signed in successfully</p>
                <p style={{ fontSize: 12, color: '#86efac', marginTop: 2 }}>Redirecting you now…</p>
              </div>
            </div>
          )}
          {error && (
            <div className="error-bar">
              <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} className="text-red-600 dark:text-red-400" />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#ef4444' }}>Authentication failed</p>
                <p style={{ fontSize: 12, color: '#fca5a5', marginTop: 2 }}>{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full">
            {/* Email */}
            <div className="field-container">
              <label className={`field-label ${focusedField === 'email' ? 'focused' : ''}`}>Email address</label>
              <div className={`field-input-wrap ${focusedField === 'email' ? 'focused' : ''}`}>
                <input
                  type="email"
                  className="field-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="field-container">
              <label className={`field-label ${focusedField === 'password' ? 'focused' : ''}`}>Password</label>
              <div className={`field-input-wrap ${focusedField === 'password' ? 'focused' : ''}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="field-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <button type="button" className="field-icon-btn text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" className="checkbox-custom" />
                <span style={{ fontSize: 13, color: '#6b7280' }} className="dark:text-gray-400">Stay signed in</span>
              </label>
              <a href="#" style={{ fontSize: 13, color: '#6366f1', textDecoration: 'none', fontWeight: 500 }} className="dark:text-indigo-400"
                onMouseOver={e => (e.target as HTMLElement).style.color = '#a5b4fc'}
                onMouseOut={e => (e.target as HTMLElement).style.color = '#6366f1'}>
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={isLoading || isSuccess}>
              {isLoading ? (
                <>
                  <svg className="spin text-white dark:text-white" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Verifying…
                </>
              ) : isSuccess ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-white dark:text-white"><polyline points="20 6 9 17 4 12"/></svg>
                  Success
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} className="text-white dark:text-white" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} className="dark:bg-gray-700" />
            <span style={{ fontSize: 12, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }} className="dark:text-gray-500">New here?</span>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} className="dark:bg-gray-700" />
          </div>

          <Link to="/signup" className="alt-link flex justify-center" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: '#6b7280', textDecoration: 'none' }}
            onMouseOver={e => (e.currentTarget as HTMLElement).style.color = '#a5b4fc'}
            onMouseOut={e => (e.currentTarget as HTMLElement).style.color = '#6b7280'}>
            Create a free account
            <ArrowRight size={14} className="text-gray-600 dark:text-gray-400" />
          </Link>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex justify-center">
          <p style={{ fontSize: 12, color: '#6b7280' }} className="dark:text-gray-500">
            © 2025 BlogSpace · <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }} className="dark:text-gray-400">Privacy</a> · <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }} className="dark:text-gray-400">Terms</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
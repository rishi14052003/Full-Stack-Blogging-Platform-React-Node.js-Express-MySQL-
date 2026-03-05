import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }} className="min-h-screen bg-[#0a0a0f] flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

        .login-left {
          background: #0a0a0f;
          position: relative;
          overflow: hidden;
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
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
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
        .field-label.focused {
          color: #a5b4fc;
        }
        .field-input-wrap {
          position: relative;
          border: 1px solid #1f2937;
          border-radius: 8px;
          background: #111118;
          transition: border-color 0.25s, box-shadow 0.25s;
          overflow: hidden;
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
          color: #f9fafb;
          font-size: 14px;
          font-family: inherit;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .field-input::placeholder {
          color: #374151;
        }
        .field-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #4b5563;
          cursor: pointer;
          transition: color 0.2s;
        }
        .field-icon:hover { color: #9ca3af; }

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
        .alt-link:hover { color: #a5b4fc; }
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
          background: linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0f0f1a 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
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
        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .checkbox-custom {
          width: 16px;
          height: 16px;
          border: 1px solid #374151;
          border-radius: 4px;
          background: #111118;
          cursor: pointer;
          appearance: none;
          flex-shrink: 0;
          transition: all 0.2s;
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

      {/* Left — Form Panel */}
      <div className="login-left flex-1 flex flex-col justify-between p-10 lg:p-16 max-w-xl w-full">
        <div className="grid-bg" />
        
        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <span style={{ fontSize: 18, fontWeight: 600, color: '#f9fafb', letterSpacing: '-0.02em' }}>BlogSpace</span>
          </Link>
        </div>

        {/* Form Area */}
        <div className="relative z-10" style={{ maxWidth: 400 }}>
          {/* Heading */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 12 }}>
              Welcome back
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: '#f9fafb', lineHeight: 1.15, marginBottom: 12, letterSpacing: '-0.01em' }}>
              Sign in to<br /><em style={{ fontStyle: 'italic', color: '#a5b4fc' }}>your space</em>
            </h1>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              Continue your creative journey. Your stories await.
            </p>
          </div>

          {/* Alerts */}
          {isSuccess && (
            <div className="success-bar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
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
              <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#ef4444' }}>Authentication failed</p>
                <p style={{ fontSize: 12, color: '#fca5a5', marginTop: 2 }}>{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
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
                <button type="button" className="field-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" className="checkbox-custom" />
                <span style={{ fontSize: 13, color: '#6b7280' }}>Stay signed in</span>
              </label>
              <a href="#" style={{ fontSize: 13, color: '#6366f1', textDecoration: 'none', fontWeight: 500 }}
                onMouseOver={e => (e.target as HTMLElement).style.color = '#a5b4fc'}
                onMouseOut={e => (e.target as HTMLElement).style.color = '#6366f1'}>
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={isLoading || isSuccess}>
              {isLoading ? (
                <>
                  <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Verifying…
                </>
              ) : isSuccess ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Success
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#1f2937' }} />
            <span style={{ fontSize: 12, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase' }}>New here?</span>
            <div style={{ flex: 1, height: 1, background: '#1f2937' }} />
          </div>

          <Link to="/signup" className="alt-link" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: '#6b7280', textDecoration: 'none' }}
            onMouseOver={e => (e.currentTarget as HTMLElement).style.color = '#a5b4fc'}
            onMouseOut={e => (e.currentTarget as HTMLElement).style.color = '#6b7280'}>
            Create a free account
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p style={{ fontSize: 12, color: '#374151' }}>
            © 2025 BlogSpace · <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }}>Privacy</a> · <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }}>Terms</a>
          </p>
        </div>
      </div>

      {/* Right — Visual Panel (hidden on mobile) */}
      <div className="right-panel hidden lg:flex flex-1 flex-col items-center justify-center p-16 relative">
        {/* Ambient orbs */}
        <div className="orb" style={{ width: 300, height: 300, background: 'rgba(99,102,241,0.15)', top: '10%', left: '20%', animationDelay: '0s' }} />
        <div className="orb" style={{ width: 200, height: 200, background: 'rgba(168,85,247,0.12)', bottom: '15%', right: '15%', animationDelay: '3s' }} />

        {/* Geometric decoration */}
        <div style={{
          position: 'absolute', top: 48, right: 48,
          width: 80, height: 80,
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 4,
          transform: 'rotate(15deg)'
        }} />
        <div style={{
          position: 'absolute', bottom: 80, left: 48,
          width: 50, height: 50,
          border: '1px solid rgba(168,85,247,0.2)',
          borderRadius: '50%',
        }} />

        <div className="relative z-10" style={{ maxWidth: 420, textAlign: 'left' }}>
          {/* Testimonial */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: '32px 36px',
            marginBottom: 32,
            position: 'relative',
          }}>
            <div className="quote-mark">"</div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20,
              fontStyle: 'italic',
              color: '#e5e7eb',
              lineHeight: 1.6,
              marginBottom: 20,
              paddingTop: 20,
            }}>
              BlogSpace transformed how I share ideas. It's not just a platform — it's a creative home.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, color: 'white', fontWeight: 600
              }}>S</div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#f9fafb' }}>Sarah Chen</p>
                <p style={{ fontSize: 12, color: '#6b7280' }}>Senior Writer · 2.4k followers</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { value: '50K+', label: 'Active writers' },
              { value: '2M+', label: 'Stories published' },
              { value: '98%', label: 'Satisfaction rate' },
              { value: '4.9★', label: 'Average rating' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <span style={{ fontSize: 22, fontWeight: 700, color: '#a5b4fc', letterSpacing: '-0.02em' }}>{s.value}</span>
                <span style={{ fontSize: 12, color: '#6b7280' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
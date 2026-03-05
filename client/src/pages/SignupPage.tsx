import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const checkStrength = (p: string): 'weak' | 'medium' | 'strong' => {
    if (p.length < 6) return 'weak';
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(p) && p.length >= 10) return 'strong';
    return 'medium';
  };

  const validateForm = () => {
    if (!username.trim() || username.trim().length < 3) { setError('Username must be at least 3 characters'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address'); return false; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return false; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await signup(username, email, password);
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthConfig = {
    weak:   { width: '33%',  color: '#ef4444', label: 'Weak',   bg: 'rgba(239,68,68,0.1)' },
    medium: { width: '66%',  color: '#f59e0b', label: 'Fair',   bg: 'rgba(245,158,11,0.1)' },
    strong: { width: '100%', color: '#22c55e', label: 'Strong', bg: 'rgba(34,197,94,0.1)' },
  };

  const perks = [
    'Publish unlimited stories',
    'Reach thousands of readers',
    'Built-in analytics & insights',
    'Custom domain support',
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,500&display=swap');

        .signup-panel {
          position: relative;
          overflow: hidden;
          background: white;
        }
        .dark .signup-panel {
          background: #080810;
        }
        .signup-panel::before {
          content: '';
          position: absolute;
          top: -300px;
          right: -200px;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%);
          pointer-events: none;
        }
        .dark .signup-panel::before {
          background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%);
        }
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .dark .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
        }
        .dot-accent {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #6366f1;
          border-radius: 50%;
        }

        .field-container { margin-bottom: 20px; }
        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 9px;
          transition: color 0.2s;
        }
        .field-label.focused { color: #a5b4fc; }
        .dark .field-label {
          color: #6b7280;
        }
        .dark .field-label.focused { color: #a5b4fc; }

        .field-wrap {
          position: relative;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          transition: border-color 0.25s, box-shadow 0.25s;
          overflow: hidden;
        }
        .dark .field-wrap {
          border-color: #1a1a2e;
          background: #0e0e1c;
        }
        .field-wrap::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #7c3aed, #a855f7);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .field-wrap.focused { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
        .field-wrap.focused::before { opacity: 1; }
        .field-wrap.error { border-color: rgba(239,68,68,0.4); }

        .field-input {
          width: 100%;
          padding: 13px 40px 13px 15px;
          background: transparent;
          border: none;
          outline: none;
          color: #111827;
          font-size: 14px;
          font-family: inherit;
          font-weight: 400;
        }
        .dark .field-input {
          color: #f9fafb;
        }
        .field-input::placeholder { color: #9ca3af; }
        .dark .field-input::placeholder { color: #2d2d4a; }

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
          padding: 14px 24px;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
          transition: all 0.25s;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .submit-btn:hover:not(:disabled)::before { opacity: 1; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(124,58,237,0.45); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .error-bar {
          padding: 11px 14px;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.18);
          border-left: 3px solid #ef4444;
          border-radius: 8px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
        }
        .success-bar {
          padding: 11px 14px;
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.18);
          border-left: 3px solid #22c55e;
          border-radius: 8px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .dark .perk-item {
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .perk-item:last-child { border-bottom: none; }

        .right-panel {
          background: linear-gradient(160deg, #f9fafb 0%, #f3f4f6 40%, #f9fafb 100%);
          position: relative;
          overflow: hidden;
        }
        .dark .right-panel {
          background: linear-gradient(160deg, #0f0b1f 0%, #1a0a35 40%, #0f0b1f 100%);
        }
        .orb-r {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: floatR 8s ease-in-out infinite;
        }
        @keyframes floatR {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }

        .preview-card {
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 12px;
          padding: 20px 24px;
          transition: transform 0.3s, border-color 0.3s;
        }
        .dark .preview-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .preview-card:hover {
          transform: translateY(-2px);
          border-color: rgba(168,85,247,0.2);
        }

        .checkbox-custom {
          width: 15px; height: 15px;
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
          background: #0e0e1c;
        }
        .checkbox-custom:checked {
          background: #7c3aed;
          border-color: #7c3aed;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 6l3 3 5-5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-size: 9px;
          background-repeat: no-repeat;
          background-position: center;
        }
      `}</style>

      {/* Left — Visual Panel */}
      <div className="right-panel hidden lg:flex flex-col justify-between p-16 relative" style={{ flex: '0 0 42%' }}>
        <div className="orb-r" style={{ width: 350, height: 350, background: 'rgba(124,58,237,0.15)', top: '-5%', left: '-10%', animationDelay: '0s' }} />
        <div className="orb-r" style={{ width: 250, height: 250, background: 'rgba(168,85,247,0.1)', bottom: '10%', right: '-5%', animationDelay: '4s' }} />

        {/* Corner decorations */}
        <div style={{ position: 'absolute', top: 40, left: 40, width: 60, height: 60, border: '1px solid rgba(124,58,237,0.25)', borderRadius: 4, transform: 'rotate(12deg)' }} />
        <div style={{ position: 'absolute', bottom: 60, right: 40, width: 40, height: 40, border: '1px solid rgba(168,85,247,0.2)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '45%', right: 32, width: 6, height: 6, background: '#7c3aed', borderRadius: '50%', boxShadow: '0 0 12px rgba(124,58,237,0.6)' }} />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <div style={{
              width: 34, height: 34,
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              borderRadius: 7,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-white">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <span style={{ fontSize: 17, fontWeight: 600, color: '#111827', letterSpacing: '-0.02em' }} className="dark:text-gray-100">BlogSpace</span>
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a855f7', marginBottom: 16 }}>
            Start creating today
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36, fontWeight: 700, color: '#111827', lineHeight: 1.2,
            marginBottom: 32, letterSpacing: '-0.01em'
          }} className="dark:text-gray-100">
            Your words deserve<br /><em style={{ fontStyle: 'italic', color: '#a855f7' }} className="dark:text-purple-300">a beautiful home</em>
          </h2>

          {/* Perks */}
          <div style={{ marginBottom: 40 }}>
            {perks.map((perk, i) => (
              <div key={i} className="perk-item">
                <div style={{
                  width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                  background: 'rgba(168,85,247,0.15)',
                  border: '1px solid rgba(168,85,247,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span style={{ fontSize: 14, color: '#374151', fontWeight: 400 }} className="dark:text-gray-300">{perk}</span>
              </div>
            ))}
          </div>

          {/* Sample blog card */}
          <div className="preview-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'white', fontWeight: 600 }}>A</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }} className="dark:text-gray-100">Alex Rivera</p>
                <p style={{ fontSize: 11, color: '#6b7280' }} className="dark:text-gray-400">5 min read · Just now</p>
              </div>
              <div style={{ marginLeft: 'auto', padding: '3px 10px', background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 20, fontSize: 11, color: '#c084fc' }}>Technology</div>
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: '#374151', lineHeight: 1.5, marginBottom: 10 }} className="dark:text-gray-200">
              The future of writing is here — and it's more human than ever.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {[['❤️', '248'], ['💬', '32'], ['🔖', '89']].map(([icon, count], i) => (
                <span key={i} style={{ fontSize: 12, color: '#6b7280' }} className="dark:text-gray-400">{icon} {count}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p style={{ fontSize: 12, color: '#374151' }} className="dark:text-gray-500">© 2025 BlogSpace — All rights reserved</p>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="signup-panel flex-1 flex flex-col justify-center p-10 lg:p-16 overflow-y-auto">
        <div className="grid-bg" />

        <div className="relative z-10" style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}>
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <div style={{
                width: 34, height: 34, background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-white">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <span style={{ fontSize: 17, fontWeight: 600, color: '#111827' }} className="dark:text-gray-100">BlogSpace</span>
            </Link>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a855f7', marginBottom: 10 }}>
              Join the community
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.01em' }} className="dark:text-gray-100">
              Create your<br /><em style={{ fontStyle: 'italic', color: '#a855f7' }} className="dark:text-purple-300">free account</em>
            </h1>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }} className="dark:text-gray-400">
              Join 50,000+ writers sharing their stories.
            </p>
          </div>

          {/* Alerts */}
          {isSuccess && (
            <div className="success-bar">
              <CheckCircle size={15} color="#22c55e" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#22c55e' }}>Account created!</p>
                <p style={{ fontSize: 12, color: '#86efac', marginTop: 1 }}>Taking you to your dashboard…</p>
              </div>
            </div>
          )}
          {error && (
            <div className="error-bar">
              <AlertCircle size={15} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#ef4444' }}>Registration failed</p>
                <p style={{ fontSize: 12, color: '#fca5a5', marginTop: 1 }}>{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="field-container">
              <label className={`field-label ${focusedField === 'username' ? 'focused' : ''}`}>Username</label>
              <div className={`field-wrap ${focusedField === 'username' ? 'focused' : ''}`}>
                <input type="text" className="field-input" placeholder="Choose a unique username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  required />
              </div>
            </div>

            {/* Email */}
            <div className="field-container">
              <label className={`field-label ${focusedField === 'email' ? 'focused' : ''}`}>Email address</label>
              <div className={`field-wrap ${focusedField === 'email' ? 'focused' : ''}`}>
                <input type="email" className="field-input" placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required />
              </div>
            </div>

            {/* Password */}
            <div className="field-container">
              <label className={`field-label ${focusedField === 'password' ? 'focused' : ''}`}>Password</label>
              <div className={`field-wrap ${focusedField === 'password' ? 'focused' : ''}`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="field-input"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setPasswordStrength(e.target.value ? checkStrength(e.target.value) : null); }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <button type="button" className="field-icon-btn text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Strength indicator */}
              {password && passwordStrength && (
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ 
                      flex: 1, height: 3, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden'
                    }} className="dark:bg-gray-700">
                    <div style={{
                      height: '100%',
                      width: strengthConfig[passwordStrength].width,
                      background: strengthConfig[passwordStrength].color,
                      borderRadius: 4,
                      transition: 'all 0.4s ease'
                    }} />
                  </div>
                  <span style={{ fontSize: 11, color: strengthConfig[passwordStrength].color, fontWeight: 600, letterSpacing: '0.05em' }}>
                    {strengthConfig[passwordStrength].label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="field-container">
              <label className={`field-label ${focusedField === 'confirm' ? 'focused' : ''}`}>Confirm password</label>
              <div className={`field-wrap ${focusedField === 'confirm' ? 'focused' : ''} ${confirmPassword && password !== confirmPassword ? 'error' : ''}`}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="field-input"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <button type="button" className="field-icon-btn text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p style={{ fontSize: 11, color: '#ef4444', marginTop: 5 }}>Passwords don't match</p>
              )}
            </div>

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24 }}>
              <input type="checkbox" className="checkbox-custom" required style={{ marginTop: 2 }} />
              <span style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }} className="dark:text-gray-400">
                I agree to the{' '}
                <a href="#" style={{ color: '#a855f7', textDecoration: 'none' }}>Terms of Service</a>
                {' '}and{' '}
                <a href="#" style={{ color: '#a855f7', textDecoration: 'none' }}>Privacy Policy</a>
              </span>
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={isLoading || isSuccess}>
              {isLoading ? (
                <>
                  <svg className="spin text-white dark:text-white" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Creating account…
                </>
              ) : isSuccess ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-white dark:text-white"><polyline points="20 6 9 17 4 12"/></svg>
                  Account Created!
                </>
              ) : (
                <>
                  Create Free Account
                  <ArrowRight size={14} className="text-white dark:text-white" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} className="dark:bg-gray-700" />
            <span style={{ fontSize: 11, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }} className="dark:text-gray-500">Have an account?</span>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} className="dark:bg-gray-700" />
          </div>

          <Link to="/login" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '12px 20px',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            color: '#6b7280',
            fontSize: 13,
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }} className="dark:border-gray-700 dark:text-gray-400"
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = '#7c3aed'; (e.currentTarget as HTMLElement).style.color = '#c084fc'; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLElement).style.color = '#6b7280'; }}>
            Sign in to existing account
            <ArrowRight size={13} className="text-gray-600 dark:text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PenTool, Twitter, Github, Linkedin, Mail, ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const footerLinks = {
    product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "API", href: "#" },
      { name: "Integrations", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Guides", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Disclaimer", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .footer-root {
          font-family: 'DM Sans', sans-serif;
          background-color: #0c0f1a;
          color: #e2e8f0;
          position: relative;
          overflow: hidden;
        }

        .footer-root::before {
          content: '';
          position: absolute;
          top: -160px;
          left: -160px;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-root::after {
          content: '';
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 32px 0;
          position: relative;
          z-index: 1;
        }

        /* Top strip */
        .footer-top {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 540px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
          .footer-brand {
            grid-column: 1;
          }
        }

        /* Brand */
        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 20px;
        }

        .brand-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(99,102,241,0.35);
        }

        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.3px;
        }

        .brand-tagline {
          font-size: 13.5px;
          color: #8892a4;
          line-height: 1.7;
          margin-bottom: 24px;
          max-width: 300px;
          font-weight: 300;
        }

        /* Social icons */
        .social-row {
          display: flex;
          gap: 10px;
          margin-bottom: 36px;
        }

        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8892a4;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .social-btn:hover {
          background: rgba(99,102,241,0.18);
          border-color: rgba(99,102,241,0.45);
          color: #a5b4fc;
          transform: translateY(-2px);
        }

        /* Newsletter */
        .newsletter-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6366f1;
          margin-bottom: 10px;
        }

        .newsletter-heading {
          font-size: 14px;
          font-weight: 500;
          color: #e2e8f0;
          margin-bottom: 14px;
        }

        .newsletter-form {
          display: flex;
          gap: 0;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          transition: border-color 0.2s;
        }

        .newsletter-form:focus-within {
          border-color: rgba(99,102,241,0.5);
        }

        .newsletter-input {
          flex: 1;
          padding: 10px 14px;
          font-size: 13px;
          background: transparent;
          border: none;
          outline: none;
          color: #e2e8f0;
          font-family: 'DM Sans', sans-serif;
          min-width: 0;
        }

        .newsletter-input::placeholder {
          color: #4a5568;
        }

        .newsletter-btn {
          padding: 10px 16px;
          background: #6366f1;
          border: none;
          cursor: pointer;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          background: #4f46e5;
        }

        .subscribed-msg {
          font-size: 13px;
          color: #10b981;
          padding: 10px 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Nav columns */
        .nav-col-heading {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4a5568;
          margin-bottom: 18px;
        }

        .nav-col-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nav-col-links a {
          font-size: 13.5px;
          color: #8892a4;
          text-decoration: none;
          font-weight: 400;
          transition: color 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 0;
        }

        .nav-col-links a:hover {
          color: #e2e8f0;
        }

        /* Middle band */
        .footer-middle {
          padding: 36px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .legal-links {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 20px;
        }

        .legal-links a {
          font-size: 12.5px;
          color: #4a5568;
          text-decoration: none;
          transition: color 0.15s;
        }

        .legal-links a:hover {
          color: #8892a4;
        }

        .utility-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .utility-links a {
          font-size: 12.5px;
          color: #4a5568;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: color 0.15s;
        }

        .utility-links a:hover {
          color: #8892a4;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(16,185,129,0.6);
        }

        /* Bottom bar */
        .footer-bottom {
          padding: 24px 0 32px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .copyright {
          font-size: 12.5px;
          color: #4a5568;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .heart {
          color: #f87171;
          fill: #f87171;
        }

        .lang-switch {
          display: flex;
          gap: 4px;
        }

        .lang-btn {
          padding: 4px 10px;
          font-size: 11.5px;
          border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.07);
          background: transparent;
          color: #4a5568;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.15s;
        }

        .lang-btn:hover, .lang-btn.active {
          background: rgba(255,255,255,0.06);
          color: #8892a4;
          border-color: rgba(255,255,255,0.12);
        }

        .divider-dot {
          color: #2d3748;
          font-size: 10px;
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          {/* Top Grid */}
          <div className="footer-top">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link to="/" className="brand-logo">
                <div className="brand-icon">
                  <PenTool size={18} color="#fff" />
                </div>
                <span className="brand-name">BlogSpace</span>
              </Link>

              <p className="brand-tagline">
                A modern publishing platform for writers, thinkers, and creators. Share your ideas with the world.
              </p>

              <div className="social-row">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} className="social-btn" aria-label={s.label}>
                    <s.icon size={15} />
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="newsletter-label">Newsletter</div>
              <div className="newsletter-heading">Get the latest posts delivered to your inbox</div>
              {subscribed ? (
                <div className="subscribed-msg">
                  <span>✓</span> You're subscribed — thank you!
                </div>
              ) : (
                <div className="newsletter-form">
                  <input
                    className="newsletter-input"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  />
                  <button className="newsletter-btn" onClick={handleSubscribe}>
                    Subscribe <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* Product */}
            <div>
              <div className="nav-col-heading">Product</div>
              <ul className="nav-col-links">
                {footerLinks.product.map((l) => (
                  <li key={l.name}><a href={l.href}>{l.name}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="nav-col-heading">Company</div>
              <ul className="nav-col-links">
                {footerLinks.company.map((l) => (
                  <li key={l.name}><a href={l.href}>{l.name}</a></li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="nav-col-heading">Resources</div>
              <ul className="nav-col-links">
                {footerLinks.resources.map((l) => (
                  <li key={l.name}><a href={l.href}>{l.name}</a></li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <div className="nav-col-heading">Quick Links</div>
              <ul className="nav-col-links">
                <li><a href="#">Mobile App</a></li>
                <li><a href="#">Desktop App</a></li>
                <li><a href="#">Browser Extension</a></li>
                <li><a href="#">API Docs</a></li>
                <li><a href="#">Status Page</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-middle">
            <div className="legal-links">
              {footerLinks.legal.map((l) => (
                <a key={l.name} href={l.href}>{l.name}</a>
              ))}
            </div>
            <div className="utility-links">
              <a href="#">
                <span className="status-dot" />
                All systems operational
              </a>
              <a href="#">Developers</a>
              <a href="#">Security</a>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-bottom">
            <p className="copyright">
              © {new Date().getFullYear()} BlogSpace. All rights reserved.&nbsp;Made with
              <span style={{ color: '#f87171', fill: '#f87171' }}>❤️</span>
              by BlogSpace team.
            </p>
            <div className="lang-switch">
              <button className="lang-btn active">🇺🇸 English</button>
              <button className="lang-btn">🇮🇳 हिन्दी</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
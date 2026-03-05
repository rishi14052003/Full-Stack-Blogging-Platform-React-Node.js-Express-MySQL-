import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Moon,
  Sun,
  Search,
  Menu,
  X,
  PenTool,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const Navbar: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: themeState, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <style>{`
        .navbar-root {
          font-family: 'DM Sans', sans-serif;
          background-color: #0c0f1a;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
          background-color: rgba(12,15,26,0.8);
        }

        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        @media (max-width: 768px) {
          .navbar-inner {
            padding: 0 16px;
          }
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .nav-brand:hover {
          opacity: 0.8;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(99,102,241,0.25);
        }

        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.2px;
        }

        .nav-center {
          display: flex;
          align-items: center;
          gap: 32px;
          flex: 1;
          justify-content: center;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          padding: 8px 16px;
          color: #8892a4;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .nav-link:hover, .nav-link.active {
          background: rgba(99,102,241,0.1);
          color: #e2e8f0;
        }

        .nav-link.active {
          background: rgba(99,102,241,0.15);
          color: #ffffff;
        }

        .search-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input {
          width: 240px;
          padding: 8px 12px 8px 36px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          color: #e2e8f0;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          border-color: rgba(99,102,241,0.4);
          background: rgba(255,255,255,0.06);
        }

        .search-input::placeholder {
          color: #4a5568;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: #4a5568;
          pointer-events: none;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .theme-toggle {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #8892a4;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .theme-toggle:hover {
          background: rgba(255,255,255,0.08);
          color: #e2e8f0;
        }

        .user-menu {
          position: relative;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid rgba(99,102,241,0.3);
          cursor: pointer;
          transition: all 0.2s;
        }

        .user-avatar:hover {
          border-color: rgba(99,102,241,0.6);
          transform: scale(1.05);
        }

        .mobile-menu-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #8892a4;
          display: none;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav-center, .search-container {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #0c0f1a;
          z-index: 100;
          display: flex;
          flex-direction: column;
          padding: 80px 24px 24px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .mobile-menu.open {
          transform: translateY(0);
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 32px;
        }

        .mobile-search {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          color: #e2e8f0;
          font-size: 16px;
          margin-bottom: 24px;
        }
      `}</style>

      <nav className="navbar-root">
        <div className="navbar-inner">
          {/* Brand */}
          <Link to="/" className="nav-brand">
            <div className="brand-icon">
              <PenTool size={16} color="#fff" />
            </div>
            <span className="brand-name">BlogSpace</span>
          </Link>

          {/* Center Navigation */}
          <div className="nav-center">
            <div className="nav-links">
              <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
                Home
              </Link>
              <Link to="/explore" className={`nav-link ${location.pathname === "/explore" ? "active" : ""}`}>
                Explore
              </Link>
            </div>

            {/* Search */}
            <div className="search-container">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search stories..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme}>
              {themeState.isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {authState.user ? (
              <div className="user-menu">
                <img
                  src={authState.user.avatar || `https://ui-avatars.com/api/?name=${authState.user.name}&background=3b82f6&color=fff`}
                  alt={authState.user.name}
                  className="user-avatar"
                  onClick={() => navigate("/profile")}
                />
              </div>
            ) : (
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(true)}>
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
            <div className="mobile-menu-header">
              <Link to="/" className="nav-brand">
                <div className="brand-icon">
                  <PenTool size={16} color="#fff" />
                </div>
                <span className="brand-name">BlogSpace</span>
              </Link>
              <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="mobile-nav-links">
              <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/explore" className={`nav-link ${location.pathname === "/explore" ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
                Explore
              </Link>
            </div>

            <input
              type="text"
              placeholder="Search stories..."
              className="mobile-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="nav-right">
              <button className="theme-toggle" onClick={toggleTheme}>
                {themeState.isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {authState.user ? (
                <div className="user-menu">
                  <img
                    src={authState.user.avatar || `https://ui-avatars.com/api/?name=${authState.user.name}&background=3b82f6&color=fff`}
                    alt={authState.user.name}
                    className="user-avatar"
                    onClick={() => {
                      navigate("/profile");
                      setIsMenuOpen(false);
                    }}
                  />
                </div>
              ) : (
                <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Bookmark, Clock, Eye, Star } from 'lucide-react';
import { featuredPosts, trendingPosts } from '../data/mockData';

// ─── Mock BlogCard (replace with your actual import) ───────────────────────
interface Post {
  id: string | number;
  title: string;
  excerpt?: string;
  author?: { name: string; avatar?: string };
  category?: string;
  readTime?: string;
  date?: string;
  views?: number;
  image?: string;
  tags?: string[];
}

const BlogCard: React.FC<{ post: Post; variant?: 'featured' | 'default' | 'trending' }> = ({ post, variant = 'default' }) => {
  const isFeatured = variant === 'featured';
  const isTrending = variant === 'trending';

  return (
    <Link
      to={`/post/${post.id}`}
      className={`blog-card ${isFeatured ? 'blog-card--featured' : ''} ${isTrending ? 'blog-card--trending' : ''}`}
    >
      {/* Thumbnail */}
      <div className="card-thumb">
        {post.image ? (
          <img src={post.image} alt={post.title} className="card-thumb-img" />
        ) : (
          <div className="card-thumb-placeholder" />
        )}
        {post.category && <span className="card-category">{post.category}</span>}
        <button
          className="card-bookmark"
          onClick={(e) => e.preventDefault()}
          aria-label="Bookmark"
        >
          <Bookmark size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="card-body">
        <h3 className="card-title">{post.title}</h3>
        {post.excerpt && <p className="card-excerpt">{post.excerpt}</p>}

        {/* Meta row */}
        <div className="card-meta">
          {post.author && (
            <div className="card-author">
              <div className="card-avatar">
                {post.author.avatar
                  ? <img src={post.author.avatar} alt={post.author.name} />
                  : <span>{post.author.name[0]}</span>
                }
              </div>
              <span className="card-author-name">{post.author.name}</span>
            </div>
          )}
          <div className="card-stats">
            {post.readTime && (
              <span className="card-stat"><Clock size={12} />{post.readTime}</span>
            )}
            {post.views && (
              <span className="card-stat"><Eye size={12} />{post.views}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─── Main Landing Page ──────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #080b14;
          --bg-2: #0d1120;
          --bg-card: #111827;
          --bg-card-hover: #161e30;
          --border: rgba(255,255,255,0.06);
          --border-hover: rgba(255,255,255,0.12);
          --text-primary: #f0f4ff;
          --text-secondary: #8a94a8;
          --text-muted: #525d72;
          --accent: #6366f1;
          --accent-2: #22d3ee;
          --accent-warm: #f59e0b;
          --font-display: 'Cormorant Garamond', serif;
          --font-body: 'Outfit', sans-serif;
          --radius: 14px;
          --radius-sm: 8px;
          --transition: 0.25s cubic-bezier(0.4,0,0.2,1);
        }

        .lp-root {
          font-family: var(--font-body);
          background-color: var(--bg);
          color: var(--text-primary);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Noise Overlay ── */
        .lp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        /* ── Ambient orbs ── */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .orb-1 { width: 600px; height: 600px; top: -200px; left: -100px; background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%); }
        .orb-2 { width: 500px; height: 500px; bottom: 0; right: -100px; background: radial-gradient(circle, rgba(34,211,238,0.08), transparent 70%); }
        .orb-3 { width: 400px; height: 400px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%); }

        /* ── Layout ── */
        .lp-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ══ HERO ══════════════════════════════════════════════════════════ */
        .hero {
          padding: 140px 32px 100px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          color: #a5b4fc;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        .hero-badge-dot {
          width: 6px; height: 6px;
          background: #818cf8;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(48px, 7vw, 86px);
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.05;
          letter-spacing: -1.5px;
          margin-bottom: 24px;
          max-width: 860px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-title em {
          font-style: italic;
          background: linear-gradient(135deg, #818cf8 0%, #22d3ee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 18px;
          color: var(--text-secondary);
          font-weight: 300;
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 48px;
        }

        .hero-ctas {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ══ BUTTONS ══════════════════════════════════════════════════════ */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: var(--transition);
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #fff;
          box-shadow: 0 0 0 0 rgba(99,102,241,0.4), 0 4px 20px rgba(99,102,241,0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(99,102,241,0.35), 0 8px 30px rgba(99,102,241,0.4);
        }

        .btn-ghost {
          background: rgba(255,255,255,0.04);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.08);
          border-color: var(--border-hover);
        }

        /* ══ SECTION ══════════════════════════════════════════════════════ */
        .section {
          padding: 80px 32px;
          position: relative;
          z-index: 1;
        }

        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 40px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-2);
          margin-bottom: 8px;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.5px;
          line-height: 1.1;
        }

        .section-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition);
          white-space: nowrap;
        }
        .section-link:hover { color: var(--text-primary); }

        /* ══ DIVIDER LINE ═════════════════════════════════════════════════ */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 0 32px;
          position: relative;
          z-index: 1;
        }

        /* ══ FEATURED GRID ════════════════════════════════════════════════ */
        .featured-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: 1fr; }
        }

        /* ══ TRENDING GRID ════════════════════════════════════════════════ */
        .trending-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 960px) {
          .trending-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .trending-grid { grid-template-columns: 1fr; }
        }

        /* ══ BLOG CARD ════════════════════════════════════════════════════ */
        .blog-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color var(--transition), background var(--transition), transform var(--transition), box-shadow var(--transition);
          position: relative;
        }

        .blog-card:hover {
          border-color: var(--border-hover);
          background: var(--bg-card-hover);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05);
        }

        /* Featured card modifications */
        .blog-card--featured .card-thumb { aspect-ratio: 16/9; }
        .blog-card--featured .card-title { font-size: 22px; }
        .blog-card--featured .card-excerpt { display: block; }

        /* Trending card modifications */
        .blog-card--trending .card-thumb { aspect-ratio: 16/9; }
        .blog-card--trending .card-excerpt { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        /* Thumbnail */
        .card-thumb {
          position: relative;
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #1a2035, #0f1729);
          overflow: hidden;
          flex-shrink: 0;
        }

        .card-thumb-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .blog-card:hover .card-thumb-img { transform: scale(1.05); }

        .card-thumb-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg,
            rgba(99,102,241,0.15) 0%,
            rgba(34,211,238,0.08) 50%,
            rgba(245,158,11,0.08) 100%
          );
        }

        /* Overlay gradient */
        .card-thumb::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,11,20,0.7) 0%, transparent 50%);
          pointer-events: none;
        }

        .card-category {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          padding: 4px 10px;
          background: rgba(8,11,20,0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--accent-2);
        }

        .card-bookmark {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(8,11,20,0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition);
        }
        .card-bookmark:hover { color: var(--accent-warm); border-color: rgba(245,158,11,0.3); }

        /* Card Body */
        .card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 10px;
        }

        .card-title {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          letter-spacing: -0.2px;
          transition: color var(--transition);
        }
        .blog-card:hover .card-title { color: #e0e7ff; }

        .card-excerpt {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.65;
          font-weight: 300;
          flex: 1;
          display: none;
        }

        /* Meta */
        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border);
          gap: 8px;
        }

        .card-author {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(135deg, #6366f1, #22d3ee);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          font-weight: 600;
          color: #fff;
          flex-shrink: 0;
        }
        .card-avatar img { width: 100%; height: 100%; object-fit: cover; }

        .card-author-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .card-stats {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-stat {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 400;
        }

        /* ── Trending number cards ── */
        .trending-number-list {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .trending-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: var(--bg-card);
          text-decoration: none;
          color: inherit;
          transition: background var(--transition);
        }
        .trending-item:hover { background: var(--bg-card-hover); }

        .trending-num {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          color: var(--text-muted);
          line-height: 1;
          min-width: 36px;
        }

        .trending-item-body { flex: 1; min-width: 0; }
        .trending-item-cat {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--accent-2);
          margin-bottom: 4px;
        }
        .trending-item-title {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 600;
          line-height: 1.3;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .trending-item-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 6px;
        }

        /* ══ STATS BAR ════════════════════════════════════════════════════ */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          margin: 0 32px;
          position: relative;
          z-index: 1;
        }

        .stat-item {
          padding: 32px 24px;
          background: var(--bg-card);
          text-align: center;
        }

        .stat-num {
          font-family: var(--font-display);
          font-size: 48px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #f0f4ff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 300;
        }

        @media (max-width: 600px) {
          .stats-bar { grid-template-columns: 1fr; margin: 0 16px; }
        }

        /* ══ CTA ══════════════════════════════════════════════════════════ */
        .cta-section {
          padding: 120px 32px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cta-inner {
          max-width: 640px;
          margin: 0 auto;
          padding: 64px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }

        .cta-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .cta-inner::after {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 200px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent);
        }

        .cta-icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(34,211,238,0.1));
          border: 1px solid rgba(99,102,241,0.2);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
        }

        .cta-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.5px;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .cta-desc {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 36px;
        }

        .cta-btns {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ══ RESPONSIVE ═══════════════════════════════════════════════════ */
        @media (max-width: 768px) {
          .hero { padding: 100px 16px 80px; }
          .section { padding: 60px 16px; }
          .section-head { flex-direction: column; align-items: flex-start; }
          .divider { margin: 0 16px; }
          .cta-section { padding: 80px 16px; }
          .cta-inner { padding: 40px 24px; }
          .stats-bar { grid-template-columns: 1fr 1fr 1fr; }
        }
      `}</style>

      <div className="lp-root">
        {/* Ambient orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Now in public beta
          </div>
          <h1 className="hero-title">
            Where <em>great ideas</em><br />find their voice
          </h1>
          <p className="hero-sub">
            A refined publishing platform for writers, thinkers, and creators. Write beautifully. Reach further.
          </p>
          <div className="hero-ctas">
            <Link to="/write" className="btn btn-primary">
              Start Writing <ArrowRight size={16} />
            </Link>
            <Link to="/explore" className="btn btn-ghost">
              Explore Stories
            </Link>
          </div>
        </section>

        {/* ── FEATURED ──────────────────────────────────────────────── */}
        <section className="section">
          <div className="lp-inner" style={{ padding: 0 }}>
            <div className="section-head">
              <div>
                <div className="section-label"><Star size={11} /> Editor's Pick</div>
                <h2 className="section-title">Featured Stories</h2>
              </div>
              <Link to="/explore" className="section-link">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="featured-grid">
              {featuredPosts.slice(0, 2).map((post) => (
                <BlogCard key={post.id} post={post} variant="featured" />
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── TRENDING ──────────────────────────────────────────────── */}
        <section className="section">
          <div className="lp-inner" style={{ padding: 0 }}>
            <div className="section-head">
              <div>
                <div className="section-label"><TrendingUp size={11} /> Trending</div>
                <h2 className="section-title">What's Hot Right Now</h2>
              </div>
              <Link to="/explore" className="section-link">
                See more <ArrowRight size={14} />
              </Link>
            </div>
            <div className="trending-grid">
              {trendingPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.id} post={post} variant="trending" />
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="cta-section">
          <div className="cta-inner">
            <div className="cta-icon">
              <Star size={24} color="#818cf8" />
            </div>
            <h2 className="cta-title">Ready to share your story?</h2>
            <p className="cta-desc">
              Join thousands of writers sharing ideas that matter. No noise, just good writing.
            </p>
            <div className="cta-btns">
              <Link to="/write" className="btn btn-primary">
                Start Writing <ArrowRight size={16} />
              </Link>
              <Link to="/explore" className="btn btn-ghost">
                Browse Stories
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
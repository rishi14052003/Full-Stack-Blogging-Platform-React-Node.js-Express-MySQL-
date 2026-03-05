import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, BarChart3, TrendingUp, Users, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  status: 'draft' | 'published';
}

const DashboardPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  });
  const { state } = useAuth();

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Getting Started with React Hooks',
        excerpt: 'Learn the fundamentals of React Hooks and how to use them effectively in your applications.',
        content: '',
        tags: ['React', 'JavaScript', 'Tutorial'],
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15',
        views: 1250,
        likes: 45,
        comments: 12,
        status: 'published'
      },
      {
        id: '2',
        title: 'Building Scalable Node.js Applications',
        excerpt: 'Best practices for building and scaling Node.js applications in production environments.',
        content: '',
        tags: ['Node.js', 'Backend', 'Architecture'],
        createdAt: '2024-01-10',
        updatedAt: '2024-01-12',
        views: 890,
        likes: 32,
        comments: 8,
        status: 'published'
      },
      {
        id: '3',
        title: 'Introduction to TypeScript',
        excerpt: 'A comprehensive guide to TypeScript for JavaScript developers.',
        content: '',
        tags: ['TypeScript', 'JavaScript', 'Programming'],
        createdAt: '2024-01-08',
        updatedAt: '2024-01-08',
        views: 0,
        likes: 0,
        comments: 0,
        status: 'draft'
      }
    ];

    setTimeout(() => {
      setPosts(mockPosts);
      setStats({
        totalPosts: mockPosts.length,
        totalViews: mockPosts.reduce((acc, post) => acc + post.views, 0),
        totalLikes: mockPosts.reduce((acc, post) => acc + post.likes, 0),
        totalComments: mockPosts.reduce((acc, post) => acc + post.comments, 0)
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .stat-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.2s;
        }

        .dark .stat-card {
          background: #1f2937;
          border-color: #374151;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .post-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all 0.2s;
        }

        .dark .post-card {
          background: #1f2937;
          border-color: #374151;
        }

        .post-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-published {
          background: #dcfce7;
          color: #166534;
        }

        .dark .status-published {
          background: #14532d;
          color: #86efac;
        }

        .status-draft {
          background: #fef3c7;
          color: #92400e;
        }

        .dark .status-draft {
          background: #451a03;
          color: #fcd34d;
        }

        .action-btn {
          padding: 0.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          transform: scale(1.05);
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .dark .btn-secondary {
          background: #374151;
          color: #f3f4f6;
        }

        .btn-danger {
          background: #fef2f2;
          color: #dc2626;
        }

        .dark .btn-danger {
          background: #450a0a;
          color: #f87171;
        }
      `}</style>

      <div className="dashboard-container">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }} className="dark:text-gray-100">
            Dashboard
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }} className="dark:text-gray-400">
            Welcome back, {state.user?.username || 'Writer'}! Here's your writing overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={24} color="#7c3aed" />
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }} className="dark:text-gray-100">{stats.totalPosts}</span>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="dark:text-gray-400">Total Posts</h3>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Eye size={24} color="#22c55e" />
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }} className="dark:text-gray-100">{stats.totalViews.toLocaleString()}</span>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="dark:text-gray-400">Total Views</h3>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(236,72,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={24} color="#ec4899" />
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }} className="dark:text-gray-100">{stats.totalLikes}</span>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="dark:text-gray-400">Total Likes</h3>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={24} color="#3b82f6" />
              </div>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }} className="dark:text-gray-100">{stats.totalComments}</span>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="dark:text-gray-400">Comments</h3>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827' }} className="dark:text-gray-100">Your Posts</h2>
          <Link to="/create" className="btn-primary px-4 py-2 flex items-center gap-2 text-white font-medium">
            <Plus size={20} />
            Create New Post
          </Link>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Edit size={32} color="#7c3aed" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }} className="dark:text-gray-100">No posts yet</h3>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }} className="dark:text-gray-400">Start writing your first blog post to see it here.</p>
              <Link to="/create" className="btn-primary px-6 py-2 inline-flex items-center gap-2 text-white font-medium">
                <Plus size={20} />
                Create Your First Post
              </Link>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="post-card">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827' }} className="dark:text-gray-100">{post.title}</h3>
                      <span className={`status-badge ${post.status === 'published' ? 'status-published' : 'status-draft'}`}>
                        {post.status}
                      </span>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '0.75rem' }} className="dark:text-gray-400">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {post.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp size={14} />
                        {post.likes} likes
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {post.comments} comments
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/edit/${post.id}`} className="action-btn btn-secondary">
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="action-btn btn-danger"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

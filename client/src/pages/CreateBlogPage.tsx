import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Bold, Italic, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateBlogPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // const { state } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Mock API call - replace with actual API
      // const user = state.user;
      // const newPost = {
      //   id: Date.now().toString(),
      //   title,
      //   content,
      //   excerpt: excerpt || content.substring(0, 150) + '...',
      //   tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      //   author: {
      //     id: user?.id || '1',
      //     username: user?.username || 'writer',
      //     avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=writer'
      //   },
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      //   views: 0,
      //   likes: 0,
      //   comments: 0,
      //   status
      // };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      const newText = before + selectedText + after;
      const newContent = content.substring(0, start) + newText + content.substring(end);
      setContent(newContent);
      
      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
      }, 0);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock image upload - replace with actual upload logic
      const imageUrl = `https://picsum.photos/seed/${file.name}/800/400.jpg`;
      insertText(`![${file.name}](${imageUrl})`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

        .editor-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .dark .editor-header {
          border-bottom-color: #374151;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .back-btn:hover {
          color: #7c3aed;
        }

        .dark .back-btn:hover {
          color: #a855f7;
        }

        .editor-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(124,58,237,0.3);
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #e5e7eb;
        }

        .dark .btn-secondary {
          background: #374151;
          color: #f3f4f6;
          border-color: #4b5563;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .dark .btn-secondary:hover {
          background: #4b5563;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .editor-main {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .editor-main {
            grid-template-columns: 1fr;
          }
        }

        .editor-content {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
        }

        .dark .editor-content {
          background: #1f2937;
          border-color: #374151;
        }

        .editor-toolbar {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .dark .editor-toolbar {
          background: #111827;
          border-bottom-color: #374151;
        }

        .toolbar-btn {
          padding: 0.5rem;
          border: none;
          background: none;
          border-radius: 6px;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }

        .toolbar-btn:hover {
          background: #e5e7eb;
          color: #374151;
        }

        .dark .toolbar-btn:hover {
          background: #374151;
          color: #f3f4f6;
        }

        .title-input {
          width: 100%;
          padding: 1.5rem;
          border: none;
          outline: none;
          font-size: 2rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: #111827;
          background: transparent;
        }

        .dark .title-input {
          color: #f3f4f6;
        }

        .title-input::placeholder {
          color: #9ca3af;
        }

        .content-textarea {
          width: 100%;
          min-height: 400px;
          padding: 1.5rem;
          border: none;
          outline: none;
          font-size: 1rem;
          line-height: 1.7;
          color: #374151;
          background: transparent;
          resize: vertical;
          font-family: 'DM Sans', sans-serif;
        }

        .dark .content-textarea {
          color: #d1d5db;
        }

        .content-textarea::placeholder {
          color: #9ca3af;
        }

        .editor-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .sidebar-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .dark .sidebar-card {
          background: #1f2937;
          border-color: #374151;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .dark .form-label {
          color: #d1d5db;
        }

        .form-input, .form-textarea, .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #374151;
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }

        .dark .form-input, .dark .form-textarea, .dark .form-select {
          background: #111827;
          border-color: #374151;
          color: #d1d5db;
        }

        .form-input:focus, .form-textarea:focus, .form-select:focus {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }

        .preview-content {
          padding: 1.5rem;
          min-height: 400px;
          color: #374151;
          line-height: 1.7;
          font-family: 'DM Sans', sans-serif;
        }

        .dark .preview-content {
          color: #d1d5db;
        }

        .preview-content h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          font-family: 'Playfair Display', serif;
        }

        .preview-content p {
          margin-bottom: 1rem;
        }

        .alert {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .alert-success {
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          color: #166534;
        }

        .dark .alert-success {
          background: #14532d;
          border-color: #166534;
          color: #86efac;
        }

        .alert-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
        }

        .dark .alert-error {
          background: #450a0a;
          border-color: #7f1d1d;
          color: #f87171;
        }

        .toggle-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .dark .toggle-btn {
          background: #1f2937;
          border-color: #374151;
          color: #d1d5db;
        }

        .toggle-btn.active {
          background: #7c3aed;
          color: white;
          border-color: #7c3aed;
        }

        .file-input {
          display: none;
        }
      `}</style>

      <div className="editor-container">
        {/* Header */}
        <div className="editor-header">
          <Link to="/dashboard" className="back-btn">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          
          <div className="editor-actions">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`toggle-btn ${!isPreview ? 'active' : ''}`}
                onClick={() => setIsPreview(false)}
              >
                Edit
              </button>
              <button
                className={`toggle-btn ${isPreview ? 'active' : ''}`}
                onClick={() => setIsPreview(true)}
              >
                Preview
              </button>
            </div>
            
            <button
              className="btn btn-secondary"
              onClick={() => setStatus(status === 'draft' ? 'published' : 'draft')}
            >
              {status === 'draft' ? 'Publish' : 'Save as Draft'}
            </button>
            
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isLoading || !title || !content}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {status === 'published' ? 'Publish Post' : 'Save Draft'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <div className="alert alert-success">
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" fill="white" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>Post {status === 'published' ? 'published' : 'saved'} successfully!</p>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Redirecting to dashboard...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" fill="white" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>Failed to {status === 'published' ? 'publish' : 'save'} post</p>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>{error}</p>
            </div>
          </div>
        )}

        {/* Main Editor */}
        <div className="editor-main">
          <div className="editor-content">
            {!isPreview ? (
              <>
                {/* Toolbar */}
                <div className="editor-toolbar">
                  <button className="toolbar-btn" onClick={() => insertText('**', '**')}>
                    <Bold size={16} />
                  </button>
                  <button className="toolbar-btn" onClick={() => insertText('*', '*')}>
                    <Italic size={16} />
                  </button>
                  <button className="toolbar-btn" onClick={() => insertText('[', '](url)')}>
                    <LinkIcon size={16} />
                  </button>
                  <label className="toolbar-btn">
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input"
                      onChange={handleImageUpload}
                    />
                    <ImageIcon size={16} />
                  </label>
                </div>

                {/* Title Input */}
                <input
                  type="text"
                  className="title-input"
                  placeholder="Enter your post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                {/* Content Textarea */}
                <textarea
                  id="content-textarea"
                  className="content-textarea"
                  placeholder="Start writing your story..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </>
            ) : (
              <div className="preview-content">
                <h1>{title || 'Untitled Post'}</h1>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {content || 'Start writing to see preview...'}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="editor-sidebar">
            {/* Excerpt */}
            <div className="sidebar-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#111827' }} className="dark:text-gray-100">
                Excerpt
              </h3>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Brief description of your post..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="sidebar-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#111827' }} className="dark:text-gray-100">
                Tags
              </h3>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="react, javascript, tutorial"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }} className="dark:text-gray-400">
                  Separate tags with commas
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="sidebar-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#111827' }} className="dark:text-gray-100">
                Post Status
              </h3>
              <div className="form-group">
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPage;

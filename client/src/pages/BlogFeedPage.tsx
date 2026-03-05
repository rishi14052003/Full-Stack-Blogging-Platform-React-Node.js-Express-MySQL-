import React, { useState } from "react";
import { Search, Grid, List } from "lucide-react";
import BlogCard from "../components/BlogCard";
import LoadingSpinner from '../components/LoadingSpinner';
import { mockPosts } from "../data/mockData";

const BlogFeedPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest");
  const [posts] = useState(mockPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const allTags = Array.from(new Set(mockPosts.flatMap(post => post.tags)));

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    } else if (sortBy === "popular") {
      return b.likes - a.likes;
    } else {
      return (b.likes + b.comments.length) - (a.likes + a.comments.length);
    }
  });

  const loadMore = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would fetch more posts from the API
      // For demo purposes, we'll just show that there are no more posts
      setIsLoading(false);
      setHasMore(false);
    }, 1000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .feed-root {
          font-family: 'DM Sans', sans-serif;
          background-color: #0c0f1a;
          color: #e2e8f0;
          min-height: 100vh;
        }

        .feed-header {
          padding: 32px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .page-subtitle {
          font-size: 16px;
          color: #8892a4;
          font-weight: 300;
        }

        .filters-section {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
        }

        .filters-row {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1;
          min-width: 280px;
          padding: 12px 16px;
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

        .sort-select {
          padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          color: #e2e8f0;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .view-toggle {
          display: flex;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          overflow: hidden;
        }

        .toggle-btn {
          padding: 10px 12px;
          background: rgba(255,255,255,0.04);
          color: #8892a4;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .toggle-btn.active {
          background: rgba(99,102,241,0.15);
          color: #ffffff;
        }

        .toggle-btn:hover {
          background: rgba(255,255,255,0.08);
        }

        .tags-container {
          margin-top: 16px;
        }

        .tag-btn {
          padding: 6px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          color: #8892a4;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          margin-right: 8px;
          margin-bottom: 8px;
        }

        .tag-btn.active {
          background: rgba(99,102,241,0.15);
          color: #ffffff;
          border-color: rgba(99,102,241,0.3);
        }

        .tag-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.12);
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .posts-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 32px;
        }

        .no-posts {
          text-align: center;
          padding: 80px 24px;
        }

        .no-posts-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .no-posts-desc {
          font-size: 16px;
          color: #8892a4;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .feed-header {
            padding: 24px 16px;
          }

          .page-title {
            font-size: 24px;
          }

          .filters-section {
            padding: 20px;
            margin-bottom: 24px;
          }

          .filters-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .search-input {
            min-width: auto;
          }

          .posts-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <div className="feed-root">
        {/* Header */}
        <div className="feed-header">
          <div className="header-content">
            <h1 className="page-title">Explore Stories</h1>
            <p className="page-subtitle">Discover ideas and knowledge from our community</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-row">
            {/* Search */}
            <div className="search-input">
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} size={16} />
              <input
                type="text"
                placeholder="Search stories, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '40px' }}
              />
            </div>

            {/* Sort */}
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value as "latest" | "popular" | "trending")}>
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="trending">Trending</option>
            </select>

            {/* View Mode */}
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
              <button 
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="tags-container">
            <button className={`tag-btn ${selectedTag === 'all' ? 'active' : ''}`} onClick={() => setSelectedTag('all')}>
              All Topics
            </button>
            {allTags.map((tag) => (
              <button 
                key={tag}
                className={`tag-btn ${selectedTag === tag ? 'active' : ''}`} 
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        {sortedPosts.length === 0 ? (
          <div className="no-posts">
            <h2 className="no-posts-title">No stories found</h2>
            <p className="no-posts-desc">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'posts-grid' : 'posts-list'}>
            {sortedPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                variant={viewMode === 'list' ? 'compact' : 'default'}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-6 sm:mt-8 text-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Loading more stories...
                </>
              ) : (
                'Load more stories'
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogFeedPage;

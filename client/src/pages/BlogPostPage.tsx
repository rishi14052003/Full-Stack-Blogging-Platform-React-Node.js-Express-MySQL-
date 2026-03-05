import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Clock, 
  ArrowLeft,
  Send
} from 'lucide-react';
import { mockPosts, mockUsers } from '../data/mockData';
import type { BlogPost, Comment } from '../types';
import { formatDistanceToNow } from 'date-fns';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post] = useState<BlogPost | undefined>(mockPosts.find(p => p.id === id));
  const [comments, setComments] = useState<Comment[]>(post?.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post not found
          </h1>
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: mockUsers[0], // Current user
      createdAt: new Date(),
      postId: post.id,
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const relatedPosts = mockPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Link
          to="/explore"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 sm:mb-8 text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to stories
        </Link>

        {/* Article Header */}
        <article className="mb-8 sm:mb-12">
          <header className="mb-6 sm:mb-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs sm:text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.name}&background=3b82f6&color=fff`}
                  alt={post.author.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    {post.author.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs sm:text-sm">{likeCount}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Reading Time */}
            <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              <span>{Math.ceil(post.content.length / 1000)} min read</span>
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-6 sm:mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 sm:h-64 lg:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </article>

        {/* Engagement Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6 border-t border-b border-gray-200 dark:border-gray-700 mb-6 sm:mb-8 gap-4">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
              }`}
            >
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm sm:text-base">{likeCount} Likes</span>
            </button>

            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">{comments.length} Comments</span>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base"
          >
            <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleComment} className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <img
                src={mockUsers[0].avatar}
                alt={mockUsers[0].name}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4 sm:space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <img
                  src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.name}&background=3b82f6&color=fff`}
                  alt={comment.author.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                      {comment.author.name}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Related Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/post/${relatedPost.id}`}
                  className="group"
                >
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-sm sm:text-base">
                      {relatedPost.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="mt-2 sm:mt-3 text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(relatedPost.publishedAt), { addSuffix: true })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;

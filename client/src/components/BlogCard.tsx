import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Clock } from "lucide-react";
import type { BlogPost } from "../types";
import { formatDistanceToNow } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = "default" }) => {
  const timeAgo = formatDistanceToNow(new Date(post.publishedAt), {
    addSuffix: true,
  });

  if (variant === "compact") {
    return (
      <Link to={`/post/${post.id}`} className="block group">
        <div className="p-3 sm:p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-md">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <img
              src={
                post.author.avatar ||
                `https://ui-avatars.com/api/?name=${post.author.name}&background=3b82f6&color=fff`
              }
              alt={post.author.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {post.author.name} • {timeAgo}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link to={`/post/${post.id}`} className="block group">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          {post.coverImage && (
            <div className="aspect-video overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="p-4 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
              <img
                src={
                  post.author.avatar ||
                  `https://ui-avatars.com/api/?name=${post.author.name}&background=3b82f6&color=fff`
                }
                alt={post.author.name}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
              />
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                  {post.author.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {timeAgo}
                </p>
              </div>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-3 sm:space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">{post.likes}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">{post.comments.length}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/post/${post.id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200">
        {post.coverImage && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-3 sm:p-5">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
            <img
              src={
                post.author.avatar ||
                `https://ui-avatars.com/api/?name=${post.author.name}&background=3b82f6&color=fff`
              }
              alt={post.author.name}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{timeAgo}</span>
              </p>
            </div>
          </div>
          <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{post.likes}</span>
              </span>
              <span className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{post.comments.length}</span>
              </span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

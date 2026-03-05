import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PenTool, Users, TrendingUp, BookOpen, Star, Zap } from 'lucide-react';
import { featuredPosts, trendingPosts } from '../data/mockData';
import BlogCard from '../components/BlogCard';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Share your ideas
              <span className="block text-blue-600 dark:text-blue-400">with the world</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Join a community of writers, thinkers, and creators. Publish your stories, 
              connect with readers, and make your voice heard on a platform built for modern storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                Start Writing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-lg"
              >
                Explore Stories
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Writers</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Published Stories</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">1M+</div>
              <div className="text-gray-600 dark:text-gray-400">Monthly Readers</div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why choose BlogSpace?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to share your stories and grow your audience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <div className="flex justify-center mb-4">
                <PenTool className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Powerful Editor
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rich text editor with markdown support, syntax highlighting, and seamless media integration.
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <div className="flex justify-center mb-4">
                <Star className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Build Your Audience
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with readers who love your content and grow your following with our discovery tools.
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Fast & Reliable
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Lightning-fast performance with global CDN and 99.9% uptime guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Stories
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Hand-picked stories from our community
              </p>
            </div>
            <Link
              to="/explore"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map((post) => (
              <BlogCard key={post.id} post={post} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Posts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Trending Now
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              What's popular in the community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to share your story?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of writers who are already sharing their ideas with the world.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

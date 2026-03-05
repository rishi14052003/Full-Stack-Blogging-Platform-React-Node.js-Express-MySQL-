import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Moon,
  Sun,
  Search,
  Menu,
  X,
  PenTool,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const Navbar: React.FC = () => {
  const { state: authState, logout } = useAuth();
  const { state: themeState, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    ...(authState.isAuthenticated
      ? [
          { name: "Write", path: "/write" },
          { name: "Dashboard", path: "/dashboard" },
        ]
      : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <PenTool className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              BlogSpace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {themeState.isDark ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* User Menu */}
            {authState.isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {authState.user?.name}
                </span>
                <div className="relative group">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {themeState.isDark ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Mobile Auth */}
              {!authState.isAuthenticated ? (
                <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {authState.user?.name}
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

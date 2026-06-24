"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BookOpen,
  Home,
  Compass,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { useSession, signOut } from "../lib/auth-client";
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const { data: session, isPending, error } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safe access
  const userRole = session?.user?.role || null;
  const isAuthenticated = !!session?.user;
  const userName = session?.user?.name || 'User';

  // Show loading state while session is pending or component is mounting
  if (!mounted || isPending) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-800">Fable</span>
            </Link>
            <div className="animate-pulse bg-gray-200 h-8 w-20 sm:w-24 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Browse Ebooks", href: "/browsersbooks", icon: Compass },
  ];

  const getDashboardLink = () => {
    if (userRole === "admin") return "/Dashboard/admin";
    if (userRole === "writer") return "/Dashboard/writer";
    if (userRole === "reader" || userRole === "user" || userRole === "seeker") return "/Dashboard/reader";
    return "/Dashboard/reader";
  };

  const getDashboardLabel = () => {
    if (userRole === "admin") return "Admin Dashboard";
    if (userRole === "writer") return "Writer Dashboard";
    if (userRole === "reader" || userRole === "user" || userRole === "seeker") return "Reader Dashboard";
    return "Dashboard";
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully!');
      router.refresh(); // Refresh server components
      setIsOpen(false);
      setShowUserMenu(false);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleLogin = () => {
    toast.success('Redirecting to login...');
  };

  const handleDashboardClick = () => {
    toast.success(`Navigating to ${getDashboardLabel()}`);
  };

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      }
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    },
  };

  return (
    <nav 
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-md'
      }`}
    >
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-800">Fable</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{link.name}</span>
                  </Link>
                </motion.div>
              );
            })}

            {isAuthenticated && (
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={getDashboardLink()}
                  onClick={handleDashboardClick}
                  className={`flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.includes(`/Dashboard/`)
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
              </motion.div>
            )}

            {isAuthenticated ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline truncate max-w-[80px]">{userName}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                    >
                      <Link
                        href={`/Dashboard/${session.user.role}/userprofile`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/Login"
                  onClick={handleLogin}
                  className="flex items-center space-x-1 px-3 lg:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white border-t shadow-lg"
          >
            <div className="container mx-auto px-3 sm:px-4 py-4 space-y-2">
              {/* User Info on Mobile */}
              {isAuthenticated && (
                <motion.div variants={mobileItemVariants} className="px-3 py-3 mb-3 bg-indigo-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{userName}</p>
                      <p className="text-xs text-gray-500 capitalize">{userRole || 'User'}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.name} variants={mobileItemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-md text-sm font-medium ${
                        isActive
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {isAuthenticated && (
                <motion.div variants={mobileItemVariants}>
                  <Link
                    href={getDashboardLink()}
                    onClick={() => {
                      handleDashboardClick();
                      setIsOpen(false);
                    }}
                    className={`flex items-center space-x-2 px-3 py-2.5 rounded-md text-sm font-medium ${
                      pathname.includes("/Dashboard/")
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{getDashboardLabel()}</span>
                  </Link>
                </motion.div>
              )}

              <motion.div variants={mobileItemVariants} className="pt-2 border-t border-gray-100">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    href="/Login"
                    onClick={() => {
                      handleLogin();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
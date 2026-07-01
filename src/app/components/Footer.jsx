"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const linkVariants = {
    hover: { x: 4, transition: { duration: 0.2 } },
  };

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Successfully subscribed to newsletter! 🎉');
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  // Handle issue click
  const handleIssueClick = (issue) => {
    toast.info(`Issue: ${issue}`, {
      duration: 4000,
      icon: '📌',
    });
  };

  // Handle start writing click
  const handleStartWriting = () => {
    toast.success('Redirecting to writing page...');
  };

  return (
    <footer className="bg-[#111827] text-white">
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
          info: {
            duration: 4000,
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12"
        >
          {/* Ready to Share Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Ready to Share Your Story?
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm leading-relaxed">
              Join thousands of writers earning from their passion. Publish your ebook today.
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/Singup"
                className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#111827] font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
                onClick={handleStartWriting}
              >
                Start Writing Today
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">QUICK LINKS</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {[
                { label: "About", href: "/about" },
                { label: "Browse Ebooks", href: "/browsersbooks" },
                { label: "Contact", href: "mailto:siamtechofficial1597@gmail.com" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((link, index) => (
                <motion.li key={index} variants={linkVariants} whileHover="hover">
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">NEWSLETTER</h4>
            <p className="text-gray-400 text-sm mb-3 sm:mb-4">
              Get notified about new releases and featured authors.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-2.5 sm:py-3 bg-white text-[#111827] font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Join'}
              </motion.button>
            </form>
          </motion.div>

          {/* Issues Section */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Issues</h4>
            <p className="text-gray-400 text-sm mb-3 sm:mb-4">
              Request Stripe publishable key for frontend integration
            </p>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium">SUGGESTED QUESTIONS</p>
              <ul className="mt-2 space-y-2">
                {[
                  "Provide Publishable Key",
                  "Verify Deployment",
                  "Test Checkout Flow"
                ].map((issue, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    onClick={() => handleIssueClick(issue)}
                    className="text-xs sm:text-sm text-gray-300 hover:text-white cursor-pointer transition-colors flex items-start gap-2"
                  >
                    <span className="text-yellow-500 mt-1 text-[8px] sm:text-[10px]">⬤</span>
                    <span>{issue}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-800 mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4"
        >
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © 2026 Fable. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </motion.div>
            <span className="text-gray-400">by Medo</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
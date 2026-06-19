"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Send,
  MapPin,
  Phone,
  Clock,
  Heart,
  ChevronRight,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faqs" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: FaTwitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
    { icon: FaInstagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: FaYoutube, href: "#", label: "YouTube", color: "hover:text-red-500" },
  ];

  const footerLinks = [
    {
      title: "For Readers",
      links: [
        { name: "Browse Ebooks", href: "/browse" },
        { name: "New Releases", href: "/browse?sort=newest" },
        { name: "Top Rated", href: "/browse?sort=rating" },
        { name: "Genres", href: "/browse" },
      ],
    },
    {
      title: "For Writers",
      links: [
        { name: "Become a Writer", href: "/register" },
        { name: "Upload Ebook", href: "/dashboard/writer/add" },
        { name: "Writing Tips", href: "/blog" },
        { name: "Community", href: "/community" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Contact Us", href: "/contact" },
        { name: "Report Issue", href: "/report" },
        { name: "Feedback", href: "/feedback" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
       
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400">
                Get the latest ebook releases, author interviews, and exclusive
                deals delivered to your inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400 outline-none transition-all"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {subscribed ? (
                    <>
                      <span>Subscribed!</span>
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm mt-2"
                >
                  ✓ Thank you for subscribing!
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-8 h-8 text-indigo-400" />
              <span className="text-xl font-bold text-white">Fable</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Discover, read, and share original ebooks from talented writers
              around the world. Join our community of readers and authors today.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>123 Book Street, Reading City</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>hello@fable.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Links - For Readers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Readers</h4>
            <ul className="space-y-2">
              {footerLinks[0].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Links - For Writers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Writers</h4>
            <ul className="space-y-2">
              {footerLinks[1].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks[2].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media Icons */}
            <div>
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all hover:bg-gray-700`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Fable. All rights reserved.
              Made with{" "}
              <Heart className="inline-block w-4 h-4 text-red-500 fill-red-500" />{" "}
              for book lovers.
            </p>
            <div className="flex items-center space-x-6 mt-3 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Optional */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ChevronRight className="w-5 h-5 rotate-[-90deg]" />
      </motion.button>
    </footer>
  );
};

export default Footer;
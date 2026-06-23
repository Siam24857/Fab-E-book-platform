"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-5 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Ready to Share Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Ready to Share Your Story?</h3>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Join thousands of writers earning from their passion. Publish your ebook today.
            </p>
            <Link
              href="/write"
              className="inline-flex items-center px-6 py-3 bg-white text-[#111827] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Writing Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="browsersbooks" className="text-gray-400 hover:text-white transition-colors">
                  Browse Ebooks
                </Link>
              </li>
              <li>
                <Link href="mailo:siamtechofficial1597@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-lg mb-4">NEWSLETTER</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get notified about new releases and featured authors.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-white text-[#111827] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Join
              </button>
            </form>
          </div>

          {/* Issues Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Issues</h4>
            <p className="text-gray-400 text-sm mb-4">
              Request Stripe publishable key for frontend integration
            </p>
            <div className="space-y-3">
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                <p className="text-xs text-gray-400 font-medium">SUGGESTED QUESTIONS</p>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">⬤</span>
                    <span>Provide Publishable Key</span>
                  </li>
                  <li className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">⬤</span>
                    <span>Verify Deployment</span>
                  </li>
                  <li className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">⬤</span>
                    <span>Test Checkout Flow</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Fable. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-400">by Medo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
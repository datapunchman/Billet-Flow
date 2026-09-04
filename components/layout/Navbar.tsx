"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e27]/90 backdrop-blur-xl border-b border-[#2d3748]/50">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#e8781c] to-[#f3c828] rounded-xl flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-orange-500/30 transition-all">
              DD
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-white text-sm leading-none">DataDelimited</span>
              <span className="text-xs text-muted leading-none mt-0.5">CNC Estimator</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-secondary hover:text-white transition-colors font-medium text-sm"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-secondary hover:text-white transition-colors font-medium text-sm"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="text-secondary hover:text-white transition-colors font-medium text-sm"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-secondary hover:text-white transition-colors font-medium text-sm"
            >
              FAQ
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <button className="px-5 py-2 text-secondary hover:text-white transition-colors font-medium text-sm">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="btn-primary text-sm">
                Start Free Trial
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-secondary hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1a1f35] border-t border-[#2d3748]/50">
          <div className="container-app py-4 space-y-4">
            <Link
              href="/#features"
              className="block text-secondary hover:text-white transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="block text-secondary hover:text-white transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="block text-secondary hover:text-white transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="block text-secondary hover:text-white transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="pt-4 border-t border-[#2d3748]/50 space-y-3">
              <Link href="/login" className="block">
                <button className="w-full px-5 py-2.5 text-secondary hover:text-white hover:bg-[#242938] rounded-xl transition-all font-medium">
                  Login
                </button>
              </Link>
              <Link href="/register" className="block">
                <button className="btn-primary w-full">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

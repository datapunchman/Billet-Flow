"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function MarketingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080C18]/90 backdrop-blur-xl border-b border-[#2B334A]/50">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="DataDelimited"
              width={180}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/#features" className="text-[#B4B9C9] hover:text-white transition-colors text-sm font-medium">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-[#B4B9C9] hover:text-white transition-colors text-sm font-medium">
              How It Works
            </Link>
            <Link href="/#pricing" className="text-[#B4B9C9] hover:text-white transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="/#faq" className="text-[#B4B9C9] hover:text-white transition-colors text-sm font-medium">
              FAQ
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <button className="px-5 py-2 text-[#B4B9C9] hover:text-white transition-colors text-sm font-medium">
                Log In
              </button>
            </Link>
            <Link href="/register">
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all">
                Start Free Trial
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}

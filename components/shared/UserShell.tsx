"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Gauge,
  Upload,
  History,
  User,
  CreditCard,
  Menu,
  X,
  LogOut,
  Bell,
} from "lucide-react";
import { MandrokMark } from "./MandrokMark";
import { removeAuthToken } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/history", label: "History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/subscription", label: "Subscription", icon: CreditCard },
];

export function UserShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    removeAuthToken();
    router.push("/login");
  };

  const activeLabel = navItems.find((item) => pathname.startsWith(item.href))?.label ?? "Dashboard";

  return (
    <div className="mnd-shell min-h-screen">
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-64 flex-col bg-[var(--mnd-surface)] border-r border-[var(--mnd-hairline)] transition-transform duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <Link
          href="/dashboard"
          className="flex h-16 shrink-0 items-center gap-3 border-b border-[var(--mnd-hairline)] px-5"
        >
          <MandrokMark className="h-7 w-7 shrink-0 text-[var(--mnd-white)]" />
          <div className="flex flex-col leading-none">
            <span className="mnd-font-display text-[15px] font-semibold tracking-wide text-[var(--mnd-white)]">
              MANDROK
            </span>
            <span className="mnd-kicker !text-[10px] !tracking-[0.16em] text-[var(--mnd-steel)]">
              Customer Console
            </span>
          </div>
        </Link>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--mnd-surface-2)] text-[var(--mnd-white)]"
                    : "text-[var(--mnd-steel)] hover:bg-[var(--mnd-surface-2)] hover:text-[var(--mnd-stone)]"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-[var(--mnd-accent)]" />
                )}
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-[var(--mnd-hairline)] p-3">
          <div className="mb-2 flex items-center gap-3 rounded-md bg-[var(--mnd-surface-2)] p-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--mnd-surface-3)] text-xs font-semibold text-[var(--mnd-white)]">
              JD
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-[var(--mnd-white)]">John Doe</p>
              <p className="truncate text-[11px] text-[var(--mnd-steel-dim)]">Trial account</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mnd-btn-ghost flex w-full items-center justify-center gap-2 px-3 py-2 text-xs font-medium"
          >
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[var(--mnd-hairline)] bg-[var(--mnd-black)]/95 px-4 backdrop-blur lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="rounded-md p-2 text-[var(--mnd-steel)] hover:bg-[var(--mnd-surface-2)] lg:hidden"
              aria-label="Toggle navigation"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <span className="mnd-kicker">{activeLabel}</span>
          </div>

          <button
            className="rounded-md p-2 text-[var(--mnd-steel)] hover:bg-[var(--mnd-surface-2)] hover:text-[var(--mnd-white)]"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
          </button>
        </header>

        <main className="mnd-grid-bg min-h-[calc(100vh-4rem)] bg-[var(--mnd-black)] px-4 py-6 lg:px-6 lg:py-8">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

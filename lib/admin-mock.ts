// Centralized mock dataset for the admin portal.
//
// This does not add any new backend capability — it relocates the mock
// rows that used to be hardcoded separately inside each admin page
// (users/subscriptions/coupons/audit) into one shared, internally
// consistent module, and layers a few derived views (alerts, recent
// analyses) on top of data that already exists in `lib/mock-api.ts`.
// Everything here is demo data; nothing is fetched from a real API.

import { mockEstimates, mockUploads } from "./mock-api";

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "suspended" | "trial";
  subscriptionPlan: string;
  estimatesCount: number;
  joinedDate: string;
  lastActive: string;
};

export const adminUsers: AdminUserRow[] = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", role: "user", status: "active", subscriptionPlan: "12-Month Plan", estimatesCount: 124, joinedDate: "2026-01-15", lastActive: "2 hours ago" },
  { id: "2", name: "Sarah Smith", email: "sarah.smith@company.com", role: "user", status: "active", subscriptionPlan: "Monthly Plan", estimatesCount: 56, joinedDate: "2026-03-22", lastActive: "1 day ago" },
  { id: "3", name: "Mike Johnson", email: "mike.johnson@tech.com", role: "user", status: "trial", subscriptionPlan: "Trial", estimatesCount: 8, joinedDate: "2026-08-28", lastActive: "5 hours ago" },
  { id: "4", name: "Lisa Brown", email: "lisa.brown@manufacturing.com", role: "user", status: "active", subscriptionPlan: "6-Month Plan", estimatesCount: 89, joinedDate: "2026-02-10", lastActive: "3 hours ago" },
  { id: "5", name: "David Wilson", email: "david.wilson@corp.com", role: "user", status: "suspended", subscriptionPlan: "Monthly Plan", estimatesCount: 12, joinedDate: "2026-05-18", lastActive: "2 weeks ago" },
  { id: "6", name: "Tom Harris", email: "tom.harris@example.com", role: "user", status: "active", subscriptionPlan: "12-Month Plan", estimatesCount: 245, joinedDate: "2025-12-01", lastActive: "6 hours ago" },
];

export type AdminSubscriptionRow = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: "monthly" | "6-month" | "12-month";
  status: "active" | "cancelled" | "expired" | "payment_failed";
  amount: number;
  startDate: string;
  endDate: string;
  nextBillingDate: string;
  estimatesUsed: number;
  estimatesLimit: number;
};

export const adminSubscriptions: AdminSubscriptionRow[] = [
  { id: "sub_1", userId: "1", userName: "John Doe", userEmail: "john.doe@example.com", plan: "12-month", status: "active", amount: 899, startDate: "2026-01-15", endDate: "2027-01-15", nextBillingDate: "2027-01-15", estimatesUsed: 124, estimatesLimit: 500 },
  { id: "sub_2", userId: "2", userName: "Sarah Smith", userEmail: "sarah.smith@company.com", plan: "monthly", status: "active", amount: 99, startDate: "2026-03-22", endDate: "2026-10-22", nextBillingDate: "2026-10-22", estimatesUsed: 56, estimatesLimit: 100 },
  { id: "sub_3", userId: "4", userName: "Lisa Brown", userEmail: "lisa.brown@manufacturing.com", plan: "6-month", status: "active", amount: 499, startDate: "2026-02-10", endDate: "2026-08-10", nextBillingDate: "2026-08-10", estimatesUsed: 89, estimatesLimit: 300 },
  { id: "sub_4", userId: "5", userName: "David Wilson", userEmail: "david.wilson@corp.com", plan: "monthly", status: "payment_failed", amount: 99, startDate: "2026-05-18", endDate: "2026-06-18", nextBillingDate: "2026-09-18", estimatesUsed: 12, estimatesLimit: 100 },
  { id: "sub_5", userId: "6", userName: "Tom Harris", userEmail: "tom.harris@example.com", plan: "12-month", status: "cancelled", amount: 899, startDate: "2025-12-01", endDate: "2026-12-01", nextBillingDate: "-", estimatesUsed: 245, estimatesLimit: 500 },
];

export type AdminCouponRow = {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxUses: number;
  currentUses: number;
  expiresAt: string;
  status: "active" | "expired" | "disabled";
  createdAt: string;
};

export const adminCoupons: AdminCouponRow[] = [
  { id: "1", code: "WELCOME30", description: "30% off for new customers", discountType: "percentage", discountValue: 30, maxUses: 100, currentUses: 45, expiresAt: "2026-12-31", status: "active", createdAt: "2026-01-15" },
  { id: "2", code: "SUMMER50", description: "$50 off summer promotion", discountType: "fixed", discountValue: 50, maxUses: 200, currentUses: 187, expiresAt: "2026-09-30", status: "active", createdAt: "2026-06-01" },
  { id: "3", code: "EARLY2026", description: "Early bird discount", discountType: "percentage", discountValue: 25, maxUses: 50, currentUses: 50, expiresAt: "2026-02-28", status: "expired", createdAt: "2026-01-01" },
  { id: "4", code: "PARTNER15", description: "Partner referral discount", discountType: "percentage", discountValue: 15, maxUses: 500, currentUses: 124, expiresAt: "2027-12-31", status: "active", createdAt: "2026-03-10" },
];

export type AuditLogRow = {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceId: string;
  ipAddress: string;
  userAgent: string;
  status: "success" | "failed" | "warning";
  details: string;
};

export const auditLogs: AuditLogRow[] = [
  { id: "1", timestamp: "2026-09-03T14:32:15Z", userId: "1", userName: "John Doe", userEmail: "john.doe@example.com", action: "estimate.create", resource: "Estimate", resourceId: "est_5647", ipAddress: "192.168.1.100", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", status: "success", details: "Created estimate for part XYZ-123" },
  { id: "2", timestamp: "2026-09-03T14:28:42Z", userId: "admin", userName: "Admin User", userEmail: "admin@datadelimited.com", action: "user.update", resource: "User", resourceId: "user_5", ipAddress: "192.168.1.50", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", status: "success", details: "Updated user status to suspended" },
  { id: "3", timestamp: "2026-09-03T14:15:30Z", userId: "2", userName: "Sarah Smith", userEmail: "sarah.smith@company.com", action: "subscription.upgrade", resource: "Subscription", resourceId: "sub_2", ipAddress: "192.168.1.105", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", status: "success", details: "Upgraded to 12-month plan" },
  { id: "4", timestamp: "2026-09-03T13:58:12Z", userId: "3", userName: "Mike Johnson", userEmail: "mike.johnson@tech.com", action: "auth.login", resource: "Authentication", resourceId: "session_8473", ipAddress: "192.168.1.108", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", status: "failed", details: "Failed login attempt - invalid password" },
  { id: "5", timestamp: "2026-09-03T13:45:22Z", userId: "admin", userName: "Admin User", userEmail: "admin@datadelimited.com", action: "settings.update", resource: "SystemSettings", resourceId: "settings", ipAddress: "192.168.1.50", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", status: "success", details: "Updated SMTP configuration" },
  { id: "6", timestamp: "2026-09-03T13:32:10Z", userId: "4", userName: "Lisa Brown", userEmail: "lisa.brown@manufacturing.com", action: "file.upload", resource: "File", resourceId: "file_8472", ipAddress: "192.168.1.112", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", status: "warning", details: "Uploaded file exceeds recommended size (85MB)" },
  { id: "7", timestamp: "2026-09-03T12:51:04Z", userId: "5", userName: "David Wilson", userEmail: "david.wilson@corp.com", action: "payment.failed", resource: "Subscription", resourceId: "sub_4", ipAddress: "192.168.1.140", userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", status: "failed", details: "Card declined — insufficient funds" },
];

export const adminStats = {
  totalUsers: 1248,
  activeUsers: 892,
  totalRevenue: 125840,
  monthlyRevenue: 18450,
  totalEstimates: 5647,
  estimatesToday: 143,
  activeSubscriptions: 456,
  trialUsers: 436,
};

/** Recent CAD/part analyses across the platform — pulled straight from
 *  the same mock estimate/upload records the authenticated user side
 *  already uses, just surfaced for admin visibility. */
export function getRecentAnalyses() {
  const byUpload = new Map(mockUploads.map((u) => [u.id, u]));
  return mockEstimates
    .map((e) => ({
      id: e.id,
      projectName: e.projectName,
      fileName: e.fileName,
      material: e.technicalDetails.materialType,
      status: e.status,
      totalCost: e.totalCost,
      machiningMinutes: e.technicalDetails.totalMachiningTime,
      generatedAt: e.generatedAt,
    }))
    .concat(
      mockUploads
        .filter((u) => !mockEstimates.some((e) => e.uploadId === u.id))
        .map((u) => ({
          id: u.id,
          projectName: u.projectName,
          fileName: u.fileName,
          material: u.materialType,
          status: u.status as "processing" | "completed",
          totalCost: null as unknown as number,
          machiningMinutes: null as unknown as number,
          generatedAt: u.createdAt,
        }))
    )
    .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());
}

/** Exceptions worth an admin's attention right now, derived from the
 *  rows above rather than invented separately. */
export function getAdminAlerts() {
  const alerts: { id: string; tone: "bad" | "warn"; title: string; detail: string; timestamp: string }[] = [];

  adminSubscriptions
    .filter((s) => s.status === "payment_failed")
    .forEach((s) =>
      alerts.push({
        id: `sub-${s.id}`,
        tone: "bad",
        title: "Payment failed",
        detail: `${s.userName} · ${s.plan} plan · $${s.amount}`,
        timestamp: "18 minutes ago",
      })
    );

  adminUsers
    .filter((u) => u.status === "suspended")
    .forEach((u) =>
      alerts.push({
        id: `user-${u.id}`,
        tone: "warn",
        title: "Account suspended",
        detail: `${u.name} · ${u.email}`,
        timestamp: u.lastActive,
      })
    );

  auditLogs
    .filter((l) => l.status === "failed")
    .slice(0, 2)
    .forEach((l) =>
      alerts.push({
        id: `log-${l.id}`,
        tone: "bad",
        title: l.action === "payment.failed" ? "Billing exception" : "Failed sign-in attempt",
        detail: l.details,
        timestamp: new Date(l.timestamp).toLocaleString("en-US"),
      })
    );

  return alerts;
}

export function getAlertCount() {
  return getAdminAlerts().length;
}

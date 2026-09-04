"use client";

import { useState } from "react";
import {
  Search,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface Subscription {
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
}

export default function SubscriptionsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "sub_1",
      userId: "1",
      userName: "John Doe",
      userEmail: "john.doe@example.com",
      plan: "12-month",
      status: "active",
      amount: 899,
      startDate: "2026-01-15",
      endDate: "2027-01-15",
      nextBillingDate: "2027-01-15",
      estimatesUsed: 124,
      estimatesLimit: 500,
    },
    {
      id: "sub_2",
      userId: "2",
      userName: "Sarah Smith",
      userEmail: "sarah.smith@company.com",
      plan: "monthly",
      status: "active",
      amount: 99,
      startDate: "2026-03-22",
      endDate: "2026-10-22",
      nextBillingDate: "2026-10-22",
      estimatesUsed: 56,
      estimatesLimit: 100,
    },
    {
      id: "sub_3",
      userId: "4",
      userName: "Lisa Brown",
      userEmail: "lisa.brown@manufacturing.com",
      plan: "6-month",
      status: "active",
      amount: 499,
      startDate: "2026-02-10",
      endDate: "2026-08-10",
      nextBillingDate: "2026-08-10",
      estimatesUsed: 89,
      estimatesLimit: 300,
    },
    {
      id: "sub_4",
      userId: "5",
      userName: "David Wilson",
      userEmail: "david.wilson@corp.com",
      plan: "monthly",
      status: "payment_failed",
      amount: 99,
      startDate: "2026-05-18",
      endDate: "2026-06-18",
      nextBillingDate: "2026-09-18",
      estimatesUsed: 12,
      estimatesLimit: 100,
    },
    {
      id: "sub_5",
      userId: "6",
      userName: "Tom Harris",
      userEmail: "tom.harris@example.com",
      plan: "12-month",
      status: "cancelled",
      amount: 899,
      startDate: "2025-12-01",
      endDate: "2026-12-01",
      nextBillingDate: "-",
      estimatesUsed: 245,
      estimatesLimit: 500,
    },
  ]);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    const matchesPlan = planFilter === "all" || sub.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusBadge = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#10b981]/10 text-[#10b981] text-xs font-medium rounded">
            <CheckCircle className="w-3 h-3" />
            Active
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#64748b]/10 text-[#64748b] text-xs font-medium rounded">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      case "expired":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#ef4444]/10 text-[#ef4444] text-xs font-medium rounded">
            <XCircle className="w-3 h-3" />
            Expired
          </span>
        );
      case "payment_failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-medium rounded">
            <AlertCircle className="w-3 h-3" />
            Payment Failed
          </span>
        );
    }
  };

  const getPlanBadge = (plan: Subscription["plan"]) => {
    const planLabels = {
      monthly: "Monthly",
      "6-month": "6 Month",
      "12-month": "12 Month",
    };
    return (
      <span className="px-2 py-1 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-medium rounded">
        {planLabels[plan]}
      </span>
    );
  };

  const totalRevenue = subscriptions
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + s.amount, 0);
  const activeCount = subscriptions.filter((s) => s.status === "active").length;
  const cancelledCount = subscriptions.filter(
    (s) => s.status === "cancelled"
  ).length;
  const failedCount = subscriptions.filter(
    (s) => s.status === "payment_failed"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Subscription Management
        </h1>
        <p className="text-[#94a3b8]">
          Monitor and manage user subscriptions and billing
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#10b981]/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-[#10b981]" />
            </div>
            <p className="text-sm text-[#94a3b8]">Monthly Revenue</p>
          </div>
          <p className="text-2xl font-bold text-white">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#3b82f6]/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <p className="text-sm text-[#94a3b8]">Active</p>
          </div>
          <p className="text-2xl font-bold text-white">{activeCount}</p>
        </div>

        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#64748b]/10 rounded-lg">
              <XCircle className="w-5 h-5 text-[#64748b]" />
            </div>
            <p className="text-sm text-[#94a3b8]">Cancelled</p>
          </div>
          <p className="text-2xl font-bold text-white">{cancelledCount}</p>
        </div>

        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#f59e0b]/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <p className="text-sm text-[#94a3b8]">Payment Failed</p>
          </div>
          <p className="text-2xl font-bold text-white">{failedCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white placeholder-[#64748b] focus:outline-none focus:border-[#ff6b35]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
            <option value="expired">Expired</option>
            <option value="payment_failed">Payment Failed</option>
          </select>

          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
          >
            <option value="all">All Plans</option>
            <option value="monthly">Monthly</option>
            <option value="6-month">6 Month</option>
            <option value="12-month">12 Month</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e27] border-b border-[#2d3748]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Next Billing
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3748]">
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#0a0e27] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {sub.userName}
                      </p>
                      <p className="text-xs text-[#94a3b8]">{sub.userEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPlanBadge(sub.plan)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(sub.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-white">
                      ${sub.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#0a0e27] rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e]"
                          style={{
                            width: `${(sub.estimatesUsed / sub.estimatesLimit) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#94a3b8] whitespace-nowrap">
                        {sub.estimatesUsed}/{sub.estimatesLimit}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#94a3b8]">
                      {sub.nextBillingDate !== "-"
                        ? new Date(sub.nextBillingDate).toLocaleDateString()
                        : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="px-3 py-1 text-xs text-[#ff6b35] hover:bg-[#2d3748] rounded transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

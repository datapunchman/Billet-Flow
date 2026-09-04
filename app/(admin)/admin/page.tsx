"use client";

import { useState } from "react";
import {
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  Activity,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalEstimates: number;
  estimatesToday: number;
  activeSubscriptions: number;
  trialUsers: number;
}

interface RecentActivity {
  id: string;
  type: "signup" | "estimate" | "subscription" | "error";
  user: string;
  action: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [stats] = useState<SystemStats>({
    totalUsers: 1248,
    activeUsers: 892,
    totalRevenue: 125840,
    monthlyRevenue: 18450,
    totalEstimates: 5647,
    estimatesToday: 143,
    activeSubscriptions: 456,
    trialUsers: 436,
  });

  // Format numbers consistently to avoid hydration mismatch
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "signup",
      user: "john.doe@example.com",
      action: "New user registration",
      timestamp: "2 minutes ago",
    },
    {
      id: "2",
      type: "estimate",
      user: "sarah.smith@company.com",
      action: "Generated estimate #5647",
      timestamp: "5 minutes ago",
    },
    {
      id: "3",
      type: "subscription",
      user: "mike.johnson@tech.com",
      action: "Upgraded to 12-month plan",
      timestamp: "12 minutes ago",
    },
    {
      id: "4",
      type: "error",
      user: "system",
      action: "API rate limit warning",
      timestamp: "18 minutes ago",
    },
  ]);

  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "signup":
        return <Users className="w-4 h-4 text-green-400" />;
      case "estimate":
        return <FileText className="w-4 h-4 text-blue-400" />;
      case "subscription":
        return <DollarSign className="w-4 h-4 text-purple-400" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">System overview and real-time analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="stat-card bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6 hover:border-[#1f2937] transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="stat-icon w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              <span>12.5%</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white mb-1">
              {formatNumber(stats.totalUsers)}
            </p>
            <p className="text-sm text-gray-400 mb-2">Total Users</p>
            <p className="text-xs text-gray-500">
              {formatNumber(stats.activeUsers)} active
            </p>
          </div>
        </div>

        {/* Revenue */}
        <div className="stat-card bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6 hover:border-[#1f2937] transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="stat-icon w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              <span>8.2%</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white mb-1">
              ${formatNumber(stats.totalRevenue)}
            </p>
            <p className="text-sm text-gray-400 mb-2">Total Revenue</p>
            <p className="text-xs text-gray-500">
              ${formatNumber(stats.monthlyRevenue)} this month
            </p>
          </div>
        </div>

        {/* Estimates */}
        <div className="stat-card bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6 hover:border-[#1f2937] transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="stat-icon w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              <span>{stats.estimatesToday}</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white mb-1">
              {formatNumber(stats.totalEstimates)}
            </p>
            <p className="text-sm text-gray-400 mb-2">Total Estimates</p>
            <p className="text-xs text-gray-500">Avg. 140 per day</p>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="stat-card bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6 hover:border-[#1f2937] transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="stat-icon w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              <span>5.8%</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-white mb-1">
              {formatNumber(stats.activeSubscriptions)}
            </p>
            <p className="text-sm text-gray-400 mb-2">Active Subscriptions</p>
            <p className="text-xs text-gray-500">{stats.trialUsers} trial users</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#1f2937]/50">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 bg-[#1a1b1e] rounded-xl border border-[#1f2937]/50 hover:border-[#1f2937] transition-all"
              >
                <div className="mt-1">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {activity.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-4">API Response Time</h3>
          <p className="text-3xl font-bold text-white mb-3">124ms</p>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-[#1a1b1e] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                style={{ width: "85%" }}
              />
            </div>
            <span className="text-xs text-green-400 font-medium">Healthy</span>
          </div>
        </div>

        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Database Queries</h3>
          <p className="text-3xl font-bold text-white mb-3">1,247</p>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-[#1a1b1e] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                style={{ width: "72%" }}
              />
            </div>
            <span className="text-xs text-blue-400 font-medium">Normal</span>
          </div>
        </div>

        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Storage Used</h3>
          <p className="text-3xl font-bold text-white mb-3">2.4 TB</p>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-[#1a1b1e] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
                style={{ width: "48%" }}
              />
            </div>
            <span className="text-xs text-orange-400 font-medium">48%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

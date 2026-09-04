"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Upload,
  FileText,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  DollarSign,
} from "lucide-react";

interface StatCard {
  id: string;
  label: string;
  value: string | number;
  change: string;
  icon: any;
  gradient: string;
  iconBg: string;
}

interface Activity {
  id: string;
  fileName: string;
  status: "completed" | "processing" | "failed";
  cost: number;
  date: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<StatCard[]>([
    {
      id: "1",
      label: "Total Uploads",
      value: 48,
      change: "+12%",
      icon: Upload,
      gradient: "from-pink-500 to-rose-500",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
      id: "2",
      label: "Estimates Generated",
      value: 156,
      change: "+8%",
      icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      id: "3",
      label: "Trial Days Left",
      value: 23,
      change: "Trial",
      icon: Clock,
      gradient: "from-purple-500 to-violet-500",
      iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
    },
    {
      id: "4",
      label: "Total Saved",
      value: "$12,450",
      change: "+24%",
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-500",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
  ]);

  const [recentActivity, setRecentActivity] = useState<Activity[]>([
    {
      id: "1",
      fileName: "part-assembly-v3.step",
      status: "completed",
      cost: 2450.0,
      date: "2 hours ago",
    },
    {
      id: "2",
      fileName: "bracket-mount.stp",
      status: "completed",
      cost: 1280.5,
      date: "5 hours ago",
    },
    {
      id: "3",
      fileName: "housing-case.step",
      status: "processing",
      cost: 0,
      date: "1 day ago",
    },
    {
      id: "4",
      fileName: "gear-component.stp",
      status: "completed",
      cost: 890.25,
      date: "2 days ago",
    },
  ]);

  const getStatusBadge = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return <span className="badge badge-success">Completed</span>;
      case "processing":
        return <span className="badge badge-info animate-pulse">Processing</span>;
      case "failed":
        return <span className="badge badge-error">Failed</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, John 👋
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your estimates today
          </p>
        </div>
        <Link
          href="/upload"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          New Upload
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="kpi-card card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`icon-container ${stat.iconBg} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="badge badge-success">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trial Banner */}
      <div className="card glass p-6 border-purple-500/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              🚀 You're on a trial account
            </h3>
            <p className="text-muted mb-4">
              Upgrade now to unlock unlimited estimates and advanced features
            </p>
            <Link
              href="/subscription"
              className="btn-primary inline-flex items-center gap-2"
            >
              Upgrade Now
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-1">23</div>
            <div className="text-sm text-muted">Days Remaining</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/upload"
          className="card card-hover p-6 border-[#2d3748] hover:border-orange-500/50 group"
        >
          <div className="icon-container gradient-orange mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Upload New File</h3>
          <p className="text-muted">
            Upload a STEP file and get instant manufacturing estimates
          </p>
        </Link>

        <Link
          href="/history"
          className="card card-hover p-6 border-[#2d3748] hover:border-cyan-500/50 group"
        >
          <div className="icon-container gradient-blue mb-4 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">View History</h3>
          <p className="text-muted">
            Access all your past estimates and download reports
          </p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-[#2d3748]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <Link
              href="/history"
              className="text-sm text-orange-500 hover:text-orange-400 font-medium transition-colors"
            >
              View All →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">File Name</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Cost</th>
                <th className="table-header-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3748]/50">
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="icon-container-sm bg-gradient-to-br from-gray-700 to-gray-800">
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {activity.fileName}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell">{getStatusBadge(activity.status)}</td>
                  <td className="table-cell">
                    <span className="text-sm font-medium text-white">
                      {activity.status === "completed"
                        ? `$${activity.cost.toLocaleString()}`
                        : "-"}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-muted">{activity.date}</span>
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

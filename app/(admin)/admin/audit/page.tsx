"use client";

import { useState } from "react";
import { Search, Filter, FileText, User, Shield, DollarSign } from "lucide-react";

interface AuditLog {
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
}

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: "2026-09-03T14:32:15Z",
      userId: "1",
      userName: "John Doe",
      userEmail: "john.doe@example.com",
      action: "estimate.create",
      resource: "Estimate",
      resourceId: "est_5647",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "success",
      details: "Created estimate for part XYZ-123",
    },
    {
      id: "2",
      timestamp: "2026-09-03T14:28:42Z",
      userId: "admin",
      userName: "Admin User",
      userEmail: "admin@datadelimited.com",
      action: "user.update",
      resource: "User",
      resourceId: "user_5",
      ipAddress: "192.168.1.50",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "success",
      details: "Updated user status to suspended",
    },
    {
      id: "3",
      timestamp: "2026-09-03T14:15:30Z",
      userId: "2",
      userName: "Sarah Smith",
      userEmail: "sarah.smith@company.com",
      action: "subscription.upgrade",
      resource: "Subscription",
      resourceId: "sub_2",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      status: "success",
      details: "Upgraded to 12-month plan",
    },
    {
      id: "4",
      timestamp: "2026-09-03T13:58:12Z",
      userId: "3",
      userName: "Mike Johnson",
      userEmail: "mike.johnson@tech.com",
      action: "auth.login",
      resource: "Authentication",
      resourceId: "session_8473",
      ipAddress: "192.168.1.108",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "failed",
      details: "Failed login attempt - invalid password",
    },
    {
      id: "5",
      timestamp: "2026-09-03T13:45:22Z",
      userId: "admin",
      userName: "Admin User",
      userEmail: "admin@datadelimited.com",
      action: "settings.update",
      resource: "SystemSettings",
      resourceId: "settings",
      ipAddress: "192.168.1.50",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      status: "success",
      details: "Updated SMTP configuration",
    },
    {
      id: "6",
      timestamp: "2026-09-03T13:32:10Z",
      userId: "4",
      userName: "Lisa Brown",
      userEmail: "lisa.brown@manufacturing.com",
      action: "file.upload",
      resource: "File",
      resourceId: "file_8472",
      ipAddress: "192.168.1.112",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      status: "warning",
      details: "Uploaded file exceeds recommended size (85MB)",
    },
  ]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction =
      actionFilter === "all" || log.action.startsWith(actionFilter);
    const matchesStatus =
      statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesAction && matchesStatus;
  });

  const getStatusBadge = (status: AuditLog["status"]) => {
    switch (status) {
      case "success":
        return (
          <span className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] text-xs font-medium rounded">
            Success
          </span>
        );
      case "failed":
        return (
          <span className="px-2 py-1 bg-[#ef4444]/10 text-[#ef4444] text-xs font-medium rounded">
            Failed
          </span>
        );
      case "warning":
        return (
          <span className="px-2 py-1 bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-medium rounded">
            Warning
          </span>
        );
    }
  };

  const getActionIcon = (action: string) => {
    if (action.startsWith("auth")) return User;
    if (action.startsWith("user")) return Shield;
    if (action.startsWith("subscription") || action.startsWith("payment"))
      return DollarSign;
    return FileText;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Audit Logs</h1>
        <p className="text-[#94a3b8]">
          Track all system activities and user actions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Total Events (24h)</p>
          <p className="text-2xl font-bold text-white">2,847</p>
        </div>
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Failed Actions (24h)</p>
          <p className="text-2xl font-bold text-[#ef4444]">12</p>
        </div>
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Active Users (now)</p>
          <p className="text-2xl font-bold text-[#10b981]">156</p>
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
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white placeholder-[#64748b] focus:outline-none focus:border-[#ff6b35]"
            />
          </div>

          {/* Action Filter */}
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
          >
            <option value="all">All Actions</option>
            <option value="auth">Authentication</option>
            <option value="user">User Management</option>
            <option value="estimate">Estimates</option>
            <option value="subscription">Subscriptions</option>
            <option value="settings">Settings</option>
            <option value="file">File Operations</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e27] border-b border-[#2d3748]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3748]">
              {filteredLogs.map((log) => {
                const ActionIcon = getActionIcon(log.action);
                return (
                  <tr
                    key={log.id}
                    className="hover:bg-[#0a0e27] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-[#94a3b8]">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {log.userName}
                        </p>
                        <p className="text-xs text-[#94a3b8]">{log.userEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ActionIcon className="w-4 h-4 text-[#94a3b8]" />
                        <span className="text-sm text-white font-mono">
                          {log.action}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-white">{log.resource}</p>
                        <p className="text-xs text-[#94a3b8] font-mono">
                          {log.resourceId}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(log.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#94a3b8]">
                        {log.details}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#2d3748] flex items-center justify-between">
          <p className="text-sm text-[#94a3b8]">
            Showing {filteredLogs.length} of {logs.length} logs
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#2d3748] text-white rounded-lg hover:bg-[#374151] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-2 bg-[#2d3748] text-white rounded-lg hover:bg-[#374151] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

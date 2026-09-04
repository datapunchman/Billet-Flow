"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  Mail,
  Ban,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "suspended" | "trial";
  subscriptionPlan: string;
  estimatesCount: number;
  joinedDate: string;
  lastActive: string;
}

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
      status: "active",
      subscriptionPlan: "12-Month Plan",
      estimatesCount: 124,
      joinedDate: "2026-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Sarah Smith",
      email: "sarah.smith@company.com",
      role: "user",
      status: "active",
      subscriptionPlan: "Monthly Plan",
      estimatesCount: 56,
      joinedDate: "2026-03-22",
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@tech.com",
      role: "user",
      status: "trial",
      subscriptionPlan: "Trial",
      estimatesCount: 8,
      joinedDate: "2026-08-28",
      lastActive: "5 hours ago",
    },
    {
      id: "4",
      name: "Lisa Brown",
      email: "lisa.brown@manufacturing.com",
      role: "user",
      status: "active",
      subscriptionPlan: "6-Month Plan",
      estimatesCount: 89,
      joinedDate: "2026-02-10",
      lastActive: "3 hours ago",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@corp.com",
      role: "user",
      status: "suspended",
      subscriptionPlan: "Monthly Plan",
      estimatesCount: 12,
      joinedDate: "2026-05-18",
      lastActive: "2 weeks ago",
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#10b981]/10 text-[#10b981] text-xs font-medium rounded">
            <CheckCircle className="w-3 h-3" />
            Active
          </span>
        );
      case "trial":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-medium rounded">
            <CheckCircle className="w-3 h-3" />
            Trial
          </span>
        );
      case "suspended":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#ef4444]/10 text-[#ef4444] text-xs font-medium rounded">
            <XCircle className="w-3 h-3" />
            Suspended
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-[#94a3b8]">
            Manage users, subscriptions, and access control
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Total Users</p>
          <p className="text-2xl font-bold text-white">1,248</p>
        </div>
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Active</p>
          <p className="text-2xl font-bold text-[#10b981]">892</p>
        </div>
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Trial</p>
          <p className="text-2xl font-bold text-[#3b82f6]">436</p>
        </div>
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Suspended</p>
          <p className="text-2xl font-bold text-[#ef4444]">20</p>
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
              placeholder="Search users..."
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
            <option value="trial">Trial</option>
            <option value="suspended">Suspended</option>
          </select>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0e27] border-b border-[#2d3748]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Estimates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d3748]">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-[#0a0e27] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-[#94a3b8]">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-white">
                      {user.subscriptionPlan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-white">
                      {user.estimatesCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#94a3b8]">
                      {new Date(user.joinedDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#94a3b8]">
                      {user.lastActive}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 hover:bg-[#2d3748] rounded transition-colors"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4 text-[#94a3b8]" />
                      </button>
                      <button
                        className="p-2 hover:bg-[#2d3748] rounded transition-colors"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4 text-[#94a3b8]" />
                      </button>
                      <button
                        className="p-2 hover:bg-[#2d3748] rounded transition-colors"
                        title={
                          user.status === "suspended"
                            ? "Activate User"
                            : "Suspend User"
                        }
                      >
                        <Ban className="w-4 h-4 text-[#94a3b8]" />
                      </button>
                      <button
                        className="p-2 hover:bg-[#2d3748] rounded transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4 text-[#ef4444]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#2d3748] flex items-center justify-between">
          <p className="text-sm text-[#94a3b8]">
            Showing {filteredUsers.length} of {users.length} users
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

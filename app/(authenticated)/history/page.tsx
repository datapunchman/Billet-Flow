"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

interface Estimate {
  id: string;
  fileName: string;
  projectName: string;
  status: "completed" | "processing" | "failed";
  cost: number;
  material: string;
  quantity: number;
  createdAt: string;
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");

  const [estimates, setEstimates] = useState<Estimate[]>([
    {
      id: "est_1",
      fileName: "part-assembly-v3.step",
      projectName: "Aerospace Component",
      status: "completed",
      cost: 2450.0,
      material: "Aluminum 6061",
      quantity: 50,
      createdAt: "2026-09-01",
    },
    {
      id: "est_2",
      fileName: "bracket-mount.stp",
      projectName: "Industrial Bracket",
      status: "completed",
      cost: 1280.5,
      material: "Stainless 304",
      quantity: 100,
      createdAt: "2026-08-30",
    },
    {
      id: "est_3",
      fileName: "housing-case.step",
      projectName: "Electronics Housing",
      status: "processing",
      cost: 0,
      material: "Aluminum 7075",
      quantity: 25,
      createdAt: "2026-08-29",
    },
    {
      id: "est_4",
      fileName: "gear-component.stp",
      projectName: "Gear Assembly",
      status: "completed",
      cost: 890.25,
      material: "Mild Steel",
      quantity: 200,
      createdAt: "2026-08-28",
    },
    {
      id: "est_5",
      fileName: "valve-body.step",
      projectName: "Hydraulic Valve",
      status: "failed",
      cost: 0,
      material: "Brass",
      quantity: 30,
      createdAt: "2026-08-27",
    },
  ]);

  const filteredEstimates = estimates.filter((est) => {
    const matchesSearch =
      est.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || est.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Estimate["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 text-xs font-medium rounded-lg border border-green-500/20">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-lg border border-blue-500/20 animate-pulse-soft">
            <Clock className="w-3.5 h-3.5" />
            Processing
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-medium rounded-lg border border-red-500/20">
            <XCircle className="w-3.5 h-3.5" />
            Failed
          </span>
        );
    }
  };

  const completedCount = estimates.filter((e) => e.status === "completed").length;
  const processingCount = estimates.filter((e) => e.status === "processing").length;
  const failedCount = estimates.filter((e) => e.status === "failed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Estimate History</h1>
        <p className="text-gray-400">View and manage all your past estimates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center stat-icon shadow-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-400">Completed</span>
          </div>
          <p className="text-3xl font-bold text-white">{completedCount}</p>
        </div>

        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center stat-icon shadow-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-400">Processing</span>
          </div>
          <p className="text-3xl font-bold text-white">{processingCount}</p>
        </div>

        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center stat-icon shadow-lg">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-400">Failed</span>
          </div>
          <p className="text-3xl font-bold text-white">{failedCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search estimates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1a1b1e] border border-[#1f2937]/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-[#1a1b1e] border border-[#1f2937]/50 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-[#1a1b1e] border border-[#1f2937]/50 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-colors"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="cost">Sort by Cost</option>
          </select>
        </div>
      </div>

      {/* Estimates Table */}
      <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0b0d] border-b border-[#1f2937]/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937]/50">
              {filteredEstimates.map((estimate) => (
                <tr key={estimate.id} className="table-row-hover">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {estimate.projectName}
                        </p>
                        <p className="text-xs text-gray-400">{estimate.fileName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(estimate.status)}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white">{estimate.material}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white">{estimate.quantity}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white">
                      {estimate.status === "completed"
                        ? `$${estimate.cost.toLocaleString()}`
                        : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">
                      {new Date(estimate.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {estimate.status === "completed" && (
                        <>
                          <Link
                            href={`/estimate/${estimate.id}`}
                            className="p-2 hover:bg-[#1a1b1e] rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                          </Link>
                          <button
                            className="p-2 hover:bg-[#1a1b1e] rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4 text-gray-400 hover:text-white" />
                          </button>
                        </>
                      )}
                      <button
                        className="p-2 hover:bg-[#1a1b1e] rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#1f2937]/50 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {filteredEstimates.length} of {estimates.length} estimates
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#1a1b1e] hover:bg-[#1f2937] border border-[#1f2937]/50 text-white rounded-lg transition-all disabled:opacity-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-[#1a1b1e] hover:bg-[#1f2937] border border-[#1f2937]/50 text-white rounded-lg transition-all disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Copy, Tag } from "lucide-react";

interface Coupon {
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
}

export default function CouponsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "WELCOME30",
      description: "30% off for new customers",
      discountType: "percentage",
      discountValue: 30,
      maxUses: 100,
      currentUses: 45,
      expiresAt: "2026-12-31",
      status: "active",
      createdAt: "2026-01-15",
    },
    {
      id: "2",
      code: "SUMMER50",
      description: "$50 off summer promotion",
      discountType: "fixed",
      discountValue: 50,
      maxUses: 200,
      currentUses: 187,
      expiresAt: "2026-09-30",
      status: "active",
      createdAt: "2026-06-01",
    },
    {
      id: "3",
      code: "EARLY2026",
      description: "Early bird discount",
      discountType: "percentage",
      discountValue: 25,
      maxUses: 50,
      currentUses: 50,
      expiresAt: "2026-02-28",
      status: "expired",
      createdAt: "2026-01-01",
    },
    {
      id: "4",
      code: "PARTNER15",
      description: "Partner referral discount",
      discountType: "percentage",
      discountValue: 15,
      maxUses: 500,
      currentUses: 124,
      expiresAt: "2027-12-31",
      status: "active",
      createdAt: "2026-03-10",
    },
  ]);

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || coupon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Coupon["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] text-xs font-medium rounded">
            Active
          </span>
        );
      case "expired":
        return (
          <span className="px-2 py-1 bg-[#ef4444]/10 text-[#ef4444] text-xs font-medium rounded">
            Expired
          </span>
        );
      case "disabled":
        return (
          <span className="px-2 py-1 bg-[#64748b]/10 text-[#64748b] text-xs font-medium rounded">
            Disabled
          </span>
        );
    }
  };

  const formatDiscount = (coupon: Coupon) => {
    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}%`;
    }
    return `$${coupon.discountValue}`;
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Coupon Management
          </h1>
          <p className="text-[#94a3b8]">Create and manage discount coupons</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Total Coupons</p>
          <p className="text-2xl font-bold text-white">{coupons.length}</p>
        </div>
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Active</p>
          <p className="text-2xl font-bold text-[#10b981]">
            {coupons.filter((c) => c.status === "active").length}
          </p>
        </div>
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Total Uses</p>
          <p className="text-2xl font-bold text-white">
            {coupons.reduce((sum, c) => sum + c.currentUses, 0)}
          </p>
        </div>
        <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Total Discount Given</p>
          <p className="text-2xl font-bold text-white">$12,450</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search coupons..."
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
            <option value="expired">Expired</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-[#1a1f35] border border-[#2d3748] rounded-lg p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#ff6b35]/10 rounded-lg">
                  <Tag className="w-5 h-5 text-[#ff6b35]" />
                </div>
                {getStatusBadge(coupon.status)}
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-2 hover:bg-[#2d3748] rounded transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4 text-[#94a3b8]" />
                </button>
                <button
                  className="p-2 hover:bg-[#2d3748] rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-[#ef4444]" />
                </button>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-4">
              <div className="flex items-center gap-2 p-3 bg-[#0a0e27] rounded-lg border border-[#2d3748]">
                <code className="flex-1 text-lg font-bold text-white">
                  {coupon.code}
                </code>
                <button
                  onClick={() => copyToClipboard(coupon.code)}
                  className="p-2 hover:bg-[#2d3748] rounded transition-colors"
                  title="Copy code"
                >
                  <Copy className="w-4 h-4 text-[#94a3b8]" />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#94a3b8] mb-4">{coupon.description}</p>

            {/* Discount */}
            <div className="mb-4">
              <p className="text-xs text-[#64748b] mb-1">Discount</p>
              <p className="text-2xl font-bold text-white">
                {formatDiscount(coupon)}
              </p>
            </div>

            {/* Usage Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-[#64748b]">Usage</p>
                <p className="text-xs text-[#94a3b8]">
                  {coupon.currentUses} / {coupon.maxUses}
                </p>
              </div>
              <div className="h-2 bg-[#0a0e27] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#ff6b35] to-[#f7931e]"
                  style={{
                    width: `${(coupon.currentUses / coupon.maxUses) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Expiry */}
            <div className="pt-4 border-t border-[#2d3748]">
              <p className="text-xs text-[#64748b]">
                Expires:{" "}
                <span className="text-[#94a3b8]">
                  {new Date(coupon.expiresAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

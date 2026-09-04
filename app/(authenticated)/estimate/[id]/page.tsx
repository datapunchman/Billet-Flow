"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  FileText,
  DollarSign,
  Clock,
  Package,
  Ruler,
  CheckCircle,
  ArrowLeft,
  Share2,
} from "lucide-react";

interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

interface Feature {
  name: string;
  count: number;
  complexity: string;
}

export default function EstimateDetailPage({ params }: { params: { id: string } }) {
  const [estimate] = useState({
    id: params.id,
    fileName: "part-assembly-v3.step",
    projectName: "Aerospace Component",
    status: "completed",
    totalCost: 2450.0,
    leadTime: "5-7 days",
    quantity: 50,
    material: "Aluminum 6061",
    tolerance: "±0.005\"",
    surfaceFinish: "Standard",
    createdAt: "2026-09-01",
  });

  const [costBreakdown] = useState<CostBreakdown[]>([
    { category: "Material", amount: 680, percentage: 28 },
    { category: "Machine Time", amount: 980, percentage: 40 },
    { category: "Setup", amount: 440, percentage: 18 },
    { category: "Finishing", amount: 245, percentage: 10 },
    { category: "Quality Control", amount: 105, percentage: 4 },
  ]);

  const [features] = useState<Feature[]>([
    { name: "Holes", count: 24, complexity: "Medium" },
    { name: "Pockets", count: 8, complexity: "High" },
    { name: "Threads", count: 12, complexity: "Medium" },
    { name: "Slots", count: 6, complexity: "Low" },
    { name: "Counterbores", count: 10, complexity: "Medium" },
  ]);

  const [machiningSteps] = useState([
    "Face milling operations for base surfaces",
    "Drilling operations for through holes",
    "Tapping operations for threaded holes",
    "Pocket milling with high-speed tooling",
    "Contour milling for external features",
    "Deburring and surface finishing",
    "Final inspection and quality control",
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to History
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{estimate.projectName}</h1>
          <p className="text-gray-400">{estimate.fileName}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#1a1b1e] hover:bg-[#1f2937] border border-[#1f2937]/50 text-white rounded-xl transition-all flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-400">Total Cost</span>
          </div>
          <p className="text-3xl font-bold text-white">${estimate.totalCost.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">For {estimate.quantity} units</p>
        </div>

        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-400">Lead Time</span>
          </div>
          <p className="text-3xl font-bold text-white">{estimate.leadTime}</p>
          <p className="text-xs text-gray-500 mt-2">Standard delivery</p>
        </div>

        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-400">Quantity</span>
          </div>
          <p className="text-3xl font-bold text-white">{estimate.quantity}</p>
          <p className="text-xs text-gray-500 mt-2">Units to produce</p>
        </div>

        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Ruler className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-400">Material</span>
          </div>
          <p className="text-xl font-bold text-white">{estimate.material}</p>
          <p className="text-xs text-gray-500 mt-2">{estimate.tolerance} tolerance</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#1f2937]/50">
          <h2 className="text-xl font-bold text-white">Cost Breakdown</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {costBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{item.category}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">{item.percentage}%</span>
                    <span className="text-sm font-bold text-white min-w-[80px] text-right">
                      ${item.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-[#1a1b1e] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-[#1f2937]/50 flex items-center justify-between">
            <span className="text-lg font-bold text-white">Total</span>
            <span className="text-2xl font-bold text-white">
              ${estimate.totalCost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detected Features */}
        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[#1f2937]/50">
            <h2 className="text-xl font-bold text-white">Detected Features</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1a1b1e] rounded-xl"
                >
                  <div>
                    <p className="font-medium text-white">{feature.name}</p>
                    <p className="text-sm text-gray-400">Complexity: {feature.complexity}</p>
                  </div>
                  <div className="text-2xl font-bold text-white">{feature.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Machining Strategy */}
        <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[#1f2937]/50">
            <h2 className="text-xl font-bold text-white">Machining Strategy</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {machiningSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Part Specifications */}
      <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#1f2937]/50">
          <h2 className="text-xl font-bold text-white">Part Specifications</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Material</p>
              <p className="text-lg font-semibold text-white">{estimate.material}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Tolerance</p>
              <p className="text-lg font-semibold text-white">{estimate.tolerance}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Surface Finish</p>
              <p className="text-lg font-semibold text-white">{estimate.surfaceFinish}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Quantity</p>
              <p className="text-lg font-semibold text-white">{estimate.quantity} units</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Created</p>
              <p className="text-lg font-semibold text-white">
                {new Date(estimate.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Status</p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded-lg border border-green-500/20">
                <CheckCircle className="w-3.5 h-3.5" />
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { DollarSign, Clock, Package, Layers, BarChart3 } from "lucide-react";

export function ProductMockup() {
  return (
    <div className="relative">
      {/* Main estimation card */}
      <div className="bg-[#151C2F] border border-[#2B334A] rounded-2xl p-6 lg:p-8 shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">part-assembly-v3.step</h3>
            <p className="text-sm text-[#6B7280]">Uploaded 2 minutes ago</p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Completed
          </div>
        </div>

        {/* 3D Preview Placeholder */}
        <div className="bg-[#080C18] border border-[#2B334A] rounded-xl p-8 mb-6 flex items-center justify-center h-48">
          <div className="text-center">
            <Package className="w-16 h-16 text-[#F59E0B] mx-auto mb-3" />
            <p className="text-sm text-[#6B7280]">3D CAD Preview</p>
          </div>
        </div>

        {/* Estimate Summary - Two Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#080C18] border border-[#2B334A] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#F97316] flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-white">$2,450</p>
                <p className="text-xs text-[#6B7280]">Total Cost</p>
              </div>
            </div>
          </div>
          <div className="bg-[#080C18] border border-[#2B334A] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-white">2h 18m</p>
                <p className="text-xs text-[#6B7280]">Machining Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wide mb-3">Cost Breakdown</h4>
          <div className="flex items-center justify-between py-2 border-b border-[#2B334A]/50">
            <span className="text-sm text-[#B4B9C9]">Material (Aluminum 6061)</span>
            <span className="text-sm font-semibold text-white">$420</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-[#2B334A]/50">
            <span className="text-sm text-[#B4B9C9]">Machining</span>
            <span className="text-sm font-semibold text-white">$1,680</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[#B4B9C9]">Setup</span>
            <span className="text-sm font-semibold text-white">$350</span>
          </div>
        </div>

        {/* Confidence Badge */}
        <div className="mt-6 flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
          <span className="text-sm font-medium text-emerald-400">Confidence Level</span>
          <span className="text-sm font-bold text-emerald-400">95%</span>
        </div>
      </div>

      {/* Floating feature badges - Desktop only */}
      <div className="absolute -right-4 top-1/4 hidden xl:flex flex-col gap-3">
        <div className="bg-[#151C2F] border border-[#2B334A] rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-white">24 Features Detected</span>
          </div>
        </div>
        <div className="bg-[#151C2F] border border-[#2B334A] rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-white">AI Analysis Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
}

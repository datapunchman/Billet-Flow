"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Edit, Trash2, Copy, Tag, X } from "lucide-react";
import {
  PageHeader,
  SectionCard,
  KpiTile,
  StatusTag,
  MeterBar,
  EmptyRow,
  DemoDataTag,
} from "@/components/shared/primitives";
import { adminCoupons as initialCoupons, type AdminCouponRow } from "@/lib/admin-mock";

const statusTone: Record<AdminCouponRow["status"], "good" | "bad" | "neutral"> = {
  active: "good",
  expired: "bad",
  disabled: "neutral",
};

function formatDiscount(coupon: AdminCouponRow) {
  return coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `$${coupon.discountValue}`;
}

type CouponDraft = {
  code: string;
  description: string;
  discountType: AdminCouponRow["discountType"];
  discountValue: number;
  maxUses: number;
  expiresAt: string;
};

const emptyDraft: CouponDraft = {
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: 10,
  maxUses: 100,
  expiresAt: "",
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function CouponsManagement() {
  const [coupons, setCoupons] = useState<AdminCouponRow[]>(initialCoupons);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<CouponDraft>(emptyDraft);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      coupons.filter((coupon) => {
        const matchesSearch =
          coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coupon.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || coupon.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [coupons, searchQuery, statusFilter]
  );

  const totalUses = coupons.reduce((sum, c) => sum + c.currentUses, 0);
  const activeCount = coupons.filter((c) => c.status === "active").length;

  function openCreate() {
    setEditingId(null);
    setDraft(emptyDraft);
    setFormError(null);
    setModalOpen(true);
  }

  function openEdit(coupon: AdminCouponRow) {
    setEditingId(coupon.id);
    setDraft({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      maxUses: coupon.maxUses,
      expiresAt: coupon.expiresAt,
    });
    setFormError(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    setConfirmingId(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const code = draft.code.trim().toUpperCase();
    if (!code) {
      setFormError("Enter a coupon code.");
      return;
    }
    if (coupons.some((c) => c.code === code && c.id !== editingId)) {
      setFormError("A coupon with this code already exists.");
      return;
    }
    if (!draft.discountValue || draft.discountValue <= 0) {
      setFormError("Discount value must be greater than 0.");
      return;
    }
    if (draft.discountType === "percentage" && draft.discountValue > 100) {
      setFormError("Percentage discount can't exceed 100.");
      return;
    }
    if (!draft.maxUses || draft.maxUses <= 0) {
      setFormError("Usage limit must be greater than 0.");
      return;
    }

    if (editingId) {
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                code,
                description: draft.description.trim(),
                discountType: draft.discountType,
                discountValue: draft.discountValue,
                maxUses: draft.maxUses,
                expiresAt: draft.expiresAt || c.expiresAt,
              }
            : c
        )
      );
    } else {
      const newCoupon: AdminCouponRow = {
        id: `cpn_${Date.now()}`,
        code,
        description: draft.description.trim() || "—",
        discountType: draft.discountType,
        discountValue: draft.discountValue,
        maxUses: draft.maxUses,
        currentUses: 0,
        expiresAt: draft.expiresAt || new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().slice(0, 10),
        status: "active",
        createdAt: todayIso(),
      };
      setCoupons((prev) => [newCoupon, ...prev]);
    }

    setModalOpen(false);
  }

  const inputClass = "mnd-input h-10 w-full px-3 text-sm";

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mandrok Admin · Growth"
        title="Coupon Management"
        description="Create and track discount codes issued across the platform."
        actions={
          <>
            <DemoDataTag />
            <button onClick={openCreate} className="mnd-btn-accent flex items-center gap-2 px-4 py-2 text-sm">
              <Plus className="h-4 w-4" />
              Create Coupon
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile label="Total Coupons" value={String(coupons.length)} />
        <KpiTile label="Active" value={String(activeCount)} />
        <KpiTile label="Total Redemptions" value={String(totalUses)} />
        <KpiTile label="Discount Issued" value="$12,450" sublabel="Cumulative" />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mnd-steel-dim)]" />
          <input
            type="text"
            placeholder="Search coupons…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mnd-input h-10 w-full pl-9 pr-3 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="mnd-input h-10 px-3 text-sm"
        >
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <SectionCard>
          <EmptyRow>
            {coupons.length === 0 ? "No coupons yet — create the first one." : "No coupons match these filters."}
          </EmptyRow>
        </SectionCard>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((coupon) => (
            <SectionCard key={coupon.id} padded={false}>
              <div className="flex items-start justify-between p-5 pb-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--mnd-accent-soft)]">
                    <Tag className="h-4 w-4 text-[var(--mnd-accent)]" />
                  </div>
                  <StatusTag tone={statusTone[coupon.status]}>
                    {coupon.status[0].toUpperCase() + coupon.status.slice(1)}
                  </StatusTag>
                </div>
                {confirmingId === coupon.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--mnd-steel)]">Delete?</span>
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="rounded bg-[var(--mnd-bad)] px-2 py-1 text-xs font-medium text-white hover:bg-[var(--mnd-bad)]/85"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmingId(null)}
                      className="mnd-btn-ghost px-2 py-1 text-xs"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(coupon)}
                      className="rounded p-1.5 text-[var(--mnd-steel)] hover:bg-[var(--mnd-surface-3)] hover:text-[var(--mnd-white)]"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setConfirmingId(coupon.id)}
                      className="rounded p-1.5 text-[var(--mnd-steel)] hover:bg-[var(--mnd-bad-soft)] hover:text-[var(--mnd-bad)]"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-5 pt-4">
                <div className="mnd-font-mono mb-4 flex items-center gap-2 rounded-md border border-[var(--mnd-hairline-strong)] bg-[var(--mnd-black)] px-3 py-2.5">
                  <code className="flex-1 text-base font-semibold text-[var(--mnd-white)]">
                    {coupon.code}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(coupon.code)}
                    className="rounded p-1 text-[var(--mnd-steel)] hover:text-[var(--mnd-white)]"
                    title="Copy code"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="mb-4 text-sm text-[var(--mnd-steel)]">{coupon.description}</p>

                <div className="mb-4">
                  <div className="mnd-kicker mb-1">Discount</div>
                  <p className="mnd-font-display text-xl font-semibold text-[var(--mnd-white)]">
                    {formatDiscount(coupon)}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-[var(--mnd-steel)]">Usage</span>
                    <span className="mnd-font-mono text-[var(--mnd-stone)]">
                      {coupon.currentUses} / {coupon.maxUses}
                    </span>
                  </div>
                  <MeterBar value={coupon.currentUses} max={coupon.maxUses} />
                </div>

                <div className="border-t border-[var(--mnd-hairline)] pt-3 text-xs text-[var(--mnd-steel-dim)]">
                  Expires{" "}
                  <span className="text-[var(--mnd-steel)]">
                    {new Date(coupon.expiresAt).toLocaleDateString("en-US")}
                  </span>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {/* Create / edit modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          onClick={closeModal}
        >
          <div
            className="mnd-card w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="mnd-font-display text-lg font-semibold text-[var(--mnd-white)]">
                {editingId ? "Edit Coupon" : "Create Coupon"}
              </h2>
              <button
                onClick={closeModal}
                className="rounded p-1 text-[var(--mnd-steel)] hover:text-[var(--mnd-white)]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="rounded-md border border-[var(--mnd-bad)]/30 bg-[var(--mnd-bad-soft)] p-3">
                  <p className="text-xs text-[var(--mnd-bad)]">{formError}</p>
                </div>
              )}

              <div>
                <label className="mnd-kicker mb-1.5 block">Code</label>
                <input
                  className={`${inputClass} mnd-font-mono uppercase`}
                  placeholder="WELCOME30"
                  value={draft.code}
                  onChange={(e) => setDraft((d) => ({ ...d, code: e.target.value }))}
                  maxLength={24}
                  autoFocus
                />
              </div>

              <div>
                <label className="mnd-kicker mb-1.5 block">Description</label>
                <input
                  className={inputClass}
                  placeholder="30% off for new customers"
                  value={draft.description}
                  onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mnd-kicker mb-1.5 block">Discount type</label>
                  <select
                    className={inputClass}
                    value={draft.discountType}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, discountType: e.target.value as AdminCouponRow["discountType"] }))
                    }
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed amount</option>
                  </select>
                </div>
                <div>
                  <label className="mnd-kicker mb-1.5 block">
                    Value {draft.discountType === "percentage" ? "(%)" : "($)"}
                  </label>
                  <input
                    type="number"
                    min={1}
                    className={inputClass}
                    value={draft.discountValue}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, discountValue: parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mnd-kicker mb-1.5 block">Usage limit</label>
                  <input
                    type="number"
                    min={1}
                    className={inputClass}
                    value={draft.maxUses}
                    onChange={(e) => setDraft((d) => ({ ...d, maxUses: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <label className="mnd-kicker mb-1.5 block">Expires</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={draft.expiresAt}
                    min={todayIso()}
                    onChange={(e) => setDraft((d) => ({ ...d, expiresAt: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="mnd-btn-ghost px-4 py-2 text-sm">
                  Cancel
                </button>
                <button type="submit" className="mnd-btn-accent px-4 py-2 text-sm">
                  {editingId ? "Save changes" : "Create coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

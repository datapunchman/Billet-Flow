import { z } from "zod";

// Registration schema
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+91[0-9]{10}$/, "Invalid phone number format (+91XXXXXXXXXX)"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset password schema
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// OTP verification schema
export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits").regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

export type OTPFormData = z.infer<typeof otpSchema>;

// Profile update schema
export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Upload file schema
export const uploadFileSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  materialType: z.string().min(1, "Material type is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export type UploadFileFormData = z.infer<typeof uploadFileSchema>;

// Coupon validation schema
export const couponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
});

export type CouponFormData = z.infer<typeof couponSchema>;

// Admin - Create coupon schema
export const createCouponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters"),
  discountType: z.enum(["free_trial_extension", "percentage", "fixed_amount"]),
  discountValue: z.number().min(0, "Discount value must be positive"),
  applicablePlans: z.array(z.string()).min(1, "Select at least one plan"),
  usageLimit: z.number().min(1, "Usage limit must be at least 1"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  isActive: z.boolean(),
});

export type CreateCouponFormData = z.infer<typeof createCouponSchema>;

// Admin - System settings schema
export const systemSettingsSchema = z.object({
  platformName: z.string().min(1, "Platform name is required"),
  supportEmail: z.string().email("Invalid email address"),
  maxUploadSize: z.number().min(1, "Max upload size must be positive"),
  storageQuotaPerUser: z.number().min(1, "Storage quota must be positive"),
});

export type SystemSettingsFormData = z.infer<typeof systemSettingsSchema>;

// Pricing settings schema
export const pricingSettingsSchema = z.object({
  monthlyPrice: z.number().min(0, "Price must be positive"),
  sixMonthPrice: z.number().min(0, "Price must be positive"),
  twelveMonthPrice: z.number().min(0, "Price must be positive"),
  sixMonthBonus: z.number().min(0, "Bonus months must be positive"),
  twelveMonthBonus: z.number().min(0, "Bonus months must be positive"),
  trialDuration: z.number().min(0, "Trial duration must be positive"),
});

export type PricingSettingsFormData = z.infer<typeof pricingSettingsSchema>;

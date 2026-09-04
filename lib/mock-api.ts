import { ApiResponse } from "./api";

// Mock delay to simulate network request
const delay = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock user data
export const mockUser = {
  id: "usr_123456",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+919876543210",
  role: "user" as const,
  status: "active" as const,
  createdAt: "2026-08-01T10:00:00Z",
  lastLogin: "2026-09-03T08:30:00Z",
};

// Mock admin user
export const mockAdminUser = {
  id: "usr_admin",
  name: "Admin User",
  email: "admin@datadelimited.com",
  phone: "+919999999999",
  role: "admin" as const,
  status: "active" as const,
  createdAt: "2026-01-01T00:00:00Z",
  lastLogin: "2026-09-03T09:00:00Z",
};

// Mock subscription data
export const mockSubscription = {
  id: "sub_123456",
  userId: "usr_123456",
  plan: "6_month",
  status: "active",
  trialEnd: "2026-10-03T23:59:59Z",
  renewalDate: "2027-03-03T23:59:59Z",
  amount: 9594,
  razorpaySubscriptionId: "sub_razorpay_123",
  paymentMethod: {
    last4: "4242",
    brand: "Visa",
  },
};

// Mock uploads
export const mockUploads = [
  {
    id: "upl_001",
    userId: "usr_123456",
    fileName: "bearing_housing.step",
    fileUrl: "/uploads/bearing_housing.step",
    fileSize: 2457600,
    status: "completed",
    projectName: "Bearing Housing Assembly",
    materialType: "Aluminum",
    quantity: 10,
    createdAt: "2026-09-01T10:30:00Z",
  },
  {
    id: "upl_002",
    userId: "usr_123456",
    fileName: "shaft_component.stp",
    fileUrl: "/uploads/shaft_component.stp",
    fileSize: 1843200,
    status: "completed",
    projectName: "Motor Shaft",
    materialType: "Steel",
    quantity: 5,
    createdAt: "2026-09-02T14:15:00Z",
  },
  {
    id: "upl_003",
    userId: "usr_123456",
    fileName: "bracket_mount.step",
    fileUrl: "/uploads/bracket_mount.step",
    fileSize: 921600,
    status: "processing",
    projectName: "Mounting Bracket",
    materialType: "Aluminum",
    quantity: 20,
    createdAt: "2026-09-03T09:45:00Z",
  },
];

// Mock estimates
export const mockEstimates = [
  {
    id: "est_001",
    uploadId: "upl_001",
    projectName: "Bearing Housing Assembly",
    fileName: "bearing_housing.step",
    status: "completed",
    totalCost: 45800,
    costBreakdown: {
      materialCost: 15000,
      laborCost: 18000,
      machineTimeCost: 9800,
      setupCost: 3000,
    },
    technicalDetails: {
      materialType: "Aluminum 6061",
      quantity: 10,
      totalMachiningTime: 245, // minutes
      numberOfOperations: 12,
      machineRequirements: ["CNC Mill 3-axis", "CNC Lathe"],
    },
    features: [
      { type: "Pocket", quantity: 4, strategy: "Adaptive Milling", time: 45 },
      { type: "Hole", quantity: 8, strategy: "Drilling + Reaming", time: 32 },
      { type: "Face", quantity: 2, strategy: "Face Milling", time: 18 },
      { type: "Thread", quantity: 4, strategy: "Thread Milling", time: 28 },
      { type: "Contour", quantity: 1, strategy: "Finish Contour", time: 35 },
    ],
    operations: [
      { sequence: 1, operation: "Face Mill Top", tool: "50mm Face Mill", time: 12 },
      { sequence: 2, operation: "Rough Pocket 1", tool: "12mm End Mill", time: 18 },
      { sequence: 3, operation: "Finish Pocket 1", tool: "8mm Ball Mill", time: 15 },
      { sequence: 4, operation: "Drill Holes (8x)", tool: "6mm Drill", time: 16 },
      { sequence: 5, operation: "Ream Holes (8x)", tool: "6mm Reamer", time: 16 },
    ],
    generatedAt: "2026-09-01T10:35:00Z",
  },
  {
    id: "est_002",
    uploadId: "upl_002",
    projectName: "Motor Shaft",
    fileName: "shaft_component.stp",
    status: "completed",
    totalCost: 28500,
    costBreakdown: {
      materialCost: 8500,
      laborCost: 12000,
      machineTimeCost: 6000,
      setupCost: 2000,
    },
    technicalDetails: {
      materialType: "Steel 4140",
      quantity: 5,
      totalMachiningTime: 150,
      numberOfOperations: 8,
      machineRequirements: ["CNC Lathe", "CNC Mill 3-axis"],
    },
    features: [
      { type: "Turn", quantity: 1, strategy: "Rough + Finish Turning", time: 45 },
      { type: "Thread", quantity: 2, strategy: "Thread Turning", time: 25 },
      { type: "Groove", quantity: 3, strategy: "Grooving", time: 15 },
      { type: "Keyway", quantity: 1, strategy: "End Milling", time: 18 },
    ],
    operations: [
      { sequence: 1, operation: "Rough Turn OD", tool: "CNMG Insert", time: 25 },
      { sequence: 2, operation: "Finish Turn OD", tool: "DNMG Insert", time: 20 },
      { sequence: 3, operation: "Cut Grooves", tool: "3mm Grooving Tool", time: 15 },
      { sequence: 4, operation: "Thread M20x2.5", tool: "Threading Insert", time: 25 },
    ],
    generatedAt: "2026-09-02T14:20:00Z",
  },
];

// Mock dashboard stats
export const mockDashboardStats = {
  totalUploads: 15,
  estimatesGenerated: 12,
  subscriptionStatus: {
    status: "trial",
    daysRemaining: 27,
    expiryDate: "2026-10-03T23:59:59Z",
  },
  storageUsed: {
    used: 2.4, // GB
    total: 10, // GB
  },
};

// Mock API functions
export const mockApi = {
  // Auth
  async register(data: any): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      message: "Registration successful. Please verify your email.",
    };
  },

  async login(email: string, password: string): Promise<ApiResponse> {
    await delay();
    const user = email === "admin@datadelimited.com" ? mockAdminUser : mockUser;
    return {
      success: true,
      data: {
        token: "mock_jwt_token_" + Date.now(),
        user,
      },
    };
  },

  async verifyEmail(token: string): Promise<ApiResponse> {
    await delay(500);
    return {
      success: true,
      message: "Email verified successfully",
    };
  },

  async sendPhoneOTP(phone: string): Promise<ApiResponse> {
    await delay(500);
    return {
      success: true,
      message: "OTP sent to your phone",
    };
  },

  async verifyPhoneOTP(phone: string, otp: string): Promise<ApiResponse> {
    await delay(500);
    return {
      success: true,
      message: "Phone verified successfully",
    };
  },

  async validateCoupon(code: string): Promise<ApiResponse> {
    await delay(500);
    if (code.toUpperCase() === "WELCOME50") {
      return {
        success: true,
        data: {
          code: "WELCOME50",
          discountType: "free_trial_extension",
          discountValue: 30,
          valid: true,
        },
      };
    }
    return {
      success: false,
      error: "Invalid coupon code",
    };
  },

  // User
  async getCurrentUser(): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: mockUser,
    };
  },

  async updateProfile(data: any): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: { ...mockUser, ...data },
      message: "Profile updated successfully",
    };
  },

  async changePassword(data: any): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      message: "Password changed successfully",
    };
  },

  // Subscription
  async getSubscription(): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: mockSubscription,
    };
  },

  async createSubscription(planId: string): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: {
        razorpaySubscriptionId: "sub_razorpay_" + Date.now(),
        razorpayKey: "rzp_test_key",
      },
    };
  },

  async cancelSubscription(): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      message: "Subscription cancelled successfully",
    };
  },

  // Uploads
  async uploadFile(file: File, metadata: any, onProgress?: (progress: number) => void): Promise<ApiResponse> {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await delay(200);
      onProgress?.(i);
    }

    return {
      success: true,
      data: {
        id: "upl_" + Date.now(),
        ...metadata,
        fileName: file.name,
        fileSize: file.size,
        status: "processing",
      },
    };
  },

  async getUploads(): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: mockUploads,
    };
  },

  async getUpload(id: string): Promise<ApiResponse> {
    await delay();
    const upload = mockUploads.find((u) => u.id === id);
    return {
      success: true,
      data: upload,
    };
  },

  // Estimates
  async getEstimates(): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: mockEstimates,
    };
  },

  async getEstimate(id: string): Promise<ApiResponse> {
    await delay();
    const estimate = mockEstimates.find((e) => e.id === id);
    return {
      success: true,
      data: estimate,
    };
  },

  async generateEstimate(uploadId: string): Promise<ApiResponse> {
    // Simulate processing stages
    await delay(2000);
    return {
      success: true,
      data: mockEstimates[0],
    };
  },

  // Dashboard
  async getDashboardStats(): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: mockDashboardStats,
    };
  },

  // Admin
  async getAdminStats(): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: {
        totalUsers: 1247,
        activeSubscriptions: 856,
        revenueThisMonth: 1368544,
        activeTrials: 145,
        filesProcessedToday: 89,
        storageUsed: 452, // GB
      },
    };
  },

  async getAllUsers(filters?: any): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: {
        users: [mockUser, { ...mockUser, id: "usr_2", email: "user2@example.com" }],
        total: 2,
      },
    };
  },

  async getAllSubscriptions(filters?: any): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: {
        subscriptions: [mockSubscription],
        total: 1,
      },
    };
  },

  async getCoupons(): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: [
        {
          id: "cpn_001",
          code: "WELCOME50",
          discountType: "free_trial_extension",
          discountValue: 30,
          usageLimit: 100,
          usedCount: 45,
          expiryDate: "2026-12-31T23:59:59Z",
          isActive: true,
        },
      ],
    };
  },

  async createCoupon(data: any): Promise<ApiResponse> {
    await delay();
    return {
      success: true,
      data: { id: "cpn_" + Date.now(), ...data },
      message: "Coupon created successfully",
    };
  },
};

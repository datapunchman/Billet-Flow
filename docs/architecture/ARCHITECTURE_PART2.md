## 4. Current Architecture

### 4.1 Application Structure

**CURRENT IMPLEMENTATION:**

```
cnc-estimator/
├── app/                          # Next.js 16 App Router
│   ├── (public)/                 # Public routes (no auth)
│   │   ├── login/                # Login page
│   │   ├── register/             # Registration + coupon modal
│   │   ├── verify-email/         # Email verification
│   │   ├── verify-phone/         # Phone OTP (6 cells)
│   │   ├── select-plan/          # Plan selection
│   │   └── payment/              # Payment page
│   ├── (authenticated)/          # User dashboard (auth required)
│   │   ├── dashboard/            # User home
│   │   ├── upload/               # STEP file upload
│   │   ├── history/              # Estimate history
│   │   ├── estimate/[id]/        # Estimate detail
│   │   ├── profile/              # User profile
│   │   └── subscription/         # Subscription management
│   ├── (admin)/                  # Admin portal (admin role)
│   │   ├── layout.tsx            # Admin sidebar layout
│   │   └── admin/
│   │       ├── page.tsx          # Dashboard (KPIs)
│   │       ├── users/            # User management
│   │       ├── subscriptions/    # Subscription management
│   │       ├── coupons/          # Coupon management
│   │       ├── settings/         # System settings
│   │       └── audit/            # Audit logs
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Design system utilities
├── components/
│   ├── marketing/                # Landing page components
│   └── ui/                       # Reusable UI components
├── lib/
│   ├── api.ts                    # Axios instance with interceptors
│   ├── auth.ts                   # Client-side auth utilities
│   ├── mock-api.ts               # **MOCK BACKEND** (all data here)
│   ├── validations.ts            # Zod schemas
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets
```

### 4.2 Current Data Flow

**CRITICAL:** All data is mocked. No real backend exists.

```
USER ACTION (Login)
    ↓
React Component (login/page.tsx)
    ↓
lib/mock-api.ts
    ↓ (simulates 1s delay)
Returns hardcoded user object
    ↓
Store in localStorage
    ↓
Redirect to /admin or /dashboard
```

**Key Issues:**
- ❌ No server-side validation
- ❌ Token is fake (just a timestamp string)
- ❌ No secure HTTP-only cookies
- ❌ localStorage can be modified via browser console
- ❌ No session management

### 4.3 Mock API Coverage

lib/mock-api.ts provides these mock endpoints:

- register() - User registration
- login() - User login
- verifyEmail() - Email verification
- sendPhoneOTP() - Send OTP
- verifyPhoneOTP() - Verify OTP
- validateCoupon() - Check coupon
- getCurrentUser() - Get user profile
- updateProfile() - Update user
- changePassword() - Password change
- getSubscription() - Get subscription
- uploadFile() - File upload with progress
- getEstimates() - List estimates
- getAdminStats() - Admin metrics
- getAllUsers() - User list
- getCoupons() - Coupon list

All functions return hardcoded data with fake delays.

---

## 5. Target Production Architecture

### 5.1 High-Level System Diagram

```
USERS (Web Browser)
    ↓ HTTPS
Azure Front Door / CDN
    ↓
┌─────────────┬─────────────┐
│  Frontend   │  Backend    │
│  (Next.js)  │    API      │
└─────────────┴─────────────┘
    ↓               ↓
┌─────────────┬─────────────┬─────────────┐
│ PostgreSQL  │   Redis     │ Azure Blob  │
│  Database   │   Cache     │  Storage    │
└─────────────┴─────────────┴─────────────┘
    ↓
Background Workers
    ↓
External Services (Razorpay, Email, SMS)
```

### 5.2 Component Responsibilities

**Frontend (Next.js):**
- SSR pages for SEO
- Client-side routing
- Form validation (Zod)
- State management (Zustand)
- API communication (Axios)

**Backend API:**
- REST endpoints
- JWT validation
- RBAC authorization
- Business logic
- Database queries

**PostgreSQL:**
- User data
- Subscriptions
- Estimates
- Audit logs
- Referential integrity

**Azure Blob Storage:**
- STEP files
- PDF reports
- User uploads

**Background Workers:**
- STEP file processing
- Cost calculation
- Email delivery
- Payment webhooks

---

## 6. Application Route Map

### 6.1 Complete Route Inventory

Based on application crawl (18 routes discovered):

| # | Route | Page | Auth | Role | Status | Screenshot |
|---|-------|------|------|------|--------|------------|
| 1 | `/` | Landing Page | No | Public | ✅ 200 | 01-home.png |
| 2 | `/register` | Registration | No | Public | ✅ 200 | 02-register.png |
| 3 | `/login` | Login | No | Public | ✅ 200 | 03-login.png |
| 4 | `/verify-email` | Email Verification | No | Public | ✅ 200 | 04-verify-email.png |
| 5 | `/verify-phone` | Phone OTP | No | Public | ✅ 200 | 05-verify-phone.png |
| 6 | `/select-plan` | Plan Selection | No | Public | ✅ 200 | 06-select-plan.png |
| 7 | `/payment` | Payment | No | Public | ✅ 200 | 07-payment.png |
| 8 | `/admin` | Admin Dashboard | Yes | Admin | ✅ 200 | 08-admin-dashboard.png |
| 9 | `/admin/users` | User Management | Yes | Admin | ✅ 200 | 09-admin-users.png |
| 10 | `/admin/subscriptions` | Subscriptions | Yes | Admin | ✅ 200 | 10-admin-subscriptions.png |
| 11 | `/admin/coupons` | Coupon Management | Yes | Admin | ✅ 200 | 11-admin-coupons.png |
| 12 | `/admin/settings` | System Settings | Yes | Admin | ✅ 200 | 12-admin-settings.png |
| 13 | `/admin/audit` | Audit Logs | Yes | Admin | ✅ 200 | 13-admin-audit.png |
| 14 | `/dashboard` | User Dashboard | Yes | User | ✅ 200 | 14-user-dashboard.png |
| 15 | `/upload` | File Upload | Yes | User | ✅ 200 | 15-upload.png |
| 16 | `/history` | Estimate History | Yes | User | ✅ 200 | 16-history.png |
| 17 | `/profile` | User Profile | Yes | User | ✅ 200 | 17-profile.png |
| 18 | `/subscription` | Subscription Mgmt | Yes | User | ✅ 200 | 18-subscription.png |

### 6.2 Route Groups

**Public Routes (No Authentication):**
- `/` - Landing page
- `/register` - New user registration
- `/login` - User login
- `/verify-email` - Email verification step
- `/verify-phone` - Phone OTP verification
- `/select-plan` - Subscription plan selection
- `/payment` - Payment processing

**User Routes (Requires Authentication):**
- `/dashboard` - User home with recent activity
- `/upload` - Upload STEP files
- `/history` - View past estimates
- `/estimate/[id]` - Detailed estimate view
- `/profile` - Edit profile
- `/subscription` - Manage subscription

**Admin Routes (Requires Admin Role):**
- `/admin` - Admin dashboard with KPIs
- `/admin/users` - User management table
- `/admin/subscriptions` - Subscription management
- `/admin/coupons` - Coupon creation and management
- `/admin/settings` - System configuration
- `/admin/audit` - Audit log viewer

### 6.3 Missing Routes (Planned)

- `/forgot-password` - Password reset request
- `/reset-password` - Password reset with token
- `/estimate/[id]/download` - PDF download
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/help` - Help center
- `/docs` - Documentation
- `/api/*` - API endpoints (backend)

---

## 7. Screen-by-Screen Architecture

### 7.1 Landing Page (/)

**Route:** `http://localhost:3001/`  
**File:** `app/page.tsx`  
**Screenshot:** `docs/architecture/screenshots/01-home.png`

**Purpose:**  
Marketing page to attract new users and explain product value proposition.

**Sections:**
1. Hero - CTA to start free trial
2. Features - Key platform capabilities
3. How It Works - 3-step process
4. Pricing - Subscription plans
5. FAQ - Common questions
6. Footer - Links and contact

**Components Used:**
- `components/marketing/Hero.tsx`
- `components/marketing/Features.tsx`
- `components/marketing/HowItWorks.tsx`
- `components/marketing/Pricing.tsx`
- `components/marketing/FAQ.tsx`

**User Roles:** Public (no authentication)

**Frontend:**
- Static SSR rendering
- Smooth scroll navigation
- Responsive design (390px to 1440px+)
- Orange CTA buttons
- Dark navy background (#080C18)

**Backend:** None (static page)

**Database:** None

**External Services:** None

**Security:** None required (public page)

**Data Flow:**
```
User visits / 
  → Next.js SSR renders page
  → Static HTML delivered
  → User clicks "Start Free Trial"
  → Navigate to /register
```

---

### 7.2 Registration Page (/register)

**Route:** `http://localhost:3001/register`  
**File:** `app/(public)/register/page.tsx`  
**Screenshot:** `docs/architecture/screenshots/02-register.png`

**Purpose:**  
New user registration with optional coupon code.

**Form Fields:**
- Full Name (min 2 chars)
- Email (validated format)
- Phone (+91XXXXXXXXXX format required)
- Password (8+ chars, uppercase, number, special char)
- Confirm Password (must match)
- Terms checkbox (required)
- Coupon code (optional, modal)

**Frontend:**
- React Hook Form + Zod validation
- Real-time password strength indicator
- Password show/hide toggle
- Coupon modal with backdrop blur
- Form state management
- Error message display

**CURRENT IMPLEMENTATION:**
```typescript
// Calls mock API
const response = await mockApi.register({
  name, email, phone, password
});

// Stores user temporarily in localStorage
localStorage.setItem('registrationData', JSON.stringify(data));

// Redirects to email verification
router.push('/verify-email');
```

**TARGET API:**
```
POST /api/auth/register
Body: { name, email, phone, password, couponCode? }
Response: { success: true, userId, message }
```

**TARGET Database Tables:**
- `users` - Insert new user record
- `coupon_redemptions` - If coupon applied
- `audit_logs` - Log registration event

**TARGET Data Flow:**
```
User submits form
  ↓
Frontend validates (Zod)
  ↓
POST /api/auth/register
  ↓
Backend validates input
  ↓
Check email uniqueness
  ↓
Hash password (bcrypt)
  ↓
Insert into users table
  ↓
Generate email verification token
  ↓
Send verification email
  ↓
Return success
  ↓
Redirect to /verify-email
```

**Security:**
- ✅ Client-side validation
- ❌ No server-side validation (TARGET)
- ❌ No email uniqueness check (TARGET)
- ❌ No rate limiting (TARGET)
- ❌ No CAPTCHA (TARGET for bot prevention)

**Coupon Modal:**
- Triggered by "Have a coupon?" link
- Backdrop click to close
- Validates coupon code
- Applies discount to trial period or plan

**TARGET Coupon Validation:**
```
POST /api/coupons/validate
Body: { code: "WELCOME30" }
Response: { 
  valid: true, 
  discountType: "free_trial_extension",
  discountValue: 30,
  applicablePlans: ["all"]
}
```

---

### 7.3 Email Verification (/verify-email)

**Route:** `http://localhost:3001/verify-email`  
**File:** `app/(public)/verify-email/page.tsx`  
**Screenshot:** `docs/architecture/screenshots/04-verify-email.png`

**Purpose:**  
Prompt user to check email and verify their address.

**UI Elements:**
- Email icon with notification badge
- Instructional text
- "Demo: Skip Verification" button
- Resend email button (disabled for 60s)

**CURRENT IMPLEMENTATION:**
```typescript
// Demo mode - immediate skip
const handleDemoSkip = () => {
  router.push('/verify-phone');
};
```

**TARGET Data Flow:**
```
Registration complete
  ↓
Email sent with verification link
  ↓
User clicks link in email
  ↓
GET /api/auth/verify-email?token=abc123
  ↓
Backend validates token
  ↓
Mark user.emailVerified = true
  ↓
Redirect to /verify-phone
```

**TARGET Email Template:**
```
Subject: Verify your DataDelimited account

Hi [Name],

Welcome to DataDelimited! Click the link below to verify your email:

[Verify Email Button]
https://app.datadelimited.com/verify-email?token=[TOKEN]

This link expires in 24 hours.
```

**Security:**
- ❌ No token-based verification (TARGET)
- ❌ No expiration on verification links (TARGET)
- ❌ No rate limit on resend (TARGET)

---

### 7.4 Phone Verification (/verify-phone)

**Route:** `http://localhost:3001/verify-phone`  
**File:** `app/(public)/verify-phone/page.tsx`  
**Screenshot:** `docs/architecture/screenshots/05-verify-phone.png`

**Purpose:**  
Verify phone number via 6-digit OTP.

**UI Elements:**
- 6 individual OTP input cells
- Auto-advance to next cell on input
- Paste support (paste 123456 fills all cells)
- Backspace navigation
- "Demo OTP: 123456" hint
- Resend OTP button (disabled for 60s)
- Verify button

**CURRENT IMPLEMENTATION:**
```typescript
// Mock OTP verification - accepts any 6 digits
const handleVerify = async () => {
  const otpString = otp.join('');
  const response = await mockApi.verifyPhoneOTP(phone, otpString);
  router.push('/select-plan');
};
```

**TARGET API:**
```
POST /api/auth/send-otp
Body: { phone: "+919876543210" }
Response: { success: true, message: "OTP sent" }

POST /api/auth/verify-otp
Body: { phone: "+919876543210", otp: "123456" }
Response: { success: true, phoneVerified: true }
```

**TARGET Data Flow:**
```
User requests OTP
  ↓
POST /api/auth/send-otp
  ↓
Generate 6-digit random OTP
  ↓
Store in database with expiration (5 min)
  ↓
Send via SMS provider (Twilio/MSG91)
  ↓
User enters OTP
  ↓
POST /api/auth/verify-otp
  ↓
Validate OTP matches and not expired
  ↓
Mark user.phoneVerified = true
  ↓
Invalidate OTP
  ↓
Redirect to /select-plan
```

**TARGET Database:**
```sql
CREATE TABLE otp_verifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  phone VARCHAR(15) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  attempts INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Security:**
- ❌ No rate limiting on OTP requests (TARGET: 3/hour)
- ❌ No attempt limiting (TARGET: 5 attempts max)
- ❌ No OTP expiration (TARGET: 5 minutes)
- ❌ No phone number format validation beyond regex (TARGET)

---


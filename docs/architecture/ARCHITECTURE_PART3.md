### 7.5 Plan Selection (/select-plan)

**Route:** `http://localhost:3001/select-plan`  
**File:** `app/(public)/select-plan/page.tsx`  
**Screenshot:** `docs/architecture/screenshots/06-select-plan.png`

**Purpose:**  
Allow user to select subscription plan before completing registration.

**Available Plans:**
1. **Monthly Plan** - ₹1,599/month
2. **6-Month Plan** - ₹7,794 (₹1,299/month + 1 bonus month)
3. **12-Month Plan** - ₹14,388 (₹1,199/month + 2 bonus months)

**All plans include:**
- 30-day free trial
- Unlimited STEP file uploads
- AI-powered cost estimation
- Detailed machining breakdown
- PDF report generation
- Email support

**UI Elements:**
- Progress indicator (Step 3 of 4)
- 3 plan cards in responsive grid
- Orange border on selected plan
- Savings badges on longer plans
- "Continue" button (disabled until selection)

**CURRENT IMPLEMENTATION:**
```typescript
const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

const handleContinue = () => {
  localStorage.setItem('selectedPlan', selectedPlan);
  router.push('/payment');
};
```

**TARGET Data Flow:**
```
User selects plan
  ↓
Store selection temporarily
  ↓
Navigate to /payment
  ↓
After payment, create subscription record
```

**TARGET Database:**
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  plan_id VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL, -- trial, active, cancelled, expired
  trial_end_date TIMESTAMP,
  billing_start_date TIMESTAMP,
  next_billing_date TIMESTAMP,
  amount_inr NUMERIC(10,2),
  razorpay_subscription_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### 7.6 Admin Dashboard (/admin)

**Route:** `http://localhost:3001/admin`  
**File:** `app/(admin)/admin/page.tsx`  
**Screenshot:** `docs/architecture/screenshots/08-admin-dashboard.png`

**Purpose:**  
System overview for administrators with key performance indicators.

**KPI Cards (Current - Hardcoded):**

1. **Total Users: 1,248**
   - Active: 892
   - Growth: +12.5%
   
2. **Total Revenue: ₹1,25,840**
   - This month: ₹18,450
   - Growth: +8.2%

3. **Total Estimates: 5,647**
   - Today: 143
   - Avg: 140 per day

4. **Active Subscriptions: 456**
   - Trial users: 436
   - Growth: +5.8%

**System Health Metrics:**
- API Response Time: 124ms (Healthy)
- Database Queries: 1,247 (Normal)
- Storage Used: 2.4 TB (48%)

**Recent Activity Feed:**
- New user registration
- Estimate generated
- Subscription upgrade
- API rate limit warning

**CRITICAL ISSUE FIXED:**
The dashboard had a hydration error caused by inconsistent number formatting between server and client. This was fixed by implementing consistent `Intl.NumberFormat('en-US')`.

**TARGET API:**
```
GET /api/admin/metrics
Response: {
  users: {
    total: 1248,
    active: 892,
    trial: 436,
    growth: 12.5
  },
  revenue: {
    total: 125840,
    thisMonth: 18450,
    currency: "INR"
  },
  estimates: {
    total: 5647,
    today: 143,
    avgPerDay: 140
  },
  subscriptions: {
    active: 456,
    trial: 436
  },
  system: {
    apiResponseTime: 124,
    databaseQueries: 1247,
    storageUsedGB: 2400
  }
}
```

**TARGET Database Queries:**

```sql
-- Total Users
SELECT COUNT(*) FROM users;

-- Active Users (logged in last 30 days)
SELECT COUNT(*) FROM users 
WHERE last_login > NOW() - INTERVAL '30 days';

-- Trial Users
SELECT COUNT(*) FROM users 
WHERE subscription_status = 'trial';

-- Total Revenue
SELECT SUM(amount_inr) FROM payments 
WHERE status = 'success';

-- This Month Revenue
SELECT SUM(amount_inr) FROM payments 
WHERE status = 'success' 
AND created_at >= date_trunc('month', NOW());

-- Total Estimates
SELECT COUNT(*) FROM estimates;

-- Today's Estimates
SELECT COUNT(*) FROM estimates 
WHERE created_at >= CURRENT_DATE;

-- Active Subscriptions
SELECT COUNT(*) FROM subscriptions 
WHERE status IN ('active', 'trial');
```

**Data Refresh:**
- Real-time for critical metrics
- 5-minute cache for aggregates
- Webhook updates for revenue

---

### 7.7 Admin User Management (/admin/users)

**Route:** `http://localhost:3001/admin/users`  
**File:** `app/(admin)/admin/users/page.tsx`  
**Screenshot:** `docs/architecture/screenshots/09-admin-users.png`

**Purpose:**  
View and manage all user accounts.

**Features:**
- Search by name or email
- Filter by status (active, trial, suspended)
- Filter by role (user, admin)
- Sortable table columns
- Pagination

**Displayed Columns:**
- User (name + email)
- Status badge
- Subscription plan
- Estimates count
- Joined date
- Last active

**Actions per user:**
- Send email
- Edit user
- Suspend/activate
- Delete user (dangerous)

**CURRENT IMPLEMENTATION:**
```typescript
// Hardcoded mock users
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
    lastActive: "2 hours ago"
  },
  // ... more mock users
]);
```

**TARGET API:**
```
GET /api/admin/users?page=1&limit=50&search=&status=&role=
Response: {
  users: [
    {
      id: "uuid",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "user",
      status: "active",
      subscriptionPlan: "12-Month Plan",
      estimatesCount: 124,
      joinedDate: "2026-01-15T00:00:00Z",
      lastLogin: "2026-09-03T10:30:00Z"
    }
  ],
  total: 1248,
  page: 1,
  limit: 50
}

POST /api/admin/users/{userId}/suspend
Response: { success: true }

DELETE /api/admin/users/{userId}
Response: { success: true }
```

**TARGET Database:**
```sql
SELECT 
  u.id,
  u.name,
  u.email,
  u.role,
  u.status,
  s.plan_id as subscription_plan,
  COUNT(e.id) as estimates_count,
  u.created_at as joined_date,
  u.last_login
FROM users u
LEFT JOIN subscriptions s ON u.id = s.user_id
LEFT JOIN estimates e ON u.id = e.user_id
WHERE 
  (u.name ILIKE '%search%' OR u.email ILIKE '%search%')
  AND (u.status = 'active' OR 'all' = 'all')
GROUP BY u.id, s.plan_id
ORDER BY u.created_at DESC
LIMIT 50 OFFSET 0;
```

**Security:**
- Must validate admin role
- Audit all user modifications
- Confirm before deletion
- Cannot delete self
- Cannot demote last admin

---

### 7.8 Admin Coupon Management (/admin/coupons)

**Route:** `http://localhost:3001/admin/coupons`  
**File:** `app/(admin)/admin/coupons/page.tsx`  
**Screenshot:** `docs/architecture/screenshots/11-admin-coupons.png`

**Purpose:**  
Create and manage discount coupons.

**Coupon Properties:**
- Code (e.g., WELCOME30)
- Description
- Discount type (percentage or fixed amount)
- Discount value
- Max uses / Current uses
- Expiry date
- Status (active, expired, disabled)

**UI Features:**
- Grid layout of coupon cards
- Color-coded status badges
- Usage progress bar
- Copy code button
- Edit and delete actions

**CURRENT IMPLEMENTATION:**
```typescript
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
    status: "active"
  }
]);
```

**TARGET API:**
```
GET /api/admin/coupons
Response: {
  coupons: [
    {
      id: "uuid",
      code: "WELCOME30",
      description: "30% off for new customers",
      discountType: "percentage",
      discountValue: 30,
      maxUses: 100,
      currentUses: 45,
      expiresAt: "2026-12-31T23:59:59Z",
      status: "active",
      createdAt: "2026-01-15T00:00:00Z"
    }
  ]
}

POST /api/admin/coupons
Body: {
  code: "SUMMER50",
  description: "Summer sale",
  discountType: "fixed",
  discountValue: 50,
  maxUses: 200,
  expiresAt: "2026-09-30T23:59:59Z",
  applicablePlans: ["monthly", "6-month", "12-month"]
}
Response: { success: true, couponId: "uuid" }

DELETE /api/admin/coupons/{couponId}
Response: { success: true }
```

**TARGET Database:**
```sql
CREATE TABLE coupons (
  id UUID PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL, -- percentage, fixed, trial_extension
  discount_value NUMERIC(10,2) NOT NULL,
  max_uses INT,
  current_uses INT DEFAULT 0,
  expires_at TIMESTAMP NOT NULL,
  applicable_plans TEXT[], -- array of plan IDs
  status VARCHAR(20) DEFAULT 'active',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE coupon_redemptions (
  id UUID PRIMARY KEY,
  coupon_id UUID REFERENCES coupons(id),
  user_id UUID REFERENCES users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  redeemed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(coupon_id, user_id) -- Prevent double redemption
);
```

**Coupon Validation Logic:**
```
1. Check code exists
2. Check status = 'active'
3. Check expires_at > NOW()
4. Check current_uses < max_uses
5. Check user hasn't already used (if per-user limit)
6. Check plan is in applicable_plans
7. Increment current_uses
8. Create redemption record
```

**Race Condition Prevention:**
```sql
-- Use database transaction with row-level locking
BEGIN;
SELECT * FROM coupons WHERE code = 'WELCOME30' FOR UPDATE;
-- Check all validation rules
UPDATE coupons SET current_uses = current_uses + 1 WHERE id = ?;
INSERT INTO coupon_redemptions (coupon_id, user_id) VALUES (?, ?);
COMMIT;
```

---

### 7.9 Admin Settings (/admin/settings)

**Route:** `http://localhost:3001/admin/settings`  
**File:** `app/(admin)/admin/settings/page.tsx`  
**Screenshot:** `docs/architecture/screenshots/12-admin-settings.png`

**Purpose:**  
Configure system-wide settings and integrations.

**Settings Categories:**

#### General Settings
- Site Name: "DataDelimited CNC Estimator"
- Support Email: "support@datadelimited.com"
- Max File Size: 100 MB
- Allowed File Types: ".step,.stp"
- Trial Period: 30 days
- Trial Estimate Limit: 10

#### Email Settings (SMTP)
- SMTP Host: "smtp.gmail.com"
- SMTP Port: 587
- SMTP Username: "noreply@datadelimited.com"
- SMTP Password: (masked)

#### Payment Settings (Razorpay)
- Razorpay Public Key: "pk_test_..."
- Razorpay Secret Key: (masked)
- Webhook Secret: (masked)

#### Storage Settings (Azure)
- Storage Account Name: "datadelimited"
- Storage Access Key: (masked)
- Container Name: "step-files"

#### AI Settings
- OpenAI API Key: (masked)
- Model: "gpt-4"

#### Feature Flags
- Maintenance Mode: OFF
- Allow New Signups: ON
- Require Email Verification: ON

**CURRENT IMPLEMENTATION:**
```typescript
// All settings stored in component state only
const [settings, setSettings] = useState({
  siteName: "DataDelimited CNC Estimator",
  supportEmail: "support@datadelimited.com",
  maxFileSize: 100,
  trialDays: 30,
  // ... more settings
});

// Save does nothing (just shows alert)
const handleSave = () => {
  alert("Settings saved successfully!");
};
```

**TARGET API:**
```
GET /api/admin/settings
Response: {
  general: { siteName, supportEmail, maxFileSize, ... },
  email: { smtpHost, smtpPort, smtpUsername },
  payment: { razorpayPublicKey },
  storage: { azureStorageAccount, containerName },
  ai: { openaiModel },
  features: { maintenanceMode, allowSignups, requireEmailVerification }
}

PUT /api/admin/settings
Body: { category: "general", settings: { ... } }
Response: { success: true }
```

**TARGET Database:**
```sql
CREATE TABLE system_settings (
  id UUID PRIMARY KEY,
  category VARCHAR(50) NOT NULL, -- general, email, payment, storage, ai, features
  key VARCHAR(100) NOT NULL,
  value TEXT NOT NULL,
  data_type VARCHAR(20) NOT NULL, -- string, number, boolean, json
  is_secret BOOLEAN DEFAULT FALSE,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(category, key)
);
```

**Security Considerations:**
- Mask all secret values in API responses
- Store secrets encrypted at rest
- Audit all setting changes
- Require admin role + confirmation for critical changes
- Never log secret values
- Validate setting values before applying

**Settings Validation:**
```typescript
// Email settings validation
if (smtpPort < 1 || smtpPort > 65535) {
  throw new Error("Invalid SMTP port");
}

// File size validation
if (maxFileSize < 1 || maxFileSize > 500) {
  throw new Error("Max file size must be between 1-500 MB");
}

// Trial days validation
if (trialDays < 0 || trialDays > 90) {
  throw new Error("Trial period must be between 0-90 days");
}
```

---

## 8. Frontend Architecture

### 8.1 Next.js App Router Structure

**Framework:** Next.js 16.3.4 with App Router

**Key Features:**
- File-based routing
- Server-side rendering (SSR)
- React Server Components
- Client Components with 'use client'
- Nested layouts
- Route groups with (parentheses)

**Route Groups:**
- `(public)/` - No authentication required
- `(authenticated)/` - Requires user login
- `(admin)/` - Requires admin role

### 8.2 Component Architecture

**Design System Components:**
```
components/ui/
├── button.tsx          # Variants: default, outline, ghost
├── card.tsx            # Dark card with border
├── input.tsx           # Dark input with focus states
├── textarea.tsx        # Multi-line input
├── progress.tsx        # Progress bar
├── badge.tsx           # Status badges
├── alert.tsx           # Alert messages
├── skeleton.tsx        # Loading placeholders
└── table.tsx           # Data tables
```

**Marketing Components:**
```
components/marketing/
├── Hero.tsx            # Landing page hero
├── Features.tsx        # Feature grid
├── HowItWorks.tsx      # Process steps
├── Pricing.tsx         # Pricing cards
├── FAQ.tsx             # Accordion FAQ
├── Navbar.tsx          # Marketing nav
└── Footer.tsx          # Footer links
```

### 8.3 State Management

**Current Approach:**
- Local component state (useState)
- URL state for filters/search
- localStorage for temporary data (auth tokens, user data)

**Zustand Integration (minimal usage):**
```typescript
// Example: Global notification store
import create from 'zustand';

interface NotificationStore {
  message: string | null;
  type: 'success' | 'error' | 'info';
  show: (message: string, type: string) => void;
  hide: () => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  message: null,
  type: 'info',
  show: (message, type) => set({ message, type }),
  hide: () => set({ message: null }),
}));
```

**TARGET State Management:**
- Zustand for global app state
- React Query for server state
- Form state with React Hook Form
- URL state for shareable filters

---


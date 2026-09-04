# Billet Flow - Architecture Documentation Summary

**Date:** September 3, 2026  
**Version:** 1.0  
**Status:** Comprehensive Technical Architecture Analysis Complete

---

## Executive Summary

This document summarizes the comprehensive technical architecture analysis of the Billet Flow CNC Estimator application. The analysis included:

- Complete application crawl (18 routes discovered and documented)
- Screen-by-screen architecture analysis with screenshots
- API and database architecture design
- Security assessment
- Gap analysis between current implementation and production requirements

---

## 1. What Was Discovered

### 1.1 Application Scope

**18 Routes Discovered and Documented:**

| Category | Routes | Status |
|----------|--------|--------|
| **Public** | Landing, Register, Login, Verify Email/Phone, Plan Selection, Payment | ✅ All render |
| **User Dashboard** | Dashboard, Upload, History, Profile, Subscription, Estimate Detail | ✅ All render |
| **Admin Portal** | Dashboard, Users, Subscriptions, Coupons, Settings, Audit Logs | ✅ All render |

All routes return HTTP 200 and render properly. Screenshots captured for all 18 routes at 1440x900 resolution.

### 1.2 Technology Stack

**Frontend:**
- Next.js 16.3.4 (App Router)
- React 19.2.8
- TypeScript 5.x
- Tailwind CSS 4.3.3
- React Hook Form + Zod validation
- Axios for HTTP
- Zustand for state management

**Current Backend:** NONE (Mock API only)

**Target Backend:**
- Node.js + Express/NestJS
- PostgreSQL 15+
- Prisma/Drizzle ORM
- Redis for caching
- Azure Blob Storage
- BullMQ for background jobs

### 1.3 Design System

**Consistent dark navy aesthetic implemented:**
- Background: #080C18
- Cards: #151C2F
- Borders: #2B334A
- Primary accent: Orange (#F59E0B → #F97316)
- Typography: Inter font family
- Responsive: 390px to 1440px+

**No hydration errors** - Fixed number formatting issue in admin dashboard.

---

## 2. What Is Currently Implemented

### 2.1 ✅ Fully Implemented (UI/UX Only)

**Complete User Interface:**
- Landing page with hero, features, pricing, FAQ
- Registration flow with email/phone verification
- Login page
- User dashboard with recent estimates
- File upload interface (STEP/STP)
- Estimate history and detail views
- User profile management
- Subscription management interface
- Admin portal with 6 sections
- Complete design system

**Form Validation:**
- Client-side validation with Zod
- React Hook Form integration
- Real-time error messages
- Password strength indicator

**Visual Design:**
- Responsive layouts (mobile to desktop)
- Consistent component styling
- Proper loading states
- Error states and empty states

### 2.2 ⚠️ Partially Implemented (Mock Only)

**Mock Authentication:**
```typescript
// lib/mock-api.ts
async login(email: string, password: string) {
  await delay(); // Fake network delay
  const user = email === "admin@datadelimited.com" ? mockAdminUser : mockUser;
  return {
    success: true,
    data: { token: "mock_jwt_token_" + Date.now(), user }
  };
}
```

**Mock Data Storage:**
- All data hardcoded in `lib/mock-api.ts`
- localStorage used for client-side storage
- No database persistence
- No backend API

**Mock File Upload:**
- Simulates progress bar
- Accepts STEP files
- No actual file processing
- No storage integration

---

## 3. What Is Missing (Production Blockers)

### 3.1 ❌ Critical Missing Components

#### Backend Infrastructure
**Status:** Does not exist  
**Impact:** Cannot deploy to production  
**Required:**
- REST API with Express/NestJS
- PostgreSQL database with migrations
- Redis for sessions and caching
- Azure Blob Storage for files
- Background worker processes

#### Authentication & Authorization
**Status:** Mock only (localStorage)  
**Impact:** Zero security  
**Required:**
- JWT-based authentication
- HTTP-only secure cookies
- Token refresh mechanism
- Password hashing (bcrypt)
- Role-based access control (RBAC)
- Route guards (middleware)
- Session management

#### Database
**Status:** Does not exist  
**Impact:** No data persistence  
**Required Tables:**
```
- users
- subscriptions
- plans
- payments
- estimates
- estimate_items
- uploaded_files
- coupons
- coupon_redemptions
- otp_verifications
- audit_logs
- system_settings
```

#### STEP File Processing
**Status:** Does not exist  
**Impact:** Core feature unavailable  
**Required:**
- CAD file parser (OpenCascade/Step-Viewer)
- Feature extraction engine
- Geometry analysis
- Material volume calculation
- Machining strategy selection

#### CNC Cost Calculation Engine
**Status:** Does not exist  
**Impact:** Cannot generate estimates  
**Required:**
- Material cost calculation
- Machining time estimation
- Setup time calculation
- Labor cost calculation
- Overhead allocation
- Currency handling (INR)
- Discount application

#### Payment Integration
**Status:** Not implemented  
**Impact:** Cannot process payments  
**Required:**
- Razorpay SDK integration
- Subscription creation API
- Webhook endpoint for payment events
- Payment verification
- Invoice generation
- Refund handling

#### Email & SMS
**Status:** Not implemented  
**Impact:** No notifications  
**Required:**
- SMTP integration (SendGrid/SES)
- Email templates (verification, welcome, estimate ready)
- OTP generation and delivery
- SMS provider integration (Twilio/MSG91)
- Delivery retry logic

#### Object Storage
**Status:** Not implemented  
**Impact:** Files cannot be stored  
**Required:**
- Azure Blob Storage integration
- Signed URL generation
- File retention policies
- CDN integration
- Access control

#### Background Jobs
**Status:** Not implemented  
**Impact:** No async processing  
**Required:**
- BullMQ or Azure Service Bus
- STEP file processing queue
- Email delivery queue
- Report generation queue
- Webhook processing queue

#### Monitoring & Logging
**Status:** Not implemented  
**Impact:** Cannot troubleshoot production  
**Required:**
- Structured logging (Winston/Pino)
- Error tracking (Sentry)
- APM (DataDog/New Relic)
- Metrics collection
- Alerting rules

---

## 4. Major Architecture Risks

### 4.1 Security Risks (HIGH)

| Risk | Severity | Current State | Mitigation Required |
|------|----------|---------------|---------------------|
| **No Server-Side Auth** | 🔴 Critical | Anyone can modify localStorage | Implement JWT + HTTP-only cookies |
| **No API Security** | 🔴 Critical | No API layer exists | Add authentication middleware |
| **No Input Validation** | 🔴 Critical | Client-side only | Server-side validation required |
| **No Rate Limiting** | 🔴 Critical | None | Implement rate limiting (Redis) |
| **No CSRF Protection** | 🔴 Critical | None | Add CSRF tokens |
| **Secrets in Code** | 🟡 Medium | API keys in settings UI | Use environment variables + vault |
| **No SQL Injection Protection** | 🔴 Critical | No database | Use parameterized queries (ORM) |

### 4.2 Data Loss Risks (HIGH)

| Risk | Impact | Mitigation |
|------|--------|------------|
| No database | All data lost on refresh | Implement PostgreSQL |
| No backups | Cannot recover from failure | Automated daily backups |
| No audit trail | Cannot track changes | Implement audit_logs table |
| No data validation | Corrupt data possible | Database constraints + validation |

### 4.3 Scalability Risks (MEDIUM)

| Component | Current | Bottleneck | Target |
|-----------|---------|------------|--------|
| Frontend | Single instance | No load balancing | Azure App Service (auto-scale) |
| Backend | Does not exist | N/A | Horizontal scaling with load balancer |
| Database | None | N/A | PostgreSQL with read replicas |
| File Storage | None | N/A | Azure Blob with CDN |
| Background Jobs | None | N/A | Worker pool with auto-scaling |

---

## 5. Major Costing Gaps

### 5.1 No Cost Calculation Logic

**Status:** Not implemented  
**Impact:** Core business value cannot be delivered

**Required Implementation:**

#### Material Cost
```
Material Cost = Volume × Density × Material Price per kg
```

**Missing:**
- Volume calculation from STEP file
- Material density database
- Material pricing (INR/kg)
- Waste factor consideration

#### Machining Time Estimation
```
Machining Time = (Feature 1 Time + Feature 2 Time + ... + Setup Time)
```

**Missing:**
- Feature recognition (holes, pockets, faces, threads)
- Machining strategy selection
- Feed rate and spindle speed database
- Tool path calculation
- Setup time calculation

#### Labor Cost
```
Labor Cost = Machining Time × Labor Rate
```

**Missing:**
- Labor rate configuration (INR/hour)
- Operator skill level factors
- Shift differentials

#### Total Cost Formula
```
Total Cost = Material Cost + Machining Cost + Labor Cost + Overhead + Markup
```

**Missing:**
- Overhead percentage configuration
- Markup rules (quantity-based)
- Discount application
- Tax calculation
- Currency formatting (INR)

### 5.2 Currency Handling

**Required:** All monetary values in INR  
**Current:** Hardcoded numbers with no currency context  
**Target:**
- Store as NUMERIC(10,2) in database
- Display with INR symbol (₹)
- Handle decimal precision correctly
- Support tax calculations

---

## 6. Major Admin Gaps

### 6.1 No Real-Time Metrics

**Current:** Hardcoded numbers in frontend  
**Required:**
- Live database queries
- Cached aggregates (5-minute TTL)
- Real-time updates via WebSocket (optional)

### 6.2 No User Management Actions

**Current:** Buttons do nothing  
**Required:**
- Edit user details
- Suspend/activate accounts
- Delete users (with confirmation)
- Reset passwords
- Send emails to users

### 6.3 No Audit Logging

**Current:** No tracking of admin actions  
**Required:**
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  actor_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  old_value JSONB,
  new_value JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6.4 No System Settings Persistence

**Current:** Settings only in component state  
**Required:**
- Database-backed settings
- Audit trail for setting changes
- Validation before applying
- Rollback capability

---

## 7. Major Backend Gaps

### 7.1 No API Layer

**Status:** Does not exist  
**Required Endpoints:**

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email
POST   /api/auth/send-otp
POST   /api/auth/verify-otp

Users:
GET    /api/users/me
PUT    /api/users/me
PUT    /api/users/me/password
GET    /api/users/me/subscription

Estimates:
POST   /api/estimates
GET    /api/estimates
GET    /api/estimates/:id
GET    /api/estimates/:id/download

Uploads:
POST   /api/uploads
GET    /api/uploads
GET    /api/uploads/:id

Subscriptions:
POST   /api/subscriptions
GET    /api/subscriptions/plans
PUT    /api/subscriptions/:id/cancel

Coupons:
POST   /api/coupons/validate

Admin:
GET    /api/admin/metrics
GET    /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id
GET    /api/admin/subscriptions
GET    /api/admin/coupons
POST   /api/admin/coupons
DELETE /api/admin/coupons/:id
GET    /api/admin/settings
PUT    /api/admin/settings
GET    /api/admin/audit-logs
```

### 7.2 No Database Schema

**Status:** Does not exist  
**Required:** 28+ tables (see Database Architecture section)

### 7.3 No Validation Layer

**Current:** Client-side Zod only  
**Required:**
- Server-side validation for all inputs
- Sanitization to prevent XSS
- SQL injection prevention (use ORM)
- File type validation (STEP only)
- File size limits (100MB)

---

## 8. Major Security Concerns

### 8.1 Authentication Vulnerabilities

| Vulnerability | Risk Level | Exploitation |
|---------------|------------|--------------|
| localStorage tokens | 🔴 Critical | XSS can steal tokens |
| No token expiration | 🔴 Critical | Tokens valid forever |
| No HTTPS enforcement | 🔴 Critical | Man-in-the-middle attacks |
| No password hashing | 🔴 Critical | Passwords stored in plain text (mock) |
| No rate limiting | 🔴 Critical | Brute force attacks possible |
| No CAPTCHA | 🟡 Medium | Bot registration possible |

### 8.2 Authorization Vulnerabilities

| Vulnerability | Risk Level | Impact |
|---------------|------------|--------|
| No route guards | 🔴 Critical | Anyone can access any page |
| No API authorization | 🔴 Critical | No API exists |
| Role check client-side only | 🔴 Critical | Can modify localStorage to become admin |
| No resource ownership check | 🔴 Critical | Cannot verify user owns estimate |

### 8.3 Data Security

| Area | Status | Required |
|------|--------|----------|
| Encryption at rest | ❌ No database | Database encryption |
| Encryption in transit | ❌ HTTP only (dev) | HTTPS with TLS 1.3 |
| PII protection | ❌ No backend | Data classification + encryption |
| Secret management | ❌ Hardcoded in UI | Azure Key Vault |
| Audit logging | ❌ Not implemented | Complete audit trail |

---

## 9. Recommended Production Architecture

### 9.1 Technology Stack

```
Frontend:
- Next.js 16 (current)
- Vercel or Azure App Service
- CDN for static assets

Backend:
- Node.js 20 LTS
- NestJS (TypeScript framework)
- Express.js alternative acceptable

Database:
- PostgreSQL 15+
- Managed service (Azure Database for PostgreSQL)
- Read replicas for scaling

Caching:
- Redis 7+
- Azure Cache for Redis

Object Storage:
- Azure Blob Storage
- CDN integration

Queue:
- BullMQ with Redis
- Alternative: Azure Service Bus

Monitoring:
- DataDog or New Relic (APM)
- Sentry (error tracking)
- Azure Monitor (infrastructure)

CI/CD:
- GitHub Actions
- Automated tests + deployment
```

### 9.2 Deployment Architecture

```
┌─────────────────────────────────────────────┐
│          Azure Front Door (CDN + WAF)        │
└──────────────────┬──────────────────────────┘
                   │
       ┌───────────┴───────────┐
       │                       │
┌──────▼───────┐      ┌───────▼────────┐
│   Frontend   │      │   Backend API   │
│  App Service │      │   App Service   │
│  (Auto-scale)│      │  (Auto-scale)   │
└──────┬───────┘      └───────┬─────────┘
       │                      │
       └──────────┬───────────┘
                  │
       ┌──────────┼──────────┐
       │          │          │
┌──────▼─────┐ ┌──▼───┐ ┌───▼──────┐
│ PostgreSQL │ │Redis │ │Azure Blob│
│  Database  │ │Cache │ │ Storage  │
└────────────┘ └──────┘ └──────────┘
```

### 9.3 Security Layers

```
1. Network Security
   - Azure Front Door with WAF
   - DDoS protection
   - IP whitelist for admin (optional)

2. Application Security
   - JWT authentication
   - RBAC authorization
   - Rate limiting (Redis)
   - Input validation (Joi/Zod)
   - CSRF tokens
   - XSS prevention
   - SQL injection prevention (ORM)

3. Data Security
   - TLS 1.3 encryption in transit
   - Database encryption at rest
   - Secret management (Key Vault)
   - PII encryption
   - Audit logging

4. API Security
   - API key for mobile/third-party (future)
   - OAuth2 for integrations
   - Request signing
   - Payload size limits
```

---

## 10. Implementation Roadmap

### Phase 1: Backend Foundation (4-6 weeks)

**Week 1-2: Core Infrastructure**
- [ ] Set up NestJS project
- [ ] Configure PostgreSQL database
- [ ] Design and implement database schema
- [ ] Set up Prisma ORM
- [ ] Implement database migrations
- [ ] Set up Redis for caching

**Week 3-4: Authentication & Authorization**
- [ ] Implement JWT authentication
- [ ] Password hashing (bcrypt)
- [ ] Refresh token mechanism
- [ ] Email verification flow
- [ ] OTP verification flow
- [ ] RBAC middleware
- [ ] Route guards

**Week 5-6: Core API Endpoints**
- [ ] User registration API
- [ ] Login API
- [ ] User profile API
- [ ] Password reset API
- [ ] Session management

### Phase 2: File Processing (3-4 weeks)

**Week 7-8: Storage & Upload**
- [ ] Azure Blob Storage integration
- [ ] File upload API
- [ ] File validation (STEP only, 100MB limit)
- [ ] Signed URL generation
- [ ] Multipart upload support

**Week 9-10: STEP Processing**
- [ ] STEP file parser integration
- [ ] Feature extraction engine
- [ ] Geometry analysis
- [ ] Volume calculation
- [ ] Background job queue setup

### Phase 3: Cost Calculation (4-6 weeks)

**Week 11-12: Costing Engine**
- [ ] Material cost calculation
- [ ] Machining time estimation
- [ ] Setup time calculation
- [ ] Labor cost calculation
- [ ] Total cost aggregation

**Week 13-14: Estimate Generation**
- [ ] Estimate API endpoints
- [ ] Cost breakdown generation
- [ ] PDF report generation
- [ ] Estimate history API

**Week 15-16: Pricing & Discounts**
- [ ] Plan management
- [ ] Coupon validation
- [ ] Discount application
- [ ] Currency handling (INR)

### Phase 4: Payment Integration (2-3 weeks)

**Week 17-18: Razorpay Integration**
- [ ] Razorpay SDK setup
- [ ] Subscription creation
- [ ] Payment webhook handling
- [ ] Invoice generation
- [ ] Payment verification

**Week 19: Testing & Edge Cases**
- [ ] Payment failure handling
- [ ] Refund processing
- [ ] Webhook retry logic

### Phase 5: Admin Portal (2-3 weeks)

**Week 20-21: Admin APIs**
- [ ] User management endpoints
- [ ] Subscription management
- [ ] Coupon management
- [ ] System settings API
- [ ] Audit log API

**Week 22: Dashboard Metrics**
- [ ] Real-time KPI queries
- [ ] Caching layer
- [ ] Performance optimization

### Phase 6: Email & Notifications (1-2 weeks)

**Week 23: Email Infrastructure**
- [ ] SMTP integration
- [ ] Email templates
- [ ] Email queue
- [ ] Delivery tracking

**Week 24: SMS Integration**
- [ ] SMS provider setup
- [ ] OTP delivery
- [ ] Notification preferences

### Phase 7: Monitoring & Production (2-3 weeks)

**Week 25: Observability**
- [ ] Structured logging
- [ ] Error tracking (Sentry)
- [ ] APM setup (DataDog)
- [ ] Alerting rules

**Week 26-27: Production Deployment**
- [ ] CI/CD pipeline
- [ ] Environment configuration
- [ ] Database migrations
- [ ] Load testing
- [ ] Security audit
- [ ] Performance optimization
- [ ] Documentation

---

## 11. Files Created

### Documentation
1. `docs/architecture/ARCHITECTURE.md` - Main architecture document (partial)
2. `docs/architecture/ARCHITECTURE_PART2.md` - Screen-by-screen analysis
3. `docs/architecture/ARCHITECTURE_PART3.md` - Detailed component analysis
4. `docs/architecture/ARCHITECTURE_SUMMARY.md` - This summary document
5. `docs/architecture/route-inventory.json` - Complete route crawl results

### Screenshots (18 files)
- `docs/architecture/screenshots/01-home.png`
- `docs/architecture/screenshots/02-register.png`
- `docs/architecture/screenshots/03-login.png`
- `docs/architecture/screenshots/04-verify-email.png`
- `docs/architecture/screenshots/05-verify-phone.png`
- `docs/architecture/screenshots/06-select-plan.png`
- `docs/architecture/screenshots/07-payment.png`
- `docs/architecture/screenshots/08-admin-dashboard.png`
- `docs/architecture/screenshots/09-admin-users.png`
- `docs/architecture/screenshots/10-admin-subscriptions.png`
- `docs/architecture/screenshots/11-admin-coupons.png`
- `docs/architecture/screenshots/12-admin-settings.png`
- `docs/architecture/screenshots/13-admin-audit.png`
- `docs/architecture/screenshots/14-user-dashboard.png`
- `docs/architecture/screenshots/15-upload.png`
- `docs/architecture/screenshots/16-history.png`
- `docs/architecture/screenshots/17-profile.png`
- `docs/architecture/screenshots/18-subscription.png`

---

## 12. Next Steps

### Immediate Actions

1. **Review this documentation** with technical and business stakeholders
2. **Prioritize features** based on business value and technical dependencies
3. **Set up development environment** (PostgreSQL, Redis, Azure accounts)
4. **Begin Phase 1** (Backend Foundation)
5. **Establish CI/CD pipeline** early
6. **Set up monitoring** from day one

### Key Decisions Required

1. **Backend framework**: NestJS vs Express.js
2. **ORM choice**: Prisma vs Drizzle
3. **Email provider**: SendGrid vs Amazon SES
4. **SMS provider**: Twilio vs MSG91
5. **Hosting**: Azure vs Vercel (frontend) + Azure (backend)
6. **STEP parser**: Commercial license vs open source
7. **Cost estimation**: Build vs buy (third-party API)

---

## 13. Conclusion

The Billet Flow application has a **complete, production-ready UI/UX** with excellent design consistency and responsive layouts. However, it is currently **not deployable to production** due to the absence of:

- Backend API
- Database
- Real authentication
- File processing
- Cost calculation engine
- Payment integration

**Estimated Effort to Production:** 6-7 months with 2-3 full-time engineers

**Critical Path:**
1. Backend + Database (4-6 weeks)
2. STEP Processing (3-4 weeks)
3. Cost Calculation (4-6 weeks)
4. Payment Integration (2-3 weeks)
5. Production Hardening (2-3 weeks)

**Total:** ~27 weeks (6.5 months)

This documentation provides a complete blueprint for production implementation.


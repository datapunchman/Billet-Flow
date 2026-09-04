# Billet Flow - Technical Architecture Documentation

**Version:** 1.0  
**Date:** September 3, 2026  
**Application:** CNC Estimator / Manufacturing Cost Estimation Platform  
**Repository:** https://github.com/datapunchman/Billet-Flow  
**Local Development:** http://localhost:3001

---

## Document Purpose

This document provides a complete technical architecture specification for the Billet Flow CNC Estimator application. It is designed for:

- **Solution Architects** - Understanding system design and integration points
- **Software Architects** - Reviewing technology choices and patterns
- **Technical Leads** - Planning implementation roadmap
- **Backend Engineers** - Understanding API and data architecture
- **Frontend Engineers** - Understanding component structure and state management
- **DevOps Engineers** - Understanding deployment and infrastructure requirements
- **Database Engineers** - Understanding data models and query patterns
- **Security Engineers** - Understanding authentication, authorization, and security controls

This document distinguishes between:
- **CURRENT IMPLEMENTATION** - What exists in the codebase today
- **TARGET ARCHITECTURE** - The intended production-ready architecture

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Overview](#2-system-overview)
3. [Architecture Principles](#3-architecture-principles)
4. [Technology Stack](#4-technology-stack)
5. [Current Architecture](#5-current-architecture)
6. [Target Production Architecture](#6-target-production-architecture)
7. [Application Route Map](#7-application-route-map)
8. [Screen-by-Screen Architecture](#8-screen-by-screen-architecture)
9. [Frontend Architecture](#9-frontend-architecture)
10. [Backend Architecture](#10-backend-architecture)
11. [API Architecture](#11-api-architecture)
12. [Database Architecture](#12-database-architecture)
13. [Authentication & Authorization](#13-authentication--authorization)
14. [Email / SMS / OTP Architecture](#14-email--sms--otp-architecture)
15. [File Storage Architecture](#15-file-storage-architecture)
16. [CNC Estimation Architecture](#16-cnc-estimation-architecture)
17. [Costing Architecture](#17-costing-architecture)
18. [Subscription & Payment Architecture](#18-subscription--payment-architecture)
19. [Coupon Architecture](#19-coupon-architecture)
20. [Admin Portal Architecture](#20-admin-portal-architecture)
21. [Monitoring & Observability](#21-monitoring--observability)
22. [Background Processing](#22-background-processing)
23. [Security Architecture](#23-security-architecture)
24. [Deployment Architecture](#24-deployment-architecture)
25. [Scalability & Performance](#25-scalability--performance)
26. [Error Handling](#26-error-handling)
27. [API Inventory](#27-api-inventory)
28. [Database Entity Inventory](#28-database-entity-inventory)
29. [Screen Inventory](#29-screen-inventory)
30. [Current Gaps & Recommendations](#30-current-gaps--recommendations)
31. [Implementation Roadmap](#31-implementation-roadmap)
32. [Appendix](#32-appendix)

---


## 1. Executive Summary

### 1.1 Project Overview

**Billet Flow** is a SaaS-based CNC manufacturing cost estimation platform that enables users to upload STEP files and receive AI-powered manufacturing cost estimates. The platform targets manufacturers, machine shops, and procurement teams who need rapid, accurate CNC machining cost calculations.

### 1.2 Current State

**Development Phase:** MVP / Alpha  
**Status:** Core UI/UX implemented with mock data  
**Deployment:** Local development only  
**Backend Status:** Mock API layer, no production backend  
**Database Status:** No database implemented  
**External Services:** Not integrated

### 1.3 Key Capabilities (Planned)

- **File Upload** - STEP/STP CAD file processing (up to 100MB)
- **AI Estimation** - Feature recognition and cost calculation
- **User Management** - Registration, authentication, role-based access
- **Subscription Management** - Trial, monthly, 6-month, 12-month plans
- **Admin Portal** - User management, coupon system, analytics dashboard
- **Payment Processing** - Razorpay integration (INR currency)
- **Email/SMS Notifications** - Verification, alerts, reports

### 1.4 Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                     USER (Web Browser)                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js 16 App (Frontend + SSR)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Public     │  │     Auth     │  │     User     │     │
│  │   Routes     │  │    Routes    │  │   Dashboard  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │    Admin     │  │   Components │                        │
│  │   Portal     │  │   (Shared)   │                        │
│  └──────────────┘  └──────────────┘                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Layer                                 │
│         [CURRENT: Mock API in lib/mock-api.ts]              │
│         [TARGET: Express/NestJS Backend Service]            │
└──────────────────────┬──────────────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
┌────────────┐  ┌────────────┐  ┌────────────┐
│ PostgreSQL │  │   Azure    │  │  External  │
│  Database  │  │  Storage   │  │  Services  │
│  [TARGET]  │  │  [TARGET]  │  │  [TARGET]  │
└────────────┘  └────────────┘  └────────────┘
```

### 1.5 Critical Implementation Gaps

⚠️ **HIGH PRIORITY - Production Blockers:**

1. **No Real Backend** - Application uses mock API only
2. **No Database** - All data is hardcoded in frontend
3. **No Authentication** - localStorage-based mock auth
4. **No File Processing** - No STEP file parser or CAD engine
5. **No Payment Integration** - Razorpay not implemented
6. **No Email/SMS** - No notification infrastructure
7. **No CNC Cost Engine** - Core estimation logic not implemented
8. **No Object Storage** - File uploads would fail in production

### 1.6 Technology Debt

- **Security:** Client-side only auth, no JWT verification, no route guards
- **Data Persistence:** Zero backend persistence layer
- **Scalability:** Single-instance frontend with no load balancing
- **Monitoring:** No logging, metrics, or error tracking
- **Testing:** No automated tests

---

## 2. System Overview

### 2.1 Business Context

**Problem Statement:**  
CNC machining cost estimation is complex, time-consuming, and requires expert knowledge. Traditional quoting processes take hours or days, creating bottlenecks in procurement and manufacturing planning.

**Solution:**  
Billet Flow automates CNC cost estimation using AI-powered CAD file analysis, providing instant manufacturing cost breakdowns including material, machining time, labor, and overhead.

### 2.2 User Personas

#### Customer (Manufacturing Engineer / Procurement Specialist)
- Uploads STEP files
- Reviews cost estimates
- Manages subscription
- Downloads estimate reports

#### Administrator
- Manages user accounts
- Creates/manages coupons
- Views system analytics
- Configures system settings
- Monitors platform health

### 2.3 Core User Flows

#### Flow 1: Registration → First Estimate
```
1. User visits landing page
2. Clicks "Start Free Trial"
3. Completes registration form
4. Verifies email (demo: skip available)
5. Verifies phone with OTP (demo: 123456)
6. Selects subscription plan
7. Completes payment (or starts trial)
8. Redirected to dashboard
9. Uploads STEP file
10. Receives instant estimate
```

#### Flow 2: Admin Portal Access
```
1. Admin logs in with admin@datadelimited.com
2. Redirected to /admin
3. Views KPI dashboard
4. Manages users/subscriptions/coupons
5. Reviews audit logs
```

---

## 3. Technology Stack

### 3.1 Current Implementation

| Layer | Technology | Version |
|-------|------------|---------|
| **Frontend Framework** | Next.js | 16.3.4 |
| **UI Library** | React | 19.2.8 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.3.3 |
| **Form Handling** | React Hook Form | 7.87.0 |
| **Validation** | Zod | 4.5.4 |
| **HTTP Client** | Axios | 1.20.0 |
| **Icons** | Lucide React | 1.40.0 |
| **State Management** | Zustand | 5.0.15 |
| **Animations** | GSAP + Anime.js | 3.15.0 + 4.5.0 |

### 3.2 Target Production Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Backend API** | Node.js + Express/NestJS | Aligned with frontend stack, mature ecosystem |
| **Database** | PostgreSQL 15+ | ACID compliance, JSON support, proven reliability |
| **ORM** | Prisma / Drizzle | Type-safe queries, migrations, great DX |
| **Object Storage** | Azure Blob Storage | Scalable, secure, CDN integration |
| **Payment Gateway** | Razorpay | INR support, Indian market focus |
| **Email Provider** | SendGrid / Amazon SES | Reliable delivery, template support |
| **SMS Provider** | Twilio / MSG91 | OTP delivery, Indian phone numbers |
| **Caching** | Redis | Session storage, rate limiting |
| **Queue** | BullMQ / Azure Service Bus | Background jobs, file processing |
| **Monitoring** | DataDog / New Relic | APM, logging, alerting |
| **Hosting** | Azure App Service / Vercel | Managed, scalable, CI/CD integration |

---


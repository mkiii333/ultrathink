# Spreesy Product Requirements Document (PRD)
Version 4.0 - Complete Edition
Updated: Today

## 1. Executive Summary
Spreesy is an AI-powered creator matching platform that uses the proprietary Spreesy Index™ to connect businesses with high-converting creators across every digital channel. The platform eliminates guesswork in creator partnerships by analyzing your business and identifying creators who actually drive sales—not just likes.
Tagline: "Stop guessing channels. Start growing revenue."
## 2. Goals and Background Context
Goals

Launch MVP to 100 beta users from RevenueGeeks audience
Achieve product-market fit with Amazon FBA sellers
Build foundation for $5k MRR within 6 months ($49 early bird pricing)
Create scalable platform for multi-channel creator discovery
Establish Spreesy Index™ as industry standard for purchase-intent matching

Background Context
Businesses waste $25,000-50,000 annually on ineffective advertising while spending 40-60 hours monthly searching for creators across fragmented platforms. Industry research shows average influencer ROI is $5.78 per $1 spent, but top performers achieve $20+. Spreesy solves this by using AI to match businesses with high-converting creators who actually respond to outreach (solving the 85% ignored outreach problem).
Target Users
Primary: Scaling Amazon FBA Sellers ($100k-$2M revenue)

Spending $1,000-10,000/month on Amazon PPC with rising costs
2-20 products in visual categories
Need traffic diversification beyond Amazon

Secondary: New Amazon Sellers (<$100k revenue)

1-3 products, $500-2,000/month marketing budget
Getting crushed by PPC competition
Seeking competitive edges

## 3. Success Metrics
Business Objectives

Month 3: 100 beta users from RevenueGeeks
Month 6: $5k MRR (100+ paying users)
Month 12: $15k MRR (200+ users)
Margins: Maintain 70-80% gross

User Success Metrics

Save 20+ hours/month on creator discovery
50% find high-match creator within first month
30% report successful partnership within 90 days
Achieve 5:1+ ROAS on creator partnerships

Key Performance Indicators

Activation Rate: % searching for 5+ creators (target: 60%)
Match Quality Score: % of results marked "good fit" (target: 70%)
Contact Rate: % of discovered creators contacted (target: 40%)
Free-to-Paid: Conversion to paid plans (target: 25-30%)

## 4. Requirements
Functional Requirements
Core Platform

FR1: User can create account with email/password or Google OAuth via Clerk
FR2: System displays personalized dashboard showing searches and contacted creators
FR3: User can input business details (name, type, product, audience, ASIN)
FR4: System integrates with creator data source (API TBD after research)

Search & Discovery

FR5: User can search creators by keyword, category, or product type
FR6: System calculates Spreesy Index™ 2.0 score (0-100)
FR7: Results display creators ranked by Spreesy Index™ with tier labels
FR8: Each creator shows: platform, followers, engagement, purchase intent, contact info
FR9: User can filter by platform, followers, engagement, and Spreesy Score
FR10: Search results paginate with infinite scroll or "Load More"

User Workspace

FR11: User can mark creators as "Saved," "Contacted," "Responded," "Partnered," "Declined"
FR12: User can add private notes to any creator profile
FR13: User can export creator lists to CSV (paid feature)
FR14: System provides 5 customizable outreach templates

Monetization

FR15: System enforces free tier limits (5 searches/month)
FR16: Polar.sh integration manages subscriptions
FR17: Paid users see contact info and unlimited searches
FR18: Early bird pricing ($49) locked forever

Analytics & Learning

FR19: Dashboard shows search history and contacted creator metrics
FR20: System tracks partnership outcomes to improve algorithm
FR21: User can rate match quality (1-5 stars)
FR22: Analytics dashboard tracks all user behavior for algorithm improvement

Non-Functional Requirements
Performance

NFR1: Search results return within 2 seconds (95% of queries)
NFR2: Spreesy Index™ calculation <100ms per creator
NFR3: Platform handles 100 concurrent users

Security & Compliance

NFR4: All user data encrypted at rest and in transit
NFR5: GDPR-compliant with user deletion options
NFR6: API usage within terms of service

Usability

NFR7: Mobile-responsive design
NFR8: Onboarding flow completed in under 3 minutes
NFR9: Core features accessible within 2 clicks
NFR10: Score explanations use plain language

Scalability

NFR11: Architecture supports multiple creator data sources
NFR12: Caching strategy reduces API costs by 80%

## 5. The Spreesy Index™ 2.0 Algorithm
Core Formula
Spreesy Index™ = (PIS × 0.35) + (APF × 0.30) + (CAR × 0.20) + (PPM × 0.15)
Components
Purchase Intent Signals (35%)

Review/haul content ratio
Commerce language in comments
Affiliate success history

Audience-Product Fit (30%)

Demographics match
Category relevance
Price point compatibility

Creator Accessibility (20%)

Professional indicators
Response probability
Content frequency

Platform Performance Multiplier (15%)

Platform-product match
Engagement quality

Score Tiers

90-100: 💎 Money Printer (8-20x ROI)
75-89: 🔥 High Performer (4-8x ROI)
60-74: ✅ Solid Bet (2-4x ROI)
45-59: 🧪 Test & Learn (1-2x ROI)
<45: ❌ Skip

## 6. Development-Ordered Epic Structure
Timeline Philosophy
As a solo "vibe coder" using AI tools, timeline is flexible and milestone-based rather than week-based. Each epic represents a development milestone that can be completed at your own pace.

Epic 0: Foundation Setup
Goal: Get core infrastructure running
Estimated Effort: 2-3 coding sessions
Story 0.1: Fork and Customize Starter
As a developer
I want to set up the elite-next-clerk-convex-starter
So that I have working auth and database immediately
Acceptance Criteria:
- Fork starter repository
- Update to "Spreesy" branding
- Remove demo features
- Deploy to Vercel
- Verify Clerk auth works
Story 0.2: Customize User Schema
As a developer
I want to extend the user model for business data
So that users can store their business profile
Story 0.3: Environment Configuration
As a developer
I want to configure all API keys and environment variables
So that the system can connect to required services
Acceptance Criteria:
- Document all required env variables
- Set up Clerk production keys
- Configure Vercel Analytics
- Prepare for future API integrations

Epic 1: Mock Data & Algorithm Development
Goal: Build and test Spreesy Index™ without API dependency
Estimated Effort: 4-5 coding sessions
Story 1.1: Mock Creator Data System
As a developer
I want to create realistic mock creator data
So that I can build the entire UX without API costs
Acceptance Criteria:
- Generate 500+ mock creators with realistic data
- Include all platforms (YouTube, TikTok, Instagram, etc.)
- Variety of follower counts and engagement rates
- Mock purchase intent signals
Story 1.2: Creator Data Model
As a developer
I want to define the creator schema in Convex
So that data structure supports all features
Story 1.3: Spreesy Index™ 2.0 Algorithm
As a developer
I want to implement the purchase-intent scoring algorithm
So that creators are ranked by conversion potential
Story 1.4: MVP Simplified Scoring
As a developer
I want a simplified scoring version for initial launch
So that we can iterate based on real data

Epic 2: Search & Discovery Interface
Goal: Complete search UX with mock data
Estimated Effort: 5-6 coding sessions
Story 2.1: Business Profile Input
As a user
I want to describe my business and products
So that Spreesy can find relevant creators
Story 2.2: Search Interface
As a user
I want to search and filter creators
So that I can find the best matches
Story 2.3: Creator Cards with Spreesy Index™
As a user
I want to see creators ranked by conversion potential
So that I focus on creators who drive sales
Story 2.4: Advanced Filtering
As a user
I want to filter by multiple criteria
So that I can narrow results effectively
Story 2.5: Search Analytics & Telemetry
As a founder
I want to track all search behavior
So that I can improve the algorithm
Acceptance Criteria:
- Track queries and refinements
- Log which creators users click
- Record filter usage patterns
- Export analytics to dashboard

Epic 3: User Workspace & Tracking
Goal: Help users manage creator outreach
Estimated Effort: 3-4 coding sessions
Story 3.1: Creator Tracking System
As a user
I want to track my outreach progress
So that I can manage partnerships effectively
Story 3.2: Outreach Templates
As a user
I want proven outreach templates
So that I get better response rates
Story 3.3: Email Notifications
As a user
I want email updates on my outreach
So that I can act quickly on opportunities
Acceptance Criteria:
- Weekly summary emails
- Response notifications
- Follow-up reminders
Story 3.4: Notes & Export
As a user
I want to add notes and export data
So that I can work efficiently

Epic 4: Creator Data Integration
Goal: Connect real creator data source
Estimated Effort: 4-5 coding sessions
Story 4.1: API Research & Selection
As a developer
I want to evaluate creator data APIs
So that I choose the most cost-effective option
Research Candidates:
- CreatorDB
- Modash
- HypeAuditor API
- Social Blade API
- Custom scraping solution
- Hybrid approach
Story 4.2: API Integration Layer
As a developer
I want to build flexible API integration
So that I can switch providers if needed
Acceptance Criteria:
- Abstract API behind interface
- Support multiple providers
- Graceful fallbacks
Story 4.3: Rate Limiting & Caching
As a developer
I want aggressive caching and rate limiting
So that API costs stay under control
Acceptance Criteria:
- 7-30 day cache per creator
- Rate limit implementation
- Cost tracking dashboard
- Fallback to cache when limited
Story 4.4: Data Synchronization
As a developer
I want to sync API data with mock data
So that transition is seamless

Epic 5: Onboarding & Activation
Goal: Convert visitors into active users
Estimated Effort: 3-4 coding sessions
Story 5.1: Interactive Onboarding Flow
As a new user
I want guided setup of my first search
So that I understand platform value immediately
Acceptance Criteria:
- Welcome screen with value prop
- Guided profile creation
- Sample search with example ASIN
- Spreesy Index™ explanation
- First search celebration
Story 5.2: Demo Mode
As a prospective user
I want to try Spreesy without signing up
So that I can evaluate the platform
Acceptance Criteria:
- Demo with sample products
- Real but limited results
- Clear upgrade prompts
- Track demo → signup conversion
Story 5.3: Help & Education
As a user
I want to understand how Spreesy works
So that I can use it effectively

Epic 6: Monetization & Payments
Goal: Enable sustainable revenue
Estimated Effort: 3-4 coding sessions
Story 6.1: Polar.sh Integration
As a developer
I want to integrate Polar.sh subscriptions
So that users can upgrade to paid plans
Story 6.2: Pricing Page & Upgrade Flow
As a user
I want clear pricing information
So that I can decide to upgrade
Story 6.3: Usage Metering & Limits
As a developer
I want to enforce tier limits accurately
So that free users upgrade when needed
Acceptance Criteria:
- Track searches per billing period
- Soft block with upgrade prompt
- Usage display (3/5 searches)
- Admin override capability
Story 6.4: Payment Success Flow
As a paying user
I want confirmation of my subscription
So that I know I have full access

Epic 7: Polish & Beta Launch
Goal: Prepare for real users
Estimated Effort: 3-4 coding sessions
Story 7.1: Performance Optimization
As a developer
I want to optimize critical paths
So that the app feels fast
Story 7.2: Error Handling & Edge Cases
As a developer
I want comprehensive error handling
So that users have good experience
Story 7.3: Analytics & Monitoring
As a founder
I want to track platform health
So that I can fix issues quickly
Story 7.4: Beta Launch Preparation
As a founder
I want everything ready for beta users
So that launch goes smoothly

## 7. Technical Architecture
Confirmed Stack

Frontend: Next.js 14 (App Router)
Backend: Convex (real-time, serverless)
Auth: Clerk (social + email)
Payments: Polar.sh
Creator Data: TBD after research (API abstraction layer)
Hosting: Vercel
Analytics: Vercel Analytics + PostHog

Data Models
typescript// Core schemas
businessProfiles: defineTable({
  userId: v.string(),
  businessName: v.string(),
  businessType: v.string(),
  productCategory: v.string(),
  // ... other fields
})

creators: defineTable({
  // API-agnostic creator model
  platform: v.string(),
  handle: v.string(),
  // ... universal fields
  dataSource: v.string(), // track where data came from
  lastUpdated: v.number(),
})

searches: defineTable({
  userId: v.string(),
  query: v.string(),
  filters: v.object(),
  timestamp: v.number(),
})

trackedCreators: defineTable({
  userId: v.string(),
  creatorId: v.string(),
  status: v.string(),
  spreesyScore: v.number(),
  // ... tracking fields
})
## 8. Risk Analysis & Mitigation
High Risks

Creator Data API Costs

Mitigation: Start with mock data, research multiple providers, aggressive caching


Algorithm Accuracy

Mitigation: Start simple, collect feedback, iterate based on real outcomes



Medium Risks

Conversion Rate - 25-30% might be optimistic
Creator Data Quality - Depends on chosen provider
Polar.sh Stability - New platform

Low Risks

Technical Implementation - Proven stack
Market Demand - Validated with RevenueGeeks

## 9. Dependencies & Assumptions
Dependencies

RevenueGeeks audience for beta users
Creator data API availability (multiple options exist)
Clerk and Polar.sh service reliability
Vercel/Convex infrastructure

Assumptions

✅ RevenueGeeks can drive 100+ beta users
✅ Creator data available via APIs
✅ $49-79/month pricing acceptable
⚠️ 25-30% free-to-paid achievable
⚠️ Spreesy Index™ accuracy improves with data

## 10. Go-to-Market Strategy
Phase 1: Beta (First 100 users)

Free access for early adopters
Weekly feedback sessions
Case study development

Phase 2: Early Bird Launch

$49/month locked forever (first 500)
RevenueGeeks exclusive content
Affiliate program (20% recurring)

Phase 3: Market Expansion

Standard $79/month pricing
Expand beyond Amazon sellers
Content marketing strategy

## 11. Next Steps

Complete Epic 0 - Foundation setup
Build with mock data - Epics 1-3
Research creator APIs - During Epic 1-3 development
User feedback loop - After Epic 3
API integration - Epic 4 based on research
Beta launch - After Epic 7


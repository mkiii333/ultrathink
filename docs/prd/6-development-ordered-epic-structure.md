# 6. Development-Ordered Epic Structure
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

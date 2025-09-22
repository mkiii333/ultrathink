Spreesy Full-Stack Architecture Document
Introduction
This architecture document defines the complete technical implementation for Spreesy, an AI-powered creator matching platform. Designed for solo development with AI coding assistance, this architecture prioritizes pragmatic choices, proven patterns, and cost-effective scalability.
Document Scope
Complete full-stack architecture for MVP launch targeting 100 beta users and scaling to $15k MRR within 12 months.
Change Log
DateVersionDescriptionAuthorToday1.0Initial architectureWinston (Architect)
System Overview
High-Level Architecture Diagram
mermaidgraph TB
    subgraph "Client Layer"
        WEB[Next.js 14 App]
        MOB[Mobile Browser]
    end
    
    subgraph "Edge Layer"
        CF[Vercel Edge]
        CDN[Vercel CDN]
    end
    
    subgraph "Application Layer"
        API[Convex Functions]
        RT[Convex Realtime]
        CRON[Convex Scheduled]
    end
    
    subgraph "Authentication"
        CLERK[Clerk Auth]
    end
    
    subgraph "Data Layer"
        CONVEX[Convex Database]
        CACHE[In-Memory Cache]
    end
    
    subgraph "External Services"
        POLAR[Polar.sh]
        CREATOR[Creator APIs]
        EMAIL[Resend]
        ANALYTICS[PostHog]
    end
    
    WEB --> CF
    MOB --> CF
    CF --> CDN
    CF --> API
    API --> CONVEX
    API --> CACHE
    API --> RT
    WEB <--> RT
    API --> CLERK
    API --> POLAR
    API --> CREATOR
    CRON --> EMAIL
    WEB --> ANALYTICS
Architectural and Design Patterns

Serverless Architecture: Convex provides serverless backend with automatic scaling - Rationale: Zero DevOps overhead for solo developer, scales automatically
Real-time Sync Pattern: Convex's reactive queries for instant UI updates - Rationale: Superior UX without complex state management
API Abstraction Layer: Interface-based creator data access - Rationale: Switch providers without refactoring
Progressive Enhancement: Mock data → Cached data → Live data - Rationale: Ship fast, optimize later
Repository Pattern: Abstract data access through Convex functions - Rationale: Clean separation of concerns, testable
Command Query Separation: Mutations vs queries in Convex - Rationale: Clear data flow, optimistic updates
Cache-First Strategy: 7-30 day creator data caching - Rationale: 80% API cost reduction
Event-Driven Analytics: Track all user actions for algorithm improvement - Rationale: Data-driven product iteration

Tech Stack
Technology Stack Table
CategoryTechnologyVersionPurposeRationaleFrontend LanguageTypeScript5.3.3Type-safe developmentCatches errors early, better AI tool supportFrontend FrameworkNext.js14.2.5React framework with App RouterServer components, built-in optimizationsUI Component LibraryRadix UI1.0.4Accessible componentsSaves time, WCAG compliantStylingTailwind CSS3.4.1Utility-first CSSRapid prototyping, consistent designState ManagementConvex ReactiveBuilt-inReal-time state syncNo Redux needed, automatic updatesBackend RuntimeConvex RuntimeLatestServerless functionsZero config, auto-scalingDatabaseConvex DBBuilt-inDocument databaseNo separate DB needed, ACID transactionsAuthenticationClerk5.0.0Auth serviceSocial logins, magic links, zero effortPaymentsPolar.shSDK 1.0Subscription managementModern billing, developer-friendlyFile StorageConvex StorageBuilt-inFile uploadsIntegrated with databaseAPI IntegrationZod + Fetch3.22.4Type-safe API callsRuntime validation, clear contractsFrontend TestingVitest1.6.0Unit testingFast, ESM supportE2E TestingPlaywright1.45.0Browser testingCross-browser, reliableMonitoringSentry8.0.0Error trackingProactive bug detectionAnalyticsPostHog1.0.0Product analyticsSelf-serve insights, feature flagsBundlerTurbopackBuilt-inNext.js bundlerFaster builds than WebpackPackage Managerpnpm9.5.0Dependency managementFaster, disk efficientLintingESLint + PrettierLatestCode qualityConsistent formattingIaC ToolVercel CLILatestDeployment configSimple, integratedCI/CDGitHub ActionsN/AAutomationFree for public reposHostingVercelProEdge deploymentOptimal for Next.jsDomain/DNSCloudflareFreeDNS managementFast, reliable, free
Cloud Infrastructure

Provider: Vercel (Frontend) + Convex (Backend)
Key Services: Edge Functions, Image Optimization, Analytics, KV Storage
Deployment Regions: Global edge network, primary in US-East

Data Models
Core Data Entities
typescript// User Profile (extends Clerk user)
export const users = defineTable({
  clerkId: v.string(),
  email: v.string(),
  businessProfile: v.object({
    businessName: v.string(),
    businessType: v.string(),
    category: v.string(),
    targetAudience: v.string(),
    productTypes: v.array(v.string()),
    amazonSellerInfo: v.optional(v.object({
      monthlyRevenue: v.string(),
      productCount: v.number(),
      mainASIN: v.optional(v.string()),
    })),
  }),
  subscription: v.object({
    status: v.union(v.literal("free"), v.literal("trial"), v.literal("paid"), v.literal("canceled")),
    plan: v.optional(v.string()),
    polarCustomerId: v.optional(v.string()),
    currentPeriodEnd: v.optional(v.number()),
    isEarlyBird: v.boolean(),
  }),
  usage: v.object({
    searchesThisMonth: v.number(),
    lastResetDate: v.number(),
    totalSearches: v.number(),
    totalCreatorsSaved: v.number(),
    totalContactsUnlocked: v.number(),
  }),
  createdAt: v.number(),
  updatedAt: v.number(),
})
.index("by_clerk_id", ["clerkId"])
.index("by_email", ["email"]);

// Creator Data Model (API-agnostic)
export const creators = defineTable({
  // Core Identity
  externalId: v.string(), // From API provider
  platform: v.union(
    v.literal("youtube"),
    v.literal("tiktok"),
    v.literal("instagram"),
    v.literal("twitter"),
    v.literal("linkedin"),
    v.literal("newsletter"),
    v.literal("podcast"),
    v.literal("blog")
  ),
  handle: v.string(),
  name: v.string(),
  profileUrl: v.string(),
  avatarUrl: v.optional(v.string()),
  
  // Audience Metrics
  metrics: v.object({
    followers: v.number(),
    engagement: v.number(), // Percentage
    avgViews: v.optional(v.number()),
    growthRate: v.optional(v.number()), // Monthly %
  }),
  
  // Spreesy Index™ Components
  spreesyData: v.object({
    purchaseIntentSignals: v.object({
      reviewContent: v.number(), // 0-100
      commerceLanguage: v.number(), // 0-100
      affiliateHistory: v.boolean(),
      score: v.number(), // Weighted 0-100
    }),
    audienceProductFit: v.object({
      demographics: v.object({
        primaryAge: v.string(),
        primaryGender: v.string(),
        primaryLocation: v.string(),
      }),
      categories: v.array(v.string()),
      pricePointMatch: v.number(), // 0-100
      score: v.number(), // Weighted 0-100
    }),
    creatorAccessibility: v.object({
      hasEmail: v.boolean(),
      hasMediaKit: v.boolean(),
      responseRate: v.optional(v.number()), // Historical %
      contentFrequency: v.number(), // Posts per week
      score: v.number(), // Weighted 0-100
    }),
    platformPerformance: v.object({
      platformProductMatch: v.number(), // 0-100
      engagementQuality: v.number(), // 0-100
      score: v.number(), // Weighted 0-100
    }),
    overallScore: v.number(), // 0-100
    tier: v.string(), // "money-printer", "high-performer", etc.
    calculatedAt: v.number(),
  }),
  
  // Contact Information (paid feature)
  contactInfo: v.optional(v.object({
    email: v.optional(v.string()),
    businessEmail: v.optional(v.string()),
    agencyEmail: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    bookingUrl: v.optional(v.string()),
  })),
  
  // Data Source Tracking
  dataSource: v.object({
    provider: v.string(), // "mock", "creatordb", "modash", etc.
    lastUpdated: v.number(),
    nextUpdateAfter: v.number(), // For cache expiry
    confidence: v.number(), // 0-100 data quality score
  }),
})
.index("by_platform", ["platform"])
.index("by_score", ["spreesyData.overallScore"])
.index("by_external_id", ["externalId"]);

// Search Sessions
export const searches = defineTable({
  userId: v.id("users"),
  sessionId: v.string(),
  query: v.object({
    text: v.optional(v.string()),
    asin: v.optional(v.string()),
    category: v.optional(v.string()),
    productType: v.optional(v.string()),
  }),
  filters: v.object({
    platforms: v.array(v.string()),
    minScore: v.optional(v.number()),
    maxFollowers: v.optional(v.number()),
    minFollowers: v.optional(v.number()),
    minEngagement: v.optional(v.number()),
  }),
  results: v.object({
    creatorIds: v.array(v.id("creators")),
    totalCount: v.number(),
    avgScore: v.number(),
    executionTime: v.number(),
  }),
  userActions: v.object({
    viewedCreators: v.array(v.id("creators")),
    savedCreators: v.array(v.id("creators")),
    clickedContacts: v.array(v.id("creators")),
  }),
  timestamp: v.number(),
})
.index("by_user", ["userId"])
.index("by_session", ["sessionId"])
.index("by_timestamp", ["timestamp"]);

// Creator Tracking (User's saved/contacted creators)
export const trackedCreators = defineTable({
  userId: v.id("users"),
  creatorId: v.id("creators"),
  status: v.union(
    v.literal("saved"),
    v.literal("contacted"),
    v.literal("responded"),
    v.literal("partnered"),
    v.literal("declined"),
    v.literal("archived")
  ),
  metadata: v.object({
    savedAt: v.number(),
    contactedAt: v.optional(v.number()),
    respondedAt: v.optional(v.number()),
    notes: v.optional(v.string()),
    tags: v.array(v.string()),
    dealValue: v.optional(v.number()),
    actualROI: v.optional(v.number()), // For algorithm training
  }),
  outreach: v.optional(v.object({
    template: v.optional(v.string()),
    customMessage: v.optional(v.string()),
    followUpCount: v.number(),
    lastFollowUp: v.optional(v.number()),
  })),
})
.index("by_user", ["userId"])
.index("by_status", ["status"])
.index("by_user_status", ["userId", "status"]);

// Analytics Events (for algorithm improvement)
export const analyticsEvents = defineTable({
  userId: v.optional(v.id("users")),
  sessionId: v.string(),
  eventType: v.string(),
  eventData: v.any(), // Flexible JSON
  timestamp: v.number(),
})
.index("by_user", ["userId"])
.index("by_type", ["eventType"])
.index("by_timestamp", ["timestamp"]);
Data Relationships
mermaiderDiagram
    USERS ||--o{ SEARCHES : performs
    USERS ||--o{ TRACKED_CREATORS : tracks
    SEARCHES ||--o{ CREATORS : returns
    TRACKED_CREATORS }o--|| CREATORS : references
    USERS ||--o{ ANALYTICS_EVENTS : generates
    SEARCHES ||--o{ ANALYTICS_EVENTS : triggers
    
    USERS {
        string clerkId PK
        object businessProfile
        object subscription
        object usage
    }
    
    CREATORS {
        string id PK
        string platform
        object metrics
        object spreesyData
        object contactInfo
    }
    
    SEARCHES {
        string id PK
        string userId FK
        object query
        object filters
        object results
    }
    
    TRACKED_CREATORS {
        string userId FK
        string creatorId FK
        string status
        object metadata
    }
API Design
Internal API Structure (Convex Functions)
typescript// mutations/users.ts
export const updateBusinessProfile = mutation({
  args: {
    businessName: v.string(),
    businessType: v.string(),
    category: v.string(),
    targetAudience: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    
    // Update user profile
    return await ctx.db
      .patch(userId, { businessProfile: args });
  },
});

// queries/creators.ts
export const searchCreators = query({
  args: {
    query: v.string(),
    filters: v.object({
      platforms: v.optional(v.array(v.string())),
      minScore: v.optional(v.number()),
    }),
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check user tier for limits
    const user = await ctx.db.get(userId);
    if (user.subscription.status === "free" && 
        user.usage.searchesThisMonth >= 5) {
      throw new Error("Search limit reached");
    }
    
    // Perform search with caching
    const results = await searchWithCache(ctx, args);
    
    // Track search analytics
    await trackSearch(ctx, userId, args, results);
    
    return results;
  },
});

// actions/spreesyIndex.ts
export const calculateSpreesyIndex = action({
  args: {
    creatorData: v.object({
      platform: v.string(),
      metrics: v.any(),
      content: v.any(),
    }),
    businessProfile: v.any(),
  },
  handler: async (ctx, args) => {
    // Complex calculation in action (can use Node.js APIs)
    const pis = calculatePurchaseIntent(args);
    const apf = calculateAudienceFit(args);
    const car = calculateAccessibility(args);
    const ppm = calculatePlatformMatch(args);
    
    const score = (pis * 0.35) + (apf * 0.30) + 
                  (car * 0.20) + (ppm * 0.15);
    
    return {
      score: Math.round(score),
      breakdown: { pis, apf, car, ppm },
      tier: getTier(score),
    };
  },
});
External API Integration Layer
typescript// lib/creators/provider.interface.ts
export interface CreatorProvider {
  search(params: SearchParams): Promise<CreatorResult[]>;
  getCreator(id: string): Promise<Creator>;
  getBulk(ids: string[]): Promise<Creator[]>;
  getRateLimit(): RateLimitInfo;
}

// lib/creators/providers/creatordb.ts
export class CreatorDBProvider implements CreatorProvider {
  private apiKey: string;
  private cache: CacheManager;
  
  async search(params: SearchParams) {
    // Check cache first
    const cacheKey = this.getCacheKey(params);
    const cached = await this.cache.get(cacheKey);
    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }
    
    // Rate limiting
    await this.rateLimiter.acquire();
    
    // API call with retry logic
    const response = await this.fetchWithRetry(
      `${API_URL}/search`,
      { 
        method: 'POST',
        body: JSON.stringify(this.mapParams(params))
      }
    );
    
    // Transform and cache
    const results = this.transformResults(response);
    await this.cache.set(cacheKey, results, TTL_7_DAYS);
    
    return results;
  }
}

// lib/creators/manager.ts
export class CreatorDataManager {
  private providers: Map<string, CreatorProvider>;
  private primaryProvider: string = 'creatordb';
  
  async search(params: SearchParams) {
    try {
      // Try primary provider
      return await this.providers
        .get(this.primaryProvider)
        .search(params);
    } catch (error) {
      // Fallback to secondary
      if (this.providers.has('modash')) {
        return await this.providers
          .get('modash')
          .search(params);
      }
      
      // Last resort: return mock data
      return this.getMockData(params);
    }
  }
}
Component Architecture
Frontend Component Structure
typescript// app/layout.tsx - Root Layout
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ConvexProvider>
        <PostHogProvider>
          <html lang="en" className="dark">
            <body>
              <Navbar />
              {children}
              <Toaster />
            </body>
          </html>
        </PostHogProvider>
      </ConvexProvider>
    </ClerkProvider>
  );
}

// components/spreesy-index/SpreesyScore.tsx
interface SpreesyScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showBreakdown?: boolean;
  animated?: boolean;
}

export function SpreesyScore({ 
  score, 
  size = 'md', 
  showBreakdown,
  animated 
}: SpreesyScoreProps) {
  const tier = getTier(score);
  const [displayScore, setDisplayScore] = useState(
    animated ? 0 : score
  );
  
  useEffect(() => {
    if (animated) {
      animateValue(0, score, 1500, setDisplayScore);
    }
  }, [score, animated]);
  
  return (
    <div className={cn(
      "spreesy-score",
      `spreesy-score--${size}`,
      `spreesy-score--${tier}`
    )}>
      <CircularProgress value={displayScore} />
      <span className="score-value">{displayScore}</span>
      {showBreakdown && <ScoreBreakdown score={score} />}
    </div>
  );
}

// app/(dashboard)/search/page.tsx
export default function SearchPage() {
  const { user } = useUser();
  const creators = useQuery(api.creators.search, {
    query: searchQuery,
    filters: activeFilters,
  });
  
  return (
    <div className="search-container">
      <SearchHeader />
      <div className="grid lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <FilterPanel 
            filters={activeFilters}
            onChange={setActiveFilters}
          />
        </aside>
        <main className="lg:col-span-3">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Describe your product or paste ASIN..."
          />
          <CreatorGrid 
            creators={creators}
            loading={!creators}
            onCreatorClick={handleCreatorClick}
          />
        </main>
      </div>
    </div>
  );
}
Component Hierarchy
App
├── Layout
│   ├── ClerkProvider
│   ├── ConvexProvider
│   └── PostHogProvider
├── Pages
│   ├── LandingPage
│   │   ├── Hero
│   │   ├── Features
│   │   └── Pricing
│   ├── DashboardPage
│   │   ├── StatsOverview
│   │   ├── RecentSearches
│   │   └── SavedCreators
│   ├── SearchPage
│   │   ├── SearchBar
│   │   ├── FilterPanel
│   │   └── CreatorGrid
│   │       └── CreatorCard
│   │           ├── SpreesyScore
│   │           ├── CreatorMetrics
│   │           └── ActionButtons
│   └── SettingsPage
│       ├── BusinessProfile
│       ├── Subscription
│       └── ApiKeys
└── Shared Components
    ├── Navigation
    ├── Modals
    ├── Forms
    └── Feedback
Database Schema
Convex Schema Definition
typescript// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // See Data Models section above
  })
  .index("by_clerk_id", ["clerkId"])
  .index("by_subscription_status", ["subscription.status"]),
  
  creators: defineTable({
    // See Data Models section above  
  })
  .index("by_platform_score", ["platform", "spreesyData.overallScore"])
  .searchIndex("search_creators", {
    searchField: "name",
    filterFields: ["platform", "spreesyData.tier"],
  }),
  
  searches: defineTable({
    // See Data Models section above
  })
  .index("by_user_timestamp", ["userId", "timestamp"]),
  
  trackedCreators: defineTable({
    // See Data Models section above
  })
  .index("by_user_creator", ["userId", "creatorId"]),
  
  // Caching table for external API results
  apiCache: defineTable({
    key: v.string(),
    data: v.any(),
    expiresAt: v.number(),
    provider: v.string(),
  })
  .index("by_key", ["key"])
  .index("by_expiry", ["expiresAt"]),
  
  // System configuration
  systemConfig: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  })
  .index("by_key", ["key"]),
});
Source Tree
plaintextspreesy/
├── .env.local
├── .env.production
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── README.md
│
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles
│   ├── (auth)/                  # Auth routes group
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── (dashboard)/             # Protected routes
│   │   ├── layout.tsx          # Dashboard layout
│   │   ├── dashboard/page.tsx  # Main dashboard
│   │   ├── search/page.tsx     # Search interface
│   │   ├── creators/[id]/page.tsx # Creator details
│   │   ├── saved/page.tsx      # Saved creators
│   │   ├── settings/page.tsx   # User settings
│   │   └── onboarding/page.tsx # First-time setup
│   └── api/                     # API routes (if needed)
│       ├── webhooks/
│       │   ├── clerk/route.ts  # Clerk webhooks
│       │   └── polar/route.ts  # Polar webhooks
│       └── cron/route.ts        # Cron jobs
│
├── components/                   # React components
│   ├── ui/                      # Base UI components (Radix)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── spreesy-index/           # Spreesy Score components
│   │   ├── SpreesyScore.tsx
│   │   ├── ScoreBreakdown.tsx
│   │   ├── ScoreAnimation.tsx
│   │   └── TierBadge.tsx
│   ├── creators/                # Creator components
│   │   ├── CreatorCard.tsx
│   │   ├── CreatorGrid.tsx
│   │   ├── CreatorDetails.tsx
│   │   └── CreatorFilters.tsx
│   ├── search/                  # Search components
│   │   ├── SearchBar.tsx
│   │   ├── SmartSearch.tsx
│   │   ├── FilterPanel.tsx
│   │   └── SearchResults.tsx
│   ├── dashboard/               # Dashboard components
│   │   ├── StatsCard.tsx
│   │   ├── RecentSearches.tsx
│   │   ├── UsageIndicator.tsx
│   │   └── UpgradePrompt.tsx
│   ├── onboarding/             # Onboarding flow
│   │   ├── OnboardingFlow.tsx
│   │   ├── BusinessForm.tsx
│   │   └── DemoSearch.tsx
│   └── shared/                  # Shared components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── LoadingStates.tsx
│       └── EmptyStates.tsx
│
├── convex/                      # Convex backend
│   ├── _generated/             # Auto-generated
│   ├── schema.ts               # Database schema
│   ├── auth.ts                 # Auth config
│   ├── mutations/              # Write operations
│   │   ├── users.ts
│   │   ├── searches.ts
│   │   └── tracking.ts
│   ├── queries/                # Read operations
│   │   ├── creators.ts
│   │   ├── dashboard.ts
│   │   └── analytics.ts
│   ├── actions/                # Complex operations
│   │   ├── spreesyIndex.ts
│   │   ├── creatorSync.ts
│   │   └── emailNotifications.ts
│   └── crons.ts                # Scheduled jobs
│
├── lib/                         # Utility libraries
│   ├── creators/               # Creator data layer
│   │   ├── provider.interface.ts
│   │   ├── manager.ts
│   │   ├── providers/
│   │   │   ├── mock.ts
│   │   │   ├── creatordb.ts
│   │   │   └── modash.ts
│   │   └── cache.ts
│   ├── spreesy-index/          # Algorithm implementation
│   │   ├── calculator.ts
│   │   ├── signals.ts
│   │   └── tiers.ts
│   ├── analytics/              # Analytics helpers
│   │   ├── posthog.ts
│   │   ├── events.ts
│   │   └── tracking.ts
│   ├── payments/               # Payment integration
│   │   ├── polar.ts
│   │   └── subscription.ts
│   └── utils/                  # General utilities
│       ├── cn.ts               # Class names
│       ├── format.ts           # Formatters
│       └── constants.ts        # App constants
│
├── hooks/                       # Custom React hooks
│   ├── use-spreesy-score.ts
│   ├── use-creator-search.ts
│   ├── use-subscription.ts
│   └── use-analytics.ts
│
├── styles/                      # Additional styles
│   ├── animations.css
│   └── components.css
│
├── public/                      # Static assets
│   ├── images/
│   ├── fonts/
│   └── manifest.json
│
├── tests/                       # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── docs/                        # Documentation
    ├── prd.md
    ├── architecture.md
    ├── api.md
    └── deployment.md
Infrastructure and Deployment
Deployment Architecture
mermaidgraph LR
    subgraph "Development"
        LOCAL[Local Dev]
        GH[GitHub Repo]
    end
    
    subgraph "CI/CD"
        GHA[GitHub Actions]
        PREVIEW[Vercel Preview]
    end
    
    subgraph "Production"
        VERCEL[Vercel Prod]
        CONVEX[Convex Prod]
        CLERK[Clerk Prod]
    end
    
    LOCAL --> GH
    GH --> GHA
    GHA --> PREVIEW
    GHA --> VERCEL
    VERCEL <--> CONVEX
    VERCEL --> CLERK
Environment Configuration
bash# .env.local
# Convex
CONVEX_DEPLOYMENT=dev
NEXT_PUBLIC_CONVEX_URL=https://dev.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Polar.sh
POLAR_API_KEY=polar_xxx
NEXT_PUBLIC_POLAR_CHECKOUT_URL=https://polar.sh/spreesy

# Creator APIs (research phase)
CREATORDB_API_KEY=xxx
MODASH_API_KEY=xxx

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Email
RESEND_API_KEY=xxx

# Sentry
SENTRY_DSN=xxx
Deployment Strategy
yaml# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test
      - run: pnpm lint
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: |
          npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Convex Functions
        run: |
          npx convex deploy --prod
Monitoring and Observability
typescript// lib/monitoring/index.ts
import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

export function initMonitoring() {
  // Sentry for errors
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
  });
  
  // PostHog for analytics
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
  }
  
  // Custom performance monitoring
  if (typeof window !== 'undefined') {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Track Core Web Vitals
        posthog.capture('web_vital', {
          metric: entry.name,
          value: entry.value,
        });
      }
    });
    observer.observe({ entryTypes: ['measure'] });
  }
}
Cost Optimization Strategy
typescript// convex/crons.ts
import { cronJobs } from "convex/server";

export default cronJobs({
  // Reset monthly usage counters
  resetMonthlyUsage: {
    schedule: "0 0 1 * *", // First of month
    handler: "actions/resetUsage",
  },
  
  // Clean expired cache
  cleanCache: {
    schedule: "0 */6 * * *", // Every 6 hours
    handler: "actions/cleanExpiredCache",
  },
  
  // Sync high-value creators only
  syncTopCreators: {
    schedule: "0 2 * * *", // Daily at 2 AM
    handler: "actions/syncTopCreators",
  },
});

// Cache strategy for API calls
export const CACHE_DURATIONS = {
  CREATOR_PROFILE: 30 * 24 * 60 * 60 * 1000, // 30 days
  SEARCH_RESULTS: 7 * 24 * 60 * 60 * 1000,   // 7 days
  TRENDING: 24 * 60 * 60 * 1000,             // 1 day
  USER_PROFILE: 60 * 60 * 1000,              // 1 hour
};
Security Considerations
Authentication & Authorization
typescript// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks/clerk",
    "/api/webhooks/polar",
  ],
  afterAuth(auth, req) {
    // Redirect logged out users to landing
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    
    // Check subscription for premium features
    if (req.url.includes('/api/export')) {
      // Verify paid subscription
    }
  },
});
Data Protection
typescript// Security measures
const securityConfig = {
  // API Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests
  },
  
  // Input Validation (Zod)
  validation: {
    searchQuery: z.string().min(1).max(500),
    asin: z.string().regex(/^[A-Z0-9]{10}$/),
  },
  
  // Content Security Policy
  csp: {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", "*.clerk.dev"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "*.clerk.dev", "*.cloudinary.com"],
  },
  
  // CORS Configuration
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL,
    credentials: true,
  },
};
Testing Strategy
Test Coverage Requirements
typescript// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'html'],
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
  },
});

// Unit Test Example
describe('SpreesyIndex Calculator', () => {
  it('calculates correct score for high-intent creator', () => {
    const creator = mockHighIntentCreator();
    const score = calculateSpreesyIndex(creator);
    
    expect(score.overall).toBeGreaterThanOrEqual(75);
    expect(score.tier).toBe('high-performer');
  });
});

// E2E Test Example (Playwright)
test('complete search flow', async ({ page }) => {
  await page.goto('/search');
  await page.fill('[data-testid="search-input"]', 'yoga mat');
  await page.click('[data-testid="search-button"]');
  
  await expect(page.locator('[data-testid="creator-card"]'))
    .toHaveCount(10);
});
Development Patterns
AI Coding Tool Patterns
typescript// Pattern 1: Clear function signatures for AI understanding
/**
 * Calculates the Spreesy Index™ score for a creator
 * @param creator - Creator data from API
 * @param businessProfile - User's business context
 * @returns Score object with breakdown
 */
export function calculateSpreesyIndex(
  creator: CreatorData,
  businessProfile: BusinessProfile
): SpreesyScore {
  // Implementation with clear steps
}

// Pattern 2: Component with clear props
interface CreatorCardProps {
  /** Creator data to display */
  creator: Creator;
  /** Whether user has paid subscription */
  isPaid: boolean;
  /** Callback when user clicks contact button */
  onContactClick?: (creatorId: string) => void;
  /** Optional className for styling */
  className?: string;
}

// Pattern 3: Type-safe API calls
const searchCreators = async (
  params: SearchParams
): Promise<SearchResult> => {
  const validated = searchParamsSchema.parse(params);
  return convexQuery(api.creators.search, validated);
};
Error Handling Patterns
typescript// Consistent error handling
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
  }
}

// Usage in API
try {
  const results = await searchCreators(params);
  return results;
} catch (error) {
  if (error instanceof AppError) {
    // Known error
    return handleKnownError(error);
  }
  
  // Unknown error
  Sentry.captureException(error);
  return handleUnknownError(error);
}
Performance Optimization
Core Web Vitals Targets

LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
TTFB (Time to First Byte): < 600ms

Optimization Strategies
typescript// 1. Image Optimization
<Image
  src={creator.avatar}
  alt={creator.name}
  width={48}
  height={48}
  loading="lazy"
  placeholder="blur"
  blurDataURL={creator.avatarBlur}
/>

// 2. Code Splitting
const CreatorDetailsModal = dynamic(
  () => import('@/components/CreatorDetailsModal'),
  { 
    loading: () => <ModalSkeleton />,
    ssr: false 
  }
);

// 3. React Query for caching
const { data: creators } = useQuery({
  queryKey: ['creators', filters],
  queryFn: () => searchCreators(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 30 * 60 * 1000, // 30 minutes
});

// 4. Debounced search
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  []
);
Migration Strategy
Phase 1: Mock Data MVP (Weeks 1-4)

Implement all UI/UX with mock data
Perfect the Spreesy Index™ algorithm
Complete onboarding flow
Set up analytics tracking

Phase 2: API Integration (Weeks 5-6)

Research and select creator API
Implement caching layer
Add rate limiting
Gradual rollout with feature flags

Phase 3: Monetization (Weeks 7-8)

Integrate Polar.sh
Implement usage limits
Add upgrade flows
Set up billing webhooks

Phase 4: Beta Launch (Weeks 9-12)

Performance optimization
Error handling improvements
User feedback incorporation
Algorithm refinement

Disaster Recovery
Backup Strategy
typescript// Daily backups of critical data
export const backupCriticalData = scheduledFunction(
  "0 3 * * *", // 3 AM daily
  async () => {
    // Export user data
    const users = await db.query("users").collect();
    await uploadToS3(users, `backups/users-${Date.now()}.json`);
    
    // Export tracked creators
    const tracked = await db.query("trackedCreators").collect();
    await uploadToS3(tracked, `backups/tracked-${Date.now()}.json`);
    
    // Keep last 30 days of backups
    await cleanOldBackups(30);
  }
);
Rollback Procedures

Feature Flags: All new features behind flags
Database Migrations: Reversible with down migrations
Deployment: Instant rollback via Vercel
API Fallbacks: Multiple provider support

Architecture Decision Records
ADR-001: Convex over Traditional Backend
Status: Accepted
Context: Need real-time updates, serverless scale, minimal DevOps
Decision: Use Convex for backend instead of Node.js + PostgreSQL
Consequences: Simpler deployment, built-in real-time, but vendor lock-in
ADR-002: Mock Data First Development
Status: Accepted
Context: API costs uncertain, need to validate UX quickly
Decision: Build complete UX with mock data before API integration
Consequences: Faster iteration, delayed API costs, but extra refactoring
ADR-003: Clerk for Authentication
Status: Accepted
Context: Need social logins, magic links, user management
Decision: Use Clerk instead of building auth
Consequences: Faster launch, better security, but monthly costs
ADR-004: Aggressive Caching Strategy
Status: Accepted
Context: Creator API calls expensive, data doesn't change often
Decision: Cache creator data for 7-30 days
Consequences: 80% cost reduction, slight data staleness acceptable

Implementation Notes for Solo Developer
Week 1-2 Priorities

Fork elite-next-clerk-convex-starter
Set up Spreesy branding and remove demo
Implement mock creator data system
Build CreatorCard and SpreesyScore components
Create basic search interface

AI Coding Sessions Structure
Each story should be a focused session:
1. Open story file + architecture section
2. Implement with AI assistance
3. Test implementation
4. Commit with conventional commits
5. Update story status
Critical Success Factors

Don't over-optimize early - Ship weekly
Use starter template fully - Don't rebuild solved problems
Cache aggressively - API costs will kill you
Track everything - Data drives algorithm improvement
Focus on activation - First search experience is critical


This architecture provides a complete technical blueprint optimized for solo development with AI tools. Each section can be referenced during implementation for consistent, high-quality code generation.
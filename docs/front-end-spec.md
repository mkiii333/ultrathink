Spreesy UI/UX Specification v4.0
BMAD-METHOD™ Compliant | Solo Developer Edition

Executive Summary
Spreesy's design system creates a premium, data-driven experience that transforms creator discovery into a streamlined workflow. This v4.0 specification incorporates conversion optimization, trust-building, and activation improvements while maintaining practical implementation for solo developers.
Design Vision
"Make the complex feel simple, the data feel actionable, and the matches feel magical."
Core UX Principles

Progressive Disclosure: Simple first experience, powerful when needed
Trust Through Transparency: Show the "why" behind every score
Value Realization: Demonstrate ROI potential within 3 minutes
Mobile-First Responsive: Optimized for 40% mobile usage


Visual Identity System
Brand Personality

Intelligent: Data-driven, analytical, precise
Approachable: Friendly for solo founders, not enterprise-cold
Trustworthy: Professional enough for $49-79/month commitment
Energetic: Dynamic, forward-moving, growth-oriented


Color Palette
Primary Brand Colors
css/* Core Brand - Orange/Salmon Theme */
--primary: #FF6B35;           /* Main brand orange */
--primary-dark: #E55A2B;      /* Darker orange for hover */
--primary-light: #FF8A5B;     /* Light orange */
--primary-glow: rgba(255, 107, 53, 0.15);

/* Secondary - Purple (Spreesy Index™) */
--secondary: #8B5CF6;         /* Purple accent */
--secondary-dark: #7C3AED;   /* Dark purple */
--secondary-light: #A78BFA;  /* Light purple */

/* Accent - Pink */
--accent: #EC4899;           /* Pink for gradients */
--accent-dark: #DB2777;      /* Dark pink */
Dark Theme
css/* Premium dark backgrounds */
--dark: #0A0E27;             /* Main dark background */
--dark-light: #141829;       /* Lighter dark */
--dark-surface: #1A1F3A;     /* Card surfaces */
--glass-bg: rgba(255, 255, 255, 0.03);
--glass-border: rgba(255, 255, 255, 0.08);
Spreesy Index™ Score Colors
css/* Performance tiers with semantic meaning */
--tier-money-printer: #10B981;    /* 90-100: Money Printer */
--tier-high-performer: #3B82F6;   /* 75-89: High Performer */
--tier-solid-bet: #F59E0B;        /* 60-74: Solid Bet */
--tier-test-learn: #8B5CF6;       /* 45-59: Test & Learn */
--tier-skip: #EF4444;              /* <45: Skip */

/* Tier backgrounds (10% opacity) */
--tier-money-printer-bg: rgba(16, 185, 129, 0.1);
--tier-high-performer-bg: rgba(59, 130, 246, 0.1);
--tier-solid-bet-bg: rgba(245, 158, 11, 0.1);
--tier-test-learn-bg: rgba(139, 92, 246, 0.1);
--tier-skip-bg: rgba(239, 68, 68, 0.1);

Typography System
Font Stack
css--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
Type Scale
css--text-xs: 0.75rem;     /* 12px - Micro labels */
--text-sm: 0.875rem;    /* 14px - Small text */
--text-base: 1rem;      /* 16px - Body */
--text-lg: 1.125rem;    /* 18px - Large body */
--text-xl: 1.25rem;     /* 20px - H4 */
--text-2xl: 1.5rem;     /* 24px - H3 */
--text-3xl: 1.875rem;   /* 30px - H2 */
--text-4xl: 2.25rem;    /* 36px - H1 */
--text-5xl: 3rem;       /* 48px - Hero */

Component Library
1. Spreesy Index™ Display Component (Enhanced)
Large Hero Version with Animation
tsx<div className="spreesy-index-hero">
  <div className="relative w-24 h-24">
    {/* Animated circular progress */}
    <svg className="w-full h-full">
      <defs>
        <linearGradient id="scoreGradient">
          <stop offset="0%" stopColor={getGradientStart(score)} />
          <stop offset="100%" stopColor={getGradientEnd(score)} />
        </linearGradient>
      </defs>
      <circle cx="48" cy="48" r="44" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="8" 
              fill="none"/>
      <circle cx="48" cy="48" r="44" 
              stroke="url(#scoreGradient)" 
              strokeWidth="8" 
              fill="none"
              strokeDasharray={`${2 * Math.PI * 44 * score / 100} ${2 * Math.PI * 44}`}
              transform="rotate(-90 48 48)"
              className="animate-draw-circle"/>
    </svg>
    
    {/* Animated counting number */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <AnimatedNumber 
        value={score} 
        className="text-3xl font-bold text-white"
        duration={1500}
      />
      <div className="text-xs text-gray-400 uppercase tracking-wider">Index™</div>
    </div>
  </div>
  
  {/* Tier label with tooltip */}
  <div className="mt-2 text-center">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className={`text-sm font-semibold text-${getTierColor(score)}`}>
            {getTierEmoji(score)} {getTierLabel(score)}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Predicted ROI: {getPredictedROI(score)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
  
  {/* Trust signal */}
  <button className="mt-1 text-xs text-gray-400 hover:text-white transition-colors">
    Why this score? →
  </button>
</div>
2. Onboarding Flow (NEW)
Progressive Onboarding Screens
tsx// Screen 1: Value Proposition
<OnboardingScreen step={1}>
  <div className="text-center max-w-2xl mx-auto">
    <AnimatedLogo />
    <h1 className="text-4xl font-bold text-white mb-4">
      Stop Wasting $25k/Year on Bad Ads
    </h1>
    <p className="text-xl text-gray-300 mb-8">
      Find creators who actually drive sales, not just likes
    </p>
    <div className="flex gap-4 justify-center">
      <button className="btn-primary">
        Start Free →
      </button>
      <button className="btn-ghost">
        Watch 2-min Demo
      </button>
    </div>
  </div>
</OnboardingScreen>

// Screen 2: Business Personalization
<OnboardingScreen step={2}>
  <div className="max-w-lg mx-auto">
    <h2 className="text-2xl font-bold text-white mb-6">
      Tell us about your business
    </h2>
    <div className="space-y-4">
      <input 
        placeholder="Business name" 
        className="input-primary"
      />
      <select className="input-primary">
        <option>Select your category</option>
        <option>Beauty & Personal Care</option>
        <option>Health & Wellness</option>
        {/* ... */}
      </select>
      <input 
        placeholder="Your best-selling product" 
        className="input-primary"
      />
      <button className="btn-primary w-full">
        Continue →
      </button>
    </div>
  </div>
</OnboardingScreen>

// Screen 3: Demo Search
<OnboardingScreen step={3}>
  <div className="text-center">
    <h2 className="text-2xl font-bold text-white mb-4">
      Try a Demo Search
    </h2>
    <p className="text-gray-300 mb-6">
      See how Spreesy finds money-printing creators
    </p>
    <DemoSearchAnimation />
    <button className="btn-primary mt-6">
      Try With Your Product →
    </button>
  </div>
</OnboardingScreen>
3. Empty States (NEW)
First-Time User Empty State
tsx<div className="empty-state-first-time p-12 text-center">
  <div className="w-32 h-32 mx-auto mb-6">
    <AnimatedIllustration type="rocket" />
  </div>
  <h2 className="text-3xl font-bold text-white mb-3">
    Find Your First Money-Printing Creator
  </h2>
  <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
    Start with your best-selling product and we'll find creators 
    with audiences ready to buy
  </p>
  <div className="flex gap-4 justify-center">
    <button className="btn-primary btn-lg">
      Start Smart Search →
    </button>
    <button className="btn-ghost">
      Watch 2-min Demo
    </button>
  </div>
  
  {/* Trust signals */}
  <div className="mt-12 flex justify-center gap-8 text-sm text-gray-400">
    <span>✓ 3M+ creators analyzed</span>
    <span>✓ 5:1 average ROI</span>
    <span>✓ No credit card required</span>
  </div>
</div>
4. Enhanced Creator Card with Trust Signals
tsx<div className="creator-card group">
  {/* Trust badge */}
  <div className="absolute top-3 left-3">
    <VerifiedDataBadge source="CreatorDB" />
  </div>
  
  {/* Header */}
  <div className="flex items-start gap-3 mb-4">
    <img className="w-12 h-12 rounded-full" src={avatar} />
    <div className="flex-1">
      <h3 className="font-semibold text-white">{name}</h3>
      <p className="text-sm text-gray-400">@{handle}</p>
      {/* Response rate prediction */}
      <div className="flex items-center gap-1 mt-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs text-green-400">
          85% likely to respond
        </span>
      </div>
    </div>
    <PlatformIcon platform={platform} />
  </div>
  
  {/* Enhanced Spreesy Score with breakdown */}
  <div className="spreesy-score-section">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-gray-400">Match Score</span>
      <SpreesyIndexMini score={score} />
    </div>
    
    {/* Score breakdown preview */}
    <div className="grid grid-cols-4 gap-1 mb-3">
      <ScoreBar label="Intent" value={breakdowns.intent} />
      <ScoreBar label="Fit" value={breakdowns.fit} />
      <ScoreBar label="Access" value={breakdowns.access} />
      <ScoreBar label="Platform" value={breakdowns.platform} />
    </div>
    
    {/* Success indicators */}
    <div className="flex flex-wrap gap-2 text-xs">
      <Badge variant="success">✓ Does Reviews</Badge>
      <Badge variant="success">✓ Your Audience</Badge>
      <Badge variant="info">Avg Deal: $2-5k</Badge>
    </div>
  </div>
  
  {/* Stats Grid */}
  <div className="grid grid-cols-3 gap-2 text-sm my-4">
    <Stat label="Followers" value={formatNumber(followers)} />
    <Stat label="Engagement" value={`${engagement}%`} />
    <Stat label="Est. Sales" value={`${estSales}/mo`} />
  </div>
  
  {/* Actions with upgrade prompt */}
  <div className="flex gap-2">
    {isPaid ? (
      <button className="btn-primary flex-1">
        Get Contact Info
      </button>
    ) : (
      <button className="btn-upgrade flex-1">
        🔒 Unlock Contact
      </button>
    )}
    <button className="btn-icon">
      <BookmarkIcon />
    </button>
    <button className="btn-icon">
      <CompareIcon />
    </button>
  </div>
</div>
5. Simplified Search Flow (NEW)
tsx<div className="smart-search-container">
  {/* Single smart input */}
  <div className="relative">
    <input
      placeholder="Describe your product or paste Amazon ASIN..."
      className="input-primary input-lg pr-32"
      value={searchQuery}
      onChange={handleSmartSearch}
    />
    
    {/* Auto-suggestions */}
    {suggestions && (
      <div className="absolute top-full mt-2 w-full bg-dark-surface rounded-lg border border-gray-700 p-4">
        <div className="text-sm text-gray-400 mb-2">We detected:</div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Category:</span>
            <Badge>{detectedCategory}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Price Range:</span>
            <Badge>{detectedPriceRange}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Target Audience:</span>
            <Badge>{detectedAudience}</Badge>
          </div>
        </div>
        <button className="btn-primary w-full mt-4">
          Find Matching Creators →
        </button>
      </div>
    )}
    
    {/* Search button */}
    <button className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary">
      Smart Search
    </button>
  </div>
</div>
6. Loading States (NEW)
tsx// Skeleton loader for creator cards
<div className="creator-card-skeleton animate-pulse">
  <div className="flex items-start gap-3 mb-4">
    <div className="w-12 h-12 bg-gray-700 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-700 rounded w-1/2" />
    </div>
  </div>
  <div className="h-20 bg-gray-700 rounded mb-4" />
  <div className="grid grid-cols-3 gap-2">
    <div className="h-12 bg-gray-700 rounded" />
    <div className="h-12 bg-gray-700 rounded" />
    <div className="h-12 bg-gray-700 rounded" />
  </div>
</div>

// Progressive results loading
<div className="results-loading">
  <div className="text-center py-8">
    <LoadingSpinner />
    <p className="text-white mt-4">Analyzing 3M+ creators...</p>
    <p className="text-gray-400 text-sm mt-2">
      Finding ones with high purchase intent...
    </p>
  </div>
</div>
7. Mobile Experience (Enhanced)
Swipeable Creator Cards
tsx<SwipeableViews onChangeIndex={handleSwipe}>
  {creators.map(creator => (
    <MobileCreatorCard key={creator.id}>
      {/* Swipe hints */}
      <div className="swipe-hints">
        <span className="hint-left">← Skip</span>
        <span className="hint-right">Save →</span>
      </div>
      
      {/* Simplified mobile layout */}
      <div className="p-4">
        <CreatorHeader compact />
        <SpreesyScoreMobile score={creator.score} />
        <QuickStats />
        
        {/* Thumb-zone optimized actions */}
        <div className="fixed bottom-20 left-4 right-4 flex gap-3">
          <button className="btn-primary flex-1 py-4">
            Get Contact
          </button>
          <button className="btn-secondary py-4 px-6">
            <BookmarkIcon />
          </button>
        </div>
      </div>
    </MobileCreatorCard>
  ))}
</SwipeableViews>
Bottom Sheet Filters
tsx<BottomSheet
  isOpen={showFilters}
  onClose={() => setShowFilters(false)}
  snapPoints={[0.5, 0.9]}
>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Filters</h3>
    
    {/* Quick filter chips */}
    <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
      <FilterChip active>75+ Score</FilterChip>
      <FilterChip>YouTube</FilterChip>
      <FilterChip>100k+ Followers</FilterChip>
      <FilterChip>High Response</FilterChip>
    </div>
    
    {/* Detailed filters */}
    <FilterSection title="Platforms" options={platforms} />
    <FilterSection title="Score Range" type="slider" />
    <FilterSection title="Audience Size" type="range" />
    
    {/* Apply button */}
    <button className="btn-primary w-full mt-6">
      Show {resultCount} Creators
    </button>
  </div>
</BottomSheet>
8. Success Celebrations (NEW)
tsx// First high-score match celebration
{score >= 90 && isFirstHighScore && (
  <ConfettiExplosion />
  <div className="celebration-modal">
    <h2 className="text-2xl font-bold text-white mb-2">
      🎉 Money Printer Found!
    </h2>
    <p className="text-gray-300 mb-4">
      This creator has a {score} match score - 
      predicted {getPredictedROI(score)} ROI
    </p>
    <button className="btn-primary">
      Get Their Contact Info →
    </button>
  </div>
)}
9. Comparison Mode (NEW)
tsx<div className="comparison-view grid grid-cols-2 lg:grid-cols-3 gap-4">
  {selectedCreators.map(creator => (
    <ComparisonCard key={creator.id}>
      <CreatorHeader />
      
      {/* Side-by-side metrics */}
      <div className="space-y-3">
        <ComparisonMetric 
          label="Match Score"
          value={creator.score}
          highlight={creator.score === maxScore}
        />
        <ComparisonMetric 
          label="Followers"
          value={creator.followers}
          format="number"
        />
        <ComparisonMetric 
          label="Engagement"
          value={creator.engagement}
          format="percent"
        />
        <ComparisonMetric 
          label="Response Rate"
          value={creator.responseRate}
          format="percent"
        />
        <ComparisonMetric 
          label="Avg Deal Size"
          value={creator.avgDeal}
          format="currency"
        />
      </div>
      
      {/* Winner badge */}
      {creator.score === maxScore && (
        <Badge variant="success" className="mt-3">
          Best Match
        </Badge>
      )}
    </ComparisonCard>
  ))}
</div>

Accessibility Implementation
Focus Management
css/* Clear focus indicators */
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Skip navigation */
.skip-nav {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-nav:focus {
  top: 0;
}
Screen Reader Support
tsx// Announce score changes
<div role="status" aria-live="polite" aria-atomic="true">
  <span className="sr-only">
    Spreesy Index Score: {score} out of 100.
    Performance tier: {getTierLabel(score)}.
    Predicted return on investment: {getPredictedROI(score)}.
  </span>
</div>

// Accessible buttons
<button 
  aria-label={`View details for ${creator.name}, Score ${creator.score}`}
  aria-describedby={`creator-${creator.id}-description`}
>
  View Details
</button>
Keyboard Navigation
tsx// Keyboard shortcuts
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === '/') {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
    if (e.key === 'Escape') {
      closeAllModals();
    }
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);

Conversion Optimization Features
Upgrade Triggers
tsx// Strategic upgrade prompts
<div className="upgrade-trigger">
  {!isPaid && (
    <>
      {/* On high-score creator */}
      {creator.score >= 75 && (
        <div className="upgrade-prompt-inline">
          <LockIcon className="w-4 h-4" />
          <span>Unlock contact info to reach this high-performer</span>
          <button className="btn-sm btn-primary ml-2">
            Upgrade for $49/mo
          </button>
        </div>
      )}
      
      {/* Usage limit warning */}
      {searchesRemaining <= 2 && (
        <div className="usage-warning">
          <span className="text-orange-400">
            {searchesRemaining} searches remaining
          </span>
          <button className="btn-link">Go unlimited →</button>
        </div>
      )}
    </>
  )}
</div>
Value Realization Moments
tsx// Highlight value when found
{firstHighScoreFound && (
  <div className="value-realization-banner">
    <div className="flex items-center gap-3">
      <SparklesIcon className="w-6 h-6 text-yellow-400" />
      <div>
        <p className="font-semibold text-white">
          You just found a creator worth $10-20k in sales!
        </p>
        <p className="text-sm text-gray-300">
          Based on similar partnerships, this match could generate 
          {predictedRevenue} in the next 90 days
        </p>
      </div>
      <button className="btn-primary">
        Get Contact Info →
      </button>
    </div>
  </div>
)}

Performance Optimizations
Code Splitting
tsx// Lazy load heavy components
const CreatorDetailsModal = lazy(() => import('./CreatorDetailsModal'));
const ComparisonView = lazy(() => import('./ComparisonView'));
const ExportModal = lazy(() => import('./ExportModal'));

// Suspense boundaries
<Suspense fallback={<LoadingSpinner />}>
  <CreatorDetailsModal />
</Suspense>
Image Optimization
tsx// Progressive image loading
<img
  src={creator.thumbnail}
  srcSet={`
    ${creator.thumbnail}?w=100 100w,
    ${creator.thumbnail}?w=200 200w,
    ${creator.thumbnail}?w=400 400w
  `}
  sizes="(max-width: 768px) 100px, 200px"
  loading="lazy"
  alt={creator.name}
/>
Caching Strategy
tsx// Service worker for offline access
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Cache saved creators for offline viewing
const CACHE_NAME = 'spreesy-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/bundle.js',
  '/saved-creators'
];

Implementation Roadmap
Phase 1: Foundation (Week 1)

 Set up Next.js with Tailwind
 Implement color system and typography
 Create Spreesy Index™ component with animations
 Build responsive navigation
 Set up Clerk authentication

Phase 2: Onboarding & Activation (Week 2)

 Progressive onboarding flow
 Demo mode implementation
 First-time empty states
 Smart search with auto-detection
 Value proposition animations

Phase 3: Core Features (Week 3-4)

 Creator cards with trust signals
 Search results with filters
 Loading states and skeletons
 Score breakdown tooltips
 Response rate predictions

Phase 4: Mobile & Accessibility (Week 5)

 Swipeable card interface
 Bottom sheet filters
 Thumb-zone optimization
 Screen reader support
 Keyboard navigation

Phase 5: Conversion Features (Week 6)

 Comparison mode
 Upgrade triggers
 Usage visualization
 Success celebrations
 Value realization moments

Phase 6: Polish & Performance (Week 7-8)

 Micro-animations
 Code splitting
 Image optimization
 Service worker
 E2E testing with Playwright


Success Metrics & Tracking
Activation Funnel
typescript// Track key events
const trackingEvents = {
  ONBOARDING_START: 'onboarding_started',
  ONBOARDING_COMPLETE: 'onboarding_completed',
  FIRST_SEARCH: 'first_search_performed',
  FIRST_HIGH_SCORE: 'first_high_score_found',
  FIRST_SAVE: 'first_creator_saved',
  FIRST_CONTACT: 'first_contact_unlocked',
  UPGRADE_CLICKED: 'upgrade_button_clicked',
  UPGRADE_COMPLETE: 'subscription_started'
};

// Conversion goals
const conversionGoals = {
  signupToSearch: 0.80,      // 80% perform first search
  searchToSave: 0.40,        // 40% save a creator
  saveToContact: 0.30,       // 30% unlock contact
  freeToTrial: 0.25,         // 25% start trial
  trialToPaid: 0.70          // 70% convert from trial
};

Design Tokens for Development
javascript// tailwind.config.js - Complete v4.0 configuration
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          dark: '#E55A2B',
          light: '#FF8A5B',
          glow: 'rgba(255, 107, 53, 0.15)'
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
          light: '#A78BFA'
        },
        dark: {
          DEFAULT: '#0A0E27',
          light: '#141829',
          surface: '#1A1F3A'
        },
        tier: {
          'money-printer': '#10B981',
          'high-performer': '#3B82F6',
          'solid-bet': '#F59E0B',
          'test-learn': '#8B5CF6',
          'skip': '#EF4444'
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'draw-circle': 'drawCircle 1.5s ease-out',
        'count-up': 'countUp 1.5s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'confetti': 'confetti 3s ease-out'
      },
      keyframes: {
        drawCircle: {
          '0%': { strokeDasharray: '0 283' },
          '100%': { strokeDasharray: 'var(--dash-array)' }
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }
    }
  }
}

Notes for Solo Developer
MVP Priority Stack

Demo Mode First - Hook users immediately
Onboarding Flow - Critical for activation
Smart Search - Simplify discovery
Trust Signals - Build confidence
Mobile Swipe - 40% of users

Quick Wins

Add "Why this score?" everywhere
Implement score count-up animation
Show response rate predictions
Add comparison mode
Create success celebrations

Development Tips

Start with mock data to perfect UX
Use Radix UI for accessible components
Implement Playwright tests early
Use PostHog for analytics
Deploy to Vercel for easy previews
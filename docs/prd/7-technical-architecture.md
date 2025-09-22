# 7. Technical Architecture
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
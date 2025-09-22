# 4. Requirements
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

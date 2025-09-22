import { defineSchema, defineTable } from "convex/schema";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    createdAt: v.number()
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),
  creators: defineTable({
    externalId: v.string(),
    platform: v.string(),
    overallScore: v.number()
  })
    .index("by_external_id", ["externalId"])
    .index("by_platform", ["platform"])
});

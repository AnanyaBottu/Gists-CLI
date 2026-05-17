import {defineTable,defineSchema} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    gists: defineTable({
        user: v.string(),
        fileName:v.string(),
        language:v.string(),
        content:v.string(),
        createdAt:v.number(),
    }).index("by_user", ["user"])
});

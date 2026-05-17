import { mutation,query } from "./_generated/server";
import { v } from "convex/values";

export const createGist = mutation({
  args: {
    user: v.string(),
    fileName:v.string(),
    language:v.string(),
    content: v.string(),
    createdAt:v.number(),
  },

  handler: async (ctx, args) => {
    const id = await ctx.db.insert("gists", {
      user: args.user,
      fileName: args.fileName,
      language: args.language,
      content: args.content,
      createdAt: args.createdAt,
    });

    return id;
  },
});

export const updateGist=mutation({
    args:{
        id: v.id("gists"),
        fileName: v.optional(v.string()),
        language: v.optional(v.string()),
        content: v.optional(v.string()),
    },
    handler: async (ctx,args)=>{
        const update=await ctx.db.patch(args.id,{
            fileName: args.fileName,
            language: args.language,
            content: args.content,
        })
        return args.id;
    }
});

export const deleteGist=mutation({
    args:{
        id: v.id("gists"),
    },
    handler: async (ctx,args)=>{
        const update=await ctx.db.delete(args.id);
        return args.id; 
    },
    
});
export const getAllGists = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("gists").order("desc").collect();
  },
});

export const getGistsById=query({
    args:{
        id:v.id("gists"),
    },
    handler: async (ctx,args)=>{
        return await ctx.db.get(args.id);
    }
})
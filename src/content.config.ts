import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const games = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/games" }),
  schema: z.object({
    name: z.string(),
    accent: z.string(),
    status: z.enum(["live", "development", "planned"]),
    order: z.number(),
    description: z.string(),
    tierModes: z
      .array(
        z.object({
          slug: z.string(),
          name: z.string(),
        }),
      )
      .optional(),
    tierNotes: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
        }),
      )
      .optional(),
  }),
});

const characters = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/characters" }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    tag: z.string().optional(),
    affiliation: z.string().optional(),
    unitNo: z.string().optional(),
    rarity: z.number().optional(),
    bio: z.string().optional(),
    portrait: z.string().optional(),
    sprite: z.string().optional(),
    kitPending: z.boolean().optional(),
    tiers: z.record(z.string(), z.enum(["S+", "S", "A", "B", "C"])).optional(),
    stats: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    skills: z
      .array(
        z.object({
          name: z.string(),
          jp: z.string().optional(),
          type: z.string().optional(),
          desc: z.string(),
          value: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = { games, characters };

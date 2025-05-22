import {z} from "zod"

import { tempnote } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const tempnoteRouter = createTRPCRouter({
  create: publicProcedure
  .input(
    z.object({
      accessCode: z.string().length(6, "Access code must be 6 characters").toLowerCase(),
      content: z.string().max(8192, "Content must be 8192 characters or less"),
    })
  )
  .mutation(async ({ input }) => {
    const now = new Date();

    // Check if a note with that access code exists
    const [existing] = await db
      .select()
      .from(tempnote)
      .where(eq(tempnote.accessCode, input.accessCode))
      .limit(1);

    if (existing && new Date(existing.expiresAt) > now) {
      // Note is still valid — reject
      throw new Error("Access code not available");
    }

    // If expired or doesn't exist, overwrite or insert new
    // Use upsert or delete+insert (Drizzle doesn’t support true upsert yet)
    if (existing) {
      // Delete old expired note
      await db
        .delete(tempnote)
        .where(eq(tempnote.accessCode, input.accessCode));
    }

    const [note] = await db
      .insert(tempnote)
      .values({
        accessCode: input.accessCode,
        content: input.content,
      })
      .returning();

    return note;
    }),
    checkCode: publicProcedure
      .input(z.object({
        accessCode: z.string().toLowerCase()
      }))
      .query(async ({ ctx, input }) => {
        const now = new Date();
        const [note] = await db.select().from(tempnote).where(eq(tempnote.accessCode, input.accessCode)).limit(1);
        if (note && new Date(note.expiresAt) > now) {
          // Note is still valid — reject
          throw new Error("Access code not available");
        }
        return note ?? null;
      }),
    retrieveNote: publicProcedure
      .input(z.object({
        accessCode: z.string().toLowerCase()
      }))
      .query(async ({ ctx, input }) => {
        const [note] = await db.select().from(tempnote).where(eq(tempnote.accessCode, input.accessCode)).limit(1);
        return note ?? null;
      })
});

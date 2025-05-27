import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { note } from "@/server/db/schema";
import { sql,eq, desc, and, lt } from "drizzle-orm";
import { z } from "zod";


export const noteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().max(256, "Title must be 256 characters or less"),
        content: z
          .string()
          .max(8192, "Content must be 8192 characters or less"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [temp] = await db
        .insert(note)
        .values({
          title: input.title,
          content: input.content,
          ownerId: ctx.userId,
        })
        .returning();
      return temp;
    }),
  modify: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().max(256, "Title must be 256 characters or less"),
        content: z
          .string()
          .max(8192, "Content must be 8192 characters or less"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [temp] = await db
        .update(note)
        .set({
          title: input.title,
          content: input.content,
        })
        .where(eq(note.id, input.id))
        .returning();
      return temp;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const [temp] = await db
        .delete(note)
        .where(eq(note.id, input.id))
        .returning();
      return temp;
    }),
  retrieveAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional().default(10),
        cursor: z.string().nullish(), // this is an ISO timestamp
      }),
    )
    .query(async ({ ctx, input }) => {
      const notes = await db
        .select({ title: note.title, id: note.id, updatedAt: note.updatedAt, contentPreview: sql<string>`SUBSTRING(${note.content}, 1, 64)`.as("contentPreview") })
        .from(note)
        .where(
            and(
              eq(note.ownerId, ctx.userId),
              input.cursor ? lt(note.updatedAt, new Date(input.cursor)) : undefined
            )
          )
          .orderBy(desc(note.updatedAt))
          .limit(input.limit + 1); // fetch one extra to check for next page
          const nextCursor = notes.length > input.limit ? notes[input.limit - 1]?.updatedAt?.toISOString() : null;

          return {
            notes: notes.slice(0, input.limit),
            nextCursor,
          };
    }),
  getNoteById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await db
        .select()
        .from(note)
        .where(and(eq(note.ownerId, ctx.userId), eq(note.id, input.id)))
        .limit(1);

      return result[0] ?? null;
    }),
});

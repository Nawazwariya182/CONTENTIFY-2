import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const imageGen = pgTable('image_gen', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    prompt: text('prompt').notNull(),
    style: varchar('style', { length: 255 }).notNull(),
    imageUrls: text('image_urls').notNull(),
    creditUsed: integer('credit_used').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});
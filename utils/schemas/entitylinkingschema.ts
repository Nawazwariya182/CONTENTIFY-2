import { pgTable, serial, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";

export const entityLinking = pgTable('entity_history', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    inputText: text('input_text').notNull(),
    entities: jsonb('entities').notNull(),
    entityLinks: jsonb('entity_links').notNull(),
    entityType: varchar('entity_type', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});
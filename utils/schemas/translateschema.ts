import { pgTable, serial, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";

export const translate = pgTable('translation_history', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    sourceText: text('source_text').notNull(),
    sourceLanguage: varchar('source_language', { length: 10 }).notNull(),
    translations: jsonb('translations').notNull(),
    tone: varchar('tone', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

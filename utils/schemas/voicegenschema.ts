import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const voiceGen = pgTable('voice_gen', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    featureName: varchar('feature_name', { length: 255 }).notNull().default('voice'),
    prompt: text('prompt').notNull(),
    output: text('output').notNull(),
    tone: varchar('tone', { length: 50 }).notNull(),
    outputLength: varchar('output_length', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});
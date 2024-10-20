import { pgTable, serial, text, varchar, timestamp, date } from "drizzle-orm/pg-core";

// ... (keep your existing aioutput table definition)

export const usageReset = pgTable('usage_reset', {
  id: serial('id').primaryKey(),
  userEmail: varchar('user_email', { length: 255 }).notNull().unique(),
  lastResetDate: date('last_reset_date').notNull(),
});
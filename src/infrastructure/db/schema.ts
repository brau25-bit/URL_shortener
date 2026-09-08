import { timestamp } from 'drizzle-orm/cockroach-core';
import {integer, pgTable, time, uuid, varchar} from 'drizzle-orm/pg-core';

export const urlTable = pgTable("url", {
    id: uuid().primaryKey().defaultRandom(),
    originalUrl: varchar({length: 255}).notNull(),
    shortCode: varchar({length: 255}).notNull(),
    createdAt: timestamp("createdAt").defaultNow()
})
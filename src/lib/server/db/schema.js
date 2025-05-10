import { pgTable, serial, text, boolean, integer, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	username: text('username').notNull().unique(),
	password: text('password').notNull()
});

export const submission = pgTable('submission', {
	id: serial('id').primaryKey(),
	username: text('username').notNull(),
	imageUrl: text('image_url').notNull(),
	itchy: boolean('itchy').notNull(),
	redness: boolean('redness').notNull(),
	swelling: boolean('swelling').notNull(),
	pain: integer('pain').notNull(), // nu en skala
	dryness: boolean('dryness').notNull(),
	scaling: boolean('scaling').notNull(),
	assessment: text('assessment'),
	createdAt: timestamp('created_at').defaultNow()
});

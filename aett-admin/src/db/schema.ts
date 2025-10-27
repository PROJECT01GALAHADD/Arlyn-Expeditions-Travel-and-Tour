import { pgTable, text, integer, boolean, timestamp, uuid, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const tourOperators = pgTable("tour_operators", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tours = pgTable("tours", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  time: text("time").notNull(),
  rate: decimal("rate", { precision: 10, scale: 2 }).notNull(),
  type: text("type").notNull(),
  destinations: text("destinations").notNull(),
  inclusions: text("inclusions").notNull(),
  imageUrl: text("image_url"),
  images: text("images").array(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const expeditions = pgTable("expeditions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  difficulty: text("difficulty").notNull(),
  rate: decimal("rate", { precision: 10, scale: 2 }).notNull(),
  maxParticipants: integer("max_participants").notNull(),
  inclusions: text("inclusions").notNull(),
  imageUrl: text("image_url"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  tourId: uuid("tour_id"),
  expeditionId: uuid("expedition_id"),
  bookingType: text("booking_type").notNull(),
  date: text("date").notNull(),
  guests: integer("guests").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").notNull(),
  senderType: text("sender_type").notNull(),
  senderName: text("sender_name").notNull(),
  message: text("message").notNull(),
  operatorId: uuid("operator_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: text("id").primaryKey(),
  guestName: text("guest_name"),
  guestEmail: text("guest_email"),
  status: text("status").notNull().default("active"),
  lastMessageAt: timestamp("last_message_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tourOperatorsRelations = relations(tourOperators, ({ many }) => ({
  chatMessages: many(chatMessages),
}));

export const toursRelations = relations(tours, ({ many }) => ({
  bookings: many(bookings),
}));

export const expeditionsRelations = relations(expeditions, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  tour: one(tours, {
    fields: [bookings.tourId],
    references: [tours.id],
  }),
  expedition: one(expeditions, {
    fields: [bookings.expeditionId],
    references: [expeditions.id],
  }),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  operator: one(tourOperators, {
    fields: [chatMessages.operatorId],
    references: [tourOperators.id],
  }),
  session: one(chatSessions, {
    fields: [chatMessages.sessionId],
    references: [chatSessions.id],
  }),
}));

export const chatSessionsRelations = relations(chatSessions, ({ many }) => ({
  messages: many(chatMessages),
}));

export const insertTourOperatorSchema = createInsertSchema(tourOperators).omit({ 
  id: true, 
  createdAt: true 
});
export const selectTourOperatorSchema = createSelectSchema(tourOperators);

export const insertTourSchema = createInsertSchema(tours).omit({ 
  id: true, 
  createdAt: true 
});
export const selectTourSchema = createSelectSchema(tours);

export const insertExpeditionSchema = createInsertSchema(expeditions).omit({ 
  id: true, 
  createdAt: true 
});
export const selectExpeditionSchema = createSelectSchema(expeditions);

export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true, 
  createdAt: true,
  status: true
});
export const selectBookingSchema = createSelectSchema(bookings);

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ 
  id: true, 
  createdAt: true 
});
export const selectChatMessageSchema = createSelectSchema(chatMessages);

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({ 
  createdAt: true,
  lastMessageAt: true,
  status: true
});
export const selectChatSessionSchema = createSelectSchema(chatSessions);

export type TourOperator = typeof tourOperators.$inferSelect;
export type InsertTourOperator = z.infer<typeof insertTourOperatorSchema>;

export type Tour = typeof tours.$inferSelect;
export type InsertTour = z.infer<typeof insertTourSchema>;

export type Expedition = typeof expeditions.$inferSelect;
export type InsertExpedition = z.infer<typeof insertExpeditionSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;

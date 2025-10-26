import { db } from "./db";
import { eq, desc, and, or } from "drizzle-orm";
import {
  tours,
  expeditions,
  bookings,
  tourOperators,
  chatMessages,
  chatSessions,
  type Tour,
  type InsertTour,
  type Expedition,
  type InsertExpedition,
  type Booking,
  type InsertBooking,
  type TourOperator,
  type InsertTourOperator,
  type ChatMessage,
  type InsertChatMessage,
  type ChatSession,
  type InsertChatSession,
} from "@shared/schema";
import bcrypt from "bcryptjs";

export interface IStorage {
  getAllTours(): Promise<Tour[]>;
  getTourById(id: string): Promise<Tour | undefined>;
  createTour(tour: InsertTour): Promise<Tour>;
  
  getAllExpeditions(): Promise<Expedition[]>;
  getExpeditionById(id: string): Promise<Expedition | undefined>;
  createExpedition(expedition: InsertExpedition): Promise<Expedition>;
  
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | undefined>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  
  createTourOperator(operator: InsertTourOperator): Promise<TourOperator>;
  getTourOperatorByUsername(username: string): Promise<TourOperator | undefined>;
  verifyOperatorPassword(username: string, password: string): Promise<boolean>;
  
  getChatSessionById(id: string): Promise<ChatSession | undefined>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getAllChatSessions(): Promise<ChatSession[]>;
  updateChatSession(id: string, updates: Partial<ChatSession>): Promise<ChatSession | undefined>;
  
  getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class DatabaseStorage implements IStorage {
  async getAllTours(): Promise<Tour[]> {
    return await db.select().from(tours).orderBy(desc(tours.featured), tours.name);
  }

  async getTourById(id: string): Promise<Tour | undefined> {
    const [tour] = await db.select().from(tours).where(eq(tours.id, id));
    return tour || undefined;
  }

  async createTour(insertTour: InsertTour): Promise<Tour> {
    const [tour] = await db.insert(tours).values(insertTour).returning();
    return tour;
  }

  async getAllExpeditions(): Promise<Expedition[]> {
    return await db.select().from(expeditions).orderBy(desc(expeditions.featured), expeditions.name);
  }

  async getExpeditionById(id: string): Promise<Expedition | undefined> {
    const [expedition] = await db.select().from(expeditions).where(eq(expeditions.id, id));
    return expedition || undefined;
  }

  async createExpedition(insertExpedition: InsertExpedition): Promise<Expedition> {
    const [expedition] = await db.insert(expeditions).values(insertExpedition).returning();
    return expedition;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBookingById(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  async createTourOperator(insertOperator: InsertTourOperator): Promise<TourOperator> {
    const hashedPassword = await bcrypt.hash(insertOperator.password, 10);
    const [operator] = await db
      .insert(tourOperators)
      .values({ ...insertOperator, password: hashedPassword })
      .returning();
    return operator;
  }

  async getTourOperatorByUsername(username: string): Promise<TourOperator | undefined> {
    const [operator] = await db
      .select()
      .from(tourOperators)
      .where(eq(tourOperators.username, username));
    return operator || undefined;
  }

  async verifyOperatorPassword(username: string, password: string): Promise<boolean> {
    const operator = await this.getTourOperatorByUsername(username);
    if (!operator) return false;
    return await bcrypt.compare(password, operator.password);
  }

  async getChatSessionById(id: string): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, id));
    return session || undefined;
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const [session] = await db.insert(chatSessions).values(insertSession).returning();
    return session;
  }

  async getAllChatSessions(): Promise<ChatSession[]> {
    return await db.select().from(chatSessions).orderBy(desc(chatSessions.lastMessageAt));
  }

  async updateChatSession(id: string, updates: Partial<ChatSession>): Promise<ChatSession | undefined> {
    const [session] = await db
      .update(chatSessions)
      .set(updates)
      .where(eq(chatSessions.id, id))
      .returning();
    return session || undefined;
  }

  async getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(insertMessage).returning();
    
    await db
      .update(chatSessions)
      .set({ lastMessageAt: new Date() })
      .where(eq(chatSessions.id, insertMessage.sessionId));
    
    return message;
  }
}

export const storage = new DatabaseStorage();

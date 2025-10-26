import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { 
  loginSchema, 
  bookingFormSchema, 
  insertChatMessageSchema,
  insertChatSessionSchema 
} from "@shared/schema";
import session from "express-session";
import { randomUUID } from "crypto";

declare module "express-session" {
  interface SessionData {
    operatorId?: string;
    operatorUsername?: string;
  }
}

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.operatorId) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "arlyn-expeditions-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const isValid = await storage.verifyOperatorPassword(
        validatedData.username,
        validatedData.password
      );

      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const operator = await storage.getTourOperatorByUsername(validatedData.username);
      if (!operator) {
        return res.status(401).json({ error: "Operator not found" });
      }

      req.session.operatorId = operator.id;
      req.session.operatorUsername = operator.username;

      res.json({
        success: true,
        operator: {
          id: operator.id,
          username: operator.username,
          name: operator.name,
          email: operator.email,
        },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid login data" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.operatorId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const operator = await storage.getTourOperatorByUsername(
      req.session.operatorUsername || ""
    );

    if (!operator) {
      return res.status(404).json({ error: "Operator not found" });
    }

    res.json({
      id: operator.id,
      username: operator.username,
      name: operator.name,
      email: operator.email,
    });
  });

  app.get("/api/tours", async (_req, res) => {
    try {
      const tours = await storage.getAllTours();
      res.json(tours);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tours" });
    }
  });

  app.get("/api/tours/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const tour = await storage.getTourById(id);

      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }

      res.json(tour);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tour" });
    }
  });

  app.get("/api/expeditions", async (_req, res) => {
    try {
      const expeditions = await storage.getAllExpeditions();
      res.json(expeditions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch expeditions" });
    }
  });

  app.get("/api/expeditions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const expedition = await storage.getExpeditionById(id);

      if (!expedition) {
        return res.status(404).json({ error: "Expedition not found" });
      }

      res.json(expedition);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch expedition" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = bookingFormSchema.parse(req.body);
      
      const bookingData: any = {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        bookingType: validatedData.bookingType,
        date: validatedData.date,
        guests: validatedData.guests,
        message: validatedData.message,
      };

      if (validatedData.bookingType === "tour" && validatedData.tourId) {
        bookingData.tourId = validatedData.tourId;
      } else if (validatedData.bookingType === "expedition" && validatedData.expeditionId) {
        bookingData.expeditionId = validatedData.expeditionId;
      }

      const booking = await storage.createBooking(bookingData);

      res.status(201).json({ booking });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid booking data" });
    }
  });

  app.get("/api/bookings", isAuthenticated, async (_req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.patch("/api/bookings/:id/status", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const booking = await storage.updateBookingStatus(id, status);

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to update booking status" });
    }
  });

  app.get("/api/chat/sessions", isAuthenticated, async (_req, res) => {
    try {
      const sessions = await storage.getAllChatSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat sessions" });
    }
  });

  app.get("/api/chat/sessions/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await storage.getChatMessagesBySession(id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/chat/sessions", async (req, res) => {
    try {
      const sessionId = randomUUID();
      const sessionData = insertChatSessionSchema.parse({
        id: sessionId,
        guestName: req.body.guestName,
        guestEmail: req.body.guestEmail,
      });

      const session = await storage.createChatSession(sessionData);
      res.status(201).json(session);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create chat session" });
    }
  });

  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      
      broadcastMessage(validatedData.sessionId, message);
      
      res.status(201).json(message);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to send message" });
    }
  });

  const httpServer = createServer(app);

  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  const clients = new Map<string, Set<WebSocket>>();

  function broadcastMessage(sessionId: string, message: any) {
    const sessionClients = clients.get(sessionId);
    if (sessionClients) {
      const messageStr = JSON.stringify(message);
      sessionClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageStr);
        }
      });
    }
  }

  wss.on("connection", (ws: WebSocket, req) => {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const sessionId = url.searchParams.get("sessionId");

    if (!sessionId) {
      ws.close();
      return;
    }

    if (!clients.has(sessionId)) {
      clients.set(sessionId, new Set());
    }
    clients.get(sessionId)!.add(ws);

    ws.on("close", () => {
      const sessionClients = clients.get(sessionId);
      if (sessionClients) {
        sessionClients.delete(ws);
        if (sessionClients.size === 0) {
          clients.delete(sessionId);
        }
      }
    });
  });

  return httpServer;
}

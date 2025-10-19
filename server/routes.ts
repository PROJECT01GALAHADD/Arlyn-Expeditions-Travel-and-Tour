import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema, adminLoginSchema, bookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = bookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      const tour = await storage.getTourById(validatedData.tourId);
      const whatsappMessage = storage.formatBookingForWhatsApp(validatedData, tour);
      
      res.status(201).json({
        booking,
        whatsappMessage,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid booking data" });
    }
  });

  app.get("/api/posts", async (_req, res) => {
    try {
      const posts = await storage.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:type", async (req, res) => {
    try {
      const { type } = req.params;
      if (!["news", "promo", "update"].includes(type)) {
        return res.status(400).json({ error: "Invalid post type" });
      }
      const posts = await storage.getPostsByType(type as "news" | "promo" | "update");
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const newPost = await storage.createPost(validatedData);
      res.status(201).json(newPost);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid post data" });
    }
  });

  app.put("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPostSchema.partial().parse(req.body);
      const updatedPost = await storage.updatePost(id, validatedData);
      
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json(updatedPost);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid post data" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deletePost(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const validatedData = adminLoginSchema.parse(req.body);
      const isValid = storage.verifyAdminPassword(validatedData.password);
      
      if (!isValid) {
        return res.status(401).json({ error: "Invalid password" });
      }
      
      res.json({ success: true, message: "Login successful" });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Invalid login data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

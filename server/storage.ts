import { type Post, type InsertPost, type Tour, type Booking } from "@shared/schema";
import { randomUUID } from "crypto";
import * as fs from "fs/promises";
import * as path from "path";

export interface IStorage {
  getAllPosts(): Promise<Post[]>;
  getPostById(id: string): Promise<Post | undefined>;
  getPostsByType(type: "news" | "promo" | "update"): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: string): Promise<boolean>;
  verifyAdminPassword(password: string): boolean;
  
  getAllTours(): Promise<Tour[]>;
  getTourById(id: string): Promise<Tour | undefined>;
  
  createBooking(booking: Booking): Promise<Booking & { id: string; createdAt: string }>;
  formatBookingForWhatsApp(booking: Booking, tour: Tour | undefined): string;
}

export class MemStorage implements IStorage {
  private posts: Map<string, Post>;
  private tours: Map<string, Tour>;
  private postsFilePath: string;
  private adminPassword = "admin123";

  constructor() {
    this.posts = new Map();
    this.tours = new Map();
    this.postsFilePath = path.join(process.cwd(), "data", "posts.json");
    this.loadPosts();
    this.initializeTours();
  }

  private async loadPosts() {
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });
      
      const data = await fs.readFile(this.postsFilePath, "utf-8");
      const posts: Post[] = JSON.parse(data);
      posts.forEach((post) => this.posts.set(post.id, post));
    } catch (error) {
      this.posts = new Map();
    }
  }

  private async savePosts() {
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });
      
      const posts = Array.from(this.posts.values());
      await fs.writeFile(this.postsFilePath, JSON.stringify(posts, null, 2));
    } catch (error) {
      console.error("Error saving posts:", error);
    }
  }

  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPostById(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPostsByType(type: "news" | "promo" | "update"): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter((post) => post.type === type)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const post: Post = { ...insertPost, id, createdAt };
    this.posts.set(id, post);
    await this.savePosts();
    return post;
  }

  async updatePost(id: string, updateData: Partial<InsertPost>): Promise<Post | undefined> {
    const existingPost = this.posts.get(id);
    if (!existingPost) {
      return undefined;
    }
    
    const updatedPost: Post = { ...existingPost, ...updateData };
    this.posts.set(id, updatedPost);
    await this.savePosts();
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    const deleted = this.posts.delete(id);
    if (deleted) {
      await this.savePosts();
    }
    return deleted;
  }

  verifyAdminPassword(password: string): boolean {
    return password === this.adminPassword;
  }

  private initializeTours() {
    const tours: Tour[] = [
      {
        id: "coron-ultimate",
        name: "Coron Ultimate Tour",
        slug: "coron-ultimate",
        description: "Discover the most iconic destinations of Coron in this comprehensive full-day tour. Visit pristine lagoons, snorkel in crystal-clear waters, and witness breathtaking limestone formations.",
        shortDescription: "Experience the best of Coron in one incredible day",
        price: 2500,
        duration: "8-9 hours",
        maxGuests: 15,
        images: ["twin-lagoon.png", "underwater-coral.png", "island-hopping.png"],
        inclusions: [
          "Hotel pickup and drop-off",
          "Licensed tour guide",
          "Lunch and snacks",
          "Snorkeling equipment",
          "Environmental fees",
          "Life jackets",
        ],
        highlights: [
          "Twin Lagoon kayaking",
          "Skeleton Wreck snorkeling",
          "CYC Beach lunch",
          "Sunset at Coral Garden",
        ],
        featured: true,
      },
      {
        id: "kayangan-lake",
        name: "Kayangan Lake Tour",
        slug: "kayangan-lake",
        description: "Kayangan Lake is consistently rated as one of the cleanest lakes in Asia. Climb to the iconic viewpoint and swim in the crystal-clear waters surrounded by dramatic limestone cliffs.",
        shortDescription: "Visit the cleanest lake in the Philippines",
        price: 2000,
        duration: "4-5 hours",
        maxGuests: 20,
        images: ["kayangan-lake.png", "twin-lagoon.png"],
        inclusions: [
          "Round-trip boat transfer",
          "Tour guide",
          "Entrance fees",
          "Snorkeling gear",
          "Safety equipment",
        ],
        highlights: [
          "Iconic viewpoint photo op",
          "Swimming in crystal waters",
          "Limestone cave exploration",
          "Hidden lagoon visit",
        ],
        featured: true,
      },
      {
        id: "calauit-safari",
        name: "Calauit Safari Adventure",
        slug: "calauit-safari",
        description: "Experience a unique combination of African safari and tropical island paradise. Meet giraffes, zebras, and other exotic wildlife in their natural island habitat.",
        shortDescription: "Wildlife sanctuary meets tropical paradise",
        price: 3500,
        duration: "Full day",
        maxGuests: 12,
        images: ["calauit-safari.png", "kayangan-lake.png"],
        inclusions: [
          "Private boat transfer",
          "Safari guide",
          "Lunch",
          "Park entrance fees",
          "Wildlife feeding experience",
          "Photography assistance",
        ],
        highlights: [
          "Giraffe and zebra encounters",
          "Beach picnic lunch",
          "Bird watching",
          "Sunset island cruise",
        ],
        featured: true,
      },
      {
        id: "private-charter",
        name: "Private Island Charter",
        slug: "private-charter",
        description: "Charter your own private boat and create a personalized itinerary. Perfect for families, groups, or special occasions. Visit the destinations you want at your own pace.",
        shortDescription: "Customize your perfect island adventure",
        price: 15000,
        duration: "Flexible (8-10 hours)",
        maxGuests: 10,
        images: ["private-charter.png", "underwater-coral.png"],
        inclusions: [
          "Private luxury boat",
          "Dedicated crew and guide",
          "Customizable itinerary",
          "Lunch and refreshments",
          "Snorkeling equipment",
          "All entrance fees",
          "Photography service",
        ],
        highlights: [
          "Flexible schedule",
          "Exclusive destinations",
          "VIP treatment",
          "Perfect for celebrations",
        ],
        featured: true,
      },
    ];

    tours.forEach((tour) => this.tours.set(tour.id, tour));
  }

  async getAllTours(): Promise<Tour[]> {
    return Array.from(this.tours.values());
  }

  async getTourById(id: string): Promise<Tour | undefined> {
    return this.tours.get(id);
  }

  async createBooking(booking: Booking): Promise<Booking & { id: string; createdAt: string }> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const bookingWithMeta = { ...booking, id, createdAt };
    
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });
      
      const bookingsFilePath = path.join(dataDir, "bookings.json");
      let bookings: any[] = [];
      
      try {
        const data = await fs.readFile(bookingsFilePath, "utf-8");
        bookings = JSON.parse(data);
      } catch {
        bookings = [];
      }
      
      bookings.push(bookingWithMeta);
      await fs.writeFile(bookingsFilePath, JSON.stringify(bookings, null, 2));
    } catch (error) {
      console.error("Error saving booking:", error);
    }
    
    return bookingWithMeta;
  }

  formatBookingForWhatsApp(booking: Booking, tour: Tour | undefined): string {
    const totalPrice = tour ? tour.price * booking.guests : 0;
    
    return `🏝️ *New Tour Booking Request*

📋 *Booking Details:*
• Name: ${booking.name}
• Email: ${booking.email}
• Phone: ${booking.phone}

🚢 *Tour Information:*
• Tour: ${booking.tourName}
• Date: ${booking.date}
• Number of Guests: ${booking.guests}

💬 *Message:*
${booking.message || "No additional message"}

Total Estimate: ₱${totalPrice.toLocaleString()}`;
  }
}

export const storage = new MemStorage();

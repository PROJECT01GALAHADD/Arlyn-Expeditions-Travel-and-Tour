import { z } from "zod";

// Tour schema
export const tourSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  price: z.number(),
  duration: z.string(),
  maxGuests: z.number(),
  images: z.array(z.string()),
  inclusions: z.array(z.string()),
  highlights: z.array(z.string()),
  featured: z.boolean(),
});

export type Tour = z.infer<typeof tourSchema>;

// Booking schema
export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  tourId: z.string().min(1, "Please select a tour"),
  tourName: z.string(),
  date: z.string().min(1, "Please select a date"),
  guests: z.number().min(1, "At least 1 guest required").max(50, "Maximum 50 guests"),
  message: z.string().optional(),
});

export type Booking = z.infer<typeof bookingSchema>;

// CMS Post schema
export const postSchema = z.object({
  id: z.string(),
  type: z.enum(["news", "promo", "update"]),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().optional(),
  publishDate: z.string(),
  createdAt: z.string(),
  published: z.boolean(),
});

export const insertPostSchema = postSchema.omit({ id: true, createdAt: true });

export type Post = z.infer<typeof postSchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;

// Admin auth schema
export const adminLoginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export type AdminLogin = z.infer<typeof adminLoginSchema>;

// Gallery item schema
export const galleryItemSchema = z.object({
  id: z.string(),
  url: z.string(),
  type: z.enum(["image", "video"]),
  category: z.enum(["all", "islands", "underwater", "wildlife", "culture"]),
  caption: z.string().optional(),
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;

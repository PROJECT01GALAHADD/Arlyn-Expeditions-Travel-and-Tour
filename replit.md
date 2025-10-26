# Arlyn Expedition Travel and Tour Services

## Project Overview
A full-stack tour booking web application for Arlyn Expedition Travel and Tour Services, a tour operator based in Barangay Poblacion 5, Coron, Palawan. Features PostgreSQL database with real tour data loaded from CSV files, tour operator authentication, and separate Tours and Expeditions offerings.

## Current Status
**All Phases Complete:**
- PostgreSQL database with Drizzle ORM configured
- CSV parsing implemented to load 15 real tours
- Tour operator authentication system with dashboard
- Tours and Expeditions pages with database integration
- Image carousel/slider for tour detail views
- Booking system with operator management

## Tech Stack
- **Frontend:** React + TypeScript, Vite, TailwindCSS, Wouter (routing)
- **Backend:** Express.js, Node.js
- **Database:** PostgreSQL (Replit built-in, portable to Vercel/Firebase)
- **ORM:** Drizzle ORM
- **State Management:** TanStack Query (React Query v5)
- **UI Components:** Shadcn UI + Radix UI
- **Forms:** React Hook Form + Zod validation
- **Authentication:** Express sessions with bcrypt

## Features

### Public-Facing Pages
1. **Home Page**
   - Hero section with Coron islands background
   - Featured tours and expeditions
   - Why Choose section
   - Call-to-action sections

2. **About Page**
   - Company story and mission
   - Team information
   - Core values

3. **Tours Page**
   - Dynamic tour cards loaded from database (15 real tours from CSV)
   - Modal detail view with **image carousel/slider**
   - Tours with multiple images display navigation arrows on hover
   - Pricing, duration, destinations, and inclusions
   - Direct booking integration

4. **Expeditions Page**
   - Separate expedition offerings (5 expeditions)
   - Detail modals with expedition information
   - Booking integration

5. **Booking Page**
   - Tour/expedition selection
   - Guest information form
   - Date and guest count selection
   - Direct submission to operator dashboard

6. **Contact Page**
   - Contact information
   - Google Maps integration
   - Social media links

### Operator Dashboard (`/admin`)
7. **Operator Login & Dashboard**
   - Authentication system (username: operator, password: operator123)
   - View and manage all bookings
   - Filter by status (pending/confirmed/cancelled)
   - Real-time booking notifications

### Global Components
- **Navigation:** Responsive navigation with Tours and Expeditions links
- **Footer:** Company info, quick links, social media
- **ChatboxWidget:** Basic structure for future live chat (WebSocket ready)

## Design System

### Color Palette
- **Primary (Tropical Turquoise):** `hsl(180 85% 45%)` - CTAs, links, active states
- **Deep Ocean:** `hsl(195 100% 25%)` - Headers, navigation, footer
- **Card:** `hsl(40 45% 98%)` - Card backgrounds
- **Sunset Coral:** `hsl(15 85% 65%)` - Price badges, special offers
- **Palm Green:** `hsl(140 60% 45%)` - Success states

### Typography
- **Font Family:** Poppins (400, 600, 700, 800)
- **Headlines:** Bold weights for impact
- **Body Text:** Regular weight for readability

## Database Schema

### Tour Operators
- id (UUID), username, password (bcrypt hashed)
- name, email, phone
- isActive, createdAt

### Tours (from CSV)
- id (UUID), name, time, rate, type
- destinations (semicolon-separated)
- inclusions (comma-separated)
- imageUrl (single image)
- **images (array)** - Multiple images for carousel
- featured, createdAt

### Expeditions
- id (UUID), name, description, duration
- difficulty, rate, maxParticipants
- inclusions, imageUrl, featured, createdAt

### Bookings
- id (UUID), name, email, phone
- tourId OR expeditionId, bookingType
- date, guests, message
- status (pending/confirmed/cancelled)
- createdAt

### Chat System (Infrastructure Ready)
- chatMessages: sessionId, senderType, senderName, message, operatorId
- chatSessions: guestName, guestEmail, status, lastMessageAt

## Image Carousel Feature
Tours can have multiple images stored in the `images` array column. When viewing tour details:
- Single image: Displays normally
- Multiple images: Shows carousel with:
  - Previous/Next arrow buttons (visible on hover)
  - Dot indicators at bottom
  - Click to navigate between images
  - Arrows have semi-transparent black background

**Example:** Calauit Safari Tour has 3 images featuring wildlife scenes.

## Data Sources

### CSV Tour Data
Location: `attached_assets/Pasted-Tour-Name-Time-Rate-PAX-Type-Destinations-Activities-Inclusions-Coron-Island-Tour-A-8AM-5PM--1761459291930_1761459291931.txt`

15 Tours loaded:
1. Coron Island Tour A (₱1,200)
2. Coron Island Tour B (₱1,400)
3. Coron Ultimate Tour (₱1,600)
4. Super Ultimate Tour (₱1,800)
5. Island Escapade Tour (₱2,500)
6. Island Escapade Beach Tour C-1 (₱1,600)
7. **Calauit Safari Tour (₱2,800)** - Has 3 safari wildlife images
8. Reef & Wrecks Tour (₱1,600)
9. Coron Town Tour (₱900)
10. Dugong Tours (₱5,500)
11. Pukaway Cave Tour (₱1,800)
12. Pukaway Cave Tour Private (₱2,500)
13. Firefly Watching Tour (₱900)
14. Firefly Watching Tour Private (₱1,500)

## Project Structure
```
client/src/
├── components/
│   ├── ui/ (Shadcn components)
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ChatboxWidget.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Tours.tsx (with image carousel)
│   ├── Expeditions.tsx
│   ├── Gallery.tsx
│   ├── Booking.tsx
│   ├── Contact.tsx
│   └── Admin.tsx (operator dashboard)
└── App.tsx

server/
├── db.ts (Drizzle database connection)
├── storage.ts (Database operations)
├── routes.ts (API endpoints)
├── seed.ts (CSV parsing & data seeding)
└── index.ts (Express server)

shared/
└── schema.ts (Drizzle schemas, Zod validation)
```

## API Endpoints

### Tours & Expeditions
- `GET /api/tours` - Fetch all tours
- `GET /api/expeditions` - Fetch all expeditions

### Bookings
- `GET /api/bookings` - Fetch all bookings (operator only)
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id` - Update booking status

### Authentication
- `POST /api/auth/login` - Operator login
- `POST /api/auth/logout` - Operator logout
- `GET /api/auth/check` - Check auth status

## Routes
- `/` - Home page
- `/about` - About page
- `/tours` - Tours listing with carousel modals
- `/expeditions` - Expeditions listing
- `/gallery` - Photo gallery
- `/booking` - Booking form
- `/contact` - Contact information
- `/admin` - Operator dashboard (protected)

## Database Setup & Seeding

### Initial Setup
```bash
npm run db:push        # Push schema to database
npx tsx server/seed.ts # Seed with CSV data + operator account
```

### Default Credentials
- **Username:** operator
- **Password:** operator123

### CSV Parsing
The seed script automatically:
1. Reads the CSV file from attached_assets
2. Parses tour data with proper quote handling
3. Inserts tours into database
4. Creates default operator account
5. Seeds 5 expedition offerings

## External Integrations
- **WhatsApp Business:** Click-to-chat booking links
- **Google Maps:** Embedded location map
- **Social Media:** Facebook, Instagram, TikTok links

## Database Portability
The application uses:
- Drizzle ORM (database-agnostic)
- Standard PostgreSQL features
- No Neon-specific features
- Easy migration to Vercel Postgres, Supabase, or Firebase

To migrate:
1. Export data from Replit database
2. Update DATABASE_URL to new provider
3. Run `npm run db:push`
4. Import data

## Development Notes
- Mobile-first responsive design
- All interactive elements have data-testid attributes
- TypeScript for type safety
- React Query for data fetching/caching
- Accessible forms with Zod validation
- Session-based authentication
- WebSocket infrastructure ready for live chat

## Future Enhancements
- Live chat between guests and operators (WebSocket infrastructure ready)
- Real-time booking notifications
- Email confirmations
- Payment integration
- Multi-language support
- Advanced booking analytics

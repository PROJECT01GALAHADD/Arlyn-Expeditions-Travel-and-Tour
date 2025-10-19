# Arlyn Expedition Travel and Tour Services

## Project Overview
A bold, mobile-responsive web application for Arlyn Expedition Travel and Tour Services, a tour operator based in Barangay Poblacion 5, Coron, Palawan. The website showcases tropical island tours with a stunning turquoise and sand color palette using Poppins ExtraBold typography.

## Current Status
**Phase 1 (Completed):** Schema & Frontend - All data models defined, tropical images generated, design tokens configured, and all React components built with exceptional visual quality.

**Phase 2 (Completed):** Backend - API endpoints for CMS CRUD operations, admin authentication, and JSON file persistence implemented.

**Phase 3 (In Progress):** Integration complete with React Query mutations, loading states, and error handling. Ready for architect review and testing.

## Tech Stack
- **Frontend:** React + TypeScript, Vite, TailwindCSS, Wouter (routing)
- **Backend:** Express.js, Node.js
- **State Management:** TanStack Query (React Query v5)
- **UI Components:** Shadcn UI + Radix UI
- **Forms:** React Hook Form + Zod validation
- **Storage:** In-memory storage (MemStorage) with JSON persistence for CMS

## Features

### Public-Facing Pages
1. **Home Page**
   - Full-viewport hero section with aerial Coron islands background
   - Tagline: "Explore Paradise with Arlyn Expedition"
   - "Book Now" and "Contact Us" CTAs
   - Why Choose section with 4 feature cards
   - Featured tours grid (3 cards)
   - Call-to-action section

2. **About Page**
   - Company story and mission
   - Team photo with local guide description
   - Core values cards (4): Passion, Excellence, Local Expertise, Safety
   - Meet Our Team section

3. **Tours Page**
   - 4 dynamic tour cards in responsive grid
   - Tours: Coron Ultimate, Kayangan Lake, Calauit Safari, Private Charter
   - Modal detail view with image carousel
   - Pricing, duration, max guests, inclusions, and highlights
   - WhatsApp booking button per tour

4. **Gallery Page**
   - Masonry grid layout (3 columns desktop, 2 tablet, 1 mobile)
   - Filter tabs: All, Islands, Underwater, Wildlife, Culture
   - Lightbox modal with navigation arrows
   - 9 high-quality tropical images

5. **Booking Page**
   - Two-column layout (form + booking summary)
   - Form fields: Name, Email, Phone, Tour selection, Date picker, Guest counter, Message
   - Real-time booking summary with tour image and total calculation
   - WhatsApp integration for booking submission

6. **Contact Page**
   - Contact information cards: Location, Phone, Email, Business Hours
   - Google Maps embed (Coron, Palawan)
   - Social media links (Facebook, Instagram, TikTok)
   - WhatsApp quick contact button

### Admin/CMS Panel
7. **Admin Dashboard** (`/admin`)
   - Password-protected (password: "admin123")
   - Tabs for News, Promos, and Tour Updates
   - Create, edit, delete posts
   - Publish/draft status toggle
   - Post cards with date, title, content preview

### Global Components
- **Navigation:** Sticky header with transparent-to-solid on scroll, mobile hamburger menu
- **Footer:** 3-column layout with company info, quick links, newsletter signup, social icons
- **Chatbox Widget:** Floating button with WhatsApp and Facebook Messenger options

## Design System

### Color Palette
- **Primary (Tropical Turquoise):** `hsl(180 85% 45%)` - CTAs, links, active states
- **Deep Ocean:** `hsl(195 100% 25%)` - Headers, navigation, footer backgrounds
- **Background:** `hsl(0 0% 100%)` - Main background
- **Card:** `hsl(40 45% 98%)` - Card backgrounds (warm sand tint)
- **Sunset Coral:** `hsl(15 85% 65%)` - Price badges, special offers
- **Palm Green:** `hsl(140 60% 45%)` - Success states, featured badges

### Typography
- **Font Family:** Poppins (400, 600, 700, 800)
- **Hero Headlines:** ExtraBold (800), 4xl-7xl responsive
- **Section Titles:** Bold (700), 3xl-5xl responsive
- **Body Text:** Regular (400), base-lg
- **Buttons:** SemiBold (600), uppercase tracking-wide

### Spacing & Layout
- Container: `max-w-7xl` with `px-4 md:px-8`
- Section padding: `py-16 md:py-24`
- Card gaps: `gap-8`
- Component spacing: `space-y-12`

## Data Schemas

### Tour
- id, name, slug, description, shortDescription
- price, duration, maxGuests
- images[], inclusions[], highlights[]
- featured boolean

### Booking
- name, email, phone
- tourId, tourName, date, guests
- message (optional)

### Post (CMS)
- id, type (news/promo/update), title, content
- imageUrl (optional), publishDate, createdAt
- published boolean

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/ (Shadcn components)
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ChatboxWidget.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Tours.tsx
│   │   ├── Gallery.tsx
│   │   ├── Booking.tsx
│   │   ├── Contact.tsx
│   │   └── Admin.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
└── ...

server/
├── routes.ts (API endpoints - to be implemented)
├── storage.ts (Data persistence - to be implemented)
└── ...

shared/
└── schema.ts (Zod schemas and TypeScript types)

attached_assets/
└── generated_images/ (10 tropical Coron images)
```

## Generated Images
1. Twin_Lagoon_kayaking_Coron_ccdecb05.png - Coron Ultimate tour
2. Kayangan_Lake_viewpoint_Coron_0b301942.png - Kayangan Lake tour
3. Calauit_Safari_giraffes_Palawan_9fdfd4c3.png - Calauit Safari tour
4. Private_charter_luxury_boat_bc9c5781.png - Private Charter tour
5. Coron_islands_aerial_hero_f326fa4c.png - Hero background
6. Tour_guide_team_photo_24fded9b.png - About page team photo
7. Underwater_coral_reef_Coron_03a15194.png - Gallery/underwater
8. Tropical_beach_paradise_Coron_75782f58.png - Gallery/islands
9. Island_hopping_boats_lagoon_5613b853.png - Gallery/culture
10. Coron_sunset_landscape_aec98c50.png - Gallery/islands

## Routes
- `/` - Home page
- `/about` - About page
- `/tours` - Tours listing and details
- `/gallery` - Photo gallery
- `/booking` - Booking form
- `/contact` - Contact information
- `/admin` - CMS admin panel (password-protected)

## API Endpoints (To Be Implemented)
- `GET /api/posts` - Fetch all CMS posts
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/admin/login` - Admin authentication

## External Integrations
- **WhatsApp Business:** Click-to-chat links with pre-filled messages
- **Facebook Messenger:** Embedded chat widget
- **Google Maps:** Embedded map for Coron, Palawan location
- **Social Media:** Links to Facebook, Instagram, TikTok

## SEO Implementation
- Title: "Arlyn Expedition | Explore Coron, Palawan"
- Meta description with keywords
- Open Graph tags for social sharing
- Poppins font preload optimization
- Lazy loading for images

## Next Steps
1. **Backend Implementation:** Create API endpoints for CMS CRUD operations
2. **Admin Authentication:** Implement password check and session management
3. **JSON Storage:** Persist posts to JSON file
4. **Integration:** Connect frontend to backend with React Query
5. **Testing:** End-to-end testing of all user journeys

## Development Notes
- Design follows universal design guidelines with tropical theme
- All interactive elements have proper data-testid attributes
- Mobile-first responsive design
- Accessible forms with proper labels and error messages
- Optimized for performance with lazy loading and image optimization

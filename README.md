# Arlyn Expedition Travel and Tour Services

A modern, full-stack tour booking web application for Arlyn Expedition Travel and Tour Services, proudly serving travelers in Coron, Palawan, Philippines.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)

## 🌴 Overview

Arlyn Expeditions is a production-ready Next.js application that makes island tour booking seamless and engaging. Built with modern web technologies, it offers a fast, SEO-optimized, and mobile-first experience for travelers exploring the stunning islands of Coron, Palawan.

**Live Features:**
- 🏝️ Browse 15+ real tour packages loaded from database
- 🚀 Separate Expeditions showcase for adventure seekers  
- 📸 Interactive image carousels with navigation arrows
- 📅 Direct booking system with operator dashboard
- 🔐 Secure operator authentication for booking management
- 📱 Fully responsive design optimized for mobile
- ⚡ Lightning-fast page loads with Next.js App Router
- 🎨 Beautiful UI with shadcn/ui components

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + shadcn/ui
- **UI Components:** Radix UI primitives
- **Forms:** React Hook Form + Zod validation
- **State Management:** React Query (TanStack Query v5)

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes + Server Actions
- **Authentication:** NextAuth.js with credentials provider
- **Database:** PostgreSQL (Neon/Vercel Postgres compatible)
- **ORM:** Drizzle ORM
- **Session Storage:** Database-backed sessions

### Developer Experience
- **Package Manager:** pnpm
- **Type Safety:** Full TypeScript coverage
- **Code Quality:** ESLint + Prettier
- **Deployment:** Vercel-ready (or Replit)

## 📋 Features

### For Travelers

#### Tours & Expeditions
- **15 Island Tours** loaded from CSV data including:
  - Coron Island Tour A & B
  - Coron Ultimate Tour
  - Calauit Safari Tour (with wildlife photo gallery)
  - Firefly Watching Tours
  - Dugong Snorkeling Tours
  - And more!
  
- **5 Premium Expeditions:**
  - Multi-Day Island Expedition
  - Mount Tapyas Sunrise Trek
  - Coron Bay Kayaking
  - WWII Wreck Diving
  - Tribal Village Cultural Immersion

#### Interactive Features
- **Image Galleries:** Tour details show multiple images with carousel navigation
- **Price Display:** Clear pricing in Philippine Pesos (₱)
- **Tour Information:** Duration, destinations, inclusions, and highlights
- **Mobile Optimized:** Smooth scrolling and touch-friendly navigation

#### Booking System
- Simple booking form with guest information
- Date selection and guest count
- Tour/Expedition selection
- Message field for special requests
- Direct submission to operator dashboard

### For Tour Operators

#### Operator Dashboard (`/admin`)
- Secure login (username: `operator`, password: `operator123`)
- View all bookings in real-time
- Filter by status (pending/confirmed/cancelled)
- Update booking statuses
- Manage customer information
- Session-based authentication

### Public Pages
- **Home:** Hero section with featured tours
- **About:** Company story and mission
- **Tours:** Full tour catalog with modal details
- **Expeditions:** Adventure packages showcase
- **Booking:** Online booking form
- **Contact:** Location, hours, and contact info
- **Gallery:** Photo showcase (ready for expansion)

## 🗄️ Database Schema

### Core Tables

**Tours**
- Real data loaded from CSV file
- Fields: name, time, rate, type, destinations, inclusions
- Support for multiple images (carousel feature)
- Featured tour flagging

**Expeditions**
- Curated adventure packages
- Fields: name, description, duration, difficulty, rate, max participants
- Featured expedition showcase

**Bookings**
- Customer information (name, email, phone)
- Tour/Expedition reference
- Date and guest count
- Status tracking (pending/confirmed/cancelled)
- Timestamped creation

**Tour Operators**
- Secure authentication credentials (bcrypt hashed)
- Contact information
- Active status management

**Chat System** (Infrastructure Ready)
- Chat messages and sessions tables
- WebSocket support for future live chat feature

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- pnpm package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/arlyn-expeditions.git
cd arlyn-expeditions
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Set up the database**
```bash
# Push schema to database
pnpm db:push

# Seed with tour data and operator account
pnpm db:seed
```

5. **Run the development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
arlyn-expeditions/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   │   └── admin/           # Operator dashboard
│   ├── (public)/            # Public pages
│   │   ├── page.tsx         # Home page
│   │   ├── tours/           # Tours listing
│   │   ├── expeditions/     # Expeditions listing
│   │   ├── booking/         # Booking form
│   │   ├── about/           # About page
│   │   └── contact/         # Contact page
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   └── [...]/           # Other API routes
│   └── layout.tsx           # Root layout
│
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── navigation.tsx       # Site navigation
│   ├── footer.tsx           # Site footer
│   └── [...]/               # Other components
│
├── lib/                     # Utility functions
│   ├── db.ts                # Database connection
│   ├── auth.ts              # NextAuth configuration
│   └── [...]/               # Other utilities
│
├── db/                      # Database related
│   ├── schema.ts            # Drizzle schema
│   └── seed.ts              # Database seeding
│
├── public/                  # Static assets
│   └── images/              # Tour images
│
└── attached_assets/         # Uploaded tour photos
```

## 🎨 Design System

### Color Palette
- **Primary (Tropical Turquoise):** `hsl(180 85% 45%)` - CTAs, links, active states
- **Deep Ocean:** `hsl(195 100% 25%)` - Headers, navigation, footer
- **Card Background:** `hsl(40 45% 98%)` - Warm sand tint
- **Sunset Coral:** `hsl(15 85% 65%)` - Price badges, special offers
- **Palm Green:** `hsl(140 60% 45%)` - Success states

### Typography
- **Font:** Poppins (400, 600, 700, 800)
- **Headlines:** Bold weights for impact
- **Body:** Regular weight for readability

## 🔐 Authentication

The application uses NextAuth.js with a credentials provider for tour operator authentication.

**Default Credentials:**
- Username: `operator`
- Password: `operator123`

**Security Features:**
- bcrypt password hashing
- Session-based authentication
- Protected API routes
- Secure cookie management

## 📊 Data Management

### Tour Data Import
Tours are automatically loaded from CSV file during database seeding:
- Location: `attached_assets/tour-data.csv`
- Format: Name, Time, Rate, Type, Destinations, Inclusions
- 15 tours imported automatically

### Adding New Tours
1. Update the CSV file with new tour data
2. Run `pnpm db:seed` to import
3. Or add via database directly using Drizzle Studio

### Image Management
- Single tour images: `imageUrl` field
- Multiple images: `images` array field
- Carousel automatically displays when 2+ images present

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Connect your repository**
   - Push code to GitHub
   - Import project in Vercel dashboard

2. **Configure environment variables**
   - Add `DATABASE_URL`
   - Add `NEXTAUTH_SECRET`
   - Add `NEXTAUTH_URL`

3. **Deploy**
   - Vercel will automatically build and deploy
   - Database migrations run automatically

### Deploy to Replit

The application runs seamlessly on Replit with:
- Built-in PostgreSQL database support
- Automatic environment variable management
- One-click deployment

## 📱 Mobile Optimization

- **Responsive Design:** Mobile-first approach
- **Touch Optimized:** Smooth scrolling and gestures
- **Fast Loading:** Optimized images and code splitting
- **Progressive Enhancement:** Works on all devices

## 🔍 SEO Features

- **Meta Tags:** Dynamic title and description per page
- **Open Graph:** Social media preview cards
- **Structured Data:** Rich snippets for search engines
- **Image Optimization:** Next.js automatic image optimization
- **Fast Page Loads:** Excellent Core Web Vitals scores

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

**Arlyn Expedition Travel and Tour Services**
- **Location:** Barangay Poblacion 5, Coron, Palawan, Philippines
- **Email:** info@arlynexpeditions.com
- **Phone:** +63 912 345 6789
- **Facebook:** @ArlynExpeditions
- **Instagram:** @arlynexpeditions

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Hosted on [Vercel](https://vercel.com/)
- Database powered by [Neon](https://neon.tech/)

---

**Made with ❤️ for travelers exploring Coron, Palawan**

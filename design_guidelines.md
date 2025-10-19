# Arlyn Expedition Travel & Tour Services - Design Guidelines

## Design Approach: Reference-Based (Travel & Hospitality)
Drawing inspiration from **Airbnb** (trust and exploration) and **Booking.com** (clear service presentation) while maintaining a distinct tropical island adventure identity.

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- **Tropical Turquoise**: 180 85% 45% - Primary brand, CTAs, active states
- **Deep Ocean**: 195 100% 25% - Headers, navigation, footers
- **Pure White**: 0 0% 100% - Backgrounds, text on dark
- **Warm Sand**: 40 45% 85% - Secondary backgrounds, cards

**Accent & Supporting:**
- **Sunset Coral**: 15 85% 65% - Special offers, featured tags
- **Palm Green**: 140 60% 45% - Success states, available badges
- **Charcoal**: 0 0% 20% - Body text
- **Light Gray**: 0 0% 95% - Section dividers, borders

### B. Typography
**Primary Font**: Poppins (via Google Fonts CDN)
- **Hero Headlines**: ExtraBold (800), 48-72px desktop / 32-40px mobile
- **Section Titles**: Bold (700), 32-40px desktop / 24-28px mobile
- **Body Text**: Regular (400), 16-18px, line-height 1.6
- **Buttons/CTAs**: SemiBold (600), 16px uppercase tracking-wide

### C. Layout System
**Spacing Units**: Tailwind units of 4, 8, 12, 16, 20, 24, 32
- Container: max-w-7xl with px-4 md:px-8
- Section padding: py-16 md:py-24
- Card gaps: gap-8
- Component spacing: space-y-12

### D. Component Library

#### Navigation
- **Sticky header** with transparent-to-solid on scroll
- Logo left, navigation center, "Book Now" CTA right (turquoise button)
- Mobile: Hamburger menu with full-screen overlay (deep ocean background)
- Include: Home, About, Tours, Gallery, Booking, Contact

#### Hero Section (Home)
- **Full-viewport video background** (1920x1080 minimum) showing crystal-clear Coron waters, limestone cliffs, island hopping
- Dark overlay (opacity 40%) for text readability
- Center-aligned content:
  - Company name in ExtraBold, white, 56px
  - Tagline "Explore Paradise with Arlyn Expedition" in Regular, 20px
  - Two CTAs side-by-side: "Book Now" (solid turquoise) + "Contact Us" (outline white with backdrop-blur-sm)
- Scroll indicator at bottom

#### Tour Cards (Tours Page)
- **4-column grid** on desktop (lg:grid-cols-4), 2 on tablet, 1 on mobile
- Each card includes:
  - Large image (aspect-ratio-4/3) with hover zoom effect
  - Tour name (Bold, 20px)
  - Starting price badge (top-right corner, coral background)
  - Brief description (14px, 2-line clamp)
  - Key inclusions as icon list (3-4 items)
  - "View Details" button (outline turquoise)
- **Detail modal**: Full-screen overlay with image gallery carousel, complete inclusions list, pricing table, WhatsApp booking button

#### Gallery
- **Masonry grid layout** (3 columns desktop, 2 tablet, 1 mobile)
- Mix of images and video thumbnails
- Lightbox on click with navigation arrows
- Filter tabs: All, Islands, Underwater, Wildlife, Culture

#### Booking Form
- **Two-column layout** (form left, confirmation summary right on desktop)
- Form fields with floating labels, turquoise focus states
- Tour dropdown with thumbnail previews
- Date picker with calendar UI
- Guest counter with +/- buttons
- Large "Send Booking Request" button submits to WhatsApp with pre-formatted message

#### Admin/CMS Panel
- Simple login screen (centered card on sand background)
- Dashboard with three tabs: News, Promos, Tour Updates
- Post editor: Title, content (textarea), image upload, publish date
- Posts display as cards with edit/delete actions
- Clean, functional design - minimal decorative elements

#### Chatbox Widget
- **Floating button** (bottom-right, z-50)
- Turquoise circle with white message icon
- On click: Popup menu with WhatsApp and Messenger options
- Each option opens respective platform with pre-filled greeting

#### Footer
- **Three-column layout**: Company info + Quick Links + Connect
- Newsletter signup with inline form
- Social media icons (circular, hover lift effect)
- Bottom bar: Copyright, Privacy Policy, Terms
- Background: Deep ocean with white text

### E. Images

**Required Images:**
1. **Hero Video/Background**: Aerial drone footage of Coron islands, crystal waters - 15-30 seconds looping
2. **Tour Cards** (4 images):
   - Coron Ultimate: Twin Lagoon kayaking
   - Kayangan Lake: Iconic viewpoint
   - Calauit Safari: Giraffes with island backdrop
   - Private Charter: Luxury boat on turquoise water
3. **About Page**: Team photo on beach/boat (authentic, candid)
4. **Gallery**: Minimum 20 high-quality images across categories
5. **Background Patterns**: Subtle tropical leaf illustrations for section dividers

**Image Treatment:**
- Slight saturation boost for tropical vibrancy
- Rounded corners (rounded-xl) on all imagery
- Lazy loading for performance
- WebP format with JPG fallback

### F. Interactions & Animations

**Minimal but Impactful:**
- Navigation: Fade-in background on scroll
- Cards: Subtle hover lift (translateY -4px) with shadow increase
- Buttons: Scale 105% on hover
- Hero: Parallax scroll effect on video (optional)
- Page transitions: Smooth fade between routes
- **No excessive animations** - maintain professional, trustworthy feel

### G. Mobile Optimization

- Touch-friendly button sizes (minimum 44px height)
- Simplified navigation (hamburger menu)
- Stack all multi-column layouts to single column
- Larger tap targets for forms
- Sticky "Book Now" button at bottom on tour detail pages
- Optimized images (responsive srcset)

### H. SEO & Performance

- Hero video: Compressed, auto-play muted, poster image fallback
- Image optimization: Max 200KB per image
- Meta tags with tropical keywords
- Schema markup for tours (LocalBusiness, TouristAttraction)
- Lazy load below-fold content

**Key Principle**: Bold tropical aesthetics balanced with clean, trustworthy presentation that converts browsers into bookers. Every section earns its space by showcasing Coron's beauty or facilitating bookings.
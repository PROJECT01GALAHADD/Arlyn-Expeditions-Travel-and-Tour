import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-[hsl(195,100%,25%)] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h3 className="text-2xl font-extrabold mb-4">Arlyn Expedition</h3>
            <p className="text-white/90 mb-4 leading-relaxed">
              Your trusted partner for unforgettable island adventures in Coron, Palawan.
              Explore pristine lagoons, dramatic limestone cliffs, and hidden beaches.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Barangay Poblacion 5, Coron, Palawan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+63 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@arlynexpedition.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/90">
              <li>
                <a href="/" className="hover:text-primary transition-colors" data-testid="link-footer-home">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary transition-colors" data-testid="link-footer-about">
                  About Us
                </a>
              </li>
              <li>
                <a href="/tours" className="hover:text-primary transition-colors" data-testid="link-footer-tours">
                  Our Tours
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-primary transition-colors" data-testid="link-footer-gallery">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/booking" className="hover:text-primary transition-colors" data-testid="link-footer-booking">
                  Book Now
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors" data-testid="link-footer-contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center"
                data-testid="link-facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center"
                data-testid="link-instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center"
                data-testid="link-tiktok"
                aria-label="TikTok"
              >
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>

            <h5 className="text-sm font-semibold mb-2">Newsletter</h5>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                variant="secondary"
                data-testid="button-newsletter-submit"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80">
            <p>&copy; {new Date().getFullYear()} Arlyn Expedition. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

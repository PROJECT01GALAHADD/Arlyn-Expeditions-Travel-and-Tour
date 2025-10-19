import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/tours", label: "Tours" },
    { path: "/gallery", label: "Gallery" },
    { path: "/booking", label: "Booking" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" data-testid="link-home-logo">
              <div className="cursor-pointer">
                <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
                  isScrolled ? "text-primary" : "text-white drop-shadow-lg"
                }`}>
                  Arlyn Expedition
                </h1>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <span
                    data-testid={`link-${link.label.toLowerCase()}`}
                    className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
                      location === link.path
                        ? "text-primary"
                        : isScrolled
                        ? "text-foreground hover:text-primary"
                        : "text-white hover:text-primary drop-shadow-md"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Link href="/booking">
                <Button
                  data-testid="button-book-now-header"
                  className="font-semibold tracking-wide uppercase"
                >
                  Book Now
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
              data-testid="button-mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[hsl(195,100%,25%)]">
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  className={`text-2xl font-bold tracking-wide transition-colors cursor-pointer ${
                    location === link.path ? "text-primary" : "text-white hover:text-primary"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Button
              onClick={() => window.location.href = "/booking"}
              data-testid="button-mobile-book-now"
              size="lg"
              className="font-semibold tracking-wide uppercase mt-4"
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

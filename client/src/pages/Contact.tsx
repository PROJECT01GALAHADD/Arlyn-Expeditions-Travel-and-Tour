import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { SiTiktok, SiWhatsapp } from "react-icons/si";

export default function Contact() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'd like to inquire about your tours.");
    window.open(`https://wa.me/639954948681?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            data-testid="text-contact-title"
          >
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Get in touch with us and let's plan your perfect Coron adventure
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <Card className="p-6 hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Our Location</h3>
                      <p className="text-muted-foreground">
                        Real St., National Highway<br />
                        Barangay Poblacion 5<br />
                        In front of Cafe Socorro<br />
                        Coron, Palawan, Philippines
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+63 995 494 8681</p>
                      <Button
                        onClick={handleWhatsAppClick}
                        className="mt-3 gap-2"
                        data-testid="button-whatsapp-contact"
                      >
                        <SiWhatsapp className="w-5 h-5" />
                        Message on WhatsApp
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a
                        href="mailto:info@arlynexpedition.com"
                        className="text-primary hover:underline"
                        data-testid="link-email"
                      >
                        info@arlynexpedition.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Business Hours</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday - Sunday: 6:00 AM - 10:00 PM</p>
                        <p className="text-sm">We're available every day to serve you!</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/GoArlynExpeditionsCORON"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-colors"
                    data-testid="link-facebook-contact"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/arlynexpeditions_tours/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-colors"
                    data-testid="link-instagram-contact"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@arlynmartinico"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-colors"
                    data-testid="link-tiktok-contact"
                    aria-label="TikTok"
                  >
                    <SiTiktok className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Find Us</h2>
              <Card className="overflow-hidden h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.123!2d120.2!3d12.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAwJzAwLjAiTiAxMjDCsDEyJzAwLjAiRQ!5e0!3m2!1sen!2sph!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Arlyn Expeditions Travel and Tours Location"
                  data-testid="map-location"
                ></iframe>
              </Card>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Located in the heart of Coron town, easy to find and access
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have Questions? We're Here to Help!
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Whether you need help choosing a tour or have special requests, our team is ready to
            assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              variant="secondary"
              className="gap-2"
              data-testid="button-contact-whatsapp"
            >
              <SiWhatsapp className="w-5 h-5" />
              Chat on WhatsApp
            </Button>
            <a href="/booking">
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary" data-testid="button-contact-book-now">
                Book a Tour
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

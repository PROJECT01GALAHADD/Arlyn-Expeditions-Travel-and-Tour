import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with us to plan your perfect Coron adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="p-6 text-center hover-elevate">
              <div className="flex justify-center mb-4">
                <MapPin className="w-12 h-12 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">
                Barangay Poblacion 5<br />
                Coron, Palawan<br />
                Philippines
              </p>
            </Card>

            <Card className="p-6 text-center hover-elevate">
              <div className="flex justify-center mb-4">
                <Phone className="w-12 h-12 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground">
                +63 912 345 6789
              </p>
            </Card>

            <Card className="p-6 text-center hover-elevate">
              <div className="flex justify-center mb-4">
                <Mail className="w-12 h-12 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">
                info@arlynexpeditions.com
              </p>
            </Card>

            <Card className="p-6 text-center hover-elevate">
              <div className="flex justify-center mb-4">
                <Clock className="w-12 h-12 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Hours</h3>
              <p className="text-sm text-muted-foreground">
                Mon - Sun<br />
                7:00 AM - 8:00 PM
              </p>
            </Card>
          </div>

          <Card className="p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Us on Social Media</h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://facebook.com/arlynexpeditions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-4 rounded-full bg-primary/10"
              >
                <Facebook className="w-8 h-8 text-primary" />
              </a>
              <a
                href="https://instagram.com/arlynexpeditions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-4 rounded-full bg-primary/10"
              >
                <Instagram className="w-8 h-8 text-primary" />
              </a>
              <a
                href="https://tiktok.com/@arlynexpeditions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-4 rounded-full bg-primary/10"
              >
                <SiTiktok className="w-8 h-8 text-primary" />
              </a>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.8!2d120.2!3d11.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU0JzAwLjAiTiAxMjDCsDEyJzAwLjAiRQ!5e0!3m2!1sen!2sph!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Card>
        </div>
      </section>
    </div>
  );
}

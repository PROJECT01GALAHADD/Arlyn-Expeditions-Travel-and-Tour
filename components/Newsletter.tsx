"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for subscribing!",
      description: "We'll send you the latest updates and exclusive offers.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-card to-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Stay <span className="text-primary">Inspired</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Subscribe for exclusive travel deals, destination guides, and insider tips about Coron
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-full border-2 px-6"
                data-testid="input-newsletter"
              />
              <Button
                type="submit"
                size="lg"
                className="rounded-full px-6 shrink-0"
                data-testid="button-newsletter-submit"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </div>
    </section>
  );
}

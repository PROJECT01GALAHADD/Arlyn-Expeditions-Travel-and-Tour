import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { SiWhatsapp, SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";

export function ChatboxWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'd like to inquire about your tours in Coron.");
    window.open(`https://wa.me/63XXXXXXXXXX?text=${message}`, "_blank");
  };

  const handleMessengerClick = () => {
    window.open("https://m.me/YourPageUsername", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl p-4 w-64 mb-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-foreground">Chat with us</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-close-chat"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full justify-start gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white"
              data-testid="button-whatsapp"
            >
              <SiWhatsapp className="w-5 h-5" />
              WhatsApp
            </Button>
            <Button
              onClick={handleMessengerClick}
              className="w-full justify-start gap-3 bg-[#0084FF] hover:bg-[#0073E6] text-white"
              data-testid="button-messenger"
            >
              <SiFacebook className="w-5 h-5" />
              Messenger
            </Button>
          </div>
        </div>
      )}

      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-2xl"
        data-testid="button-chat-toggle"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}

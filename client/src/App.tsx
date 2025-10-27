import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ChatboxWidget } from "@/components/ChatboxWidget";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Tours from "@/pages/Tours";
import Expeditions from "@/pages/Expeditions";
import Gallery from "@/pages/Gallery";
import BookingPage from "@/pages/Booking";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/tours" component={Tours} />
      <Route path="/expeditions" component={Expeditions} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/booking" component={BookingPage} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Navigation />
        <Router />
        <Footer />
        <ChatboxWidget />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

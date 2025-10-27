import type { AppProps } from "next/app";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <TooltipProvider>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
        <Toaster />
      </TooltipProvider>
    </Providers>
  );
}


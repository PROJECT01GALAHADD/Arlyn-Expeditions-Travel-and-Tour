import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arlyn Expedition Travel and Tour Services | Coron, Palawan",
  description:
    "Discover the breathtaking beauty of Coron, Palawan with Arlyn Expedition. Book island tours, expeditions, and adventure packages. Professional guides, amazing destinations, unforgettable experiences.",
  keywords: [
    "Coron tours",
    "Palawan travel",
    "island hopping",
    "Kayangan Lake",
    "Calauit Safari",
    "Philippines tours",
  ],
  openGraph: {
    title: "Arlyn Expedition | Explore Coron, Palawan",
    description:
      "Book your dream island adventure in Coron, Palawan. Expert-guided tours to pristine beaches, lagoons, and wildlife sanctuaries.",
    type: "website",
  },
};

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

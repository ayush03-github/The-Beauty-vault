import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://the-beauty-vault.vercel.app"),
  title: {
    default: "The Beauty Vault | Highly Effective Body Care",
    template: "%s | The Beauty Vault"
  },
  description: "A combination of nature and advanced technology. Vegan, natural, skin-friendly and rich in effective biotechnological ingredients.",
  keywords: ["skincare", "body care", "vegan cosmetics", "natural beauty", "biotech ingredients", "The Beauty Vault", "clean beauty"],
  openGraph: {
    title: "The Beauty Vault | Highly Effective Body Care",
    description: "Vegan, natural, skin-friendly body care rich in effective biotechnological ingredients.",
    url: "https://the-beauty-vault.vercel.app",
    siteName: "The Beauty Vault",
    images: [
      {
        url: "/hero_banner.png",
        width: 1200,
        height: 630,
        alt: "The Beauty Vault - Highly Effective Body Care",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Beauty Vault | Highly Effective Body Care",
    description: "Vegan, natural, skin-friendly body care rich in effective biotechnological ingredients.",
    images: ["/hero_banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <Header />
              <main style={{ flex: 1 }}>
                {children}
              </main>
              <Footer />
              <CartDrawer />
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

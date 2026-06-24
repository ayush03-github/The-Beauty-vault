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
  title: "The Beauty Vault | Highly Effective Body Care",
  description: "A combination of nature and advanced technology. Vegan, natural, skin-friendly and rich in effective biotechnological ingredients.",
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

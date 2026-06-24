import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  description: string;
}

const BEST_SELLERS: Product[] = [
  {
    id: "1",
    name: "Purifying Gel Cleanser",
    category: "Cleanse",
    price: 38,
    image: "/products/cleanser.png",
    badge: "Bestseller",
    description: "A gentle gel cleanser formulated to purify pores and restore skin balance without stripping."
  },
  {
    id: "2",
    name: "Exfoliating Skin Toner",
    category: "Exfoliate",
    price: 45,
    image: "/products/toner.png",
    badge: "New",
    description: "An AHA/BHA complex toner that gently sweeps away dead cells for a smooth, glowing texture."
  },
  {
    id: "3",
    name: "Vitamin C Radiance Serum",
    category: "Treat",
    price: 68,
    image: "/products/serum.png",
    description: "Potent vitamin C and ferulic acid serum designed to brighten skin tone and defend against pollution."
  },
  {
    id: "4",
    name: "Barrier Support Face Cream",
    category: "Hydrate",
    price: 52,
    image: "/products/cream.png",
    badge: "Formulated for all",
    description: "A rich, ceramide-infused cream that fortifies the moisture barrier and locks in hydration."
  }
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "name": "The Beauty Vault",
    "description": "A combination of nature and advanced technology. Vegan, natural, skin-friendly and rich in effective biotechnological ingredients.",
    "url": "https://the-beauty-vault.vercel.app",
    "image": "https://the-beauty-vault.vercel.app/hero_banner.png",
    "priceRange": "$$",
  };

  return (
    <div style={{ minHeight: "100%" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. HERO BANNER */}
      <section className={styles.hero}>
        <div className={styles.heroImageContainer}>
          <Image
            src="/hero_banner.png"
            alt="CEIN Skincare products collection with natural shadows"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container`} style={{ position: "relative", zIndex: 10 }}>
          <div className={styles.heroContent}>
            <span className={styles.heroSubtitle}>Treat Your Body Like Your Face</span>
            <h1 className={styles.heroTitle}>Highly Effective Body Care</h1>
            <p className={styles.heroDescription}>
              A combination of nature and advanced technology. Vegan, natural, 
              skin-friendly and rich in effective biotechnological ingredients.
            </p>
            <Link href="/shop" className={styles.heroCta}>
              <span>Discover More</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BRAND VALUES / BENEFITS */}
      <section className={styles.benefits}>
        <div className="container">
          <div className={styles.benefitsGrid}>
            
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Eco-Conscious</h3>
              <p className={styles.benefitDescription}>100% recyclable glass bottles and biodegradable cartons.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="1"></path>
                  <path d="M9 12L11 14L15 10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Dermatologist Tested</h3>
              <p className={styles.benefitDescription}>Formulated for sensitive skin types, free from allergens.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 3c-1.2 0-2.4 1.1-2.4 2.5 0 2 2.4 4.5 2.4 4.5s2.4-2.5 2.4-4.5c0-1.4-1.2-2.5-2.4-2.5zm0 18c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8z"></path>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Vegan & Cruelty Free</h3>
              <p className={styles.benefitDescription}>Never tested on animals, and certified 100% plant-derived.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M20.37 8.91l-8.17-8.17a.5.5 0 0 0-.71 0L3.32 8.91a.5.5 0 0 0 0 .71l8.17 8.17a.5.5 0 0 0 .71 0l8.17-8.17a.5.5 0 0 0 0-.71zM12 16.5L4.71 9.21 12 1.92l7.29 7.29L12 16.5z"></path>
                </svg>
              </div>
              <h3 className={styles.benefitTitle}>Science Backed</h3>
              <p className={styles.benefitDescription}>Active biotech ingredients selected for proven skin results.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. BEST SELLERS */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.heroSubtitle}>Curated Selection</span>
              <h2 className={`font-serif ${styles.sectionTitle}`}>Our Bestsellers</h2>
            </div>
            <Link href="/shop" className={styles.viewAllLink}>
              View All Products
            </Link>
          </div>

          <div className={styles.productGrid}>
            {BEST_SELLERS.map((product) => (
              <Link href={`/shop/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.imageWrapper}>
                  {product.badge && <span className={styles.badge}>{product.badge}</span>}
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={350}
                    height={437}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.cardDetails}>
                  <span className={styles.productCategory}>{product.category}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <span className={styles.productPrice}>${product.price}.00 USD</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BRAND STORY SECTION */}
      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyImageWrapper}>
              <Image
                src="/story_image.png"
                alt="Brand philosophy and natural raw skincare ingredients"
                width={600}
                height={600}
                className={styles.storyImage}
              />
            </div>
            <div className={styles.storyContent}>
              <span className={styles.heroSubtitle}>Our Philosophy</span>
              <h2 className={`font-serif ${styles.storyTitle}`}>Clean, Conscious, Scientific.</h2>
              <p className={styles.storyDescription}>
                At CEIN, we believe that body care should not be treated as an afterthought. 
                Our formulas are designed with the same rigor and advanced active ingredients 
                typically reserved for facial skincare. We utilize biotech science to unlock 
                the potent power of botanical extracts, creating biocompatible products that 
                deliver long-term health and moisture to your skin.
              </p>
              <Link href="/about" className={styles.storyCta}>
                Read Our Full Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import styles from "./detail.module.css";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  description: string;
  rating: number;
  inStock: boolean;
  howToUse: string;
  ingredients: string;
  sustainability: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Purifying Gel Cleanser",
    category: "Cleanse",
    price: 38,
    image: "/products/cleanser.png",
    badge: "Bestseller",
    description: "A gentle gel cleanser formulated to purify pores and restore skin balance without stripping the protective moisture barrier.",
    rating: 4.8,
    inStock: true,
    howToUse: "Apply a small amount to damp skin, massage gently in circular motions, then rinse thoroughly with warm water. Use daily, morning and night.",
    ingredients: "Water (Aqua), Glycerin, Organic Aloe Barbadensis Leaf Juice, Centella Asiatica Extract, Coco-Glucoside, Sodium Hyaluronate, Panthenol (Vitamin B5), Chamomilla Recutita (Matricaria) Flower Extract.",
    sustainability: "Packaged in a 100% recyclable green glass bottle with a BPA-free pump. Outer carton printed with soy inks on FSC-certified cardboard."
  },
  {
    id: "2",
    name: "Exfoliating Skin Toner",
    category: "Exfoliate",
    price: 45,
    image: "/products/toner.png",
    badge: "New",
    description: "An AHA/BHA complex toner that gently sweeps away dead cells, unclogs pores, and prepares the skin for maximum absorption of treatments.",
    rating: 4.6,
    inStock: true,
    howToUse: "Sweep over clean face and neck with a reusable cotton pad, avoiding the eye area. Use 2-3 times per week at night, gradually increasing frequency as tolerated.",
    ingredients: "Water (Aqua), Glycolic Acid, Salicylic Acid (BHA), Lactic Acid, Hamamelis Virginiana (Witch Hazel) Water, Niacinamide, Glycerin, Sodium Hydroxide.",
    sustainability: "Packaged in an amber glass bottle with a recyclable plastic screw cap. Clean bottle thoroughly before disposing in local recycling bin."
  },
  {
    id: "3",
    name: "Vitamin C Radiance Serum",
    category: "Treat",
    price: 68,
    image: "/products/serum.png",
    description: "Potent vitamin C and ferulic acid serum designed to brighten skin tone, fade hyperpigmentation, and defend against environmental stressors.",
    rating: 4.9,
    inStock: true,
    howToUse: "Smooth 3-4 drops over face and neck after cleansing and toning. Press gently until absorbed. Follow with moisturizer and always apply broad-spectrum sunscreen in the morning.",
    ingredients: "Water (Aqua), Ascorbic Acid (Vitamin C), Ferulic Acid, Tocopherol (Vitamin E), Hyaluronic Acid, Propylene Glycol, Panthenol, Phenoxyethanol.",
    sustainability: "Dark frosted glass protects active Vitamin C from UV light degradation. Dropper is recyclable once glass pipette is separated from rubber bulb."
  },
  {
    id: "4",
    name: "Barrier Support Face Cream",
    category: "Hydrate",
    price: 52,
    image: "/products/cream.png",
    badge: "Formulated for all",
    description: "A rich, ceramide-infused cream that fortifies the moisture barrier, locks in deep hydration, and calms irritated or dry skin states.",
    rating: 4.7,
    inStock: true,
    howToUse: "Massage a dime-sized amount into clean face and neck as the final step of your skincare routine. Can be used morning and night.",
    ingredients: "Water (Aqua), Caprylic/Capric Triglyceride, Squalane, Ceramide NP, Ceramide AP, Phytosphingosine, Cholesterol, Shea Butter, Sodium Hyaluronate.",
    sustainability: "Glass jar is fully recyclable. Outer lid is made from 50% post-consumer recycled plastic. Box is compostable."
  },
  {
    id: "5",
    name: "Advanced Renewal Treatment",
    category: "Treat",
    price: 75,
    image: "/products/serum.png",
    badge: "Limited Edition",
    description: "A concentrated evening treatment containing gentle encapsulated retinol to improve cell turn-over, diminish fine lines, and smooth skin texture.",
    rating: 5.0,
    inStock: false,
    howToUse: "Apply 2-3 drops to clean, dry skin in the evening, starting twice a week and slowly building up. Limit sun exposure and wear SPF daily while using this product.",
    ingredients: "Water (Aqua), Retinol, Bakuchiol, Ceramide EOP, Sodium Hyaluronate, Rosehip Seed Oil, Allantoin, Glycerin.",
    sustainability: "Frosted white glass bottle is recyclable. Ships in an ultra-minimal carton constructed from recycled coffee husk fibers."
  },
  {
    id: "6",
    name: "Intense Ceramide Cream",
    category: "Hydrate",
    price: 58,
    image: "/products/cream.png",
    description: "Deep relief face and neck balm for ultra-dry or compromised skin barriers, delivering immediate comfort and moisture.",
    rating: 4.5,
    inStock: true,
    howToUse: "Warm a pea-sized amount between fingertips and press gently into areas experiencing severe dryness, peeling, or windburn. Ideal for night-time recovery.",
    ingredients: "Water (Aqua), Ceramide EOP, Ceramide EOP, Squalane, Jojoba Esters, Glycerin, Avena Sativa (Oat) Kernel Flour, Centella Extract.",
    sustainability: "Glass jar is fully recyclable. Lid is crafted from sustainably harvested bamboo. Outer boxes are plastic-free."
  }
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("use");

  // Find product
  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === id);
  }, [id]);

  if (!product) {
    return (
      <div className={`container ${styles.pageContainer}`} style={{ textAlign: "center", padding: "100px 0" }}>
        <h2 className="font-serif" style={{ fontSize: "2rem", marginBottom: "20px" }}>Formulation Not Found</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>
          We could not locate a CEIN skincare formulation matching ID: "{id}".
        </p>
        <Link href="/shop" style={{ textDecoration: "underline", fontWeight: 500 }}>
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleQtyChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product, quantity);
    }
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        
        {/* Back navigation */}
        <Link href="/shop" className={styles.backButton}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Collections</span>
        </Link>

        {/* Product Details Layout */}
        <div className={styles.detailsGrid}>
          
          {/* Left image display */}
          <div className={styles.imageSection}>
            {product.badge && <span className={styles.badge}>{product.badge}</span>}
            {!product.inStock && (
              <div style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(245, 244, 240, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 5
              }}>
                <span style={{
                  backgroundColor: "var(--bg-dark)",
                  color: "var(--text-light)",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  letterSpacing: "0.05em",
                  fontWeight: 600
                }}>Sold Out</span>
              </div>
            )}
            <Image
              src={product.image}
              alt={product.name}
              width={550}
              height={687}
              className={styles.productImage}
              priority
            />
          </div>

          {/* Right text & purchasing actions */}
          <div className={styles.contentSection}>
            <span className={styles.breadcrumb}>Shop / {product.category} Care</span>
            <h1 className={`font-serif ${styles.productTitle}`}>{product.name}</h1>
            <div className={styles.productPrice}>${product.price}.00 USD</div>
            
            <p className={styles.description}>{product.description}</p>

            {/* Purchase Form block */}
            <div className={styles.purchaseActions}>
              <div className={styles.quantityRow}>
                <span className={styles.quantityLabel}>Quantity</span>
                <div className={styles.quantitySelector}>
                  <button 
                    className={styles.qtyButton} 
                    onClick={() => handleQtyChange(quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button 
                    className={styles.qtyButton} 
                    onClick={() => handleQtyChange(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                className={`${styles.addToCartButton} ${!product.inStock ? styles.addToCartButtonDisabled : ""}`}
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                {product.inStock ? (
                  <>
                    <span>Add to Bag</span>
                    <span>—</span>
                    <span>${product.price * quantity}.00 USD</span>
                  </>
                ) : (
                  "Out of Stock"
                )}
              </button>
            </div>

            {/* Accordion drawers for specifications */}
            <div className={styles.infoAccordion}>
              
              {/* How to use */}
              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion("use")}
                >
                  <span>How to Use</span>
                  <span>{activeAccordion === "use" ? "−" : "+"}</span>
                </button>
                {activeAccordion === "use" && (
                  <div className={styles.accordionContent}>
                    <p>{product.howToUse}</p>
                  </div>
                )}
              </div>

              {/* Ingredients */}
              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion("ingredients")}
                >
                  <span>Ingredients</span>
                  <span>{activeAccordion === "ingredients" ? "−" : "+"}</span>
                </button>
                {activeAccordion === "ingredients" && (
                  <div className={styles.accordionContent}>
                    <p>{product.ingredients}</p>
                  </div>
                )}
              </div>

              {/* Packaging */}
              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion("packaging")}
                >
                  <span>Packaging & Sustainability</span>
                  <span>{activeAccordion === "packaging" ? "−" : "+"}</span>
                </button>
                {activeAccordion === "packaging" && (
                  <div className={styles.accordionContent}>
                    <p>{product.sustainability}</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

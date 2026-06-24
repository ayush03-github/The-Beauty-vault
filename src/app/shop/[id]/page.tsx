"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import styles from "./detail.module.css";
import { PRODUCTS, fetchProducts, Product } from "@/data/products";


export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("use");
  const [product, setProduct] = useState<Product | null>(() => {
    return PRODUCTS.find((p) => p.id === id) || null;
  });

  useEffect(() => {
    let active = true;
    fetchProducts().then((data) => {
      if (active) {
        const found = data.find((p) => p.id === id);
        if (found) {
          setProduct(found);
        }
      }
    });
    return () => {
      active = false;
    };
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

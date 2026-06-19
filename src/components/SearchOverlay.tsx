"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SearchOverlay.module.css";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Purifying Gel Cleanser",
    category: "Cleanse",
    price: 38,
    image: "/products/cleanser.png",
  },
  {
    id: "2",
    name: "Exfoliating Skin Toner",
    category: "Exfoliate",
    price: 45,
    image: "/products/toner.png",
  },
  {
    id: "3",
    name: "Vitamin C Radiance Serum",
    category: "Treat",
    price: 68,
    image: "/products/serum.png",
  },
  {
    id: "4",
    name: "Barrier Support Face Cream",
    category: "Hydrate",
    price: 52,
    image: "/products/cream.png",
  },
  {
    id: "5",
    name: "Advanced Renewal Treatment",
    category: "Treat",
    price: 75,
    image: "/products/serum.png",
  },
  {
    id: "6",
    name: "Intense Ceramide Cream",
    category: "Hydrate",
    price: 58,
    image: "/products/cream.png",
  }
];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when search overlay is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset query on close
  const handleClose = () => {
    setQuery("");
    onClose();
  };

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    return PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  if (!isOpen) return null;

  const popularKeywords = ["Cleanser", "Toner", "Serum", "Cream"];

  return (
    <div className={styles.overlay}>
      {/* Header close panel */}
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={handleClose} aria-label="Close search">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main search layout box */}
      <div className={styles.searchContainer}>
        
        {/* Search input line */}
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search our formulations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className={styles.clearButton} onClick={() => setQuery("")} aria-label="Clear input">
              ×
            </button>
          )}
        </div>

        {/* Results / Suggestion panels */}
        {query.trim() ? (
          <div className={styles.resultsSection}>
            <h3 className={styles.sectionTitle}>Search Results ({filteredProducts.length})</h3>
            {filteredProducts.length > 0 ? (
              <div className={styles.resultsGrid}>
                {filteredProducts.map((product) => (
                  <Link 
                    href={`/shop/${product.id}`} 
                    key={product.id} 
                    className={styles.productCard}
                    onClick={handleClose}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={75}
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.details}>
                      <span className={styles.productCategory}>{product.category}</span>
                      <h4 className={styles.productName}>{product.name}</h4>
                      <span className={styles.productPrice}>${product.price}.00</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>No formulations found matching "{query}".</p>
            )}
          </div>
        ) : (
          /* Popular suggested keywords view */
          <div className={styles.resultsSection}>
            <h3 className={styles.sectionTitle}>Popular Searches</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
              {popularKeywords.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => setQuery(keyword)}
                  style={{
                    border: "1px solid var(--border-medium)",
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderRadius: "2px",
                    transition: "var(--transition-fast)"
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.borderColor = "var(--text-primary)";
                    (e.target as HTMLButtonElement).style.backgroundColor = "var(--bg-secondary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.borderColor = "var(--border-medium)";
                    (e.target as HTMLButtonElement).style.backgroundColor = "transparent";
                  }}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/shop/shop.module.css";
import { PRODUCTS, fetchProducts, Product } from "@/data/products";


interface ShopViewProps {
  initialCategory?: string;
  pageTitle?: string;
  pageDescription?: string;
}

export default function ShopView({ 
  initialCategory = "All",
  pageTitle,
  pageDescription 
}: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(80);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Fetch products from database (fallback to local PRODUCTS)
  useEffect(() => {
    let active = true;
    fetchProducts().then((data) => {
      if (active) {
        setProducts(data);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const categories = ["All", "Cleanse", "Exfoliate", "Treat", "Hydrate"];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }
      if (sortBy === "price-high") {
        return b.price - a.price;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0; // Default Featured
    });
  }, [selectedCategory, searchQuery, sortBy, onlyInStock, priceRange, products]);

  const defaultTitle = selectedCategory === "All" ? "Shop Skin Care" : `${selectedCategory} Care`;
  const defaultDescription = selectedCategory === "All" 
    ? "The skin is constantly changing, influenced by the environment, lifestyle, and diet. Our range is crafted with this in consideration, addressing various preferences and needs to help you achieve optimal skin health."
    : `Explore our specialized ${selectedCategory.toLowerCase()} formulations, engineered with premium active ingredients to support healthy, balanced skin.`;

  return (
    <div className={styles.shopPage}>
      {/* Shop Hero Banner */}
      <section className={styles.shopHero}>
        <div className="container">
          <div className={styles.shopHeroContent}>
            <span className={styles.shopSubtitle}>Our Collections</span>
            <h1 className={`font-serif ${styles.shopTitle}`}>{pageTitle || defaultTitle}</h1>
            <p className={styles.shopDescription}>{pageDescription || defaultDescription}</p>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <div className="container">
        
        {/* Category Horizontal Filter Bar */}
        <nav className={styles.categoryBar} aria-label="Product categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.categoryButtonActive : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category} {category === "All" ? "" : "Care"}
            </button>
          ))}
        </nav>

        {/* Toolbar & Layout */}
        <div className={styles.layoutGrid}>
          
          {/* Sidebar Filters */}
          <aside className={styles.sidebar}>
            
            {/* Search Input */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Search</h3>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Find products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid var(--border-medium)",
                    backgroundColor: "transparent",
                    fontFamily: "inherit",
                    fontSize: "0.9rem",
                    color: "var(--text-primary)"
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className={styles.filterGroup}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 className={styles.filterTitle} style={{ border: "none", marginBottom: 0, paddingBottom: 0 }}>Max Price</h3>
                <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>${priceRange} USD</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--text-primary)", cursor: "pointer" }}
              />
            </div>

            {/* Availability Checkbox */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterTitle}>Availability</h3>
              <label className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                />
                <span>In Stock Only ({products.filter(p => p.inStock).length})</span>
              </label>
            </div>

            {/* Aesthetics statement sidebar info */}
            <div className={styles.filterGroup} style={{ marginTop: "var(--spacing-md)", opacity: 0.7 }}>
              <p style={{ fontSize: "0.8rem", fontStyle: "italic", lineHeight: 1.5, color: "var(--text-secondary)" }}>
                Each formulation contains highly active ingredients sourced through eco-responsible biotech processes.
              </p>
            </div>
          </aside>

          {/* Main Product Feed */}
          <div>
            {/* Toolbar count & Sorting */}
            <div className={styles.toolbar}>
              <div>
                <span>Showing {filteredProducts.length} of {products.length} products</span>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className={styles.productGrid}>
                {filteredProducts.map((product) => (
                  <Link href={`/shop/${product.id}`} key={product.id} className={styles.productCard}>
                    <div className={styles.imageWrapper}>
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
                            fontSize: "0.75rem",
                            textTransform: "uppercase",
                            padding: "6px 12px",
                            letterSpacing: "0.05em",
                            fontWeight: 600
                          }}>Sold Out</span>
                        </div>
                      )}
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
            ) : (
              // Empty Search/Filter results state
              <div style={{ 
                padding: "var(--spacing-xxl) 0", 
                textAlign: "center", 
                border: "1px dashed var(--border-medium)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--spacing-md)"
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ opacity: 0.5 }}>
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3 className="font-serif" style={{ fontSize: "1.3rem" }}>No Products Found</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "300px" }}>
                  Try adjusting your search criteria, widening the price range, or selecting another category.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setPriceRange(80);
                    setOnlyInStock(false);
                  }}
                  style={{
                    textDecoration: "underline",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    marginTop: "var(--spacing-xs)"
                  }}
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

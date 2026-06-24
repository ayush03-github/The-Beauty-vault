"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS, fetchProducts, Product } from "@/data/products";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const { user, signOut } = useAuth();
  
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Lock body scroll and focus input when search is open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isSearchOpen]);

  // Filter products based on search term
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className={styles.announcementBar}>
        <div className={styles.announcementText}>
          Click and Collect is now available. Complimentary shipping over $400.
        </div>
      </div>

      {/* Click-away backdrop for Search */}
      {isSearchOpen && (
        <div 
          className={styles.searchBackdrop} 
          onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} 
        />
      )}

      {/* Main Header */}
      <header className={styles.header}>
        <div 
          className={`container ${styles.navContainer}`}
          style={{ 
            opacity: isSearchOpen ? 0 : 1,
            visibility: isSearchOpen ? "hidden" : "visible",
            pointerEvents: isSearchOpen ? "none" : "auto",
            transition: "opacity 0.2s ease, visibility 0.2s ease"
          }}
        >
          
          {/* Left Column (Desktop Navigation / Mobile Menu + Search) */}
          <div className={styles.leftCol}>
            {/* Mobile Burger Menu Button */}
            <button 
              className={styles.mobileMenuToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                // Close Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                // Burger Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
              )}
            </button>

            {/* Mobile Search Icon (Placed next to burger menu) */}
            <button 
              className={`${styles.actionButton} ${styles.mobileSearch}`} 
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Desktop Left Navigation Links */}
            <nav className={styles.desktopNav}>
              <Link href="/shop" className={styles.navLink}>Shop</Link>
              <Link href="/about" className={styles.navLink}>About Us</Link>
              <Link href="/journal" className={styles.navLink}>Journal</Link>
              <Link href="/stores" className={styles.navLink}>Stores</Link>
            </nav>
          </div>

          {/* Centered Logo */}
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo}>
              The Beauty Vault
            </Link>
          </div>

          {/* Desktop & Mobile Actions */}
          <div className={styles.actions}>
            {/* Desktop Search Icon */}
            <button 
              className={`${styles.actionButton} desktop-only`} 
              aria-label="Search" 
              style={{ display: "var(--display-desktop, flex)" }}
              onClick={() => setIsSearchOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Desktop Language Selector */}
            <div className={styles.languageSelect}>
              <span>EN</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </div>

            {/* Wishlist Heart Icon (with dynamic count) */}
            <Link href="/wishlist" className={styles.actionButton} aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </Link>

            {/* Profile Icon */}
            <Link href="/account" className={styles.actionButton} aria-label="Account" style={{ position: "relative" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {user && (
                <span 
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "3px",
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#137333",
                    borderRadius: "50%"
                  }}
                />
              )}
            </Link>

            {/* Cart/Bag Icon (with dynamic count) */}
            <button 
              className={styles.actionButton} 
              aria-label="Shopping Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>
          </div>

        </div>

        {/* Inline Search Bar (Expands to 90% width, matches header background) */}
        {isSearchOpen && (
          <div className={styles.headerSearchOverlay}>
            <div className={styles.headerSearchInputWrapper}>
              <svg className={styles.headerSearchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.headerSearchInput}
                placeholder="Search our formulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className={styles.headerSearchClear} 
                  onClick={() => setSearchQuery("")} 
                  aria-label="Clear input"
                >
                  ×
                </button>
              )}
            </div>
            <button 
              className={styles.headerSearchClose} 
              onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} 
              aria-label="Close search"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}

        {/* Mobile Menu Drawer/Overlay (Now absolute inside header) */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenuOverlay}>
            <Link href="/shop" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link href="/journal" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Journal</Link>
            <Link href="/stores" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Stores</Link>
            
            <div className={styles.mobileMenuFooter}>
              {user ? (
                <>
                  <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                    My Account ({user.name})
                  </Link>
                  <button 
                    onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                    style={{ textAlign: "left", fontSize: "0.95rem", color: "var(--text-secondary)", textDecoration: "underline", cursor: "pointer", padding: 0 }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In / Register
                </Link>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "10px" }}>
                <span>Language: EN</span>
                <span>Region: Global</span>
              </div>
            </div>
          </div>
        )}

        {/* Suggestions & Available Products Floating Dropdown */}
        {isSearchOpen && (
          <div className={styles.searchDropdown}>
            <div className={styles.dropdownContainer}>
              {searchQuery.trim() ? (
                <div className={styles.dropdownSection}>
                  <h3 className={styles.dropdownSectionTitle}>
                    Search Results ({filteredProducts.length})
                  </h3>
                  {filteredProducts.length > 0 ? (
                    <div className={styles.dropdownGrid}>
                      {filteredProducts.map((product) => (
                        <Link 
                          href={`/shop/${product.id}`} 
                          key={product.id} 
                          className={styles.dropdownProductCard}
                          onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                        >
                          <div className={styles.dropdownImageWrapper}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={50}
                              height={62}
                              className={styles.dropdownImage}
                            />
                          </div>
                          <div className={styles.dropdownDetails}>
                            <span className={styles.dropdownProductCategory}>{product.category}</span>
                            <h4 className={styles.dropdownProductName}>{product.name}</h4>
                            <span className={styles.dropdownProductPrice}>${product.price}.00</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.dropdownEmptyText}>
                      No formulations found matching "{searchQuery}".
                    </p>
                  )}
                </div>
              ) : (
                <div className={styles.dropdownSection}>
                  <h3 className={styles.dropdownSectionTitle}>Popular Searches</h3>
                  <div className={styles.popularKeywordsWrapper}>
                    {["Cleanser", "Toner", "Serum", "Cream"].map((keyword) => (
                      <button
                        key={keyword}
                        className={styles.popularKeywordButton}
                        onClick={() => setSearchQuery(keyword)}
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Helper Style for Desktop Hidden elements */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}


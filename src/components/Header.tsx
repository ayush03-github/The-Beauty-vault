"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchOverlay from "@/components/SearchOverlay";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <>
      {/* Top Announcement Bar */}
      <div className={styles.announcementBar}>
        <div className={styles.announcementText}>
          Click and Collect is now available. Complimentary shipping over $400.
        </div>
      </div>

      {/* Main Header */}
      <header className={styles.header}>
        <div className={`container ${styles.navContainer}`}>
          
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
            <Link href="/account" className={styles.actionButton} aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
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
      </header>

      {/* Mobile Menu Drawer/Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <Link href="/shop" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link href="/journal" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Journal</Link>
          <Link href="/stores" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Stores</Link>
          
          <div className={styles.mobileMenuFooter}>
            <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              <span>Language: EN</span>
              <span>Region: Global</span>
            </div>
          </div>
        </div>
      )}

      {/* Global Helper Style for Desktop Hidden elements */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>

      {/* Full-screen Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

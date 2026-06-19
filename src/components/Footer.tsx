"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        
        {/* Footer Top Grid */}
        <div className={styles.footerGrid}>
          
          {/* Newsletter subscription */}
          <div className={styles.newsletterColumn}>
            <h3 className={styles.newsletterTitle}>Subscribe to Our Journal</h3>
            <p className={styles.newsletterDescription}>
              Be the first to hear about new launches, exclusive stories, and invitations to brand events.
            </p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={styles.newsletterInput}
                required
              />
              <button type="submit" className={styles.newsletterSubmit} aria-label="Subscribe">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
          </div>

          {/* Shop Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Shop</h4>
            <ul className={styles.linkList}>
              <li><Link href="/shop" className={styles.link}>All Skincare</Link></li>
              <li><Link href="/shop/cleanse" className={styles.link}>Cleanse</Link></li>
              <li><Link href="/shop/exfoliate" className={styles.link}>Exfoliate</Link></li>
              <li><Link href="/shop/treat" className={styles.link}>Treat</Link></li>
              <li><Link href="/shop/hydrate" className={styles.link}>Hydrate</Link></li>
            </ul>
          </div>

          {/* About/Info Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Information</h4>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.link}>Our Story</Link></li>
              <li><Link href="/journal" className={styles.link}>Journal</Link></li>
              <li><Link href="/stores" className={styles.link}>Stores</Link></li>
              <li><Link href="/careers" className={styles.link}>Careers</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Customer Service</h4>
            <ul className={styles.linkList}>
              <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
              <li><Link href="/shipping" className={styles.link}>Shipping & Returns</Link></li>
              <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Row */}
        <div className={styles.footerBottom}>
          <div>
            <span>© {new Date().getFullYear()} The Beauty Vault. All rights reserved.</span>
          </div>
          
          {/* Aesthetic Large Branding watermark/background */}
          <div className={styles.brandSignoff}>
            Vault.
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Pinterest</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

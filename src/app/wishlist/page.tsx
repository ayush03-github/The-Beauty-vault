"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import styles from "./wishlist.module.css";

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToBag = (item: any) => {
    if (item.inStock) {
      addToCart({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
      }, 1);
    }
  };

  return (
    <div className={styles.wishlistPage}>
      <div className="container">
        
        {wishlistItems.length > 0 ? (
          <>
            {/* Header section with count */}
            <div className={styles.titleSection}>
              <span className={styles.subtitle}>Curated Collections</span>
              <h1 className={`font-serif ${styles.title}`}>My Wishlist</h1>
              <span className={styles.countText}>
                You have {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
              </span>
            </div>

            {/* Grid of wishlist cards */}
            <div className={styles.grid}>
              {wishlistItems.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    {/* Remove button (X close indicator) */}
                    <button 
                      className={styles.removeIconBtn}
                      onClick={() => toggleWishlist(item)}
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>

                    <Link href={`/shop/${item.id}`} style={{ width: "100%", height: "100%", display: "block" }}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={375}
                        className={styles.productImage}
                      />
                    </Link>
                  </div>

                  <div className={styles.cardDetails}>
                    <span className={styles.category}>{item.category}</span>
                    <Link href={`/shop/${item.id}`}>
                      <h3 className={styles.name}>{item.name}</h3>
                    </Link>
                    <span className={styles.price}>${item.price}.00 USD</span>
                    
                    <span className={`${styles.stockStatus} ${item.inStock ? styles.inStock : styles.outOfStock}`}>
                      {item.inStock ? "In Stock" : "Sold Out"}
                    </span>
                  </div>

                  {/* Actions (Add to cart) */}
                  <div className={styles.actions}>
                    <button
                      className={`${styles.addToCartBtn} ${!item.inStock ? styles.addToCartBtnDisabled : ""}`}
                      disabled={!item.inStock}
                      onClick={() => handleAddToBag(item)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Empty State view
          <div className={styles.emptyState}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ opacity: 0.3 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <h2 className={`font-serif ${styles.emptyTitle}`}>Your Wishlist is Empty</h2>
            <p className={styles.emptyText}>
              Keep track of products you love. Select the heart icon on any product page to save formulations here.
            </p>
            <Link href="/shop" className={styles.shopNowBtn}>
              Shop Formulations
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

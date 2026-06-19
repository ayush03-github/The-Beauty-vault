"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer when clicking outside the panel
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      setIsCartOpen(false);
    }
  };

  // Prevent scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 400;
  const shippingLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.drawer} ref={drawerRef}>
        
        {/* Drawer Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Shopping Cart</h2>
          <button 
            className={styles.closeButton} 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Free Shipping Indicator */}
        {cartItems.length > 0 && (
          <div className={styles.shippingBarContainer}>
            <div>
              {shippingLeft > 0 ? (
                <span>You are <strong>${shippingLeft} USD</strong> away from complimentary shipping.</span>
              ) : (
                <span>You qualify for <strong>complimentary shipping</strong>!</span>
              )}
            </div>
            <div className={styles.shippingProgress}>
              <div 
                className={styles.shippingProgressBar} 
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List Content */}
        {cartItems.length > 0 ? (
          <>
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.itemImageWrapper}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={100}
                      className={styles.itemImage}
                    />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <div>
                      <div className={styles.itemNameRow}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <span className={styles.itemPrice}>${item.price}.00</span>
                      </div>
                      <span className={styles.itemCategory}>{item.category}</span>
                    </div>

                    <div className={styles.itemActionRow}>
                      {/* Quantity Selector */}
                      <div className={styles.qtySelector}>
                        <button 
                          className={styles.qtyButton} 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button 
                          className={styles.qtyButton} 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        className={styles.removeButton}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary/Checkout block */}
            <div className={styles.summarySection}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Subtotal</span>
                <span className={styles.summaryValue}>${cartTotal}.00 USD</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                Taxes, shipping, and discounts are calculated at checkout.
              </p>
              <button 
                className={styles.checkoutButton}
                onClick={() => alert("Proceeding to checkout mock flow...")}
              >
                Checkout
              </button>
              <span 
                className={styles.continueShopping}
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </span>
            </div>
          </>
        ) : (
          // Empty state
          <div className={styles.emptyState}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ opacity: 0.4 }}>
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h3 className={styles.emptyTitle}>Your cart is empty</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", maxWidth: "250px" }}>
              Explore our highly effective formulations and treat your body.
            </p>
            <button 
              className={styles.emptyButton}
              onClick={() => setIsCartOpen(false)}
            >
              Shop Skincare
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

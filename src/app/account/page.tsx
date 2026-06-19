"use client";

import React from "react";
import styles from "./account.module.css";

interface Order {
  number: string;
  date: string;
  status: string;
  total: number;
}

const ORDERS: Order[] = [
  {
    number: "#TBV-8149",
    date: "June 18, 2026",
    status: "Fulfilled",
    total: 83.00,
  },
  {
    number: "#TBV-7521",
    date: "May 10, 2026",
    status: "Fulfilled",
    total: 104.00,
  }
];

export default function AccountPage() {
  return (
    <div className={styles.accountPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.subtitle}>Dashboard</span>
          <h1 className={`font-serif ${styles.title}`}>My Account</h1>
          <p className={styles.welcomeText}>
            Welcome back, <strong>Alexandra</strong>
          </p>
        </header>

        {/* Layout Grid */}
        <div className={styles.layoutGrid}>
          
          {/* Left Order History */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Order History</h2>
            
            {ORDERS.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {ORDERS.map((order) => (
                  <div key={order.number} className={styles.orderCard}>
                    <div>
                      <div className={styles.orderLabel}>Order Number</div>
                      <div className={styles.orderValue}>{order.number}</div>
                    </div>
                    <div>
                      <div className={styles.orderLabel}>Date Placed</div>
                      <div className={styles.orderValue}>{order.date}</div>
                    </div>
                    <div>
                      <div className={styles.orderLabel}>Payment Status</div>
                      <div className={`${styles.orderValue} ${styles.fulfilled}`}>{order.status}</div>
                    </div>
                    <div>
                      <div className={styles.orderLabel}>Order Total</div>
                      <div className={styles.orderValue}>${order.total}.00 USD</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                You haven't placed any orders yet.
              </p>
            )}
          </div>

          {/* Right Address details */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Primary Address</h2>
            <div className={styles.addressCard}>
              <p className={styles.addressText}>
                <strong>Alexandra Miller</strong>
              </p>
              <p className={styles.addressText}>
                Limmatquai 18, Apt 4C
              </p>
              <p className={styles.addressText}>
                8001 Zürich
              </p>
              <p className={styles.addressText}>
                Switzerland
              </p>
              <p className={styles.addressText} style={{ marginTop: "10px" }}>
                Phone: +41 79 123 4567
              </p>
              
              <button 
                className={styles.button}
                onClick={() => alert("Edit address flow mock...")}
                style={{ marginTop: "10px" }}
              >
                Edit Address
              </button>
            </div>
          </div>

        </div>

        {/* Logout Link */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button 
            className={styles.logoutLink}
            onClick={() => alert("Logout mock flow...")}
          >
            Sign Out of Account
          </button>
        </div>

      </div>
    </div>
  );
}

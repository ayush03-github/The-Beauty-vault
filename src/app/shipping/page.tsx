import React from "react";
import styles from "./shipping.module.css";

export default function ShippingPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.subtitle}>Help Desk</span>
          <h1 className={`font-serif ${styles.title}`}>Shipping & Returns</h1>
        </header>

        {/* Content */}
        <main className={styles.content}>
          
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Delivery Rates & Methods</h2>
            <p className={styles.text}>
              All orders are packed and shipped from our primary logistics facility in Zurich, Switzerland. 
              Orders are processed within 24 hours of placement (excluding Swiss national holidays and weekends).
            </p>
            
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Timeline</th>
                  <th>Rate (Orders under $400)</th>
                  <th>Rate (Orders over $400)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Standard Carbon-Neutral</strong></td>
                  <td>3 – 5 Business Days</td>
                  <td>$15.00 USD</td>
                  <td><strong>Complimentary</strong></td>
                </tr>
                <tr>
                  <td><strong>Express Air Courier</strong></td>
                  <td>1 – 2 Business Days</td>
                  <td>$30.00 USD</td>
                  <td>$15.00 USD</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>International Shipping</h2>
            <p className={styles.text}>
              The Beauty Vault ships globally to over 80 countries. Delivery is fully tracked. 
              Customs duties and taxes are calculated at checkout where applicable, ensuring no unexpected 
              charges upon delivery.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Returns & Exchanges</h2>
            <p className={styles.text}>
              If a formulation is not suited for your skin, we accept returns on items purchased 
              directly from our online store within 14 days of delivery.
            </p>
            <p className={styles.text}>
              Products must be returned in their original packaging, unopened, and unused due to hygiene and 
              safety standards.
            </p>
            <p className={styles.text}>
              To initiate a return label, please email our support team at <strong>returns@thebeautyvault.com</strong> 
              with your order reference number and the items you wish to return. Once approved, refunds are 
              processed to the original payment method within 5–7 business days.
            </p>
          </section>

        </main>

      </div>
    </div>
  );
}

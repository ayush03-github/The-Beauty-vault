import React from "react";
import styles from "@/app/shipping/shipping.module.css";

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.subtitle}>Legal Department</span>
          <h1 className={`font-serif ${styles.title}`}>Privacy Policy</h1>
        </header>

        {/* Content */}
        <main className={styles.content}>
          
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Data Collection</h2>
            <p className={styles.text}>
              The Beauty Vault AG operates the website at Löwenstrasse 12, 8001 Zürich, Switzerland. 
              We collect information that is required to process and ship your skincare orders, manage your billing 
              and accounts, and optimize your browsing experience.
            </p>
            <p className={styles.text}>
              This includes details such as your name, delivery address, billing credentials, email address, phone 
              number, IP address, and cookie identifiers.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Use of Information</h2>
            <p className={styles.text}>
              Your customer data is used solely to fulfill transactions, send delivery notifications, address skin 
              advice queries, and prevent payment fraud. If you subscribe to our newsletter, we will send you 
              periodic updates on product launches, laboratory findings, and brand stories.
            </p>
            <p className={styles.text}>
              We never sell or trade your private information to third-party advertising companies. Your details 
              are shared only with logistics carriers (e.g. DHL, FedEx) and payment gateways (e.g. Stripe, Apple Pay) 
              to execute orders.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Cookies & Analytics</h2>
            <p className={styles.text}>
              We use functional cookies to manage your active shopping bag contents and secure account logs. We 
              also utilize aggregated tracking analytics to identify layout loading speeds and resolve page issues. 
              You can disable cookies in your browser settings if preferred, though some e-commerce functionalities 
              may be degraded.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Contact Us</h2>
            <p className={styles.text}>
              For any questions regarding your stored personal data or to request file deletion under global data 
              protection rules (GDPR), please email our data protection officer at <strong>privacy@thebeautyvault.com</strong>.
            </p>
          </section>

        </main>

      </div>
    </div>
  );
}

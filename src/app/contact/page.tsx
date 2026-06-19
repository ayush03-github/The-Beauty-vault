"use client";

import React, { useState } from "react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className={styles.contactPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.subtitle}>Get In Touch</span>
          <h1 className={`font-serif ${styles.title}`}>Contact Us</h1>
        </header>

        {/* Layout Grid */}
        <div className={styles.layoutGrid}>
          
          {/* Left Info Column */}
          <div className={styles.infoSide}>
            
            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>Customer Service</h2>
              <p className={styles.infoText}>
                For help regarding orders, shipments, product advice, or returns:
              </p>
              <p className={styles.infoText} style={{ marginTop: "10px" }}>
                Email: <strong>support@thebeautyvault.com</strong>
              </p>
              <p className={styles.infoText}>
                Phone: <strong>+41 44 200 1111</strong> (Mon – Fri, 09:00 – 18:00 CET)
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>Corporate & Press</h2>
              <p className={styles.infoText}>
                For marketing opportunities, wholesaling, or editorial inquiries:
              </p>
              <p className={styles.infoText} style={{ marginTop: "10px" }}>
                Email: <strong>office@thebeautyvault.com</strong>
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>Zurich Headquarters</h2>
              <p className={styles.infoText}>
                The Beauty Vault AG
              </p>
              <p className={styles.infoText}>
                Löwenstrasse 12, 8001 Zürich, Switzerland
              </p>
            </div>

          </div>

          {/* Right Form Column */}
          <div className={styles.formSide}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2b7a4b" strokeWidth="1.5" style={{ marginBottom: "15px" }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h2 className="font-serif" style={{ fontSize: "1.6rem", marginBottom: "10px" }}>Message Sent</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                  Thank you for reaching out. A skin specialist or customer service assistant 
                  will review your message and respond within 24 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  style={{ textDecoration: "underline", fontSize: "0.9rem", fontWeight: 500, marginTop: "20px" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className={styles.formTitle}>Send a Message</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                  
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>Your Name</label>
                    <input
                      id="name"
                      type="text"
                      className={styles.input}
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input
                      id="email"
                      type="email"
                      className={styles.input}
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea
                      id="message"
                      className={styles.textarea}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Submit Inquiry
                  </button>

                </form>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

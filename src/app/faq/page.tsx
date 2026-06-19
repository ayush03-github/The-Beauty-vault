"use client";

import React, { useState, useMemo } from "react";
import styles from "./faq.module.css";

interface FaqItem {
  id: string;
  topic: string;
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "p1",
    topic: "Products",
    question: "How can I obtain personalised skincare advice?",
    answer: (
      <>
        <p>You can consult with our digital skin assistant on the site or reach out directly to our formulation specialists by emailing <strong>advice@cein.com</strong>.</p>
        <p>We are happy to analyze your skin type, climate, and daily habits to recommend a targeted CEIN skincare routine tailored exactly to your needs.</p>
      </>
    )
  },
  {
    id: "p2",
    topic: "Products",
    question: "How do I store my CEIN formulations?",
    answer: (
      <>
        <p>To preserve the highly active biotech ingredients, store all bottles and jars in a cool, dry place away from direct sunlight and extreme temperatures (ideally below 25°C / 77°F).</p>
        <p>Ensure that caps, droppers, and pumps are screwed tight after every application to prevent oxidation.</p>
      </>
    )
  },
  {
    id: "p3",
    topic: "Products",
    question: "Are CEIN formulations suitable for sensitive skin?",
    answer: (
      <>
        <p>Yes. All CEIN products are dermatologist-tested and formulated to match the skin's natural pH values (around 5.5). We avoid artificial fragrances, drying alcohols, parabens, and common dermal sensitizers.</p>
        <p>If you have highly reactive skin, we always recommend conducting a patch test on your inner wrist or elbow for 24 hours before full face application.</p>
      </>
    )
  },
  {
    id: "s1",
    topic: "Shipping & Delivery",
    question: "What are your delivery options and rates?",
    answer: (
      <>
        <p>We offer complimentary standard carbon-neutral shipping on all orders over $400 USD. For orders below this threshold, a flat-rate shipping fee of $15 USD applies.</p>
        <p>Express air shipping is also available worldwide for a flat fee of $30 USD.</p>
      </>
    )
  },
  {
    id: "s2",
    topic: "Shipping & Delivery",
    question: "How long will my delivery take to arrive?",
    answer: (
      <>
        <p>Standard delivery takes 3 to 5 business days, depending on your region. Express delivery orders typically arrive within 1 to 2 business days.</p>
        <p>All orders are processed and shipped from our central logistics hub in Switzerland within 24 hours of payment verification (excluding weekends and public holidays).</p>
      </>
    )
  },
  {
    id: "a1",
    topic: "Account & Payments",
    question: "What payment methods do you accept?",
    answer: (
      <p>We accept credit card payments via Visa, MasterCard, and American Express. We also support express mobile checkouts including Apple Pay, Google Pay, and Shop Pay for immediate processing.</p>
    )
  },
  {
    id: "a2",
    topic: "Account & Payments",
    question: "Can I modify or cancel my order after it has been placed?",
    answer: (
      <>
        <p>Because our swiss fulfillment team processes and labels packages immediately to ensure speedy arrival, we cannot modify or cancel an order once checkout is complete.</p>
        <p>Please double-check your delivery address, cart contents, and shipping speed before confirming payment. You can return unopened products within 14 days of arrival for a full refund.</p>
      </>
    )
  },
  {
    id: "eco1",
    topic: "Sustainability",
    question: "Are CEIN glass containers and plastic pumps recyclable?",
    answer: (
      <>
        <p>Yes. Our primary amber and green bottles are made of 100% recyclable silicate glass. The pumps and pipettes should be separated from the bottles for clean recycling.</p>
        <p>Our outer cartons are crafted from FSC-certified cardstock and compostable coffee husks. They are printed with plant-based soy inks, meaning you can place them directly into your paper recycling bin or domestic compost pile.</p>
      </>
    )
  },
  {
    id: "eco2",
    topic: "Sustainability",
    question: "Where are CEIN skincare products manufactured?",
    answer: (
      <p>All CEIN formulations are developed, blended, and packaged in Switzerland and the south of France, under strict European cosmetic directives and green biotechnology quality standards.</p>
    )
  }
];

export default function FaqPage() {
  const [activeTopic, setActiveTopic] = useState("Products");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const topics = ["Products", "Shipping & Delivery", "Account & Payments", "Sustainability"];

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => item.topic === activeTopic);
  }, [activeTopic]);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className={styles.faqPage}>
      {/* FAQ Banner */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.subtitle}>Help & Support</span>
          <h1 className={`font-serif ${styles.title}`}>Frequently Asked Questions</h1>
          <p className={styles.description}>
            Find detailed answers to common inquiries regarding our scientific formulations, 
            delivery solutions, billing profiles, and ecological manufacturing values.
          </p>
        </div>
      </section>

      {/* Main FAQ layout */}
      <div className="container">
        <div className={styles.layoutGrid}>
          
          {/* Left Topic Sidebar list */}
          <nav className={styles.topicsList} aria-label="FAQ Topics">
            {topics.map((topic) => (
              <button
                key={topic}
                className={`${styles.topicButton} ${
                  activeTopic === topic ? styles.topicButtonActive : ""
                }`}
                onClick={() => {
                  setActiveTopic(topic);
                  setExpandedFaq(null); // Reset open questions when changing topics
                }}
              >
                <span>{topic}</span>
                <span className="desktop-only" style={{ opacity: activeTopic === topic ? 1 : 0 }}>→</span>
              </button>
            ))}
          </nav>

          {/* Right FAQ Questions list */}
          <main className={styles.faqList}>
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className={styles.faqItem}>
                <button
                  className={styles.faqHeader}
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={expandedFaq === faq.id}
                >
                  <span className="font-serif">{faq.question}</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: 300, lineHeight: 1 }}>
                    {expandedFaq === faq.id ? "−" : "+"}
                  </span>
                </button>
                {expandedFaq === faq.id && (
                  <div className={styles.faqAnswer}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </main>

        </div>
      </div>
    </div>
  );
}

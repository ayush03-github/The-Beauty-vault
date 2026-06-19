import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* About Header */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.subtitle}>Our Story</span>
          <h1 className={`font-serif ${styles.title}`}>A New Standard in Skin Care</h1>
          <p className={styles.intro}>
            Founded in 2024, CEIN emerged from a simple observation: while facial skincare 
            has advanced dramatically with active ingredients and targeted treatments, 
            body care has remained largely neglected. We set out to change that.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            
            <div className={styles.imageWrapper}>
              <Image
                src="/story_image.png"
                alt="Minimalist skincare bottles with botanical extracts"
                width={500}
                height={625}
                className={styles.image}
              />
            </div>

            <div className={styles.content}>
              <span className={styles.subtitle}>Our Philosophy</span>
              <h2 className={`font-serif ${styles.sectionTitle}`}>Treat your body like your face.</h2>
              <p className={styles.text}>
                We believe that the skin on your body deserves the exact same level of care, 
                precision, and respect as the skin on your face. That is why all CEIN formulations 
                are engineered using highly concentrated, biocompatible actives—such as ceramides, 
                AHA/BHAs, and stabilized Vitamin C—designed to address specific skin concerns and 
                fortify the skin barrier.
              </p>
              <p className={styles.text}>
                Our botanical extracts are sourced responsibly and paired with clean laboratory 
                actives to create powerful synergistic reactions, delivering long-term health, 
                density, and texture improvement.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Biotech Science Section */}
      <section className={styles.section} style={{ backgroundColor: "var(--bg-secondary)", padding: "var(--spacing-xxl) 0" }}>
        <div className="container">
          <div className={`${styles.grid} ${styles.reverseMobile}`}>
            
            <div className={styles.content}>
              <span className={styles.subtitle}>Biotech Excellence</span>
              <h2 className={`font-serif ${styles.sectionTitle}`}>Backed by Clinical Science.</h2>
              <p className={styles.text}>
                We do not believe in synthetic fillers or empty marketing claims. Every single 
                ingredient in a CEIN bottle serves a clinically validated purpose. By partnering 
                with leading European dermatological labs, we utilize green biotechnology to 
                molecularly refine plant stem cells and botanical ferments, boosting their stability 
                and bio-availability.
              </p>
              <p className={styles.text}>
                The result is highly stable, fast-absorbing skincare that targets the root causes 
                of dryness, loss of elasticity, and environmental damage, working in harmony with 
                your skin's natural renewal cycles.
              </p>
            </div>

            <div className={styles.imageWrapper}>
              <Image
                src="/lab_image.png"
                alt="Premium laboratory glassware refining ingredients"
                width={500}
                height={625}
                className={styles.image}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.section} style={{ paddingTop: "var(--spacing-xxl)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "var(--spacing-xl)" }}>
            <span className={styles.subtitle}>Commitments</span>
            <h2 className={`font-serif ${styles.sectionTitle}`} style={{ fontSize: "2.5rem" }}>Our Core Pillars</h2>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>1. Eco-Consciousness</h3>
              <p className={styles.text}>
                We minimize our ecological footprint by using 100% recyclable green and amber 
                glass vessels, compostable outer boxes made from coffee husks, and organic, 
                non-toxic soy inks.
              </p>
            </div>

            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>2. Absolute Transparency</h3>
              <p className={styles.text}>
                Every trace element and active molecule in our products is listed openly. We 
                never mask synthetic fragrances, dyes, or parabens under vague trade labels. 
                What you see is what you apply.
              </p>
            </div>

            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>3. Cruelty-Free & Vegan</h3>
              <p className={styles.text}>
                CEIN is certified by leading animal advocacy groups. We never test raw materials 
                or final formulations on animals, and all components are 100% plant-derived.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "var(--spacing-xxl)" }}>
            <Link href="/shop" className={styles.text} style={{ fontWeight: 600, textDecoration: "underline" }}>
              Explore Our Formulations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

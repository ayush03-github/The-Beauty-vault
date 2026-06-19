"use client";

import React from "react";
import Link from "next/link";
import styles from "./careers.module.css";

interface Job {
  title: string;
  department: string;
  location: string;
  type: string;
}

const OPEN_JOBS: Job[] = [
  {
    title: "Lead Formulation Chemist",
    department: "Research & Development",
    location: "Zurich, Switzerland",
    type: "Full-Time"
  },
  {
    title: "E-commerce Front-end Engineer",
    department: "Engineering",
    location: "Zurich, CH or Remote (GMT+1 / GMT+2)",
    type: "Full-Time"
  },
  {
    title: "Store Manager",
    department: "Retail Operations",
    location: "London Covent Garden, UK",
    type: "Full-Time"
  },
  {
    title: "Digital Marketing Manager",
    department: "Marketing & Growth",
    location: "Paris, France",
    type: "Full-Time"
  }
];

export default function CareersPage() {
  return (
    <div className={styles.careersPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.subtitle}>Join The Team</span>
          <h1 className={`font-serif ${styles.title}`}>Careers at The Beauty Vault</h1>
          <p className={styles.intro}>
            We are always seeking passionate chemists, engineers, creative storytellers, 
            and retail experts to help us pioneer active botanical skincare globally.
          </p>
        </header>

        {/* Open Roles */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Open Positions</h2>
          
          <div className={styles.jobsList}>
            {OPEN_JOBS.map((job) => (
              <div key={job.title} className={styles.jobCard}>
                <div>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <div className={styles.jobMeta}>
                    <span>{job.department}</span>
                    <span> • </span>
                    <span>{job.location}</span>
                    <span> • </span>
                    <span>{job.type}</span>
                  </div>
                </div>
                
                <button 
                  className={styles.applyButton}
                  onClick={() => alert(`Mock application opened for: ${job.title}`)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer info */}
        <section className={styles.footerSection}>
          <p>Don't see a role that matches your experience?</p>
          <p>
            We are always open to hearing from exceptional talent. Send your CV and cover details to{" "}
            <a href="mailto:careers@thebeautyvault.com" style={{ textDecoration: "underline", color: "var(--text-primary)", fontWeight: 500 }}>
              careers@thebeautyvault.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}

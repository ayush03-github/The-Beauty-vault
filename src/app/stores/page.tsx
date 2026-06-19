import React from "react";
import styles from "./stores.module.css";

interface Store {
  name: string;
  address: string;
  phone: string;
  hours: { days: string; time: string }[];
}

const STORES: Store[] = [
  {
    name: "Zurich Flagship",
    address: "Bahnhofstrasse 45, 8001 Zürich, Switzerland",
    phone: "+41 44 211 40 40",
    hours: [
      { days: "Mon – Fri", time: "09:00 – 19:30" },
      { days: "Saturday", time: "09:00 – 18:00" },
      { days: "Sunday", time: "Closed" }
    ]
  },
  {
    name: "Paris Le Marais",
    address: "22 Rue des Francs Bourgeois, 75003 Paris, France",
    phone: "+33 1 42 77 10 10",
    hours: [
      { days: "Mon – Sat", time: "10:00 – 19:00" },
      { days: "Sunday", time: "11:00 – 18:00" }
    ]
  },
  {
    name: "London Covent Garden",
    address: "15 King Street, Covent Garden, London WC2E 8HN",
    phone: "+44 20 7836 2020",
    hours: [
      { days: "Mon – Sat", time: "10:00 – 20:00" },
      { days: "Sunday", time: "12:00 – 18:00" }
    ]
  }
];

export default function StoresPage() {
  return (
    <div className={styles.storesPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.subtitle}>Retail Locations</span>
          <h1 className={`font-serif ${styles.title}`}>Our Stores</h1>
        </header>

        {/* Layout Grid */}
        <div className={styles.layoutGrid}>
          
          {/* Left Stores List */}
          <div className={styles.list}>
            {STORES.map((store) => (
              <div key={store.name} className={styles.storeCard}>
                <h2 className={styles.storeName}>{store.name}</h2>
                <p className={styles.address}>
                  <strong>Address: </strong>{store.address}
                </p>
                <p className={styles.phone}>
                  <strong>Phone: </strong>{store.phone}
                </p>
                
                <h3 className={styles.hoursTitle}>Opening Hours</h3>
                <ul className={styles.hoursList}>
                  {store.hours.map((h, i) => (
                    <React.Fragment key={i}>
                      <li>{h.days}</li>
                      <li>{h.time}</li>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Mock Interactive Map (SVG drawing) */}
          <div className={styles.mapContainer}>
            {/* Aesthetic SVG vector world map background lines */}
            <svg 
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
            >
              <circle cx="50" cy="50" r="45" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="30" />
              <path d="M5 50 h90 M50 5 L50 95" strokeDasharray="2 2" />
              <circle cx="35" cy="40" r="1.5" fill="currentColor" /> {/* London */}
              <circle cx="39" cy="46" r="1.5" fill="currentColor" /> {/* Paris */}
              <circle cx="44" cy="48" r="1.5" fill="currentColor" /> {/* Zurich */}
              <path d="M35 40 L39 46 L44 48" strokeDasharray="1 1" />
            </svg>

            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ marginBottom: "15px", zIndex: 5 }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
            </svg>
            <h3 className={styles.mapTitle}>Interactive Locator</h3>
            <p className={styles.mapText}>Select a retail store on the left to view directions and call lines.</p>
          </div>

        </div>

      </div>
    </div>
  );
}

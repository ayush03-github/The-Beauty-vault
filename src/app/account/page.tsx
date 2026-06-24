"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./account.module.css";

interface Order {
  number: string;
  date: string;
  status: string;
  total: number;
}

const MOCK_ORDERS: Order[] = [
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

interface Address {
  name: string;
  line1: string;
  line2: string;
  country: string;
  phone: string;
}


export default function AccountPage() {
  const { user, loading, error, signIn, signUp, signOut, updateProfileAddress, isMock } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Address editing states
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState<Address>({
    name: "Alexandra Miller",
    line1: "Limmatquai 18, Apt 4C",
    line2: "8001 Zürich",
    country: "Switzerland",
    phone: "+41 79 123 4567"
  });
  const [orders, setOrders] = useState<Order[]>([]);

  // Load custom address and orders dynamically based on user profile state and database
  useEffect(() => {
    if (user) {
      // 1. Load Address
      if (user.address) {
        setAddress(user.address);
      } else {
        setAddress({
          name: user.name || "Customer",
          line1: "Limmatquai 18, Apt 4C",
          line2: "8001 Zürich",
          country: "Switzerland",
          phone: "+41 79 123 4567"
        });
      }

      // 2. Load Orders
      if (isMock) {
        setOrders(MOCK_ORDERS);
      } else {
        const fetchOrders = async () => {
          try {
            const { supabase: supabaseClient } = await import("@/lib/supabase");
            if (supabaseClient) {
              const { data, error: ordersErr } = await supabaseClient
                .from("orders")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

              if (ordersErr) {
                const isTableMissing = ordersErr.code === "PGRST205" || 
                                       ordersErr.message?.includes("schema cache") ||
                                       ordersErr.message?.includes("does not exist");
                if (isTableMissing) {
                  const savedOrders = localStorage.getItem(`tbv_orders_${user.id}`);
                  if (savedOrders) {
                    try {
                      setOrders(JSON.parse(savedOrders));
                    } catch (e) {
                      setOrders([]);
                    }
                  } else {
                    setOrders([]);
                  }
                } else {
                  console.warn("Failed to fetch orders:", ordersErr.message || ordersErr);
                  setOrders([]);
                }
              } else if (data) {
                const mapped = data.map((o: any) => ({
                  number: o.order_number,
                  date: o.date,
                  status: o.status || "Fulfilled",
                  total: Number(o.total),
                }));
                setOrders(mapped);
              }
            }
          } catch (err) {
            console.warn("Failed to load orders:", err);
          }
        };
        fetchOrders();
      }
    } else {
      setOrders([]);
    }
  }, [user, isMock]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);

    const success = await signIn(email, password);
    setFormLoading(false);
    if (!success) {
      setFormError("Invalid email or password");
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);

    const success = await signUp(email, password, name);
    setFormLoading(false);
    if (success) {
      if (isMock) {
        setFormSuccess("Registration successful!");
      } else {
        setFormSuccess("Registration check sent!");
      }
    } else {
      setFormError("Failed to register. Please check credentials.");
    }
  };

  const handleAddressSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setFormLoading(true);
      setFormError(null);
      const success = await updateProfileAddress(address);
      setFormLoading(false);
      if (success) {
        setIsEditingAddress(false);
      } else {
        setFormError("Failed to update address. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.accountPage} style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--text-secondary)" }}>Loading account details...</p>
      </div>
    );
  }

  // Not Logged In - Render Auth Screen
  if (!user) {
    return (
      <div className={styles.accountPage}>
        <div className="container">
          <header className={styles.header}>
            <span className={styles.subtitle}>Welcome</span>
            <h1 className={`font-serif ${styles.title}`}>Account access</h1>
          </header>

          <div className={styles.authContainer}>
            {isMock && (
              <div className={styles.mockBanner}>
                Offline Demo Mode: Local signup enabled
              </div>
            )}

            <div className={styles.authTabs}>
              <button
                className={`${styles.authTab} ${activeTab === "login" ? styles.activeTab : ""}`}
                onClick={() => { setActiveTab("login"); setFormError(null); setFormSuccess(null); }}
              >
                Sign In
              </button>
              <button
                className={`${styles.authTab} ${activeTab === "signup" ? styles.activeTab : ""}`}
                onClick={() => { setActiveTab("signup"); setFormError(null); setFormSuccess(null); }}
              >
                Register
              </button>
            </div>

            {formError && <div className={`${styles.alert} ${styles.errorAlert}`}>{formError || error}</div>}
            {formSuccess && <div className={`${styles.alert} ${styles.successAlert}`}>{formSuccess}</div>}

            {activeTab === "login" ? (
              <form onSubmit={handleLoginSubmit} className={styles.authForm}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    required
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Password</label>
                  <input
                    type="password"
                    required
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
                <button type="submit" className={styles.submitBtn} disabled={formLoading}>
                  {formLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className={styles.authForm}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    required
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Password</label>
                  <input
                    type="password"
                    required
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose password"
                  />
                </div>
                <button type="submit" className={styles.submitBtn} disabled={formLoading}>
                  {formLoading ? "Registering..." : "Create Account"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Logged In - Render Account Dashboard
  return (
    <div className={styles.accountPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.subtitle}>Dashboard</span>
          <h1 className={`font-serif ${styles.title}`}>My Account</h1>
          <p className={styles.welcomeText}>
            Welcome back, <strong>{user.name}</strong> ({user.email})
          </p>
        </header>

        {/* Layout Grid */}
        <div className={styles.layoutGrid}>
          
          {/* Left Order History */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Order History</h2>
            
            {orders.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {orders.map((order) => (
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
            
            {isEditingAddress ? (
              <form onSubmit={handleAddressSave} className={styles.authForm} style={{ border: "1px solid var(--border-light)", padding: "20px", backgroundColor: "var(--bg-secondary)" }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Recipient Name</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Street Address</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>City & Postal Code</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={address.line2}
                    onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Country</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  />
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button type="submit" className={styles.button}>Save</button>
                  <button type="button" className={styles.button} style={{ borderColor: "var(--border-medium)" }} onClick={() => setIsEditingAddress(false)}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className={styles.addressCard}>
                <p className={styles.addressText}>
                  <strong>{address.name}</strong>
                </p>
                <p className={styles.addressText}>{address.line1}</p>
                <p className={styles.addressText}>{address.line2}</p>
                <p className={styles.addressText}>{address.country}</p>
                <p className={styles.addressText} style={{ marginTop: "10px" }}>
                  Phone: {address.phone}
                </p>
                
                <button 
                  className={styles.button}
                  onClick={() => setIsEditingAddress(true)}
                  style={{ marginTop: "10px" }}
                >
                  Edit Address
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Logout Link */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button 
            className={styles.logoutLink}
            onClick={signOut}
          >
            Sign Out of Account
          </button>
        </div>

      </div>
    </div>
  );
}

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

interface CountryOption {
  name: string;
  code: string;
  phoneLength: number;
}

const COUNTRIES: CountryOption[] = [
  { name: "India", code: "+91", phoneLength: 10 },
  { name: "United States", code: "+1", phoneLength: 10 },
  { name: "United Kingdom", code: "+44", phoneLength: 10 },
  { name: "Switzerland", code: "+41", phoneLength: 9 },
  { name: "Canada", code: "+1", phoneLength: 10 },
  { name: "Germany", code: "+49", phoneLength: 11 },
  { name: "Australia", code: "+61", phoneLength: 9 },
];

function parsePhoneNumber(phone: string): { code: string; local: string } {
  const cleaned = phone.trim();
  for (const c of COUNTRIES) {
    if (cleaned.startsWith(c.code)) {
      const local = cleaned.substring(c.code.length).trim().replace(/\s+/g, "");
      return { code: c.code, local };
    }
  }
  if (cleaned.startsWith("+")) {
    const parts = cleaned.split(" ");
    if (parts.length > 1) {
      return { code: parts[0], local: parts.slice(1).join("").replace(/\s+/g, "") };
    }
  }
  return { code: "+91", local: cleaned.replace(/\s+/g, "") };
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

  // Temporary address form fields
  const [editName, setEditName] = useState("");
  const [editLine1, setEditLine1] = useState("");
  const [editLine2, setEditLine2] = useState("");
  const [editCountry, setEditCountry] = useState("Switzerland");
  const [editPhoneCode, setEditPhoneCode] = useState("+41");
  const [editPhoneLocal, setEditPhoneLocal] = useState("791234567");
  const [phoneValidationError, setPhoneValidationError] = useState<string | null>(null);

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

  const validatePhone = (code: string, local: string): boolean => {
    const digitsOnly = local.replace(/\D/g, "");
    if (digitsOnly !== local) {
      setPhoneValidationError("Phone number must contain only digits");
      return false;
    }
    
    if (local.length === 0) {
      setPhoneValidationError("Phone number cannot be empty");
      return false;
    }

    const found = COUNTRIES.find(c => c.code === code);
    if (found) {
      if (found.name === "Germany") {
        if (local.length < 10 || local.length > 11) {
          setPhoneValidationError("Germany phone numbers must be 10 or 11 digits");
          return false;
        }
      } else {
        if (local.length !== found.phoneLength) {
          setPhoneValidationError(`${found.name} phone numbers must be exactly ${found.phoneLength} digits`);
          return false;
        }
      }
    } else {
      if (local.length < 7 || local.length > 15) {
        setPhoneValidationError("Phone number must be between 7 and 15 digits");
        return false;
      }
    }
    
    setPhoneValidationError(null);
    return true;
  };

  const handlePhoneLocalChange = (val: string) => {
    const digits = val.replace(/\D/g, "");
    setEditPhoneLocal(digits);
    validatePhone(editPhoneCode, digits);
  };

  const handlePhoneCodeChange = (code: string) => {
    setEditPhoneCode(code);
    const found = COUNTRIES.find(c => c.code === code);
    if (found) {
      setEditCountry(found.name);
    }
    validatePhone(code, editPhoneLocal);
  };

  const handleCountryChange = (countryName: string) => {
    setEditCountry(countryName);
    const found = COUNTRIES.find(c => c.name === countryName);
    if (found) {
      setEditPhoneCode(found.code);
      validatePhone(found.code, editPhoneLocal);
    }
  };

  const handleStartEdit = () => {
    setEditName(address.name);
    setEditLine1(address.line1);
    setEditLine2(address.line2);
    setEditCountry(address.country);
    
    const parsed = parsePhoneNumber(address.phone);
    setEditPhoneCode(parsed.code);
    setEditPhoneLocal(parsed.local);
    setPhoneValidationError(null);
    setIsEditingAddress(true);
  };

  const handleAddressSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(editPhoneCode, editPhoneLocal)) {
      return;
    }
    
    if (user) {
      setFormLoading(true);
      setFormError(null);
      const newAddress = {
        name: editName,
        line1: editLine1,
        line2: editLine2,
        country: editCountry,
        phone: `${editPhoneCode} ${editPhoneLocal}`,
      };
      
      const success = await updateProfileAddress(newAddress);
      setFormLoading(false);
      if (success) {
        setAddress(newAddress);
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
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Street Address</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={editLine1}
                    onChange={(e) => setEditLine1(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>City & Postal Code</label>
                  <input
                    type="text"
                    required
                    className={styles.input}
                    value={editLine2}
                    onChange={(e) => setEditLine2(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Country</label>
                  <select
                    className={styles.input}
                    value={editCountry}
                    onChange={(e) => handleCountryChange(e.target.value)}
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select
                      className={styles.input}
                      style={{ width: "100px", padding: "0 10px" }}
                      value={editPhoneCode}
                      onChange={(e) => handlePhoneCodeChange(e.target.value)}
                    >
                      {COUNTRIES.map(c => (
                        <option key={`${c.name}-code`} value={c.code}>
                          {c.code} ({c.name})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      className={styles.input}
                      style={{ flex: 1 }}
                      value={editPhoneLocal}
                      onChange={(e) => handlePhoneLocalChange(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  {phoneValidationError && (
                    <span style={{ color: "#e53e3e", fontSize: "0.85rem", marginTop: "4px", display: "block" }}>
                      {phoneValidationError}
                    </span>
                  )}
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
                  onClick={handleStartEdit}
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

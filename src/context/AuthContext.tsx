"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Address {
  name: string;
  line1: string;
  line2: string;
  country: string;
  phone: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  address: Address | null;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfileAddress: (address: Address) => Promise<boolean>;
  isMock: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMock = !supabase;

  // Helper to fetch address from profiles table
  const fetchProfileAddress = async (userId: string, defaultName: string): Promise<Address> => {
    if (!supabase) {
      const savedAddress = localStorage.getItem(`tbv_address_${userId}`);
      if (savedAddress) {
        return JSON.parse(savedAddress);
      }
      return {
        name: defaultName,
        line1: "Limmatquai 18, Apt 4C",
        line2: "8001 Zürich",
        country: "Switzerland",
        phone: "+41 79 123 4567",
      };
    }
    try {
      const { data, error: fetchErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchErr || !data) {
        const isTableMissing = fetchErr?.code === "PGRST205" || 
                               fetchErr?.message?.includes("schema cache") ||
                               fetchErr?.message?.includes("does not exist");
        if (isTableMissing) {
          const savedAddress = localStorage.getItem(`tbv_address_${userId}`);
          if (savedAddress) {
            try {
              return JSON.parse(savedAddress);
            } catch (e) {
              // ignore
            }
          }
        } else {
          console.warn("Profile not found or fetch failed. Using defaults.", fetchErr?.message || fetchErr);
        }
        return {
          name: defaultName,
          line1: "Limmatquai 18, Apt 4C",
          line2: "8001 Zürich",
          country: "Switzerland",
          phone: "+41 79 123 4567",
        };
      }

      return {
        name: data.address_name || data.name || defaultName,
        line1: data.address_line1 || "Limmatquai 18, Apt 4C",
        line2: data.address_line2 || "8001 Zürich",
        country: data.address_country || "Switzerland",
        phone: data.address_phone || "+41 79 123 4567",
      };
    } catch (err) {
      console.warn("Error in fetchProfileAddress:", err);
      return {
        name: defaultName,
        line1: "Limmatquai 18, Apt 4C",
        line2: "8001 Zürich",
        country: "Switzerland",
        phone: "+41 79 123 4567",
      };
    }
  };

  // Sync Supabase Auth or Mock session
  useEffect(() => {
    if (!supabase) {
      // Local Mock Auth Session
      const savedUser = localStorage.getItem("tbv_mock_user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        const savedAddress = localStorage.getItem(`tbv_address_${u.id}`);
        const address: Address = savedAddress ? JSON.parse(savedAddress) : {
          name: u.name || "Customer",
          line1: "Limmatquai 18, Apt 4C",
          line2: "8001 Zürich",
          country: "Switzerland",
          phone: "+41 79 123 4567",
        };
        setUser({
          ...u,
          address,
        });
      }
      setLoading(false);
      return;
    }

    // Supabase Auth Session
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase!.auth.getSession();
        if (session?.user) {
          const defaultName = session.user.user_metadata?.name || "Customer";
          const address = await fetchProfileAddress(session.user.id, defaultName);
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: address.name || defaultName,
            address,
          });
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
      } finally {
        setLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase!.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const defaultName = session.user.user_metadata?.name || "Customer";
        const address = await fetchProfileAddress(session.user.id, defaultName);
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: address.name || defaultName,
          address,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    if (!supabase) {
      // Mock Sign In
      const mockUsers = JSON.parse(localStorage.getItem("tbv_mock_users") || "[]");
      const found = mockUsers.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (found) {
        const loggedUser = { id: found.id, email: found.email, name: found.name };
        localStorage.setItem("tbv_mock_user", JSON.stringify(loggedUser));
        
        const savedAddress = localStorage.getItem(`tbv_address_${found.id}`);
        const address: Address = savedAddress ? JSON.parse(savedAddress) : {
          name: found.name,
          line1: "Limmatquai 18, Apt 4C",
          line2: "8001 Zürich",
          country: "Switzerland",
          phone: "+41 79 123 4567",
        };

        setUser({ ...loggedUser, address });
        return true;
      }
      setError("Invalid email or password");
      return false;
    }

    // Supabase Sign In
    try {
      const { data, error: authError } = await supabase!.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError(authError.message);
        return false;
      }
      if (data.user) {
        const defaultName = data.user.user_metadata?.name || "Customer";
        const address = await fetchProfileAddress(data.user.id, defaultName);
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          name: address.name || defaultName,
          address,
        });
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during sign in.");
      return false;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    setError(null);
    if (!supabase) {
      // Mock Sign Up
      const mockUsers = JSON.parse(localStorage.getItem("tbv_mock_users") || "[]");
      if (mockUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        setError("Email already registered");
        return false;
      }
      const newUser = { id: Math.random().toString(36).substring(2, 11), email, password, name };
      mockUsers.push(newUser);
      localStorage.setItem("tbv_mock_users", JSON.stringify(mockUsers));

      const loggedUser = { id: newUser.id, email: newUser.email, name: newUser.name };
      localStorage.setItem("tbv_mock_user", JSON.stringify(loggedUser));

      const address: Address = {
        name: newUser.name,
        line1: "Limmatquai 18, Apt 4C",
        line2: "8001 Zürich",
        country: "Switzerland",
        phone: "+41 79 123 4567",
      };

      setUser({ ...loggedUser, address });
      return true;
    }

    // Supabase Sign Up
    try {
      const { data, error: authError } = await supabase!.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (authError) {
        setError(authError.message);
        return false;
      }
      if (data.user) {
        if (data.session?.user) {
          const address = await fetchProfileAddress(data.session.user.id, name);
          setUser({
            id: data.session.user.id,
            email: data.session.user.email || "",
            name: address.name || name,
            address,
          });
        } else {
          // If email verification is enabled on Supabase, show confirmation message
          setError("Confirmation link sent! Please check and verify your email.");
        }
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during sign up.");
      return false;
    }
  };

  const signOut = async () => {
    if (!supabase) {
      localStorage.removeItem("tbv_mock_user");
      setUser(null);
      return;
    }

    try {
      await supabase!.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const updateProfileAddress = async (newAddress: Address): Promise<boolean> => {
    setError(null);
    if (!user) return false;
    if (!supabase) {
      localStorage.setItem(`tbv_address_${user.id}`, JSON.stringify(newAddress));
      setUser((prev) => prev ? { ...prev, address: newAddress } : null);
      return true;
    }

    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          address_name: newAddress.name,
          address_line1: newAddress.line1,
          address_line2: newAddress.line2,
          address_country: newAddress.country,
          address_phone: newAddress.phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        const isTableMissing = updateError.code === "PGRST205" || 
                               updateError.message?.includes("schema cache") ||
                               updateError.message?.includes("does not exist");
        if (isTableMissing) {
          localStorage.setItem(`tbv_address_${user.id}`, JSON.stringify(newAddress));
          setUser((prev) => prev ? { ...prev, address: newAddress } : null);
          return true;
        }
        setError(updateError.message);
        return false;
      }

      setUser((prev) => prev ? { ...prev, address: newAddress } : null);
      return true;
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while updating the address.");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut, updateProfileAddress, isMock }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import Sidebar from "@/components/Sidebar";
import "@/styles/settings.css";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="settings-page">
        <Sidebar />

        <main className="settings-content">
          <p>Loading settings...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <Sidebar />

      <main className="settings-content">
        <h1 className="settings-title">Settings</h1>

        <section className="settings-section">
          <h2 className="settings-section-title">Your Subscription plan</h2>
          <p className="settings-value">premium-plus</p>
        </section>

        <section className="settings-section">
          <h2 className="settings-section-title">Email</h2>
          <p className="settings-value">
            {user?.email || "No email available"}
          </p>
        </section>
      </main>
    </div>
  );
}
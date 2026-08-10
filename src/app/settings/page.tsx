"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { auth, db } from "@/firebase/firebase";
import Sidebar from "@/components/Sidebar";
import type { AppDispatch } from "@/store/store";
import { openLoginModal } from "@/store/features/authModalSlice";
import "@/styles/settings.css";

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState("basic");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setPlan("basic");
        setLoading(false);
        return;
      }

      try {
        const userSnapshot = await getDoc(doc(db, "users", currentUser.uid));
        const subscriptionPlan = userSnapshot.data()?.subscriptionPlan;
        setPlan(
          subscriptionPlan === "premium" || subscriptionPlan === "premium-plus"
            ? subscriptionPlan
            : "basic"
        );
      } catch (error) {
        console.error("Error loading subscription:", error);
        setPlan("basic");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="settings-page">
        <Sidebar />
        <main className="settings-content" aria-busy="true">
          <div className="settings-skeleton settings-skeleton--title" />
          <div className="settings-skeleton" />
          <div className="settings-skeleton" />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="settings-page">
        <Sidebar />
        <main className="settings-content settings-content--logged-out">
          <Image
            src="/assets/login.png"
            alt="Sign in to view your Summarist settings"
            width={320}
            height={240}
            className="settings-login-image"
          />
          <h1 className="settings-title">Log in to view your settings.</h1>
          <p>Your account and subscription details will appear here.</p>
          <button
            type="button"
            className="settings-login-button"
            onClick={() => dispatch(openLoginModal())}
          >
            Log in
          </button>
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
          <h2 className="settings-section-title">Your subscription plan</h2>
          <p className="settings-value">{plan}</p>
          {plan === "basic" && (
            <Link className="settings-upgrade-link" href="/choose-plan">
              Upgrade plan
            </Link>
          )}
        </section>

        <section className="settings-section">
          <h2 className="settings-section-title">Email</h2>
          <p className="settings-value">
            {user.isAnonymous ? "Guest account" : user.email || "No email available"}
          </p>
        </section>
      </main>
    </div>
  );
}

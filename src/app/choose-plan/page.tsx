"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { auth, db } from "@/firebase/firebase";
import type { AppDispatch } from "@/store/store";
import { openLoginModal } from "@/store/features/authModalSlice";
import "@/styles/choosePlan.css";

const faqs = [
  {
    question: "What is included with a premium plan?",
    answer:
      "Premium access unlocks the complete Summarist reading and listening experience used in this internship project.",
  },
  {
    question: "Is this a real paid subscription?",
    answer:
      "No. This public portfolio version uses a demo subscription state so visitors can explore the full application without entering payment information.",
  },
  {
    question: "What happens with the annual plan?",
    answer:
      "The annual demo plan includes the seven-day trial behavior required by the internship brief. No charge is created in this portfolio version.",
  },
];

export default function ChoosePlanPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const activateDemoPlan = async () => {
    if (!user) {
      dispatch(openLoginModal());
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const isAnnual = selectedPlan === "annual";
      const trialEndsAt = isAnnual
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        : null;

      await setDoc(
        doc(db, "users", user.uid),
        {
          subscriptionPlan: isAnnual ? "premium-plus" : "premium",
          subscriptionInterval: selectedPlan,
          trialEndsAt,
          subscriptionUpdatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setMessage(
        isAnnual
          ? "Annual demo access is active with a 7-day trial."
          : "Monthly demo access is active."
      );
    } catch (error) {
      console.error("Error activating demo plan:", error);
      setMessage("Unable to update the demo plan right now.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="plan-page">
      <header className="plan-header">
        <Link href="/" aria-label="Summarist home">
          <Image
            src="/assets/logo.png"
            alt="Summarist"
            width={160}
            height={40}
            priority
          />
        </Link>
        <Link href="/for-you" className="plan-back-link">
          Back to books
        </Link>
      </header>

      <section className="plan-hero">
        <div className="plan-hero__copy">
          <p className="plan-eyebrow">Choose your plan</p>
          <h1>Get full access to Summarist.</h1>
          <p>
            This internship build includes the plan-selection experience. The
            public portfolio version uses demo access instead of collecting real
            payment information.
          </p>
        </div>

        <Image
          src="/assets/pricing-top.png"
          alt="Illustration for Summarist plans"
          width={420}
          height={240}
          className="plan-hero__image"
        />
      </section>

      <section className="plan-options" aria-label="Subscription options">
        <button
          type="button"
          className={selectedPlan === "monthly" ? "plan-card plan-card--selected" : "plan-card"}
          onClick={() => setSelectedPlan("monthly")}
          aria-pressed={selectedPlan === "monthly"}
        >
          <span className="plan-card__label">Monthly</span>
          <strong>$9.99</strong>
          <span>per month</span>
          <span className="plan-card__detail">Demo premium access</span>
        </button>

        <button
          type="button"
          className={selectedPlan === "annual" ? "plan-card plan-card--selected" : "plan-card"}
          onClick={() => setSelectedPlan("annual")}
          aria-pressed={selectedPlan === "annual"}
        >
          <span className="plan-card__badge">Most popular</span>
          <span className="plan-card__label">Annual</span>
          <strong>$79.99</strong>
          <span>per year</span>
          <span className="plan-card__detail">Includes a 7-day demo trial</span>
        </button>
      </section>

      <section className="plan-action">
        <button
          type="button"
          className="plan-action__button"
          onClick={() => void activateDemoPlan()}
          disabled={saving}
        >
          {saving
            ? "Updating..."
            : user
              ? `Activate ${selectedPlan === "annual" ? "annual" : "monthly"} demo plan`
              : "Log in to continue"}
        </button>
        <p className="plan-action__note">
          Portfolio demo only — no charge or payment information is collected.
        </p>
        {message && <p className="plan-action__message" role="status">{message}</p>}
      </section>

      <section className="plan-faq">
        <h2>Frequently asked questions</h2>
        {faqs.map((faq, index) => {
          const isOpen = openFaq === index;

          return (
            <div className="plan-faq__item" key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <p>{faq.answer}</p>}
            </div>
          );
        })}
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {
  closeModal,
  openLoginModal,
  openRegisterModal,
} from "../../store/features/authModalSlice";
import "./AuthModal.css";
import {
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/firebase";

export default function AuthModal() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { isOpen, mode } = useSelector(
    (state: RootState) => state.authModal
  );

  const handleAuthSuccess = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    dispatch(closeModal());
    router.push("/for-you");
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }

        await createUserWithEmailAndPassword(auth, email, password);
      }

      handleAuthSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("auth/invalid-credential")) {
          setErrorMessage("Incorrect email or password.");
        } else if (error.message.includes("auth/email-already-in-use")) {
          setErrorMessage("An account already exists with this email.");
        } else if (error.message.includes("auth/invalid-email")) {
          setErrorMessage("Please enter a valid email address.");
        } else if (error.message.includes("auth/weak-password")) {
          setErrorMessage("Password must be at least 6 characters.");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuestLogin = async () => {
    setErrorMessage("");
    setSubmitting(true);

    try {
      await signInAnonymously(auth);
      handleAuthSuccess();
    } catch {
      setErrorMessage("Guest login is unavailable right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="auth-modal__overlay" role="presentation">
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          className="auth-modal__close"
          onClick={() => dispatch(closeModal())}
          aria-label="Close authentication modal"
          type="button"
        >
          ×
        </button>

        <h2 id="auth-modal-title">
          {mode === "login"
            ? "Log in to Summarist"
            : "Create your account"}
        </h2>

        {mode === "login" && (
          <div className="auth-modal__socials">
            <button
              type="button"
              className="auth-modal__guest"
              onClick={() => void handleGuestLogin()}
              disabled={submitting}
            >
              Continue as Guest
            </button>
          </div>
        )}

        {mode === "login" && (
          <div className="auth-modal__divider">
            <span>or</span>
          </div>
        )}

        <form
          className="auth-modal__form"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />

          {mode === "register" && (
            <>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                minLength={6}
              />
            </>
          )}

          {errorMessage && (
            <p className="auth-modal__error" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="auth-modal__submit"
            disabled={submitting}
          >
            {submitting
              ? "Please wait..."
              : mode === "login"
                ? "Log In"
                : "Create Account"}
          </button>
        </form>

        <p className="auth-modal__footer">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            className="auth-modal__link"
            onClick={() => {
              setErrorMessage("");
              dispatch(
                mode === "login" ? openRegisterModal() : openLoginModal()
              );
            }}
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

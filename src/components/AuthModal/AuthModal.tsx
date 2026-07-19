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
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/firebase";


export default function AuthModal() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
  try {
    if (mode === "login") {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully!");
      handleAuthSuccess();
    } else {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created successfully!");
      handleAuthSuccess();
    }
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
  }
};

if (!isOpen) {
  return null;
}

return (

  <div className="auth-modal__overlay">
    <div className="auth-modal">
      <button
        className="auth-modal__close"
        onClick={() => dispatch(closeModal())}
        aria-label="Close authentication modal"
      >
        ×
      </button>

      <h2>
        {mode === "login"
          ? "Log in to Summarist"
          : "Create your account"}
      </h2>

      <div className="auth-modal__socials">
        <button type="button" className="auth-modal__google">
          Continue with Google
        </button>

        {mode === "login" && (
          <button type="button" className="auth-modal__guest">
            Continue as Guest
          </button>
        )}
      </div>

      <div className="auth-modal__divider">
        <span>or</span>
      </div>

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
        />

        <label htmlFor="password">Password</label>
        <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
        />

        {mode === "register" && (
          <>
            <label htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </>
        )}

        {mode === "login" && (
          <button
            type="button"
            className="auth-modal__forgot"
          >
            Forgot password?
          </button>
        )}

        {errorMessage && (
          <p className="auth-modal__error">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="auth-modal__submit"
        >
          {mode === "login" ? "Log In" : "Create Account"}
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
              mode === "login"
                ? openRegisterModal()
                : openLoginModal()
            )
          }}
        >
          {mode === "login"
            ? "Create an account"
            : "Log in"}
        </button>
      </p>
    </div>
  </div>
);
}
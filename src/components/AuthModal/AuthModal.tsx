"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {
  closeModal,
  openLoginModal,
  openRegisterModal,
} from "../../store/features/authModalSlice";
import "./AuthModal.css";

export default function AuthModal() {
  const dispatch = useDispatch<AppDispatch>();

  const { isOpen, mode } = useSelector(
    (state: RootState) => state.authModal
  );

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

      <form className="auth-modal__form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email address"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
        />

        {mode === "register" && (
          <>
            <label htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
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
          onClick={() =>
            dispatch(
              mode === "login"
                ? openRegisterModal()
                : openLoginModal()
            )
          }
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
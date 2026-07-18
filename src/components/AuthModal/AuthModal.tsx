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

        <h2>{mode === "login" ? "Log in to Summarist" : "Create your account"}</h2>

        <p>
          {mode === "login"
            ? "Welcome back!"
            : "Start learning from the world’s best books."}
        </p>

        {mode === "login" ? (
            <button
                type="button"
                className="auth-modal__switch"
                onClick={() => dispatch(openRegisterModal())}
            >
                Create an account
            </button>
            ) : (
            <button
                type="button"
                className="auth-modal__switch"
                onClick={() => dispatch(openLoginModal())}
            >
                Already have an account? Log in
            </button>
            )}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { openLoginModal } from "@/store/features/authModalSlice";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import {
  FiHome,
  FiBookOpen,
  FiEdit3,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";

import { auth } from "@/firebase/firebase";
import "@/styles/sidebar.css";

interface SidebarProps {
  showFontControls?: boolean;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
}

export default function Sidebar({
  showFontControls = false,
  fontSize,
  onFontSizeChange,
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const closeMobileNav = () => setIsMobileOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMobileNav();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLogin = () => {
    closeMobileNav();
    dispatch(openLoginModal());
  };

  return (
    <>
      <button
        type="button"
        className="sidebar-mobile-button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open navigation"
        aria-expanded={isMobileOpen}
      >
        <FiMenu />
      </button>

      {isMobileOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={closeMobileNav}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={isMobileOpen ? "sidebar sidebar--mobile-open" : "sidebar"}
      >
        <button
          type="button"
          className="sidebar-mobile-close"
          onClick={closeMobileNav}
          aria-label="Close navigation"
        >
          <FiX />
        </button>

        <div className="sidebar__content">
          <div className="sidebar__top">
            <div className="sidebar__logo">📘 Summarist</div>

            <nav className="sidebar__nav" aria-label="Summarist navigation">
              <Link className="sidebar__link" href="/for-you" onClick={closeMobileNav}>
                <FiHome />
                <span>For You</span>
              </Link>

              <Link className="sidebar__link" href="/library" onClick={closeMobileNav}>
                <FiBookOpen />
                <span>My Library</span>
              </Link>

              <button
                className="sidebar__link sidebar__link--disabled"
                type="button"
                disabled
                title="Highlights are not part of this internship build"
              >
                <FiEdit3 />
                <span>Highlights</span>
              </button>

              <button
                className="sidebar__link sidebar__link--disabled"
                type="button"
                disabled
                title="Use the search bar at the top of the page"
              >
                <FiSearch />
                <span>Search</span>
              </button>
            </nav>
          </div>

          {showFontControls && onFontSizeChange && (
            <div className="sidebar__font-controls">
              {[14, 16, 18, 20].map((size, index) => (
                <button
                  key={size}
                  type="button"
                  className={
                    fontSize === size
                      ? "sidebar__font-button sidebar__font-button--active"
                      : "sidebar__font-button"
                  }
                  style={{ fontSize: `${13 + index * 3}px` }}
                  onClick={() => onFontSizeChange(size)}
                >
                  Aa
                </button>
              ))}
            </div>
          )}

          <div className="sidebar__bottom">
            <Link className="sidebar__link" href="/settings" onClick={closeMobileNav}>
              <FiSettings />
              <span>Settings</span>
            </Link>

            <button
              className="sidebar__link sidebar__link--disabled"
              type="button"
              disabled
              title="Help and support are not part of this internship build"
            >
              <FiHelpCircle />
              <span>Help & Support</span>
            </button>

            {user ? (
              <button
                className="sidebar__link sidebar__logout"
                type="button"
                onClick={() => void handleLogout()}
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            ) : (
              <button
                className="sidebar__link sidebar__logout"
                type="button"
                onClick={handleLogin}
              >
                <FiLogIn />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

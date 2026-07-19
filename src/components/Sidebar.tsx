"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import {
  FiHome,
  FiBookOpen,
  FiEdit3,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
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

  return (
    <>
  <button
    type="button"
    className="sidebar-mobile-button"
    onClick={() => setIsMobileOpen(true)}
    aria-label="Open navigation"
  >
    <FiMenu />
  </button>

  {isMobileOpen && (
    <button
      type="button"
      className="sidebar-overlay"
      onClick={() => setIsMobileOpen(false)}
      aria-label="Close navigation"
    />
  )}

  <aside
    className={
      isMobileOpen
        ? "sidebar sidebar--mobile-open"
        : "sidebar"
    }
  >
    <button
      type="button"
      className="sidebar-mobile-close"
      onClick={() => setIsMobileOpen(false)}
      aria-label="Close navigation"
    >
      <FiX />
    </button>
    <div className="sidebar__content">
      <div className="sidebar__top">
        <div className="sidebar__logo">
          📘 Summarist
        </div>

        <nav className="sidebar__nav">
          <Link className="sidebar__link" href="/for-you">
            <FiHome />
            <span>For You</span>
          </Link>

          <Link className="sidebar__link" href="/library">
            <FiBookOpen />
            <span>My Library</span>
          </Link>

          <Link className="sidebar__link" href="/highlights">
            <FiEdit3 />
            <span>Highlights</span>
          </Link>

          <Link className="sidebar__link" href="/search">
            <FiSearch />
            <span>Search</span>
          </Link>
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
        <Link className="sidebar__link" href="/settings">
          <FiSettings />
          <span>Settings</span>
        </Link>

        <Link className="sidebar__link" href="/help">
          <FiHelpCircle />
          <span>Help & Support</span>
        </Link>

        <button className="sidebar__link sidebar__logout" type="button">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </aside>
    </>
  );
}
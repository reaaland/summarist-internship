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

export default function Sidebar() {
  return (
    <aside className="sidebar">
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
    </aside>
  );
}
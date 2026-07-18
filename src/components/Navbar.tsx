"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { openLoginModal } from "../store/features/authModalSlice";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image
            className="nav__img"
            src="/assets/logo.png"
            alt="Summarist Logo"
            width={160}
            height={40}
          />
        </figure>

        <ul className="nav__list--wrapper">
          <li
            className="nav__list nav__list--login"
            onClick={() => dispatch(openLoginModal())}
          >
            Login
          </li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
}
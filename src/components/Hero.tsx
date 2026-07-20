"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import type { AppDispatch } from "../store/store";
import { openLoginModal } from "../store/features/authModalSlice";
import { auth } from "../firebase/firebase";

export default function Hero() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(Boolean(user));
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      router.push("/for-you");
      return;
    }

    dispatch(openLoginModal());
  };

  return (
    <section id="landing">
      <div className="container">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__content">
              <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>

              <div className="landing__content__subtitle">
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don’t like to read.
              </div>

              <button
                className="btn"
                type="button"
                onClick={handleButtonClick}
                disabled={checkingAuth}
              >
                {checkingAuth
                  ? "Loading..."
                  : isLoggedIn
                  ? "Go to For You"
                  : "Login"}
              </button>
            </div>

            <figure className="landing__image--mask">
              <Image
                src="/assets/landing.png"
                alt="Summarist landing illustration"
                width={500}
                height={500}
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
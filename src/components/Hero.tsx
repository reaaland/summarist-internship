"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { openLoginModal } from "../store/features/authModalSlice";

export default function Hero() {
  const dispatch = useDispatch<AppDispatch>();

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
                onClick={() => dispatch(openLoginModal())}
              >
                Login
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
  )

  }
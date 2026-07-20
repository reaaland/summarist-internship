"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { BsStarFill } from "react-icons/bs";

import type { AppDispatch } from "../store/store";
import { openLoginModal } from "../store/features/authModalSlice";
import { auth } from "../firebase/firebase";

export default function Reviews() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const reviews = [
    {
      name: "Hanna M.",
      review: (
        <>
          This app has been a <b>game-changer</b> for me! It's saved me so
          much time and effort in reading and comprehending books. Highly
          recommend it to all book lovers.
        </>
      ),
    },
    {
      name: "David B.",
      review: (
        <>
          I love this app! It provides{" "}
          <b>concise and accurate summaries</b> of books in a way that is easy
          to understand. It's also very user-friendly and intuitive.
        </>
      ),
    },
    {
      name: "Nathan S.",
      review: (
        <>
          This app is a great way to get the main takeaways from a book without
          having to read the entire thing.{" "}
          <b>The summaries are well-written and informative.</b> Definitely
          worth downloading.
        </>
      ),
    },
    {
      name: "Ryan R.",
      review: (
        <>
          If you're a busy person who{" "}
          <b>loves reading but doesn't have the time</b> to read every book
          in full, this app is for you! The summaries are thorough and provide a
          great overview of the book's content.
        </>
      ),
    },
  ];

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
    <section id="reviews">
      <div className="row">
        <div className="container">
          <div className="section__title">What our members say</div>

          <div className="reviews__wrapper">
            {reviews.map((review) => (
              <div key={review.name} className="review">
                <div className="review__header">
                  <div className="review__name">{review.name}</div>

                  <div className="review__stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <BsStarFill key={index} />
                    ))}
                  </div>
                </div>

                <div className="review__body">{review.review}</div>
              </div>
            ))}
          </div>

          <div className="reviews__btn--wrapper">
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
        </div>
      </div>
    </section>
  );
}
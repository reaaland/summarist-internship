"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import AudioPlayer from "@/components/AudioPlayer";
import type { Book } from "@/types/book";
import type { AppDispatch } from "@/store/store";
import { openLoginModal } from "@/store/features/authModalSlice";
import { auth, db } from "@/firebase/firebase";
import "@/styles/appLayout.css";
import "@/styles/player.css";

export default function PlayerPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    if (!params.id) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        dispatch(openLoginModal());
        return;
      }

      try {
        setLoading(true);
        setErrorMessage("");

        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${params.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to load book.");
        }

        const data: Book = await response.json();

        if (data.subscriptionRequired) {
          const userSnapshot = await getDoc(doc(db, "users", user.uid));
          const plan = userSnapshot.data()?.subscriptionPlan;
          const hasPremiumAccess = plan === "premium" || plan === "premium-plus";

          if (!hasPremiumAccess) {
            router.replace("/choose-plan");
            return;
          }
        }

        setBook(data);
      } catch (error) {
        console.error("Error fetching player book:", error);
        setErrorMessage("Unable to load this book.");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [dispatch, params.id, router]);

  return (
    <>
      <Sidebar
        showFontControls
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />

      <div className="app-content player-layout">
        <header className="app-header">
          <SearchBar />
        </header>

        <main className="player-page">
          {loading && <p aria-busy="true">Loading player...</p>}
          {!loading && errorMessage && <p role="alert">{errorMessage}</p>}

          {!loading && !errorMessage && book && (
            <>
              <h1>{book.title}</h1>
              <p className="player-page__author">{book.author}</p>
              <article
                className="player-reading"
                style={{ fontSize: `${fontSize}px` }}
              >
                {book.summary}
              </article>
              <AudioPlayer book={book} />
            </>
          )}
        </main>
      </div>
    </>
  );
}

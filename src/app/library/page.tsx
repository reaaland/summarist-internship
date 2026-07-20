"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useDispatch } from "react-redux";

import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import type { Book } from "@/types/book";
import type { AppDispatch } from "@/store/store";
import { openLoginModal } from "@/store/features/authModalSlice";
import { auth, db } from "@/firebase/firebase";

import "@/styles/appLayout.css";
import "@/styles/library.css";

interface SavedBook extends Book {
  savedAt?: unknown;
}

export default function LibraryPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<SavedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoggedIn(false);
        setSavedBooks([]);
        setFinishedBooks([]);
        setLoading(false);
        return;
      }

      setLoggedIn(true);

      try {
        setLoading(true);
        setErrorMessage("");

        const savedBooksQuery = query(
          collection(db, "users", user.uid, "library"),
          orderBy("savedAt", "desc")
        );

        const savedSnapshot = await getDocs(savedBooksQuery);

        const saved = savedSnapshot.docs.map((document) => ({
          ...(document.data() as Book),
          id: document.id,
        }));

        setSavedBooks(saved);

        const finishedBooksQuery = query(
          collection(db, "users", user.uid, "finished"),
          orderBy("finishedAt", "desc")
        );

        const finishedSnapshot = await getDocs(finishedBooksQuery);

        const finished = finishedSnapshot.docs.map((document) => ({
          ...(document.data() as Book),
          id: document.id,
        }));

        setFinishedBooks(finished);
      } catch (error) {
        console.error("Error loading library:", error);
        setErrorMessage("Unable to load your library.");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Sidebar />

      <div className="app-content">
        <header className="app-header">
          <SearchBar />
        </header>

        <main className="library-page">
          <h1 className="library-page__title">
            My Library
          </h1>

          {loading && (
            <div className="library-page__loading">
              <section className="library-section">
                <div className="library-section__heading">
                  <div className="library-skeleton library-skeleton--heading" />
                  <div className="library-skeleton library-skeleton--count" />
                </div>

                <div className="library-grid">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      className="library-card-skeleton"
                      key={index}
                    >
                      <div className="library-skeleton library-skeleton--image" />
                      <div className="library-skeleton library-skeleton--title" />
                      <div className="library-skeleton library-skeleton--author" />
                      <div className="library-skeleton library-skeleton--text" />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {!loading && loggedIn === false && (
            <section className="library-empty">
              <h2>Log in to see your library.</h2>

              <button
                type="button"
                onClick={() => dispatch(openLoginModal())}
              >
                Log in
              </button>
            </section>
          )}

          {!loading && errorMessage && (
            <p className="library-page__message">
              {errorMessage}
            </p>
          )}

          {!loading &&
            loggedIn &&
            !errorMessage && (
              <>
                <section className="library-section">
                  <div className="library-section__heading">
                    <div>
                      <h2>Saved Books</h2>
                      <p>
                        {savedBooks.length}{" "}
                        {savedBooks.length === 1
                          ? "item"
                          : "items"}
                      </p>
                    </div>
                  </div>

                  {savedBooks.length > 0 ? (
                    <div className="library-grid">
                      {savedBooks.map((book) => (
                        <BookCard
                          key={book.id}
                          book={book}
                          showPremium
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="library-page__message">
                      You have not saved any books yet.
                    </p>
                  )}
                </section>

                <section className="library-section">
                  <div className="library-section__heading">
                    <div>
                      <h2>Finished</h2>
                      <p>
                        {finishedBooks.length}{" "}
                        {finishedBooks.length === 1
                          ? "item"
                          : "items"}
                      </p>
                    </div>
                  </div>

                  {finishedBooks.length > 0 ? (
                    <div className="library-grid">
                      {finishedBooks.map((book) => (
                        <BookCard
                          key={book.id}
                          book={book}
                          showPremium
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="library-page__message">
                      Finished books will appear here.
                    </p>
                  )}
                </section>
              </>
            )}
        </main>
      </div>
    </>
  );
}
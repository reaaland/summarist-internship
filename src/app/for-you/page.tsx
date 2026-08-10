"use client";

import { useEffect, useState } from "react";
import type { Book } from "@/types/book";
import SelectedBook from "@/components/SelectedBook";
import BookCard from "@/components/BookCard";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import "@/styles/forYou.css";
import "@/styles/appLayout.css";

async function fetchBooks(status: string): Promise<Book[]> {
  const response = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=${status}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load ${status} books.`);
  }

  return response.json() as Promise<Book[]>;
}

export default function ForYouPage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const [selected, recommended, suggested] = await Promise.all([
          fetchBooks("selected"),
          fetchBooks("recommended"),
          fetchBooks("suggested"),
        ]);

        setSelectedBook(selected[0] ?? null);
        setRecommendedBooks(recommended);
        setSuggestedBooks(suggested);
      } catch (error) {
        console.error("Error loading For You books:", error);
        setErrorMessage("Unable to load the book recommendations right now.");
      } finally {
        setLoading(false);
      }
    };

    void loadBooks();
  }, []);

  return (
    <>
      <Sidebar />

      <div className="app-content">
        <header className="app-header">
          <SearchBar />
        </header>

        <main>
          <h1>For You</h1>

          {loading && (
            <div className="for-you-loading" aria-busy="true" aria-label="Loading books">
              <div className="for-you-skeleton for-you-skeleton--selected" />
              <div className="for-you-skeleton for-you-skeleton--heading" />
              <div className="for-you-skeleton-grid">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div className="for-you-skeleton for-you-skeleton--card" key={index} />
                ))}
              </div>
            </div>
          )}

          {!loading && errorMessage && (
            <p className="for-you-message" role="alert">{errorMessage}</p>
          )}

          {!loading && !errorMessage && (
            <>
              {selectedBook && <SelectedBook book={selectedBook} />}

              <section className="recommended">
                <h2 className="recommended__title">Recommended For You</h2>
                <p className="recommended__subtitle">We think you’ll like these</p>
                <div className="recommended__books">
                  {recommendedBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </section>

              <section className="suggested">
                <h2 className="suggested__title">Suggested Books</h2>
                <p className="suggested__subtitle">Browse books we think you&apos;ll enjoy</p>
                <div className="suggested__books">
                  {suggestedBooks.map((book) => (
                    <BookCard key={book.id} book={book} showPremium />
                  ))}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
}

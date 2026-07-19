"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import SelectedBook from "@/components/SelectedBook";
import BookCard from "@/components/BookCard";
import "@/styles/forYou.css";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";

export default function ForYouPage() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
    const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);

    useEffect(() => {
  const fetchSelectedBook = async () => {
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );

    const data = await response.json();

    console.log(data)

    setSelectedBook(data[0]);
  };

  fetchSelectedBook();
}, []);

    useEffect(() => {
  const fetchRecommendedBooks = async () => {
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );

    const data = await response.json();

    setRecommendedBooks(data);
  };

  fetchRecommendedBooks();
}, []);

useEffect(() => {
  const fetchSuggestedBooks = async () => {
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );

    const data = await response.json();

    setSuggestedBooks(data);
  };

  fetchSuggestedBooks();
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

        {selectedBook ? (
          <SelectedBook book={selectedBook} />
        ) : (
          <p>Loading...</p>
        )}

        <section className="recommended">
          <h2 className="recommended__title">
            Recommended For You
          </h2>

          <p className="recommended__subtitle">
            We think you’ll like these
          </p>

          <div className="recommended__books">
            {recommendedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))}
          </div>
        </section>

        <section className="suggested">
          <h2 className="suggested__title">
            Suggested Books
          </h2>

          <p className="suggested__subtitle">
            Browse books we think you'll enjoy
          </p>

          <div className="suggested__books">
            {suggestedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                showPremium
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  </>
);
}
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import type { Book } from "@/types/book";
import "@/styles/bookDetails.css";
import "@/styles/appLayout.css";


export default function BookDetailsPage() {
  const params = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
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
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setErrorMessage("Unable to load this book.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      void fetchBook();
    }
  }, [params.id]);

  return (
    <>
      <Sidebar />

      <div className="app-content">
        <header className="app-header">
          <SearchBar />
        </header>

        <main>
          {!loading && !errorMessage && book && (
            <section className="book-details">
                <div className="book-details__top">
                <div className="book-details__content">
                    <h1 className="book-details__title">
                    {book.title}
                    </h1>

                    <p className="book-details__author">
                    {book.author}
                    </p>

                    <p className="book-details__subtitle">
                    {book.subTitle}
                    </p>

                    <div className="book-details__info">
                    <span>⭐ {book.averageRating}</span>
                    <span>{book.totalRating} ratings</span>
                    <span>{book.type}</span>
                    </div>

                    <div className="book-details__buttons">
                    <button
                      type="button"
                      onClick={() => router.push(`/player/${book.id}`)}
                    >
                      Read
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push(`/player/${book.id}`)}
                    >
                      Listen
                    </button>
                  </div>

                    {book.subscriptionRequired && (
                    <p className="book-details__premium">
                        Premium
                    </p>
                    )}
                </div>

                <div className="book-details__image-wrapper">
                    <img
                    className="book-details__image"
                    src={book.imageLink}
                    alt={book.title}
                    />
                </div>
                </div>

                <div className="book-details__section">
                <h2>What's it about?</h2>
                <p>{book.bookDescription}</p>
                </div>

                <div className="book-details__section">
                <h2>About the author</h2>
                <p>{book.authorDescription}</p>
                </div>

                <div className="book-details__section">
                <h2>Key ideas</h2>
                <p className="book-details__pre-line">
                    {book.keyIdeas}
                </p>
                </div>
            </section>
            )}
        </main>
      </div>
    </>
  );
}
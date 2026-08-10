"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import type { Book } from "@/types/book";
import "@/styles/searchBar.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      setResults([]);
      setLoading(false);
      setHasSearched(false);
      setErrorMessage("");
      return;
    }

    const controller = new AbortController();
    const debounceTimer = setTimeout(() => {
      const fetchResults = async () => {
        try {
          setLoading(true);
          setHasSearched(true);
          setErrorMessage("");

          const response = await fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
              trimmedSearch
            )}`,
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error("Failed to search for books.");
          }

          const data: Book[] = await response.json();
          setResults(data);
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            return;
          }

          console.error("Error searching for books:", error);
          setResults([]);
          setErrorMessage("Search is unavailable right now.");
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }
      };

      void fetchResults();
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [search]);

  const showDropdown =
    search.trim().length > 0 &&
    (loading || results.length > 0 || hasSearched || Boolean(errorMessage));

  const clearSearch = () => {
    setSearch("");
    setResults([]);
    setHasSearched(false);
    setErrorMessage("");
  };

  return (
    <div className="search-bar">
      <div className="search-bar__field">
        <label className="search-bar__sr-only" htmlFor="book-search">
          Search books by title or author
        </label>
        <input
          id="book-search"
          className="search-bar__input"
          type="search"
          placeholder="Search by title or author"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          autoComplete="off"
        />

        <FiSearch className="search-bar__icon" aria-hidden="true" />
      </div>

      {showDropdown && (
        <div className="search-bar__results" role="status" aria-live="polite">
          {loading && <p className="search-bar__message">Searching...</p>}

          {!loading && errorMessage && (
            <p className="search-bar__message">{errorMessage}</p>
          )}

          {!loading &&
            !errorMessage &&
            results.map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className="search-bar__result"
                onClick={clearSearch}
              >
                <Image
                  className="search-bar__result-image"
                  src={book.imageLink}
                  alt=""
                  width={48}
                  height={68}
                  unoptimized
                />

                <div className="search-bar__result-copy">
                  <p className="search-bar__result-title">{book.title}</p>
                  <p className="search-bar__result-author">{book.author}</p>
                </div>
              </Link>
            ))}

          {!loading &&
            !errorMessage &&
            hasSearched &&
            results.length === 0 && (
              <p className="search-bar__message">No books found.</p>
            )}
        </div>
      )}
    </div>
  );
}

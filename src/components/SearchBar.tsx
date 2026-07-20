"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import type { Book } from "@/types/book";
import "@/styles/searchBar.css";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      setResults([]);
      setLoading(false);
      setHasSearched(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      const fetchResults = async () => {
        try {
          setLoading(true);
          setHasSearched(true);

          const response = await fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
              trimmedSearch
            )}`
          );

          if (!response.ok) {
            throw new Error("Failed to search for books.");
          }

          const data: Book[] = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Error searching for books:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };

      void fetchResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  const showDropdown =
    search.trim().length > 0 &&
    (loading || results.length > 0 || hasSearched);

  return (
    <div className="search-bar">
      <div className="search-bar__field">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search for books"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <FiSearch className="search-bar__icon" />
      </div>

      {showDropdown && (
        <div className="search-bar__results">
          {loading && (
            <p className="search-bar__message">
              Searching...
            </p>
          )}

          {!loading &&
            results.map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className="search-bar__result"
                onClick={() => {
                  setSearch("");
                  setResults([]);
                  setHasSearched(false);
                }}
              >
                <img
                  className="search-bar__result-image"
                  src={book.imageLink}
                  alt={book.title}
                />

                <div className="search-bar__result-copy">
                  <p className="search-bar__result-title">
                    {book.title}
                  </p>

                  <p className="search-bar__result-author">
                    {book.author}
                  </p>
                </div>
              </Link>
            ))}

          {!loading &&
            hasSearched &&
            results.length === 0 && (
              <p className="search-bar__message">
                No books found.
              </p>
            )}
        </div>
      )}
    </div>
  );
}
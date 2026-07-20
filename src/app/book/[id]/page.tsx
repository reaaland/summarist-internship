"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";

import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import type { Book } from "@/types/book";
import type { AppDispatch } from "@/store/store";
import { openLoginModal } from "@/store/features/authModalSlice";
import { auth, db } from "@/firebase/firebase";

import "@/styles/bookDetails.css";
import "@/styles/appLayout.css";

export default function BookDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [isSaved, setIsSaved] = useState(false);
  const [checkingLibrary, setCheckingLibrary] = useState(true);
  const [savingLibrary, setSavingLibrary] = useState(false);

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

  useEffect(() => {
    if (!book) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsSaved(false);
        setCheckingLibrary(false);
        return;
      }

      try {
        setCheckingLibrary(true);

        const savedBookReference = doc(
          db,
          "users",
          user.uid,
          "library",
          book.id
        );

        const savedBookSnapshot = await getDoc(savedBookReference);

        setIsSaved(savedBookSnapshot.exists());
      } catch (error) {
        console.error("Error checking library:", error);
      } finally {
        setCheckingLibrary(false);
      }
    });

    return unsubscribe;
  }, [book]);

  const handleLibraryToggle = async () => {
    const user = auth.currentUser;

    if (!user) {
      dispatch(openLoginModal());
      return;
    }

    if (!book || savingLibrary) {
      return;
    }

    try {
      setSavingLibrary(true);

      const savedBookReference = doc(
        db,
        "users",
        user.uid,
        "library",
        book.id
      );

      if (isSaved) {
        await deleteDoc(savedBookReference);
        setIsSaved(false);
      } else {
        await setDoc(savedBookReference, {
          ...book,
          savedAt: serverTimestamp(),
        });

        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error updating library:", error);
    } finally {
      setSavingLibrary(false);
    }
  };

  return (
    <>
      <Sidebar />

      <div className="app-content">
        <header className="app-header">
          <SearchBar />
        </header>

        <main>
          {loading && (
            <p className="book-details__status">
              Loading book...
            </p>
          )}

          {!loading && errorMessage && (
            <p className="book-details__status">
              {errorMessage}
            </p>
          )}

          {!loading && !errorMessage && book && (
            <section className="book-details">
              <div className="book-details__top">
                <div className="book-details__content">
                  <h1 className="book-details__title">
                      {book.title}
                    </h1>

                    {book.subscriptionRequired && (
                      <span className="book-details__premium">
                        Premium
                      </span>
                    )}

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
                      onClick={() =>
                        router.push(`/player/${book.id}`)
                      }
                    >
                      Read
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/player/${book.id}`)
                      }
                    >
                      Listen
                    </button>
                  </div>

                  <button
                    type="button"
                    className={`book-details__library-button ${
                      isSaved
                        ? "book-details__library-button--saved"
                        : ""
                    }`}
                    onClick={() => void handleLibraryToggle()}
                    disabled={checkingLibrary || savingLibrary}
                  >
                    {isSaved ? (
                      <BsBookmarkFill />
                    ) : (
                      <BsBookmark />
                    )}

                    <span>
                      {checkingLibrary
                        ? "Checking library..."
                        : savingLibrary
                        ? "Updating library..."
                        : isSaved
                        ? "Added to My Library"
                        : "Add title to My Library"}
                    </span>
                  </button>

                <div    className="book-details__image-wrapper">
                  <img
                    className="book-details__image"
                    src={book.imageLink}
                    alt={book.title}
                  />
                </div>
              </div>
            </div>

              <div className="book-details__section">
                <h2>What&apos;s it about?</h2>

                <div className="book-details__tags">
                  {book.tags?.map((tag) => (
                    <span
                      className="book-details__tag"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

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
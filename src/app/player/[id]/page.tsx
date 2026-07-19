"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import AudioPlayer from "@/components/AudioPlayer";
import type { Book } from "@/types/book";
import "@/styles/appLayout.css";
import "@/styles/player.css";

export default function PlayerPage() {
  const params = useParams<{ id: string }>();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [fontSize, setFontSize] = useState(14);

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
        console.error("Error fetching player book:", error);
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
      <Sidebar
          showFontControls
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
        />
              
      <div className="app-content player-layout">
        <main className="player-page">
          {loading && <p>Loading player...</p>}

          {errorMessage && <p>{errorMessage}</p>}

          {!loading && !errorMessage && book && (
            <>
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
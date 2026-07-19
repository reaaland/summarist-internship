"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Book } from "@/types/book";
import SelectedBook from "@/components/SelectedBook";

export default function ForYouPage() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    useEffect(() => {
  const fetchSelectedBook = async () => {
    const response = await fetch(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );

    const data = await response.json();

    console.log(data)

    setSelectedBook(data);
  };

  fetchSelectedBook();
}, []);

    return (
        <>
            <Navbar />

            <main>
                <h1>For You</h1>

               {selectedBook ? (
                <SelectedBook book={selectedBook} />
             ) : (
                    <p>Loading...</p>
                    )}
            </main>
        </>
    );
}

import { Book } from "@/types/book";
import "@/styles/selectedBook.css";
import Link from "next/link";

interface SelectedBookProps {
  book: Book;
}

export default function SelectedBook({ book }: SelectedBookProps) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="selected-book__link"
    >
      <section className="selected-book">
        <div className="selected-book__subtitle">
          {book.subTitle}
        </div>

        <div className="selected-book__image-wrapper">
          <img
            className="selected-book__image"
            src={book.imageLink}
            alt={book.title}
          />
        </div>

        <div className="selected-book__info">
          <h2 className="selected-book__title">
            {book.title}
          </h2>

          <p className="selected-book__author">
            {book.author}
          </p>

          <p className="selected-book__type">
            {book.type}
          </p>
        </div>
      </section>
    </Link>
  );
}
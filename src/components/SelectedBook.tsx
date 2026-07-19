import { Book } from "@/types/book";
import "@/styles/selectedBook.css";

interface SelectedBookProps {
  book: Book;
}

export default function SelectedBook({ book }: SelectedBookProps) {
  return (
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
);
}
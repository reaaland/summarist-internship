import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/types/book";
import "@/styles/selectedBook.css";

interface SelectedBookProps {
  book: Book;
}

export default function SelectedBook({ book }: SelectedBookProps) {
  return (
    <Link href={`/book/${book.id}`} className="selected-book__link">
      <section className="selected-book">
        <div className="selected-book__subtitle">{book.subTitle}</div>

        <div className="selected-book__image-wrapper">
          <Image
            className="selected-book__image"
            src={book.imageLink}
            alt={book.title}
            width={180}
            height={260}
            unoptimized
          />
        </div>

        <div className="selected-book__info">
          <h2 className="selected-book__title">{book.title}</h2>
          <p className="selected-book__author">{book.author}</p>
          <p className="selected-book__type">{book.type}</p>
        </div>
      </section>
    </Link>
  );
}

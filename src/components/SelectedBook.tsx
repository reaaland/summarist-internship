import { Book } from "@/types/book";

interface SelectedBookProps {
  book: Book;
}

export default function SelectedBook({ book }: SelectedBookProps) {
  return (
    <section>
      <img
        src={book.imageLink}
        alt={book.title}
      />

      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.subTitle}</p>
    </section>
  );
}
import { Book } from "@/types/book";
import "@/styles/bookCard.css";
import { BsStarFill } from "react-icons/bs";

interface BookCardProps {
  book: Book;
  showPremium?: boolean;
}

export default function BookCard({
  book,
  showPremium = false,
}: BookCardProps) {
  return (
    <div className="book-card">
        {showPremium && book.subscriptionRequired && (
    <div className="book-card__pill-wrapper">
      <span className="book-card__pill">
        Premium
      </span>
    </div>
  )}

  <div className="book-card__image-wrapper">
        <img
          className="book-card__image"
          src={book.imageLink}
          alt={book.title}
        />

     </div>

      <h3 className="book-card__title">{book.title}</h3>

      <p className="book-card__author">{book.author}</p>

      <p className="book-card__subtitle">{book.subTitle}</p>

      <div className="book-card__details">
        <span className="book-card__rating">
            <BsStarFill />
            <span>{book.averageRating}</span>
        </span>
      </div>
    </div>
  );
}
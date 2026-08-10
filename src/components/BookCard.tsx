import Image from "next/image";
import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import type { Book } from "@/types/book";
import "@/styles/bookCard.css";

interface BookCardProps {
  book: Book;
  showPremium?: boolean;
}

export default function BookCard({
  book,
  showPremium = false,
}: BookCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="book-card__link">
      <div className="book-card">
        {showPremium && book.subscriptionRequired && (
          <div className="book-card__pill-wrapper">
            <span className="book-card__pill">Premium</span>
          </div>
        )}

        <div className="book-card__image-wrapper">
          <Image
            className="book-card__image"
            src={book.imageLink}
            alt={book.title}
            width={180}
            height={260}
            unoptimized
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
    </Link>
  );
}

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BookCard from "./BookCard";
import type { Book } from "@/types/book";

const mockBook: Book = {
  id: "123",
  author: "James Clear",
  title: "Atomic Habits",
  subTitle: "Tiny Changes, Remarkable Results",
  imageLink: "https://example.com/atomic-habits.jpg",
  audioLink: "https://example.com/audio.mp3",
  totalRating: 100,
  averageRating: 4.8,
  keyIdeas: "Build better habits.",
  type: "audio",
  status: "recommended",
  subscriptionRequired: false,
  summary: "A book about building better habits.",
  tags: ["productivity"],
  bookDescription: "A practical guide to habit building.",
  authorDescription: "James Clear is an author.",
};

describe("BookCard", () => {
  it("renders the book information and links to the book page", () => {
    render(<BookCard book={mockBook} />);

    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("James Clear")).toBeInTheDocument();

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/book/123"
    );
  });

  it("shows the Premium badge for a premium book", () => {
    const premiumBook = {
      ...mockBook,
      subscriptionRequired: true,
    };

    render(<BookCard book={premiumBook} showPremium />);

    expect(screen.getByText("Premium")).toBeInTheDocument();
  });
});
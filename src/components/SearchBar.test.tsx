import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";

describe("SearchBar", () => {
  it("renders the book search input", () => {
    render(<SearchBar />);

    expect(
      screen.getByPlaceholderText("Search for books")
    ).toBeInTheDocument();
  });

  it("allows the user to type a search term", async () => {
    const user = userEvent.setup();

    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search for books");

    await user.type(input, "Atomic Habits");

    expect(input).toHaveValue("Atomic Habits");
  });
});
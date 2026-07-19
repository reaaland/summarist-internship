import { FiSearch } from "react-icons/fi";
import "@/styles/searchBar.css";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search for books"
      />

      <FiSearch className="search-bar__icon" />
    </div>
  );
}
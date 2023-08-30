import { useState } from "react";
import SearchIcon from "../assets/images/search.svg";
import "../assets/styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="searchbar">
      <button className="search-button">
        <img src={SearchIcon}></img>
      </button>
      <input
        type="text"
        placeholder="Search Art Square"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;

import React, { useState, useEffect } from "react";
import "./SearchBox.css";
import { FiSearch } from "react-icons/fi";

function SearchBox({ setSearch }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(input);
    }, 500);

    return () => clearTimeout(delay);
  }, [input, setSearch]);

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          placeholder="Search news..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="right-icons">
          <FiSearch />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
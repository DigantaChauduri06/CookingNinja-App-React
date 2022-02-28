import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

//Searchbar
import "./SearchBar.css";

function SearchBar() {
  const [term, setTerm] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const inpEle = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${term}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search </label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          className={inputFocus ? "width-big" : ""}
          ref={inpEle}
          onFocus={() => {
            setInputFocus(true);
          }}
          required
          placeholder="Search"
        />
      </form>
    </div>
  );
}

export default SearchBar;

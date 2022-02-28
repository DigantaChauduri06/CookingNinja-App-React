import { NavLink } from "react-router-dom";
import React from "react";

//Style
import "./Navbar.css";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/" className="nav-heading">
        <h1>Cooking Ninja</h1>
      </NavLink>
      <SearchBar />
      <NavLink to="/create" className="btn btn-create-recipe">
        Create Recipe
      </NavLink>
    </div>
  );
}

export default Navbar;

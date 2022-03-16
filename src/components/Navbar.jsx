import { NavLink } from "react-router-dom";
import React from "react";
import useTheme from "../hooks/useTheme";
//Style
import "./Navbar.css";
import SearchBar from "./SearchBar";

function Navbar() {
  const { color } = useTheme();

  console.log(color);
  return (
    <div className="navbar" style={{ backgroundColor: color }}>
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

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeSelector from "./components/ThemeSelector";
// page components
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
// Component Imports
import Navbar from "./components/Navbar";
import useTheme from "./hooks/useTheme";
//Style
import "./App.css";
function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

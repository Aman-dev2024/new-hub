import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Category from "./components/Category";
import News from "./components/News";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setCategory={setCategory}
        setSearch={setSearch}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="main">
        <SearchBox setSearch={setSearch} />
        <Category setCategory={setCategory} />
        <News category={category} search={search} />
      </div>
    </div>
  );
}

export default App;
import React, { useState } from "react";
import "./Navbar.css";

import {
  FiMoon,
  FiSun,
  FiHome,
  FiSearch,
  FiTrendingUp,
  FiUsers,
  FiMenu
} from "react-icons/fi";

function Navbar({
  darkMode,
  setDarkMode,
  setCategory,
  setSearch,
  activeMenu,
  setActiveMenu
}) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: <FiHome />,
      action: () => {
        setCategory("general");
        setSearch("");
      }
    },
    {
      id: "search",
      label: "Search",
      icon: <FiSearch />,
      action: () => {
        document.querySelector(".search-box input")?.focus();
      }
    },
    {
      id: "trending",
      label: "Trending",
      icon: <FiTrendingUp />,
      action: () => setSearch("trending")
    },
  ];

  return (
    <div className={`navbar ${collapsed ? "collapsed" : ""}`}>

      <div className="nav-top">

        <div className="nav-header">
          {!collapsed && <h2>NewsHub</h2>}

          <FiMenu
            className="menu-toggle"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={activeMenu === item.id ? "active" : ""}
              onClick={() => {
                setActiveMenu(item.id);
                item.action();
              }}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>

      </div>

      <div className="nav-bottom">
        <div
          className="theme-icon"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </div>
      </div>

    </div>
  );
}

export default Navbar;
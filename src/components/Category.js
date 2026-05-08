import React, { useState } from "react";
import "./Category.css";
import { FiGrid } from "react-icons/fi";

function Category({ setCategory }) {
  const [active, setActive] = useState("");
  const [showMore, setShowMore] = useState(false);

  const mainCategories = [
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology"
  ];

  const extraCategories = [
    "politics",
    "crime",
    "education",
    "food",
    "environment",
    "world",
    "tourism"
  ];

  return (
    <div>
      {/* MAIN CATEGORY */}
      <div className="category">

        {/* ALL BUTTON */}
        <button
          className={showMore ? "active" : ""}
          onClick={() => setShowMore(!showMore)}
        >
          <FiGrid />
        </button>

        {mainCategories.map((item) => (
          <button
            key={item}
            className={active === item ? "active" : ""}
            onClick={() => {
              setActive(item);
              setCategory(item);
              setShowMore(false);
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {/* EXTRA CATEGORY (SAME STYLE) */}
      {showMore && (
        <div className="category extra-category">
          {extraCategories.map((item) => (
            <button
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => {
                setActive(item);
                setCategory(item);
                setShowMore(false);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
import React, { useEffect, useState } from "react";
import "./News.css";

const PAGE_SIZE = 9;

function News({ category, search }) {
  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPages, setPrevPages] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchNews = async (pageToken = "", isNext = true) => {
    setLoading(true);

    try {
      let url = `https://newsdata.io/api/1/latest?apikey=pub_f6e6e429846648dc899ba4c8299b2428&country=in&language=en`;

      
      if (pageToken) {
        url += `&page=${pageToken}`;
      }

      if (category && category !== "general") {
        url += `&category=${category}`;
      }
      if (search && search.trim() !== "") {
        url += `&q=${encodeURIComponent(search)}`;
      } else {
        url += `&q=india`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data.results)) {
        setArticles(data.results.slice(0, PAGE_SIZE));
      } else {
        setArticles([]);
      }

      if (isNext && pageToken) {
        setPrevPages((prev) => [...prev, pageToken]);
      }

      setNextPage(data.nextPage || null);

    } catch (error) {
      console.log("Error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    setPrevPages([]);
    fetchNews();
  }, [category, search]);

  const handleNext = () => {
    if (nextPage) {
      fetchNews(nextPage, true);
    }
  };

  const handlePrev = () => {
    if (prevPages.length > 0) {
      const newStack = [...prevPages];
      newStack.pop();

      const prevToken = newStack[newStack.length - 1] || "";

      setPrevPages(newStack);
      fetchNews(prevToken, false);
    }
  };

  return (
    <div>

      <div className="news-grid">

        {articles.map((news, i) => (
          <div
            className="news-card"
            key={i}
            onClick={() => window.open(news.link, "_blank")}
          >

            <img
              src={
                news.image_url ||
                "https://source.unsplash.com/300x200/?news"
              }
              alt="news"
              onError={(e) => {
                e.target.src =
                  "https://source.unsplash.com/300x200/?news";
              }}
            />

            <div className="news-content">
              <h4>{news.title}</h4>
              <p>{news.source_id}</p>
            </div>

          </div>
        ))}
        {loading &&
          Array(PAGE_SIZE)
            .fill(0)
            .map((_, i) => (
              <div className="news-card skeleton" key={i}></div>
            ))}

      </div>

      <div className="pagination">

        <button
          onClick={handlePrev}
          disabled={prevPages.length === 0 || loading}
        >
          ⬅ Prev
        </button>

        <button
          onClick={handleNext}
          disabled={!nextPage || loading}
        >
          {loading ? "Loading..." : "Next ➡"}
        </button>

      </div>

    </div>
  );
}

export default News;
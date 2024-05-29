import React, { useEffect, useState } from "react";
import "./RecentNews.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";

function RecentNews() {
  const [recentNews, setRecentNews] = useState([]);

  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const response = await axios.get(
          "https://zztc5v98-5001.uks1.devtunnels.ms/get_articles?bot_id=40"
        );
        const newsData = response.data.data;
        const sortedNews = newsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        const recentNewsSlice = sortedNews.slice(1, 6); // Desde la segunda hasta la sexta noticia
        setRecentNews(recentNewsSlice);
      } catch (error) {
        console.error("Error fetching recent news:", error);
      }
    };

    fetchRecentNews();
  }, []);

  return (
    <div className="recent-news-container">
      {recentNews
        .map((news) => (
          <Link key={news.id} to={`/news/${news.id}`} className="news-link">
            <div className="news-card-recent recent-news">
              <img
                src={`https://sitesnewsposters.s3.us-east-2.amazonaws.com/${news.image}`}
                alt="News"
                className="news-image"
              />
              <div className="news-content-recent">
                <br></br>
                <br></br>
                <p className="news-date-recent">
                  <FaClock size={14} />  {news.date} 
                </p>
                <h2 className="news-title">{news.title}</h2>
              </div>
            </div>
          </Link>
        ))
        .slice(1)}
    </div>
  );
}

export default RecentNews;

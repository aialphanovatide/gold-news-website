import React, { useEffect, useState } from "react";
import "./RecentNews.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";

function RecentNews({ metal }) {
  const [recentNews, setRecentNews] = useState([]);
  const [botId, setBotId] = useState(40);

  useEffect(() => {
    if (metal === 'silver') {
      setBotId(42);
    } else {
      setBotId(40);
    }
  }, [metal]);

  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const response = await axios.get(
          `https://newsbotv2.ngrok.io/api/get/latest_news?coin_bot_id=${botId}`
        );
        const newsData = response.data.data;
        const sortedNews = newsData.sort((b, a) => new Date(a.created_at) - new Date(b.created_at));
        const recentNewsSlice = sortedNews.slice(1, 6); 
        setRecentNews(recentNewsSlice);
      } catch (error) {
        console.error("Error fetching recent news:", error);
      }
    };

    fetchRecentNews();
  }, [botId]);

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

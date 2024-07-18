import React, { useState, useEffect } from 'react';
import './TopStoryNews.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaClock } from "react-icons/fa";

function TopStoryNews({ metal }) {
    const [latestNews, setLatestNews] = useState(null);
    const [botId, setBotId] = useState(40);

    useEffect(() => {
        if (metal === 'silver') {
            setBotId(42);
        } else {
            setBotId(40);
        }
    }, [metal]);
    


    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await axios.get(`https://newsbotv2.ngrok.io/api/get/latest_news?coin_bot_id=${botId}&limit=30`);
                const newsData = response.data.data;
                if (newsData && newsData.length > 0) {
                    const sortedNews = newsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setLatestNews(sortedNews[0]);
                } else {
                    console.error("No news data received");
                }
            } catch (error) {
                console.error('Error fetching latest news:', error);
            }
        };

        fetchLatestNews();
    }, [botId]);

    const getContentUntilFirstPeriod = (content) => {
        const firstPeriodIndex = content.indexOf('.');
        return firstPeriodIndex > -1 ? content.substring(0, firstPeriodIndex + 1) : content;
    };

    // Render only when latestNews is not null
    if (!latestNews) {
        return <p>Loading latest news...</p>;
    }

    return (
        <Link to={`/news/${latestNews.id}`} className="news-card-ts top-story-news">
            <div className="top-section">
                <img src={`https://sitesnewsposters.s3.us-east-2.amazonaws.com/${latestNews.image}`} alt="News" className="news-image-large" />
            </div>
            <div className="news-content-ts">
                <div className="bottom-section">
                    <p className="news-date"><FaClock size={14} />  {latestNews.date}</p>
                    <h2 className="news-title-ts">{latestNews.title}</h2>
                    <p className="news-description-ts">{getContentUntilFirstPeriod(latestNews.content)}</p>
                </div>
            </div>
        </Link>
    );
}

export default TopStoryNews;

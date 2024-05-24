import React, { useState, useEffect } from 'react';
import './TopStoryNews.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TopStoryNews() {
    const [latestNews, setLatestNews] = useState(null);

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await axios.get('https://zztc5v98-5001.uks1.devtunnels.ms/get_articles?bot_id=40&limit=30');
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
    }, []);

    const getContentUntilFirstPeriod = (content) => {
        const firstPeriodIndex = content.indexOf('.');
        return firstPeriodIndex > -1 ? content.substring(0, firstPeriodIndex + 1) : content;
    };

    // Render only when latestNews is not null
    if (!latestNews) {
        return <p>Loading latest news...</p>;
    }
    
    console.log("latestNews",latestNews.image)

    return (
        <Link to={`/news/${latestNews.id}`} className="news-card-ts top-story-news">
            <div className="top-section">
                <img src={`https://sitesnewsposters.s3.us-east-2.amazonaws.com/${latestNews.image}`} alt="News" className="news-image-large" />
            </div>
            <div className="news-content-ts">
                <div className="bottom-section">
                    <p className="news-date">{latestNews.date}</p>
                    <h2 className="news-title-ts">{latestNews.title}</h2>
                    <p className="news-description-ts">{getContentUntilFirstPeriod(latestNews.content)}</p>
                </div>
            </div>
        </Link>
    );
}

export default TopStoryNews;





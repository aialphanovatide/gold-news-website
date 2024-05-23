// TopStoryNews.jsx
import React, { useState, useEffect } from 'react';
import './TopStoryNews.css'; // Asumiendo que hay un archivo de estilo común para las noticias
import axios from 'axios';

function TopStoryNews() {
    const [latestNews, setLatestNews] = useState(null);

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await axios.get('https://flzzwcwm-5000.brs.devtunnels.ms/get_articles?bot_id=40');
                const newsData = response.data.data;
                const sortedNews = newsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                const mostRecentNews = sortedNews[0];
                setLatestNews(mostRecentNews);
            } catch (error) {
                console.error('Error fetching latest news:', error);
            }
        };

        fetchLatestNews();
    }, []);

    const getContentUntilFirstPeriod = (content) => {
        const firstPeriodIndex = content.indexOf('.');
        return content.substring(0, firstPeriodIndex + 1);
    };

    console.log("id: ", latestNews)

    return (
        <div className="news-card-ts top-story-news">
            {latestNews && (
                <>
                    <div className="top-section">
                        <img src={`https://mktnewsposters.s3.us-east-2.amazonaws.com/${latestNews.id}.jpg`} alt="News" className="news-image-large" />
                    </div>
                    <div className="news-content-ts">
                        <div className="bottom-section">
                            <p className="news-date">{latestNews.date}</p>
                            <h2 className="news-title-ts">{latestNews.title}</h2>
                            <p className="news-description-ts">{getContentUntilFirstPeriod(latestNews.content)}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default TopStoryNews;

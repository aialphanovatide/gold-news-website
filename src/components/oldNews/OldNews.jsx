import React, { useEffect, useState } from 'react';
import './OldNews.css'; 
import axios from 'axios';

function OldNews() {
    const [oldNews, setOldNews] = useState([]);

    useEffect(() => {
        const fetchOldNews = async () => {
            try {
                const response = await axios.get('https://flzzwcwm-5000.brs.devtunnels.ms/get_articles?bot_id=40');
                const newsData = response.data.data;
                const sortedNews = newsData.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
                const oldNewsSlice = sortedNews.slice(8, 10); // Del 7 al 9
                setOldNews(oldNewsSlice);
            } catch (error) {
                console.error('Error fetching old news:', error);
            }
        };

        fetchOldNews();
    }, []);

    return (
        <div className="old-news-container">
            {oldNews.map((news) => (
                <div key={news.id} className="news-card old-news">
                    <img src={news.image} alt="News" className="news-image" />
                    <div className="news-content-old">
                        <p className="news-date">{news.datePublished}</p>
                        <h2 className="news-title">{news.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OldNews;

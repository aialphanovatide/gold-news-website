import React, { useEffect, useState } from 'react';
import './RecentNews.css'; 
import axios from 'axios';

function RecentNews() {
    const [recentNews, setRecentNews] = useState([]);

    useEffect(() => {
        const fetchRecentNews = async () => {
            try {
                const response = await axios.get('https://flzzwcwm-5000.brs.devtunnels.ms/get_articles?bot_id=40');
                const newsData = response.data.data;
                const sortedNews = newsData.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
                const recentNewsSlice = sortedNews.slice(2, 8); // Desde la segunda hasta la sexta noticia
                setRecentNews(recentNewsSlice);
            } catch (error) {
                console.error('Error fetching recent news:', error);
            }
        };

        fetchRecentNews();
    }, []);

    return (
        <div className="recent-news-container">
            {recentNews.map((news) => (
                <div key={news.id} className="news-card-recent recent-news">
                    <img src={`https://mktnewsposters.s3.us-east-2.amazonaws.com/${news.id}.jpg`} alt="News" className="news-image" />
                    <div className="news-content-recent">
                        <p className="news-date">{news.datePublished}</p>
                        <h2 className="news-title">{news.title}</h2>
                    </div>
                </div>
            )).slice(1)} {/* Excluir el primer artículo */}
        </div>
    );
}

export default RecentNews;

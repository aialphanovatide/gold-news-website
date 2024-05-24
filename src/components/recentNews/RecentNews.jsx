import React, { useEffect, useState } from 'react';
import './RecentNews.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa el componente Link

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
                <Link key={news.id} to={`/news/${news.id}`} className="news-link"> {/* Agrega un enlace al detalle de la noticia */}
                    <div className="news-card-recent recent-news">
                        <img src={`https://mktnewsposters.s3.us-east-2.amazonaws.com/${news.id}.jpg`} alt="News" className="news-image" />
                        <div className="news-content-recent">
                            <br></br>
                            <br></br>
                            <p className="news-date">{news.date}</p>
                            <h2 className="news-title">{news.title}</h2>
                        </div>
                    </div>
                </Link>
            )).slice(1)} {/* Excluye el primer artículo */}
        </div>
    );
}

export default RecentNews;

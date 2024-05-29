import React, { useEffect, useState } from 'react';
import './OldNews.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { FaClock } from "react-icons/fa";

function OldNews() {
    const [oldNews, setOldNews] = useState([]);

    useEffect(() => {
        const fetchOldNews = async () => {
            try {
                const response = await axios.get('https://zztc5v98-5001.uks1.devtunnels.ms/get_articles?bot_id=40');
                const newsData = response.data.data;
                const sortedNews = newsData.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
                console.log("old",sortedNews);
                const oldNewsSlice = sortedNews.slice(6, 10); // Del 7 al 9
                setOldNews(oldNewsSlice);
            } catch (error) {
                console.error('Error fetching old news:', error);
            }
        };

        fetchOldNews();
    }, []);
    console.log(oldNews)
    return (
        <div className="old-news-container">
            {oldNews.map((news) => (
                <Link to={`/news/${news.id}`} key={news.id} className="news-link"> {/* Enlace a la página de detalles de la noticia */}
                    <div className="news-card old-news">
                        <img src={`https://sitesnewsposters.s3.us-east-2.amazonaws.com/${news.image}`} alt="News" className="news-image" />
                        <div className="news-content-old">
                            <p className="news-date"><FaClock size={14} />   {news.date}</p>
                            <h2 className="news-title">{news.title}</h2>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default OldNews;

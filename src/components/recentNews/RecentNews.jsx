// RecentNews.jsx
import React from 'react';
import './RecentNews.css'; // Asumiendo que hay un archivo de estilo común para las noticias

function RecentNews({ news }) {
    return (
        <div className="news-card recent-news">
            <img src={news.image} alt="News" className="news-image" />
            <div className="news-content">
                <p className="news-date">{news.datePublished}</p>
                <h2 className="news-title">{news.title}</h2>
            </div>
        </div>
    );
}

export default RecentNews;

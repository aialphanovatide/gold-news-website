// TopStoryNews.jsx
import React from 'react';
import './TopStoryNews.css'; // Asumiendo que hay un archivo de estilo común para las noticias

function TopStoryNews({ news }) {
    return (
        <div className="news-card top-story-news">
            <img src={news.image} alt="News" className="news-image" />
            <div className="news-content">
                <p className="news-date">{news.datePublished}</p>
                <h2 className="news-title">{news.title}</h2>
            </div>
        </div>
    );
}

export default TopStoryNews;

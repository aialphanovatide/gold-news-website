// OldNews.jsx
import React from 'react';
import './OldNews.css'; 

function OldNews({ news }) {
    return (
        <div className="news-card old-news">
            <img src={news.image} alt="News" className="news-image" />
            <div className="news-content-old">
                <p className="news-date">{news.datePublished}</p>
                <h2 className="news-title">{news.title}</h2>
            </div>
        </div>
    );
}

export default OldNews;

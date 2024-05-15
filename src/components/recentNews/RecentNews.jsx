// RecentNews.jsx
import React from 'react';
import './RecentNews.css'; 

function RecentNews({ news }) {
    return (
        <div className="news-card-recent recent-news">
            <img src={news.image} alt="News" className="news-image" />
            <div className="news-content-recent">
                <p className="news-date">{news.datePublished}</p>
                <h2 className="news-title">{news.title}</h2>
            </div>
        </div>
    );
}

export default RecentNews;

// TopStoryNews.jsx
import React from 'react';
import './TopStoryNews.css'; // Asumiendo que hay un archivo de estilo común para las noticias

function TopStoryNews({ news }) {
    return (
        <>
        <div className="news-card-ts top-story-news">
                <div className="top-section">
                    <img src={news.image} alt="News" className="news-image-large" />
                </div>
            <div className="news-content-ts">
                <div className="bottom-section">
                    <p className="news-date">{news.datePublished}</p>
                    <h2 className="news-title-ts">{news.title}</h2>
                    <p className="news-description-ts">{news.description}</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default TopStoryNews;

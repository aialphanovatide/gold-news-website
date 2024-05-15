// Home.jsx
import React from 'react';
import './Home.css';
import PriceBanner from '../../components/priceBanner/PriceBanner';
import NavBanner from '../nav/NavBanner';
import RecentNews from '../../components/recentNews/RecentNews';
import OldNews from '../../components/oldNews/OldNews';
import TopStoryNews from '../../components/topStoryNews/TopStoryNews';

function Home() {
    // Supongamos que tienes datos de noticias para mostrar
    const recentNews = [
        { id: 1, image: 'url_image1', datePublished: '2024-05-15', title: 'Recent News 1' },
        { id: 2, image: 'url_image2', datePublished: '2024-05-14', title: 'Recent News 2' },
        // Más noticias...
    ];

    const oldNews = [
        { id: 3, image: 'url_image3', datePublished: '2024-05-10', title: 'Old News 1' },
        { id: 4, image: 'url_image4', datePublished: '2024-05-09', title: 'Old News 2' },
        // Más noticias...
    ];

    const topStoryNews = { image: 'url_image5', datePublished: '2024-05-15', title: 'Top Story News' };

    return (
        <div className="home-container">
            <PriceBanner />
            <div className="title-container">
                <h1 className="home-title">GOLD</h1>
                <h2 className="home-subtitle">NEWS TODAY</h2>
            </div>
            <NavBanner />
            <div className="news-container">
                <div className="left-news">
                    <TopStoryNews news={topStoryNews} />
                    <hr />
                    {oldNews.map(news => <OldNews key={news.id} news={news} />)}
                </div>
                <div className="right-news">
                    {recentNews.map(news => <RecentNews key={news.id} news={news} />)}
                </div>
            </div>
        </div>
    );
}

export default Home;

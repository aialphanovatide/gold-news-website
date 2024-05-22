// Home.jsx
import React, { useState, useEffect } from "react";
import "./Home.css";
import PriceBanner from "../../components/priceBanner/PriceBanner";
import NavBanner from "../nav/NavBanner";
import RecentNews from "../../components/recentNews/RecentNews";
import OldNews from "../../components/oldNews/OldNews";
import TopStoryNews from "../../components/topStoryNews/TopStoryNews";
import MarketData from "../../components/marketData/MarketData";
import TradingProcess from "../tradingProcess/TradingProcess";
import Footer from "../footer/Footer";
import Logo from '../../assets/Logo.png'; 

function Home() {
 const [selectedMetal, setSelectedMetal] = useState("gold");
 const handleMetalSelection = (metal) => {
    setSelectedMetal(metal);
    console.log(`Selected metal in Home: ${metal}`);
  };
  const imagegral =
    "data:image/jpeg;base64,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";
  const recentNews = [
    {
      id: 1,
      image: imagegral,
      datePublished: "2024-05-15",
      title: "Recent News 1",
    },
    {
      id: 2,
      image: imagegral,
      datePublished: "2024-05-14",
      title: "Recent News 2",
    },
    {
      id: 3,
      image: imagegral,
      datePublished: "2024-05-15",
      title: "Recent News 1",
    },
    {
      id: 4,
      image: imagegral,
      datePublished: "2024-05-14",
      title: "Recent News 2",
    },
    {
      id: 5,
      image: imagegral,
      datePublished: "2024-05-14",
      title: "Recent News 2",
    },
    // Más noticias...
  ];

  const oldNews = [
    {
      id: 3,
      image: imagegral,
      datePublished: "2024-05-10",
      title: "Old News 1",
    },
    {
      id: 4,
      image: imagegral,
      datePublished: "2024-05-09",
      title: "Old News 2",
    },
    // Más noticias...
  ];

  const topStoryNews = {
    image: imagegral,
    datePublished: "2024-05-15",
    title: "Gold finds support as geopolitical risk catalyzes demand",
    description: "Descripción de la noticia destacada",
  };

  return (
    <div className="home-container">
      <PriceBanner />
      <div className="title-container">
      <img className="logo" src={Logo} alt="Logo" />
      </div>
      <NavBanner onMetalClick={handleMetalSelection} />
      <div className="news-container">
        <div className="left-news">
          <TopStoryNews news={topStoryNews} />
          {oldNews.map((news) => (
            <OldNews key={news.id} news={news} />
          ))}
        </div>
        <div className="right-news">
          {recentNews.map((news) => (
            <RecentNews key={news.id} news={news} />
          ))}
        </div>
      </div>
          <div className="trading-table">
          <TradingProcess />
          </div>
        <div className="market-data">
        <MarketData metal={selectedMetal} />
      </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <Footer />
    </div>
  );
}

export default Home;

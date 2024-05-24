// Home.jsx
import React, { useState } from "react";
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
          <TopStoryNews />
            <OldNews />
        </div>
        <div className="right-news">
            <RecentNews  />
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

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
import Logo from "../../assets/Logo.png";
import ad1 from "../../assets/01.jpg";
import ad2 from "../../assets/02.jpg";
import ad3 from "../../assets/03.jpg";

function Home() {
  const [selectedMetal, setSelectedMetal] = useState("gold");
  const handleMetalSelection = (metal) => {
    setSelectedMetal(metal);
  };
  const [tradingTableHeight, setTradingTableHeight] = useState(0);

  useEffect(() => {
    const tradingTableElement = document.querySelector(".trading-table");
    if (tradingTableElement) {
      setTradingTableHeight(tradingTableElement.offsetHeight);
    }
    else{
      setTradingTableHeight(tradingTableElement - 100);
    }
  }, []);

  return (
    <div className="home-container">
      <PriceBanner />
      <img
        src={ad1}
        className="ad1"
        alt="Advertisement"
        onClick={() => (window.location.href = "https://aialpha.ai/educate")}
      />
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
          <img
            src={ad2}
            className="ad2"
            alt="Advertisement"
            onClick={() =>
              (window.location.href = "https://aialpha.ai/educate")
            }
          />
          <RecentNews />
          <img
            src={ad3}
            className="ad3"
            alt="Advertisement"
            onClick={() =>
              (window.location.href = "https://aialpha.ai/educate")
            }
          />
        </div>
      </div>
      <div className="trading-table">
        <TradingProcess />
      </div>
      <div
        className="market-data"
        style={{ marginTop: `${tradingTableHeight}px` }}
      >
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

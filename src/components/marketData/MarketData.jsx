import React from "react";
import "./MarketData.css";
import MarketDataChart from "../marketDataChart/MarketDataChart";

function MarketData(metal) {
  return (
    <>
      <br></br>
      <div className="market-data-container" style={{ marginTop: "20px" }}>
        <h2 className="md-title">Market Data</h2>
        <MarketDataChart metal={metal} />
      </div>
    </>
  );
}

export default MarketData;

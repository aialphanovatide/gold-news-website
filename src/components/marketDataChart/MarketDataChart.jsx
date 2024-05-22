import React, { useState, useEffect } from 'react';
import './MarketDataChart.css';
import Chart from '../chart/Chart';
import axios from 'axios';

function MarketDataChart({ metal }) {
  const [price, setPrice] = useState(0);
  const [variation, setVariation] = useState({ difference: 0, percentage: 0 });
  const [lastUpdate, setLastUpdate] = useState("");

  const fetchPrice = async (metal) => {
    const API_KEY = "3c2i35imqhcg6bk08kq34y6kv7kv9ivno61en687a3e88utc32yqpwq195ye";
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10);

    let baseSymbol = "";
    switch (metal.metal) {
      case "gold":
        baseSymbol = "XAU";
        break;
      case "silver":
        baseSymbol = "XAG";
        break;
      case "platinum":
        baseSymbol = "XPT";
        break;
      case "palladium":
        baseSymbol = "XPD";
        break;
      default:
        baseSymbol = "XAU";
    }

    try {
      const response = await axios.get(`https://metals-api.com/api/open-high-low-close/${dateString}?access_key=${API_KEY}&base=${baseSymbol}&symbols=USD`);
      const openPrice = parseFloat(response.data.rates.open);
      const closePrice = parseFloat(response.data.rates.close);
      const variationData = calculateVariation(openPrice, closePrice);

      setPrice(closePrice);
      setVariation(variationData);
      setLastUpdate(today.toLocaleString());
    } catch (error) {
      console.error('Error fetching price:', error);
    }
  };

  const calculateVariation = (openPrice, closePrice) => {
    if (isNaN(openPrice) || isNaN(closePrice)) {
      console.error("Invalid price data received.");
      return { difference: 0, percentage: 0 };
    }

    const difference = closePrice - openPrice;
    const percentage = (difference / openPrice) * 100;
    return { difference, percentage };
  };

  useEffect(() => {
    fetchPrice(metal);

    const interval = setInterval(() => fetchPrice(metal), 30000);

    return () => clearInterval(interval);
  }, [metal]);

  return (
    <>
      <br />
      <div className="market-data-chart-container">
        <h2 className='mdc-title'>London Metal Exchange Index (.LMEX)</h2>
        <div className='price-info-card'>
          <br></br>
          <br></br>
          <div className="price-variation">
            <br></br>
            <h3 className='price-data'>{price.toFixed(2)}</h3>
            <p className='variation-data'>{variation.difference.toFixed(2)} ({variation.percentage.toFixed(2)}%)</p>
          </div>
          <p className='date-data'>{lastUpdate}</p>
        </div>
      </div>
      <br></br>
      <div className='chart-container'>
        <Chart metalName={metal} />
      </div>
    </>
  );
}

export default MarketDataChart;

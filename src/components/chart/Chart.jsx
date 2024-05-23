import React, { useState, useEffect } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import "./Chart.css";

function Chart({ metalName }) {
  const [dailyPrices, setDailyPrices] = useState([]);
  const [dates, setDates] = useState([]);
  const [baseSymbol, setBaseSymbol] = useState("");

  useEffect(() => {
    const fetchDailyPrices = async () => {
      const today = new Date();
      const startDate = new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000);
      const API_KEY = "3c2i35imqhcg6bk08kq34y6kv7kv9ivno61en687a3e88utc32yqpwq195ye";
      let newBaseSymbol = "";

      switch (metalName.metal) {
        case "gold":
          newBaseSymbol = "XAU";
          break;
        case "silver":
          newBaseSymbol = "XAG";
          break;
        case "platinum":
          newBaseSymbol = "XPT";
          break;
        case "palladium":
          newBaseSymbol = "XPD";
          break;
        default:
          newBaseSymbol = "XAU";
      }

      setBaseSymbol(newBaseSymbol);

      const fetchPromises = [];
      const fetchedDates = [];

      for (let i = 0; i < 10; i++) {
        const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        const dateString = currentDate.toISOString().slice(0, 10);
        fetchedDates.push(currentDate.toLocaleDateString());

        fetchPromises.push(
          fetch(
            `https://metals-api.com/api/open-high-low-close/${dateString}?access_key=${API_KEY}&base=${newBaseSymbol}&symbols=USD`
          )
            .then((response) => response.json())
            .catch((error) => ({ rates: { close: 0 } }))  );
      }

      const data = await Promise.all(fetchPromises);
      const prices = data.map((dayData, index) => {
        
        if (dayData.rates && dayData.rates.close) {
          return { x: index + 1, y: dayData.rates.close };
        } else {
          return { x: index + 1, y: null };
        }
      });

      setDailyPrices(prices);
      setDates(fetchedDates);
    };

    fetchDailyPrices();
  }, [metalName]); // Dependencia en metalName


  return (
    <div className="chart-d-container">
      <VictoryChart
        key={`${baseSymbol}-${dates.join(',')}`} 
        theme={VictoryTheme.material}
        width={1333}
        height={874}
        padding={{ top: 20, bottom: 50, left: 75, right: 75 }}
        domainPadding={{ x: 20, y: 20 }}
        style={{
          background: { fill: "#f5f5f5" },
        }}
      >
        <VictoryLine
          style={{
            data: { stroke: "#E0AA3E" },
            parent: { border: "5px solid black" },
          }}
          data={dailyPrices}
          interpolation="natural"
          labelComponent={<VictoryTooltip />}
        />
        <VictoryAxis
          tickValues={dailyPrices.map((_, index) => index + 1)}
          tickFormat={dates}
        />
        <VictoryAxis
          dependentAxis
          orientation="right"
          tickFormat={(y) => {
            return y ? `${y.toFixed(2)}` : "N/A";
          }}
        />
      </VictoryChart>
    </div>
  );
}

export default Chart;

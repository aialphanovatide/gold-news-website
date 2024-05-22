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
  console.log(metalName.metal);

  useEffect(() => {
    const fetchDailyPrices = async () => {
      const today = new Date();
      const startDate = new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000);
      const API_KEY =
        "3c2i35imqhcg6bk08kq34y6kv7kv9ivno61en687a3e88utc32yqpwq195ye";

      let baseSymbol = ""; // Definir baseSymbol dentro de useEffect

      switch (metalName.metal.metal) {
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
          baseSymbol = "XAU"; // Valor por defecto
      }

      setBaseSymbol(baseSymbol);

      const fetchPromises = [];
      const fetchedDates = [];

      for (let i = 0; i < 10; i++) {
        const currentDate = new Date(
          startDate.getTime() + i * 24 * 60 * 60 * 1000
        );
        const dateString = currentDate.toISOString().slice(0, 10);
        fetchedDates.push(currentDate.toLocaleDateString());

        fetchPromises.push(
          fetch(
            `https://metals-api.com/api/open-high-low-close/${dateString}?access_key=${API_KEY}&base=${baseSymbol}&symbols=USD`
          )
            .then((response) => response.json())
            .catch((error) => ({ rates: { close: 0 } })) // Handling errors gracefully
        );
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
  }, [metalName]);

  console.log(metalName); // Agregar metalName como una dependencia

  return (
    <div className="chart-d-container">
      <VictoryChart
        theme={VictoryTheme.material}
        width={1333}
        height={774}
        padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
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
          tickFormat={(y) => (y ? `USD/${baseSymbol} ${y.toFixed(2)}` : "N/A")} // Utilizar baseSymbol aquí
        />
      </VictoryChart>
    </div>
  );
}

export default Chart;

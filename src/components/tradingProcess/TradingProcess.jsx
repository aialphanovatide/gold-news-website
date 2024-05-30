import React, { useState, useEffect } from "react";
import "../tradingProcess/tradingProcess.css";
import HistoricalPricesTable from "../historicTradingProcess/HistoricalPricesTable";

const TradingProcess = () => {
  const [currency, setCurrency] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [period, setPeriod] = useState("");
  const [eligiblePeriods, setEligiblePeriods] = useState(["01-15", "15-30/31"]);
  const [actualData, setActualData] = useState([]);
  const [historicData, setHistoricData] = useState([]);

  const API_KEY =
    "3c2i35imqhcg6bk08kq34y6kv7kv9ivno61en687a3e88utc32yqpwq195ye";

  const handleCurrencyChange = (e) => setCurrency(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    if (e.target.value === "Feb") {
      setEligiblePeriods(["01-15", "15-28"]);
    } else {
      setEligiblePeriods(["01-15", "15-30/31"]);
    }
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  useEffect(() => {
    fetchActualPrices();
  }, []);

  useEffect(() => {
    if (currency && year && month && period) {
      fetchHistoricData();
    }
  }, [currency, year, month, period]);

  const fetchActualPrices = async () => {
    const url = `https://metals-api.com/api/latest?access_key=${API_KEY}&base=USD&symbols=XAU,XAG,XPD,XPT`;
    console.log("Actual Prices URL:", url);

    const response = await fetch(url);
    const data = await response.json();

    const actualPrices = {
      [data.date]: {
        XAU: data.rates.USDXAU,
        XAG: data.rates.USDXAG,
        XPT: data.rates.USDXPT,
        XPD: data.rates.USDXPD,
      },
    };

    setActualData(actualPrices);
  };

  const fetchHistoricData = async () => {
    const [start_day, end_day] = period.split("-");
    const start_date = `${year}-${month}-${start_day}`;
    const end_date = `${year}-${month}-${end_day}`;
    const historicData = {};

    const fetchMetalData = async (symbol) => {
      const url = `https://metals-api.com/api/timeseries?access_key=${API_KEY}&start_date=${start_date}&end_date=${end_date}&symbols=${symbol}&base=${currency}`;
      console.log("Historic Data URL:", url);

      const response = await fetch(url);
      const data = await response.json();
      return data.rates;
    };

    const metalSymbols = ["XAU", "XAG", "XPT", "XPD"];
    for (const symbol of metalSymbols) {
      const metalRates = await fetchMetalData(symbol);
      Object.keys(metalRates).forEach((date) => {
        if (!historicData[date]) {
          historicData[date] = {};
        }
        if (currency === "USD") {
          // Calculate the rate if the currency is USD
          const rate = metalRates[date].USD / metalRates[date][symbol];
          historicData[date][symbol] = rate;
        } else {
          // Extract the rate directly if the currency is not USD
          historicData[date][symbol] = metalRates[date][symbol];
        }
      });
    }

    setHistoricData(historicData);
  };

  return (
    <>
      <div className="select-container">
        <h3 className="tpt-title">Trading Process for Gold AM/PM Fixing</h3>
        <div className="selectors">
          <select
            className="selects-container selector"
            onChange={handleCurrencyChange}
          >
            <option value="">Currency</option>
            <option value="USD">🇺🇸 United States Dollar</option>
            <option value="EUR">🇪🇺 Euro</option>
            <option value="GBP">🇬🇧 British Pound</option>
            <option value="AUD">🇦🇺 Australian Dollar</option>
            <option value="PLN">🇵🇱 Polish Złoty</option>
            <option value="CAD">🇨🇦 Canadian Dollar</option>
            <option value="INR">🇮🇳 Indian Rupee</option>
            <option value="JPY">🇯🇵 Japanese Yen</option>
          </select>
          <select
            className="selects-container selector"
            onChange={handleYearChange}
          >
            <option value="">Year</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
          <select
            className="selects-container selector"
            onChange={handleMonthChange}
          >
            <option value="">Month</option>
            <option value="01">Jan</option>
            <option value="02">Feb</option>
            <option value="03">Mar</option>
            <option value="04">Apr</option>
            <option value="05">May</option>
            <option value="06">Jun</option>
            <option value="07">Jul</option>
            <option value="08">Aug</option>
            <option value="09">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
          <select
            className="selects-container selector"
            onChange={handlePeriodChange}
          >
            <option value="">Period</option>
            {eligiblePeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="tables-price">
        <HistoricalPricesTable title="London Fix Today" data={actualData} />
        <HistoricalPricesTable
          title="London Fix Historical"
          data={historicData}
        />
      </div>
    </>
  );
};

export default TradingProcess;

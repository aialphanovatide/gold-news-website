import React, { useState, useEffect } from 'react';
import PriceItem from '../priceItem/PriceItem';
import './PriceBanner.css';
import axios from 'axios';



function PriceBanner() {
    const [prices, setPrices] = useState([
        { id: 'gold', name: 'Gold', price: 0, variation: { difference: 0, percentage: 0 } },
        { id: 'silver', name: 'Silver', price: 0, variation: { difference: 0, percentage: 0 } },
        { id: 'platinum', name: 'Platinum', price: 0, variation: { difference: 0, percentage: 0 } },
        { id: 'palladium', name: 'Palladium', price: 0, variation: { difference: 0, percentage: 0 } }
    ]);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const [goldRes, silverRes, platinumRes, palladiumRes] = await Promise.all([
                    axios.get(`https://metals-api.com/api/open-high-low-close/2024-05-21?access_key=3c2i35imqhcg6bk08kq34y6kv7kv9ivno61en687a3e88utc32yqpwq195ye&base=XAU&symbols=USD`),
                    axios.get('https://metals-api.com/api/open-high-low-close/2024-05-21?access_key=3c2i35imqhcg6bk08kq34y6kv7kv9ivno61en687a3e88utc32yqpwq195ye&base=XAG&symbols=USD'),
                    axios.get('https://metals-api.com/api/open-high-low-close/2024-05-21?access_key=3c2i35imqhcg6bk08kq34y6kv7kv9ivno61en687a3e88utc32yqpwq195ye&base=XPT&symbols=USD'),
                    axios.get('https://metals-api.com/api/open-high-low-close/2024-05-21?access_key=3c2i35imqhcg6bk08kq34y6kv7kv9ivno61en687a3e88utc32yqpwq195ye&base=XPD&symbols=USD')
                ]);

                const goldOpen = parseFloat(goldRes.data.rates.open);
                const silverOpen = parseFloat(silverRes.data.rates.open);
                const platinumOpen = parseFloat(platinumRes.data.rates.open);
                const palladiumOpen = parseFloat(palladiumRes.data.rates.open);

                const updatedPrices = [
                    { id: 'gold', name: 'Gold', price: parseFloat(goldRes.data.rates.close), variation: calculateVariation(goldOpen, parseFloat(goldRes.data.rates.close)) },
                    { id: 'silver', name: 'Silver', price: parseFloat(silverRes.data.rates.close), variation: calculateVariation(silverOpen, parseFloat(silverRes.data.rates.close)) },
                    { id: 'platinum', name: 'Platinum', price: parseFloat(platinumRes.data.rates.close), variation: calculateVariation(platinumOpen, parseFloat(platinumRes.data.rates.close)) },
                    { id: 'palladium', name: 'Palladium', price: parseFloat(palladiumRes.data.rates.close), variation: calculateVariation(palladiumOpen, parseFloat(palladiumRes.data.rates.close)) }
                ];

                console.log("Updated Prices:", updatedPrices);
                setPrices(updatedPrices);
            } catch (error) {
                console.error('Error fetching prices:', error);
            }
        };

        fetchPrices();

        const interval = setInterval(fetchPrices, 30000);

        return () => clearInterval(interval);
    }, []);

    const calculateVariation = (openPrice, closePrice) => {
        if (isNaN(openPrice) || isNaN(closePrice)) {
            console.error("Invalid price data received.");
            return { difference: 0, percentage: 0 };
        }

        const difference = closePrice - openPrice;
        const percentage = (difference / openPrice) * 100;
        return { difference, percentage };
    };


    return (
        <div className="price-banner-container">
            <div className="price-banner">
                {prices.map((item, index) => (
                    <PriceItem key={item.id + index} name={item.name} price={item.price} variation={item.variation.percentage} />
                ))}
            </div>
        </div>
    );
}

export default PriceBanner;

import React, { useState, useEffect } from 'react';
import PriceItem from '../priceItem/PriceItem';
import './PriceBanner.css';

function PriceBanner() {
    const [prices, setPrices] = useState([
        { id: 'gold', name: 'Gold', price: 1950.00, variation: -0.05 },
        { id: 'silver', name: 'Silver', price: 25.30, variation: 0.10 },
        { id: 'platinum', name: 'Platinum', price: 1050.50, variation: -0.20 },
        { id: 'palladium', name: 'Palladium', price: 2350.00, variation: 0.15 }
    ]);

   
    useEffect(() => {
        const interval = setInterval(() => {
          
            const updatedPrices = prices.map(item => ({
                ...item,
                variation: Math.random() * (0.5 - (-0.5)) + (-0.5)
            }));
            setPrices(updatedPrices);
        }, 1000);

    
        return () => clearInterval(interval);
    }, [prices]);

    return (
        <div className="price-banner-container">
            <div className="price-banner">
                {prices.map((item, index) => (
                    <PriceItem key={item.id + index} name={item.name} price={item.price} variation={item.variation} />
                ))}
            </div>
        </div>
    );
}

export default PriceBanner;
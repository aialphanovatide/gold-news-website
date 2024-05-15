import React from 'react';
import './MarketData.css';
import MarketDataChart from '../marketDataChart/MarketDataChart'

function MarketData() {


    return (
        <>
        <br></br>
        <div className="market-data-container">
            <h2 className='md-title'>Market Data</h2>
            <MarketDataChart />
        </div>
        </>
        
    );
}

export default MarketData;
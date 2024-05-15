import React from 'react';
import './MarketDataChart.css';
import Chart from '../chart/Chart'

function MarketDataChart() {
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
                        <h3 className='price-data'>4003.20</h3>
                        <p className='variation-data'>-10.00(-0.30%)</p>
                    </div>
                    <p className='date-data'>May 13, 2024  11:02 AM</p>
                </div>
            </div>
            <br></br>
            <div className='chart-container'>
                <Chart />
            </div>
        </>
    );
}

export default MarketDataChart;

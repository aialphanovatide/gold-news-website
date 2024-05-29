import React from 'react';
import './HistoricalPricesTable.css';

function HistoricalPricesTable({ title, data }) {
  const formattedData = Object.keys(data).map(date => ({
    date: date,
    gold: data[date].XAU,
    silver: data[date].XAG,
    platinum: data[date].XPT,
    palladium: data[date].XPD
  }));

  return (
    <div className="historical-prices-table">
      <div className="table-title" style={{background: 'linear-gradient(90deg, #E0AC40 0%, #F2DE7D 100%)'}}>
        <h2 className='title-table-hpt'>{title}</h2>
      </div>
      <div className="table-container">
      {formattedData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Gold</th>
              <th>Silver</th>
              <th>Platinum</th>
              <th>Palladium</th>
            </tr>
          </thead>
          <tbody>
            {formattedData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.gold}</td>
                <td>{item.silver}</td>
                <td>{item.platinum}</td>
                <td>{item.palladium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 style={{ textAlign: 'center', marginTop: '20px'}}>Please select a time period to view historical prices.</h3>
      )}
      </div>
    </div>
  );
}

export default HistoricalPricesTable;

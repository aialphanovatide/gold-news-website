import React from 'react';
import './HistoricalPricesTable.css';

function HistoricalPricesTable({ title, data }) {
  return (
    <div className="historical-prices-table">
      <div className="table-title" style={{background: 'linear-gradient(90deg, #E0AC40 0%, #F2DE7D 100%)'}}>
        <h2 className='title-table-hpt'>{title}</h2>
      </div>
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
          {data.map((item, index) => (
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
    </div>
  );
}

export default HistoricalPricesTable;

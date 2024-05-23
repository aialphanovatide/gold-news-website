import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './PriceItem.css'; // Asegúrate de tener los estilos CSS necesarios

function PriceItem({ name, price, variation }) {
    const up = variation >= 0;

    const iconStyles = {
        color: up ? 'green' : 'red'
    };


    const ArrowIcon = up ? FaArrowUp : FaArrowDown;

    const variationColor = up ? 'green' : 'red';

    return (
        <div className="price-item">
            <ArrowIcon style={iconStyles} />
            <span className="name">{name}</span>‎ ‎ ‎ ‎ 
            <span className="price">{price.toFixed(2)}</span>‎ ‎ 
            <span className="variation" style={{ color: variationColor }}>‎ ‎ 
                {parseFloat(variation).toFixed(2)} %
            </span>  </div>
    );
}

export default PriceItem;

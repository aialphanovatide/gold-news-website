import { FaArrowUp, FaArrowDown } from 'react-icons/fa'; 

function PriceItem({ name, price, variation }) {
    const up = variation >= 0;

    const iconStyles = {
        color: up ? 'green' : 'red'
    };

    const containerStyles = {
        color: 'white'
    };

    const ArrowIcon = up ? FaArrowUp : FaArrowDown;

    const sign = up ? '+' : '-';
    const variationColor = up ? 'green' : 'red';

    return (
        <div className="price-item" style={containerStyles}>
            <ArrowIcon style={iconStyles} />‎ ‎ 
            <span className="name">{name}</span>‎ ‎ ‎ ‎ 
            <span className="price">{price.toFixed(2)}</span>‎ ‎ 
            <span className="variation" style={{ color: variationColor }}>‎ ‎ 
                {sign}{Math.abs(variation).toFixed(2)} 
            </span>‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ 
        </div>
    );
}

export default PriceItem;

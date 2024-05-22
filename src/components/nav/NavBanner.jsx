import React from 'react';
import './NavBanner.css';

function NavBanner({ onMetalClick }) {
    const handleMetalClick = (metal) => {
        onMetalClick(metal);
    };

    return (
        <div className="nav-banner">
            <span onClick={() => handleMetalClick('gold')}>Gold</span>
            <span onClick={() => handleMetalClick('silver')}>Silver</span>
            <span onClick={() => handleMetalClick('platinum')}>Platinum</span>
            <span onClick={() => handleMetalClick('palladium')}>Palladium</span>
        </div>
    );
}

export default NavBanner;

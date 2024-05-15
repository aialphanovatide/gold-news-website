import React from 'react';
import './NavBanner.css';

function NavBanner() {
    const handleMetalClick = (metal) => {
        console.log(`Selected metal: ${metal}`);
    };

    return (
        <div className="nav-banner">
            <span onClick={() => handleMetalClick('Gold')}>Gold</span>
            <span onClick={() => handleMetalClick('Silver')}>Silver</span>
            <span onClick={() => handleMetalClick('Platinum')}>Platinum</span>
            <span onClick={() => handleMetalClick('Palladium')}>Palladium</span>
        </div>
    );
}

export default NavBanner;

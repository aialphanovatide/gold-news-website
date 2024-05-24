import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../backButton/BackButton.css';

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/'); 
  };

  return (
    <div>
      {/* Se añade la flecha Unicode antes del texto "Back" */}
      <p onClick={goBack} className="back-button">&#x2190; Back</p>
    </div>
  );
}

export default BackButton;

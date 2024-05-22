import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";
import Logow from "../../assets/Logoww.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer-container">
      <div className="footer-item-1">
        <img className="logo" src={Logow} alt="Logo" />
      </div>
      <div className="footer-item-2">
        <p className="footer-p">About</p>
        <p className="footer-p">Contact</p>
      </div>
      <div className="footer-item-3">
        <p className="footer-p">Gold</p>
        <p className="footer-p">Silver</p>
        <p className="footer-p">Platinum</p>
        <p className="footer-p">Palladium</p>
      </div>
      <div className="footer-item-4">
        <button className="footer-scroll-top-btn" onClick={scrollToTop}>
          <FontAwesomeIcon
            icon={faArrowUp}
            className="footer-scroll-top-icon"
          />
        </button>
        <p className="footer-p-4">Powered By Novatide</p>
      </div>
    </footer>
  );
};

export default Footer;

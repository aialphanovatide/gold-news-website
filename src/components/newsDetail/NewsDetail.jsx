import React from "react";
import { useParams } from "react-router-dom";
import "../home/Home.css";
import PriceBanner from "../../components/priceBanner/PriceBanner";
import NavBanner from "../nav/NavBanner";
import RecentNews from "../../components/recentNews/RecentNews";
import ArticleDetail from "../newsDetail/ArticleDetail";
import Footer from "../footer/Footer";
import ad1 from "../../assets/01.jpg";
import BackButton from "../backButton/BackButton";
import Logo from "../../assets/Logo.png";
import ad2 from "../../assets/02.jpg";
import ad3 from "../../assets/03.jpg";

function NewsDetail() {
  const { id } = useParams(); // Obtiene el ID de la noticia de la URL

  // Aquí puedes utilizar el ID para cargar los detalles de la noticia correspondiente

  return (
    <div>
      <PriceBanner />
      <img src={ad1} className="ad1" alt="Advertisement" />
      <div className="title-container">
        <img className="logo" src={Logo} alt="Logo" />
      </div>
      <NavBanner onMetalClick={"gold"} />
      <div className="news-container">
        <BackButton />
        <div className="left-news">
          <ArticleDetail id={id}/>
        </div>
        <div className="right-news">
        <img src={ad2} className="ad2" alt="Advertisement" />
          <RecentNews  />
          <img src={ad3} className="ad3" alt="Advertisement" />
        </div>
      </div>
      <Footer />
      {/* Aquí mostrarías los detalles de la noticia */}
    </div>
  );
}

export default NewsDetail;

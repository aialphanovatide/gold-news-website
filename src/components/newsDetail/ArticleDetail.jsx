import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../newsDetail/NewsDetail.css'


function ArticleDetail() {
  const { id } = useParams(); 
  const [artDetail, setArtDetail] = useState(null);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await axios.get(`https://newsbotv2.ngrok.io/get_article_by_id/${id}`);
        setArtDetail(response.data);
      } catch (error) {
        console.error('Error fetching article details:', error);
      }
    };

    if (id) {
      fetchArticleDetail();
    }
  }, [id]); 


  if (!artDetail) {
    return <p>Loading...</p>;
  }

  console.log(artDetail)

  return (
    <>
    <div className="ad-container">
      <div className="top-section-ad">
        <img
          src={`https://sitesnewsposters.s3.us-east-2.amazonaws.com/${artDetail.data.image}`}
          alt="News"
          className="news-image-large-ad"
        />
      </div>
      <div className="news-content-ad">
        <div className="bottom-section-ad">
          <p className="news-date-ad">{artDetail.data.date}</p>
          <h2 className="news-title-ad">{artDetail.data.title}</h2>
          <p className="news-description-ad">
            {artDetail.data.content}
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default ArticleDetail;

import React, { useState } from "react";
import "./ImagePopup.css";
import herta from "../../assets/images/herta.jpg";

function ImagePopup() {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const closeImage = () => {
    setIsImageOpen(false);
  };

  return (
    <div>
      <h1>網頁</h1>
      <div className="image-container">
        <img
          src={herta}
          alt=""
          className="original-image"
          onClick={handleImageClick}
        />
        {isImageOpen && (
          <div className="popup-overlay" onClick={closeImage}>
            <div className="popup-container">
              <img
                src={herta}
                alt=""
                className="popup-image"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;

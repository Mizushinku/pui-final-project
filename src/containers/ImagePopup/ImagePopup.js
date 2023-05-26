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
            <div class="angry-grid">
              <div id="item-0">Title: </div>
              <div id="item-1">&nbsp;</div>
              <div id="item-2">Caption: </div>
              <div id="item-3">&nbsp;</div>
              <div id="item-4">Prompt:</div>
              <div id="item-5">&nbsp;</div>
              <div id="item-6">Negative Prompt:</div>
              <div id="item-7">&nbsp;</div>
              <div id="item-8">Model:</div>
              <div id="item-9">&nbsp;</div>
              <div id="item-10">VAE:</div>
              <div id="item-11">&nbsp;</div>
              <div id="item-12">Seed:</div>
              <div id="item-13">&nbsp;</div>
              <div id="item-14">Steps:</div>
              <div id="item-15">&nbsp;</div>
              <div id="item-16">Sampler:</div>
              <div id="item-17">&nbsp;</div>
              <div id="item-18">CFG Scale:</div>
              <div id="item-19">&nbsp;</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;

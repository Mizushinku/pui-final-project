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
              <div id="item-0" className="grid-item">
                Title:{" "}
              </div>
              <div id="item-1" className="grid-item">
                &nbsp;
              </div>
              <div id="item-2" className="grid-item">
                Caption:{" "}
              </div>
              <div id="item-3" className="grid-item">
                &nbsp;
              </div>
              <div id="item-4" className="grid-item">
                Prompt:
              </div>
              <div id="item-5" className="grid-item">
                &nbsp;
              </div>
              <div id="item-6" className="grid-item">
                Negative Prompt:
              </div>
              <div id="item-7" className="grid-item">
                &nbsp;
              </div>
              <div id="item-8" className="grid-item">
                Model:
              </div>
              <div id="item-9" className="grid-item">
                &nbsp;
              </div>
              <div id="item-10" className="grid-item">
                VAE:
              </div>
              <div id="item-11" className="grid-item">
                &nbsp;
              </div>
              <div id="item-12" className="grid-item">
                Seed:
              </div>
              <div id="item-13" className="grid-item">
                &nbsp;
              </div>
              <div id="item-14" className="grid-item">
                Steps:
              </div>
              <div id="item-15" className="grid-item">
                &nbsp;
              </div>
              <div id="item-16" className="grid-item">
                Sampler:
              </div>
              <div id="item-17" className="grid-item">
                &nbsp;
              </div>
              <div id="item-18" className="grid-item">
                CFG Scale:
              </div>
              <div id="item-19" className="grid-item">
                &nbsp;
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;

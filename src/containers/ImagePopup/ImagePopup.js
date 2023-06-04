import React, { useState } from "react";
import "./ImagePopup.css";
import { UpdateLike } from "./UpdateLike";
import { ReactComponent as Heart } from "../../assets/icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import { storage } from "../../index";
import { ref, getMetadata, updateMetadata, listAll } from "firebase/storage";

function ImagePopup({ info, closeImage, reachBottom }) {
  console.log(info);
  const [isFilled, setIsFilled] = useState(false);
  const [favCnt, setFavCnt] = useState(parseInt(info.fav));

  const handleClick = () => {
    //update user collection and liked number
    const fileName = info.name;
    if (!isFilled) UpdateLike(fileName, "+", setFavCnt);
    else UpdateLike(fileName, "-", setFavCnt);
    setIsFilled(!isFilled);
  };
  return (
    <div>
      <div className="popup-overlay" onClick={closeImage}>
        <div className="popup-container">
          <img
            src={info["src"]}
            alt=""
            className="popup-image"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
        <div
          className="angry-grid"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div id="item-0" className="grid-item">
            <div className="grid-inner">Title:</div>
          </div>
          <div id="item-1" className="grid-item">
            <div className="grid-inner">{info["title"]}</div>
          </div>
          <div id="item-2" className="grid-item">
            <div className="grid-inner">Caption:</div>
          </div>
          <div id="item-3" className="grid-item">
            <div className="grid-inner">{info["caption"]}</div>
          </div>
          <div id="item-4" className="grid-item">
            <div className="grid-inner">Prompt:</div>
          </div>
          <div id="item-5" className="grid-item">
            {info["prompt"]}
          </div>
          <div id="item-6" className="grid-item">
            <div className="grid-inner">Negative Prompt:</div>
          </div>
          <div id="item-7" className="grid-item">
            {info["negativePrompt"]}
          </div>
          <div id="item-8" className="grid-item">
            <div className="grid-inner">Model:</div>
          </div>
          <div id="item-9" className="grid-item">
            <div className="grid-inner">{info["model"]}</div>
          </div>
          <div id="item-10" className="grid-item">
            <div className="grid-inner">CFG Scale:</div>
          </div>
          <div id="item-11" className="grid-item">
            <div className="grid-inner">{info["cfg"]}</div>
          </div>
          <div id="item-12" className="grid-item">
            <div className="grid-inner">Seed:</div>
          </div>
          <div id="item-13" className="grid-item">
            <div className="grid-inner">{info["seed"]}</div>
          </div>
          <div id="item-14" className="grid-item">
            <div className="grid-inner">Sampler:</div>
          </div>
          <div id="item-15" className="grid-item">
            <div className="grid-inner">{info["sampler"]}</div>
          </div>
          <div id="item-16" className="grid-item">
            <div className="grid-inner">Step:</div>
          </div>
          <div id="item-17" className="grid-item">
            <div className="grid-inner">{info["step"]}</div>
          </div>
          <div id="item-18" className="grid-item">
            <Heart
              className={`colored-svg ${isFilled ? "fill" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleClick();
              }}
            />
          </div>
          <div id="item-19" className="grid-item">
            <div className="grid-inner">{favCnt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;

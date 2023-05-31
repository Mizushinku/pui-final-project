import React from "react";
import "./ImagePopup.css";

function ImagePopup(props) {
  return (
    <div>
      <div className="popup-overlay" onClick={props.closeImage}>
        <div className="popup-container">
          <img
            src={props.info["src"]}
            alt=""
            className="popup-image"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
        <div className="angry-grid">
          <div id="item-0" className="grid-item">
            Title:
          </div>
          <div id="item-1" className="grid-item">
            {props.info["title"]}
          </div>
          <div id="item-2" className="grid-item">
            Caption:
          </div>
          <div id="item-3" className="grid-item">
            {props.info["caption"]}
          </div>
          <div id="item-4" className="grid-item">
            Prompt:
          </div>
          <div id="item-5" className="grid-item">
            {props.info["prompt"]}
          </div>
          <div id="item-6" className="grid-item">
            Negative Prompt:
          </div>
          <div id="item-7" className="grid-item">
            {props.info["negative prompt"]}
          </div>
          <div id="item-8" className="grid-item">
            Model:
          </div>
          <div id="item-9" className="grid-item">
            {props.info["model"]}
          </div>
          <div id="item-10" className="grid-item">
            CFG Scale:
          </div>
          <div id="item-11" className="grid-item">
            {props.info["cfg"]}
          </div>
          <div id="item-12" className="grid-item">
            Seed:
          </div>
          <div id="item-13" className="grid-item">
            {props.info["seed"]}
          </div>
          <div id="item-14" className="grid-item">
            Steps:
          </div>
          <div id="item-15" className="grid-item">
            {props.info["step"]}
          </div>
          <div id="item-16" className="grid-item">
            Sampler:
          </div>
          <div id="item-17" className="grid-item">
            {props.info["sampler"]}
          </div>
          <div id="item-18" className="grid-item">
            按讚數:
          </div>
          <div id="item-19" className="grid-item">
            1234
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;

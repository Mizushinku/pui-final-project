import React, { useRef, useState } from "react";
import "./ImageTrack.css";
import amiya from "../../assets/images/amiya.jpg";
import kirara from "../../assets/images/kirara.png";
import sakura from "../../assets/images/sakura.jpg";
import shionn from "../../assets/images/shionn.png";
import angel from "../../assets/images/angel.png";
import ImagePopup from "../ImagePopup/ImagePopup";
import ImagesInfo from "../../assets/ImagesInfo/ImagesInfo";

const ImageTrack = (props) => {
  const [rollingPos, setRollingPos] = useState(-50);
  const [popupImgSrc, setPopupImgSrc] = useState(undefined);

  const containerRef = useRef(undefined);
  const downPosRef = useRef(null);
  const prevRollingPosRef = useRef(-50);
  const imgRef = useRef([]);
  const downTargetRef = useRef(undefined);
  const timerRef = useRef(null);

  const handlePointerDown = (e) => {
    containerRef.current.setPointerCapture(e.pointerId);
    if (e.target.className.split(" ").includes("image")) {
      downTargetRef.current = e.target;
      timerRef.current = setTimeout(() => {
        downTargetRef.current = undefined;
      }, 250);
    }
    downPosRef.current =
      e.clientX - e.currentTarget.getBoundingClientRect().left;

    containerRef.current.addEventListener("pointermove", handlePointerMove);
  };

  const handlePointerMove = (e) => {
    if (downPosRef.current) {
      if (timerRef.current) {
        downTargetRef.current = undefined;
        clearTimeout(timerRef.current);
      }
      const containerRect = e.currentTarget.getBoundingClientRect();
      const currPos = e.clientX - containerRect.left;
      const currDelta = downPosRef.current - currPos;
      const maxDelta = containerRect.width / 0.8;
      let nextRollingPos =
        prevRollingPosRef.current + (currDelta / maxDelta) * -100;
      nextRollingPos = Math.max(Math.min(nextRollingPos, 0), -100);
      setRollingPos(nextRollingPos);
    }
  };

  const handlePointerUp = (e) => {
    downPosRef.current = null;
    prevRollingPosRef.current = rollingPos;
    containerRef.current.releasePointerCapture(e.pointerId);
    containerRef.current.removeEventListener("pointermove", handlePointerMove);

    let upTarget = undefined;
    imgRef.current.forEach((img) => {
      const rect = img.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        upTarget = img;
      }
    });

    clearTimeout(timerRef.current);
    if (upTarget && upTarget === downTargetRef.current) {
      handleImageClick(upTarget);
    }
    downTargetRef.current = undefined;
  };

  const handleImageClick = (targetImg) => {
    //setPopupImgSrc(targetImg.src);
    let image_info = ImagesInfo[targetImg.dataset.index];
    image_info["src"] = targetImg.src;
    setPopupImgSrc(image_info);
  };

  const renderImages = () => {
    const images = [angel, amiya, kirara, sakura, shionn];
    const n = images.length;
    return images.map((src, index) => (
      <div>
        <img
          key={index}
          data-index={index}
          className="image"
          src={src}
          alt=""
          ref={(ele) => (imgRef.current[index] = ele)}
          draggable="false"
          style={{
            objectPosition: `${
              100 - (100 / n) * index - (rollingPos + 50)
            }% center`,
          }}
        />
      </div>
    ));
  };

  const closeImage = (e) => {
    setPopupImgSrc(undefined);
  };

  return (
    <div>
      <div
        className="track-container"
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div
          className="image-track"
          style={{
            transform: `translate(${rollingPos}%, -50%)`,
          }}
        >
          {renderImages()}
        </div>
      </div>
      {popupImgSrc && <ImagePopup src={popupImgSrc} closeImage={closeImage} />}
    </div>
  );
};

export default ImageTrack;

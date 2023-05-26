import React, { useRef, useState } from "react";
import "./ImageTrack.css";
import amiya from "../../assets/images/amiya.jpg";
import herta from "../../assets/images/herta.jpg";
import kirara from "../../assets/images/kirara.png";
import sakura from "../../assets/images/sakura.jpg";
import shionn from "../../assets/images/shionn.png";

const ImageTrack = (props) => {
  const [rollingPos, setRollingPos] = useState(-50);
  const downPosRef = useRef(null);
  const prevRollingPosRef = useRef(-50);

  const handlePointerDown = (e) => {
    downPosRef.current =
      e.clientX - e.currentTarget.getBoundingClientRect().left;
  };

  const handlePointerMove = (e) => {
    if (downPosRef.current) {
      const containerRect = e.currentTarget.getBoundingClientRect();
      const currPos = e.clientX - containerRect.left;
      const currDelta = downPosRef.current - currPos;
      const maxDelta = containerRect.width / 1.5;
      let nextRollingPos =
        prevRollingPosRef.current + (currDelta / maxDelta) * -100;
      nextRollingPos = Math.min(nextRollingPos, 0);
      nextRollingPos = Math.max(nextRollingPos, -100);
      setRollingPos(nextRollingPos);
    }
  };

  const handlePointerUp = (e) => {
    downPosRef.current = null;
    prevRollingPosRef.current = rollingPos;
  };

  const handlePointerLeave = (e) => {
    downPosRef.current = null;
    prevRollingPosRef.current = rollingPos;
  };

  return (
    <div
      className="track-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="image-track"
        style={{ transform: `translate(${rollingPos}%, -50%)` }}
      >
        <img className="image" src={amiya} alt="" draggable="false" />
        <img className="image" src={herta} alt="" draggable="false" />
        <img className="image" src={kirara} alt="" draggable="false" />
        <img className="image" src={sakura} alt="" draggable="false" />
        <img className="image" src={shionn} alt="" draggable="false" />
      </div>
    </div>
  );
};

export default ImageTrack;

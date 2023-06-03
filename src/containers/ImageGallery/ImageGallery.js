import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import ImagePopup from "../ImagePopup/ImagePopup";
import { ReactComponent as Heart } from "../../assets/icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";

const ImageGallery = ({ imgInfo, reachBottom }) => {
  const [popupImgSrc, setPopupImgSrc] = useState(undefined);
  const closeImage = (e) => {
    setPopupImgSrc(undefined);
  };
  const [isFilled, setIsFilled] = useState(Array(imgInfo.length).fill(false));

  const handleClick = (id) => {
    //Todo: update by data in firebase
    let newIsFilled = [...isFilled];
    newIsFilled[id] = !newIsFilled[id];
    setIsFilled(newIsFilled);
    console.log(id);
  };

  const handleScroll = (e) => {
    const ele = e.target;
    if (ele.scrollTop + ele.clientHeight >= ele.scrollHeight) {
      reachBottom();
    }
  };

  return (
    <Container
      fluid
      style={{ maxHeight: "70vh", overflow: "auto" }}
      className="gallery-container"
      onScroll={handleScroll}
    >
      <Row sm="3" md="4" lg="5">
        {imgInfo.map((info, index) => (
          <Col
            key={index}
            style={{
              minHeight: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              src={info.src}
              alt={info.caption}
              style={{
                maxWidth: "100%",
                cursor: "pointer",
                objectFit: "cover",
                userSelect: "none",
              }}
              onClick={() => {
                console.log(info.title);
                setPopupImgSrc(info);
              }}
            />
            <Heart
              className={`colored-svg ${isFilled[info.id] ? "fill" : ""}`}
              style={{ position: "absolute", bottom: "10px", right: "10px" }}
              onClick={(e) => {
                // handleClick(info.id);
              }}
            />
          </Col>
        ))}
      </Row>
      {popupImgSrc && <ImagePopup info={popupImgSrc} closeImage={closeImage} />}
    </Container>
  );
};

export default ImageGallery;

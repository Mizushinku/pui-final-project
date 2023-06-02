import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import ImagePopup from "../ImagePopup/ImagePopup";
import { ReactComponent as Heart } from "../../assets/icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";

const ImageGallery = ({ imgInfo }) => {
  const [popupImgSrc, setPopupImgSrc] = useState(undefined);
  const closeImage = (e) => {
    setPopupImgSrc(undefined);
  };
  const [isFilled, setIsFilled] = useState(false);

  const handleClick = (id) => {
    setIsFilled(!isFilled);
    console.log(id);
  };
  return (
    <Container
      fluid
      style={{ maxHeight: "70vh", overflow: "auto" }}
      className="gallery-container"
    >
      <Row sm="3" md="4" lg="5">
        {imgInfo.map((info) => (
          <Col
            key={info.id}
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
              }}
              onClick={() => {
                console.log(info.title);
                setPopupImgSrc(info);
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

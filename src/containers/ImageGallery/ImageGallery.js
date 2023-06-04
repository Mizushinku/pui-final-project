import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import ImagePopup from "../ImagePopup/ImagePopup";
import { ReactComponent as Heart } from "../../assets/icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import { UpdateLike } from "../ImagePopup/UpdateLike";
import { userCtx } from "../../contexts/userContext";
import appRoutes from "../../shared/appRoutes";
import { useNavigate } from "react-router-dom";

const ImageGallery = ({ imgInfo, loadMore }) => {
  const { currUser, myFavs } = useContext(userCtx);
  const [popupImgSrc, setPopupImgSrc] = useState(undefined);
  const [redirectModal, setRedirectModal] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const navigate = useNavigate();

  const closeImage = (e) => {
    setPopupImgSrc(undefined);
  };

  const handleClick = (info, index) => {
    //Todo: update by data in firebase
    if (!currUser) {
      console.log("not login");
      setShowLoginModal(true);
      return (
        <Modal
          isOpen={redirectModal}
          toggle={() => setRedirectModal((prev) => !prev)}
          centered
          onClosed={() => navigate(appRoutes.login)}
        >
          <ModalBody className="fw-bold fs-3">Please Login.</ModalBody>
        </Modal>
      );
    }
    if (!myFavs.some((item) => item.name === info.name))
      UpdateLike(currUser.uid, info.name, "+", null);
    else UpdateLike(currUser.uid, info.name, "-", null);
  };

  // const handleScroll = (e) => {
  //   const ele = e.target;
  //   if (ele.scrollTop + ele.clientHeight >= ele.scrollHeight) {
  //     console.log("reach bottom");
  //   }
  // };

  const handleLoadMore = async () => {
    const res = await loadMore();
    if (res === true) {
      setNoMore(true);
    }
  };

  return (
    <Container
      fluid
      style={{
        maxHeight: "85vh",
        overflow: "auto",
        scrollbarWidth: "thin",
      }}
      className="gallery-container"
    >
      <Row sm="2" md="3" lg="4">
        {imgInfo.map((info, index) => (
          <Col
            key={index}
            style={{
              minHeight: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", margin: "20px" }}>
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
                className={`colored-svg ${
                  myFavs.some((item) => item.name === info.name) ? "fill" : ""
                }`}
                style={{ position: "absolute", bottom: "10px", right: "10px" }}
                onClick={(e) => {
                  handleClick(info, index);
                }}
              />
            </div>
          </Col>
        ))}
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "15px",
        }}
      >
        <Button
          className="px-5 my-2"
          disabled={noMore}
          onClick={handleLoadMore}
        >
          載入更多
        </Button>
      </div>

      {popupImgSrc && <ImagePopup info={popupImgSrc} closeImage={closeImage} />}
      {showLoginModal ? (
        <Modal
          backdrop={false}
          isOpen={redirectModal}
          toggle={() => setRedirectModal((prev) => !prev)}
          centered
          onClosed={() => {
            navigate(appRoutes.login);
          }}
        >
          <ModalBody className="fw-bold fs-3">Please Login.</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setShowLoginModal(false);
              }}
            >
              返回
            </Button>
            <Button
              onClick={() => {
                setRedirectModal((prev) => !prev);
              }}
            >
              前往登入
            </Button>
          </ModalFooter>
        </Modal>
      ) : null}
    </Container>
  );
};

export default ImageGallery;

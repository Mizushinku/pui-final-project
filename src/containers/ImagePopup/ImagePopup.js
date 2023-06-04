import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import "./ImagePopup.css";
import { UpdateLike } from "./UpdateLike";
import { ReactComponent as Heart } from "../../assets/icons/favorite_FILL1_wght400_GRAD0_opsz48.svg";
import { storage } from "../../index";
import { ref, getMetadata } from "firebase/storage";
import { userCtx } from "../../contexts/userContext";
import appRoutes from "../../shared/appRoutes";
import { useNavigate } from "react-router-dom";

function ImagePopup({ info, closeImage }) {
  // console.log(info);
  const { currUser, myFavs } = useContext(userCtx);
  const [isFilled, setIsFilled] = useState(false);
  const [favCnt, setFavCnt] = useState(parseInt(info.fav));
  const [redirectModal, setRedirectModal] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const index = myFavs.findIndex((item) => item.name === info.name);
    if (index !== -1) {
      setIsFilled(true);
    }
    // eslint-disable-next-line
  }, [myFavs]);

  const handleClick = () => {
    //update user collection and liked number
    if (currUser) {
      const fileName = info.name;
      if (!isFilled) UpdateLike(currUser.uid, fileName, "+", setFavCnt);
      else UpdateLike(currUser.uid, fileName, "-", setFavCnt);
      setIsFilled(!isFilled);
    } else {
      setShowLoginModal(true);
    }
  };

  const storageRef = ref(storage, "images/" + info.name);
  getMetadata(storageRef).then((metadata) => {
    setFavCnt(parseInt(metadata.customMetadata.fav));
  });
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
        {showLoginModal ? (
          <Modal
            isOpen={redirectModal}
            toggle={() => setRedirectModal((prev) => !prev)}
            centered
            onClosed={() => {
              //navigate(appRoutes.login);
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
                  navigate(appRoutes.login);
                }}
              >
                前往登入
              </Button>
            </ModalFooter>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

export default ImagePopup;

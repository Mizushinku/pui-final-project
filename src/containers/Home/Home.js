import React, { useState } from "react";
import ImageTrack from "../ImageTrack/ImageTrack";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImagesInfo from "../../assets/ImagesInfo/ImagesInfo";

import UploadedModal from "./UploadedModal/UploadedModal";

const Home = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <div>
      <ImageTrack></ImageTrack>
      <h1 className="fw-bold fs-1 text-center my-5">Recent Gallery</h1>
      <ImageGallery imgInfo={ImagesInfo}></ImageGallery>
      <UploadedModal modal={modal} toggle={toggleModal} />
    </div>
  );
};

export default Home;

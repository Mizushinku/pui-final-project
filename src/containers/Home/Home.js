import React from "react";
import ImageTrack from "../ImageTrack/ImageTrack";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImagesInfo from "../../assets/ImagesInfo/ImagesInfo";

const Home = () => {
  return (
    <div>
      <ImageTrack></ImageTrack>
      <h1 className="fw-bold fs-1 text-center my-5">Recent Gallery</h1>
      <ImageGallery imgInfo={ImagesInfo}></ImageGallery>
    </div>
  );
};

export default Home;

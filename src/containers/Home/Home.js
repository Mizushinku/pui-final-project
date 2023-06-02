import React from "react";
import { Button } from "reactstrap";
import ImageTrack from "../ImageTrack/ImageTrack";
import appRoutes from "../../shared/appRoutes";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImagesInfo from "../../assets/ImagesInfo/ImagesInfo";

const Home = () => {
  return (
    <div>
      <ImageTrack></ImageTrack>
      <h1>This is Home page.</h1>
      <ImageGallery imgInfo={ImagesInfo}></ImageGallery>
      <Button href={appRoutes.upload}>upload</Button>
    </div>
  );
};

export default Home;

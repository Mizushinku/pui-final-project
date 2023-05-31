import React from "react";
import { Button } from "reactstrap";
import ImageTrack from "../ImageTrack/ImageTrack";
import appRoutes from "../../shared/appRoutes";

const Home = () => {
  return (
    <div>
      <ImageTrack></ImageTrack>
      <h1>This is Home page.</h1>
      <Button href={appRoutes.upload}>upload</Button>
    </div>
  );
};

export default Home;

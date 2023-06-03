import React, { useContext, useState } from "react";
import { userCtx } from "../../contexts/userContext";
import { Container, Input } from "reactstrap";

import UploadModal from "./UploadModal";

import "./UserPage.scss";

const UserPage = () => {
  const { currUser } = useContext(userCtx);
  const [selectedFile, setSelectedFile] = useState(undefined);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal((prev) => !prev);
  };

  const imageOnChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Container fluid>
      <h1>User Page</h1>
      <div className="d-flex align-items-center">
        <img
          src={currUser.photoURL}
          alt=""
          className="rounded-circle me-3"
          style={{ height: "40px" }}
        />
        <div className="fs-3">{currUser.displayName}</div>
      </div>
      <Input
        type="file"
        id="image"
        accept="image/*"
        onChange={imageOnChange}
        required
        className="mt-3 w-25"
      />
      <button className="mt-3" onClick={toggle} disabled={!selectedFile}>
        Upload
      </button>

      <UploadModal
        modal={modal}
        toggle={toggle}
        user={currUser}
        file={selectedFile}
      ></UploadModal>
    </Container>
  );
};

export default UserPage;

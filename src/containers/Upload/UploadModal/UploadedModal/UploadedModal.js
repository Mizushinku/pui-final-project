import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../../../shared/appRoutes";

const UploadedModal = (props) => {
  const navigate = useNavigate();

  const modal = props.modal;
  const toggle = props.toggle;

  const Continue = () => {
    toggle();
    navigate(appRoutes.upload);
  };

  const toUserPage = () => {
    toggle();
    navigate(appRoutes.userPage);
  };

  const toHome = () => {
    toggle();
    navigate(appRoutes.home);
  };

  return (
    <Modal centered isOpen={modal} toggle={toggle}>
      <ModalBody className="fs-3">Upload Successed !</ModalBody>
      <ModalFooter className="d-flex">
        <Button className="me-auto" color="primary" onClick={Continue}>
          Continue
        </Button>
        <Button color="success" onClick={toUserPage}>
          My Page
        </Button>
        <Button onClick={toHome}>Home</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UploadedModal;

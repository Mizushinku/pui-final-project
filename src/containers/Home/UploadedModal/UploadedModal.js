import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const UploadedModal = (props) => {
  const modal = props.modal;
  const toggle = props.toggle;

  return (
    <Modal centered isOpen={modal} toggle={toggle}>
      <ModalBody className="fs-3">Upload Successed !</ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UploadedModal;

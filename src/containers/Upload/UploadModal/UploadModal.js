import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
} from "reactstrap";
import { db, storage } from "../../../index";
import { v4 as uuidv4 } from "uuid";
import { doc, runTransaction, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";

import UploadedModal from "./UploadedModal/UploadedModal";

const UploadModal = (props) => {
  const [running, setRunning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [uploadedModal, setUploadedModal] = useState(false);
  const taskRef = useRef(undefined);

  const toggleUploaded = () => {
    setUploadedModal((prev) => !prev);
  };

  const onOpen = () => {
    uploadImage();
  };

  const onClose = () => {
    taskRef.current = undefined;
  };

  const uploadImage = () => {
    const metadata = {
      customMetadata: {
        ...props.infoRef.current,
      },
    };
    const fileName = uuidv4() + "." + props.file.name.split(".").pop();
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, props.file, metadata);
    taskRef.current = uploadTask;
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        switch (error.code) {
          case "storage/canceled":
            // User canceled the upload
            console.log("Uploading Canceled.");
            props.toggle();
            break;

          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        setUploadedImgtoDB(uploadTask.snapshot.ref.name).then(
          () => {
            console.log("Successfully Update user's uploaded.");
            props.toggle();
            toggleUploaded();
          },
          (error) => {
            console.log("update user's uploaded Failed", error);
          }
        );
      }
    );
  };

  const setUploadedImgtoDB = async (fileName) => {
    return await runTransaction(db, async (transaction) => {
      const userDocRef = doc(db, "users", props.user.uid);
      const userDoc = await transaction.get(userDocRef);
      if (!userDoc.exists()) {
        throw "Document does not exist!";
      }
      const ts = Timestamp.now();
      const uploaded = [
        ...userDoc.data().uploaded,
        { fileName, timestamp: ts },
      ];
      transaction.update(userDocRef, { uploaded });

      const fileDocRef = doc(db, "files", fileName);
      transaction.set(fileDocRef, { timestamp: ts });
    });
  };

  const handlePauseResume = () => {
    if (running) {
      taskRef.current.pause();
    } else {
      taskRef.current.resume();
    }
    setRunning((prev) => !prev);
  };

  const handleCancel = () => {
    taskRef.current.cancel();
    if (!running) {
      console.log("Pause and Cancel");
      props.toggle();
    }
  };

  return (
    <div>
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        backdrop={"static"}
        centered={true}
        keyboard={false}
        onOpened={onOpen}
        onClosed={onClose}
      >
        <ModalHeader>Uploading File...</ModalHeader>
        <ModalBody>
          <Progress animated color="primary" value={Math.round(progress)}>
            {Math.round(progress)} %
          </Progress>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePauseResume}>
            {running ? "Pause" : "Resume"}
          </Button>
          <Button color="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <UploadedModal modal={uploadedModal} toggle={toggleUploaded} />
    </div>
  );
};

export default UploadModal;

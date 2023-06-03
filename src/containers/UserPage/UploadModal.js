import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
} from "reactstrap";
import imagesInfo from "../../assets/ImagesInfo/ImagesInfo";
import { db, storage } from "../../index";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadModal = (props) => {
  const [running, setRunning] = useState(true);
  const [progress, setProgress] = useState(0);
  const taskRef = useRef(undefined);

  const onOpen = () => {
    uploadImage();
  };

  const onClose = () => {
    taskRef.current = undefined;
  };

  const uploadImage = () => {
    const metadata = {
      customMetadata: {
        ...props.info,
        // uploader: props.user.uid,
        // title: imagesInfo[0]["title"],
        // caption: imagesInfo[0]["caption"],
        // prompt: imagesInfo[0]["prompt"],
        // negativePrompt: imagesInfo[0]["negative prompt"],
        // model: imagesInfo[0]["model"],
        // step: imagesInfo[0]["step"],
        // seed: imagesInfo[0]["seed"],
        // cfg: imagesInfo[0]["cfg"],
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
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            return setUploadedImgUrl(downloadURL);
          })
          .then(
            () => {
              console.log("Successfully Update user's uploaded.");
              props.toggle();
            },
            (error) => {
              console.log("update user's uploaded Failed", error);
            }
          );
      }
    );
  };

  const setUploadedImgUrl = async (url) => {
    const userDocRef = doc(db, "users", props.user.uid);
    const userDoc = await getDoc(userDocRef);
    const uploaded = [
      ...userDoc.data().uploaded,
      { url, timestamp: Timestamp.now() },
    ];
    return await updateDoc(userDocRef, { uploaded });
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
  );
};

export default UploadModal;

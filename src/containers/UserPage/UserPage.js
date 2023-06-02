import React, { useContext, useState } from "react";
import { userCtx } from "../../contexts/userContext";
import { Container, Input } from "reactstrap";
import imagesInfo from "../../assets/ImagesInfo/ImagesInfo";

import { db, storage } from "../../index";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import "./UserPage.scss";

const UserPage = () => {
  const { currUser } = useContext(userCtx);
  const [selectedFile, setSelectedFile] = useState(undefined);

  const imageOnChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = () => {
    const metadata = {
      customMetadata: {
        uploader: currUser.uid,
        title: imagesInfo[0]["title"],
        caption: imagesInfo[0]["caption"],
        prompt: imagesInfo[0]["prompt"],
        negativePrompt: imagesInfo[0]["negative prompt"],
        model: imagesInfo[0]["model"],
        step: imagesInfo[0]["step"],
        seed: imagesInfo[0]["seed"],
        cfg: imagesInfo[0]["cfg"],
      },
    };
    const fileName = uuidv4() + "." + selectedFile.name.split(".").pop();
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        console.log("state: " + snapshot.state);
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
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
            },
            (error) => {
              console.log("update user's uploaded Failed", error);
            }
          );
      }
    );
  };

  const setUploadedImgUrl = async (url) => {
    const userDocRef = doc(db, "users", currUser.uid);
    const userDoc = await getDoc(userDocRef);
    const uploaded = [
      ...userDoc.data().uploaded,
      { url, timestamp: Timestamp.now() },
    ];
    return await updateDoc(userDocRef, { uploaded });
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
      <button className="mt-3" onClick={uploadImage} disabled={!selectedFile}>
        Upload
      </button>
    </Container>
  );
};

export default UserPage;

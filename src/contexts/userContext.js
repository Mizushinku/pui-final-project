import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db, storage } from "../index";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import "./userContext.scss";
import { ref, getDownloadURL, getMetadata } from "firebase/storage";

const userCtx = createContext();

const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(undefined);
  const [myImages, setMyImages] = useState([]);
  const [pending, setPending] = useState(true);

  const getMyImages = async (uid) => {
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    const uploaded = userDoc.data().uploaded;
    uploaded.sort((a, b) => b - a);
    const images = uploaded.map((item) => item.fileName);
    const promises = images.map((fileName) => {
      const fileRef = ref(storage, "images/" + fileName);
      return Promise.all([getDownloadURL(fileRef), getMetadata(fileRef)]);
    });

    Promise.all(promises)
      .then((results) => {
        const userImages = results.map(([url, metadata]) => {
          return { src: url, name: metadata.name, ...metadata.customMetadata };
        });
        setMyImages(userImages);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubAuth = auth.onAuthStateChanged((user) => {
      setCurrUser(user);
      getMyImages(user.uid);
      setPending(false);
    });

    return () => {
      unsubAuth();
    };
  }, []);

  useEffect(() => {
    if (currUser) {
      const unsub = onSnapshot(
        doc(db, "users", currUser.uid),
        { includeMetadataChanges: true },
        (doc) => {
          const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          if (source === "Server") {
            getMyImages(currUser.uid);
          }
        }
      );
      return unsub;
    }
  }, [currUser]);

  if (pending) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center pt-5">
        <div className="lds-ripple mb-3">
          <div></div>
          <div></div>
        </div>
        <p className="fs-5">Loading...</p>
      </div>
    );
  }

  return (
    <userCtx.Provider
      value={{
        currUser,
        myImages,
      }}
    >
      {children}
    </userCtx.Provider>
  );
};

export { userCtx, UserProvider };

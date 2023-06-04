import React, { createContext, useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { db, storage } from "../index";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import "./userContext.scss";
import { ref, getDownloadURL, getMetadata } from "firebase/storage";

const userCtx = createContext();

const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(undefined);
  const [myImages, setMyImages] = useState([]);
  const [myFavs, setMyFavs] = useState([]);
  const [pending, setPending] = useState(true);

  const cntMyImage = useRef(0);

  const getMyImages = async (uid) => {
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    const uploaded = userDoc.data().uploaded;
    if (cntMyImage.current === uploaded.length) {
      return;
    }
    cntMyImage.current = uploaded.length;
    uploaded.sort((a, b) => b.timestamp - a.timestamp);
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

  const getMyFavs = async (uid) => {
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    const favs = userDoc.data().favs;
    if (favs.length === 0) {
      setMyFavs([]);
      return;
    }
    favs.sort((a, b) => b.timestamp - a.timestamp);
    const images = favs.map((item) => item.fileName);
    const promises = images.map((fileName) => {
      const fileRef = ref(storage, "images/" + fileName);
      return Promise.all([getDownloadURL(fileRef), getMetadata(fileRef)]);
    });

    Promise.all(promises)
      .then((results) => {
        const favImages = results.map(([url, metadata]) => {
          return { src: url, name: metadata.name, ...metadata.customMetadata };
        });
        setMyFavs(favImages);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubAuth = auth.onAuthStateChanged((user) => {
      setCurrUser(user);
      if (user) {
        getMyImages(user.uid);
        getMyFavs(user.uid);
      }

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
            getMyFavs(currUser.uid);
          }
        }
      );
      return unsub;
    } else {
      setMyImages([]);
      setMyFavs([]);
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
        myFavs,
      }}
    >
      {children}
    </userCtx.Provider>
  );
};

export { userCtx, UserProvider };

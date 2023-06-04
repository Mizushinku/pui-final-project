import React, { useEffect, useState } from "react";
import ImageTrack from "../ImageTrack/ImageTrack";
import ImageGallery from "../ImageGallery/ImageGallery";
import { db, storage } from "../../index";
import {
  query,
  orderBy,
  limit,
  collection,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { ref, getDownloadURL, getMetadata } from "firebase/storage";

const Home = () => {
  const [trackIamges, setTrackImages] = useState([]);
  const [recentImages, setRecentImages] = useState([]);
  const [lastVisible, setLastVisible] = useState(undefined);
  const [noMore, setNoMore] = useState(false);

  useEffect(() => {
    getImageForTrack(
      query(collection(db, "files"), orderBy("timestamp", "desc"), limit(30)),
      10
    );
    getImageForGallery();
    // eslint-disable-next-line
  }, []);

  const getImageForTrack = async (q, n) => {
    const qSnapshot = await getDocs(q);
    const images = qSnapshot.docs
      .map((doc) => doc.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(n, qSnapshot.docs.length));
    images.forEach((fileName) => {
      const fileRef = ref(storage, "images/" + fileName);
      const urlPromise = getDownloadURL(fileRef);
      const metaPromise = getMetadata(fileRef);
      Promise.all([urlPromise, metaPromise])
        .then((results) => {
          const url = results[0];
          const metadata = results[1];
          setTrackImages((prev) => [
            ...prev,
            { url, info: { name: metadata.name, ...metadata.customMetadata } },
          ]);
        })
        .catch((error) => {
          // Handle any errors
        });
    });
  };

  const getImageForGallery = async () => {
    if (noMore) return;
    const n = 10;
    let qSnapshot = null;
    let q = undefined;
    if (!lastVisible) {
      q = query(
        collection(db, "files"),
        orderBy("timestamp", "desc"),
        limit(n)
      );
    } else {
      q = query(
        collection(db, "files"),
        orderBy("timestamp", "desc"),
        startAfter(lastVisible),
        limit(n)
      );
    }
    qSnapshot = await getDocs(q);
    if (qSnapshot.docs.length < n) {
      setNoMore(true);
    }
    setLastVisible(qSnapshot.docs[qSnapshot.docs.length - 1]);
    const images = qSnapshot.docs.map((doc) => doc.id);
    const promises = images.map((fileName) => {
      const fileRef = ref(storage, "images/" + fileName);
      return Promise.all([getDownloadURL(fileRef), getMetadata(fileRef)]);
    });

    Promise.all(promises)
      .then((results) => {
        const newImages = results.map(([url, metadata]) => {
          return { src: url, name: metadata.name, ...metadata.customMetadata };
        });
        setRecentImages((prev) => [...prev, ...newImages]);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  return (
    <div>
      <ImageTrack images={trackIamges}></ImageTrack>
      <h1 className="fw-bold fs-1 text-center my-5">Recent Gallery</h1>
      <ImageGallery
        imgInfo={recentImages}
        reachBottom={getImageForGallery}
      ></ImageGallery>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import ImageTrack from "../ImageTrack/ImageTrack";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImagesInfo from "../../assets/ImagesInfo/ImagesInfo";
import { db, storage } from "../../index";
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, getMetadata } from "firebase/storage";

const Home = () => {
  const [trackIamges, setTrackImages] = useState([]);

  useEffect(() => {
    getImageForTrack(
      query(collection(db, "files"), orderBy("timestamp", "desc"), limit(30)),
      10
    );
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
            { url, info: metadata.customMetadata },
          ]);
          console.log(metadata.customMetadata);
        })
        .catch((error) => {
          // Handle any errors
        });
    });
  };

  return (
    <div>
      <ImageTrack images={trackIamges}></ImageTrack>
      <h1 className="fw-bold fs-1 text-center my-5">Recent Gallery</h1>
      <ImageGallery imgInfo={ImagesInfo}></ImageGallery>
    </div>
  );
};

export default Home;

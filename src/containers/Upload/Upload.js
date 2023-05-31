import React, { useState } from "react";
import testImg from "./08682-2023-05-19.png";

async function image_data() {
  try {
    let image = testImg;
    let textinfo = await read_info_from_image(image);
    console.log(textinfo);
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

async function read_info_from_image(image) {
  try {
    let items = image["info"];
    let textinfo = items["parameters"];
    return textinfo;
  } catch (error) {
    return null;
  }
}

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    // 在這裡處理上傳圖片的邏輯，例如將圖片送到伺服器
    if (selectedImage) {
      console.log("上傳圖片:", selectedImage);
      // 在此執行上傳圖片的相關操作
      image_data();
    } else {
      console.log("請選擇要上傳的圖片");
    }
  };

  return (
    <div>
      <h2>圖片上傳</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>上傳</button>
    </div>
  );
}

export default ImageUploader;

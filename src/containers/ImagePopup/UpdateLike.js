import { storage } from "../../index";
import { ref, getMetadata, updateMetadata } from "firebase/storage";

// 更新檔案 metadata 的範例
export function UpdateLike(fileName, type, setFavCnt) {
  const storageRef = ref(storage, "images/" + fileName);
  getMetadata(storageRef)
    .then((metadata) => {
      // 原始 metadata
      console.log("Original metadata:", metadata);
      let newMetadata = {};
      // 更新部分 metadata 屬性
      if (metadata.customMetadata.hasOwnProperty("fav")) {
        if (type == "+") {
          newMetadata = {
            // 使用原始 metadata 屬性和值
            ...metadata,
            customMetadata: {
              ...metadata.customMetadata,
              fav: parseInt(metadata.customMetadata.fav) + 1,
            },
          };
        } else if (type == "-") {
          newMetadata = {
            // 使用原始 metadata 屬性和值
            ...metadata,
            customMetadata: {
              ...metadata.customMetadata,
              fav: parseInt(metadata.customMetadata.fav) - 1,
            },
          };
        }
      }

      console.log(newMetadata);

      // 更新檔案的 metadata
      return updateMetadata(storageRef, newMetadata);
    })
    .then(() => {
      // 更新成功
      console.log("Metadata updated successfully");
      if (type === "+") {
        setFavCnt((prev) => prev + 1);
      } else {
        setFavCnt((prev) => prev - 1);
      }
    })
    .catch((error) => {
      // 更新失敗
      console.error("Error updating metadata:", error);
    });
}

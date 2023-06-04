import { storage } from "../../index";
import { ref, getMetadata, updateMetadata } from "firebase/storage";
import { db } from "../../index";
import { getDoc, doc, updateDoc, Timestamp } from "firebase/firestore";

// 更新檔案 metadata 的範例
export function UpdateLike(userUid, fileName, type, setFavCnt) {
  const storageRef = ref(storage, "images/" + fileName);
  let newMetadata = {};
  getMetadata(storageRef)
    .then((metadata) => {
      // 原始 metadata
      // console.log("Original metadata:", metadata);
      // 更新部分 metadata 屬性
      if (metadata.customMetadata.hasOwnProperty("fav")) {
        if (type === "+") {
          newMetadata = {
            // 使用原始 metadata 屬性和值
            ...metadata,
            customMetadata: {
              ...metadata.customMetadata,
              fav: parseInt(metadata.customMetadata.fav) + 1,
            },
          };
        } else if (type === "-") {
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

      // console.log(newMetadata);

      // 更新檔案的 metadata
      return updateMetadata(storageRef, newMetadata);
    })
    .then(() => {
      // 更新成功
      console.log("Metadata updated successfully");
      if (type === "+" && setFavCnt != null) {
        setFavCnt((prev) => prev + 1);
      } else if (type === "-" && setFavCnt != null) {
        setFavCnt((prev) => prev - 1);
      }
      // console.log(newMetadata.customMetadata);
      updateFavs();
    })
    .catch((error) => {
      // 更新失敗
      console.error("Error updating metadata:", error);
    });

  const updateFavs = async () => {
    const userDoc = await getDoc(doc(db, "users", userUid));
    let favs = userDoc.data().favs;
    if (type === "+") {
      favs = [...favs, { fileName, timestamp: Timestamp.now() }];
    } else {
      favs = favs.filter((item) => item.fileName !== fileName);
    }
    await updateDoc(doc(db, "users", userUid), { favs });
  };
}
/*
export function addCFG2Metadata() {
  // 取得 "images" 資料夾的參考
  const imagesRef = ref(storage, "images");

  // 使用 listAll 方法列出 "images" 資料夾下的所有檔案
  listAll(imagesRef)
    .then((res) => {
      // 遍歷每個檔案的參考
      res.items.forEach((itemRef) => {
        // 更新檔案的 metadata
        let random = Math.random();
        let cfg = 5;
        if (random < 0.5) {
          cfg = 7;
        }
        getMetadata(itemRef)
          .then((metadata) => {
            // 更新 metadata
            const newMetadata = {
              ...metadata,
              customMetadata: {
                ...metadata.customMetadata,
                cfg: cfg,
              },
            };
            return updateMetadata(itemRef, newMetadata);
          })
          .then(() => {
            console.log("Metadata updated successfully!");
          })
          .catch((error) => {
            console.log("Failed to update metadata:", error);
          });
      });
    })
    .catch((error) => {
      console.error("列出檔案時發生錯誤：", error);
    });
}
*/

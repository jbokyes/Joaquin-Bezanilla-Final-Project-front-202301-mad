import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FoodStructure } from "../../models/food";

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const newImage = async (info: Partial<FoodStructure>, file?: File) => {
  if (!file) {
    return;
  }
  const storagaRef = ref(storage, info.name);

  await uploadBytes(storagaRef, file);

  const imgUrl = await getDownloadURL(storagaRef);

  info.img = imgUrl;
};

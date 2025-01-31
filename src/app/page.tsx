"use client";

import { db } from "@/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";


export default function Home() {
  const handleClickFetchButton = async () => {
    const docRef = doc(db, "users", "WMEvKKeF3deZTOWhOVQ9");

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={handleClickFetchButton}>取得</button>
    </div>
  );
}
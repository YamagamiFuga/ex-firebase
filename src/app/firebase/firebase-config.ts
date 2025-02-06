import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDJ5waD16Uvgsi-asuMYJpS8F4CHZXyfsM",
  authDomain: "test3-efcbe.firebaseapp.com",
  projectId: "test3-efcbe",
  storageBucket: "test3-efcbe.firebasestorage.app",
  messagingSenderId: "1080509534806",
  appId: "1:1080509534806:web:67a55c9c1c734ea5f461f7",
  measurementId: "G-P99EQPYFZW"
};


// Firebase の初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);


//メール、パスワードで新規登録
export const signupWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    await sendEmailVerification(userCredential.user);

    alert("登録成功");
    return userCredential.user;
  } catch (error) {
    alert("登録失敗");
    console.error(error);
  }
};

export const signinWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );

    alert("サインイン成功");
    return userCredential.user;
  } catch (error) {
    alert("サインイン失敗");
    console.error(error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    alert("ログアウト成功");
    console.log("ログアウト成功");
  } catch (error) {
    alert("ログアウト失敗");
    console.error(error);
  }
};


export { app, db };
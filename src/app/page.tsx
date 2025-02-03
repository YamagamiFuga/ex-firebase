"use client";
import Login from "./components/Login";
import { useState, useEffect} from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDJ5waD16Uvgsi-asuMYJpS8F4CHZXyfsM",
  authDomain: "test3-efcbe.firebaseapp.com",
  projectId: "test3-efcbe",
  storageBucket: "test3-efcbe.firebasestorage.app",
  messagingSenderId: "1080509534806",
  appId: "1:1080509534806:web:67a55c9c1c734ea5f461f7",
  measurementId: "G-P99EQPYFZW"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//ユーザーの型
interface User {
  userId: string;
  name: string;
  age: number;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [documentId, setDocumentId] = useState("");

  //データの更新検知
  useEffect(() => {
    const db = firebase.firestore();           //データの並び替えdesc,asc
    const unsubscribe = db.collection('users').orderBy('age', 'asc').onSnapshot((QuerySnapshot) => {
      // console.log('検知されました');
      // QuerySnapshot.forEach(doc => {
      //   console.log(doc.id, doc.data());
      //   console.log('-----------------------------');
      // });

      const _users = QuerySnapshot.docs.map(doc => {
        const userData = doc.data() as Partial<User>;
        return {
          userId: doc.id,
          name: userData.name ?? "No Name",
          age: userData.age ?? 0
        };
      });
      setUsers(_users);
    });
    return () => {
      unsubscribe();
    };
  }, []);


    //データの取得
  const handleClickFeachButton = async () => {
      const db = firebase.firestore();
      const snapshot = await db.collection("users").get();

      const _users: User[] = [];
      snapshot.forEach((doc) => {
        const userData = doc.data() as Partial<User>; // `Partial<User>` を使用
        _users.push({
          userId: doc.id,
          name: userData.name ?? "No name",
          age: userData.age ?? 0,
        });
      });
      setUsers(_users);
  };

  //テキストフィールドからのデータの追加
  const handleClickAddButton = async () => {
      //テキストフィールドに文字が入っているか
      if (!userName || !age) {
        alert('"userName" or "age" が空です。');
        return;
      }
      const parsedAge = parseInt(age, 10);
      //ageテキストフィールドに数字がはいっているか
      if (isNaN(parsedAge) ) {
        alert('numberは半角の数値でセットしてください');
        return;
      }


      const db = firebase.firestore();
      const res = await db.collection('users').add({
      name: userName,
      age: parsedAge
      });

      setUserName('');
      setAge('');
      const snapshot = await res.get();
      const data = snapshot.data();
      console.log(res.id, data);
  };

    //データの更新
  const handleClickUpdataButton = async () => {
      if (!documentId) {
        alert('documentIdをセットしてください')
        return;
      }

      const newData: Partial<User> = {};
      if (userName) {
        newData['name'] = userName;
      }

      if (age) {
        newData['age'] = parseInt(age, 10);;
      }

      try {
        const db = firebase.firestore();
        await db.collection('users').doc(documentId).update(newData);
        setUserName('');
        setAge('');
        setDocumentId('');
      } catch (error) {
        console.error(error);
      }
  };

  const handleClickdeleteButton = async () => {
      if (!documentId) {
        alert('documentIdをセットしてください');
        return;
      }
      try {
        const db = firebase.firestore();
        await db.collection('users').doc(documentId).delete();
        setUserName('');
        setAge('');
        setDocumentId('');

    } catch (error) {
      console.error(error);
  }};

  const userListItems = users.map(user => {
    return (
      <li key={user.userId}>
        <ul>
          <li>ID: {user.userId}</li>
          <li>name: {user.name}</li>
          <li>age: {user.age}</li>
        </ul>
      </li>
    );
  });

  return (
    <div className="app-container">
      <h1>Firebase演習</h1>
      <Login />
      <h2>Firestore演習</h2>
      <div className="form-container">
        <label htmlFor="username">userName :</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          className="input-field"
        />
        <label htmlFor="age">age :</label>
        <input
          type="text"
          id="age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          className="input-field"
        />
        <label htmlFor="documentId">documentId :</label>
        <input
          type="text"
          id="documentId"
          value={documentId}
          onChange={(event) => setDocumentId(event.target.value)}
          className="input-field"
        />
      </div>
  
      <div className="button-container">
        <button onClick={handleClickFeachButton}>取得</button>
        <button onClick={handleClickAddButton}>追加</button>
        <button onClick={handleClickUpdataButton}>更新</button>
        <button onClick={handleClickdeleteButton}>削除</button>
      </div>
  
      <ul className="user-list">{userListItems}</ul>
  
      <style jsx>{`
        .app-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }
  
        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 300px;
          margin-bottom: 20px;
        }
  
        .input-field {
          width: 100%;
          padding: 8px;
          margin: 5px 0;
          border: 2px solid #ccc;
          border-radius: 5px;
          text-align: center;
        }
  
        .button-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }
  
        .user-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
  
        .user-list li {
          background: #f8f9fa;
          padding: 10px;
          margin: 5px 0;
          border-radius: 5px;
          width: 250px;
          text-align: center;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
  

  
}



    /*
    特定の一つのドキュメントを取得する
  
    const doc = await db.collection('users').doc('WMEvKKeF3deZTOWhOVQ9'
    ).get();
    console.log(doc.data());
    */
    
    /*
    コレクションの取得
    const snapshot = await db
      //コレクション名
      .collection('users')
      //条件指定
      .where('age', '<=', 20)
      //件数指定
      .limit(1)
      .get();
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    });
  
    console.log("Fetch Clicked");
  };
  */


    //データの追加
    //const handleClickAddButton = async () => {
    //const db = firebase.firestore();
    // await db
    // .collection('users')
    // .doc('1')
    // .set({
    //   name: '中越',
    //   age: 23
    // }, {merge: true}); //ドキュメント全体が上書きされないように
    
    //addを使用したデータの追加
    // const res = await db.collection('users').add({
    //   name: '國田',
    //   age: '40'
    // });
    // const snapshot = await res.get();
    // const data = snapshot.data();
    // console.log(res.id, data);
  
  //}






    // //データの更新
    // const handleClickUpdataButton = async () => {
    //   const db = firebase.firestore();
    //   await db.collection('users').doc('6GhDqB3xy0nvXVA4h7Tg').update({
    //     name: '山上',
    //     age: 20
    //   });

    // }
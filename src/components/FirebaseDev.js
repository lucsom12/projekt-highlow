import { collection, addDoc, getFirestore, query, where, getDocs } from "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/firestore";
import { useState } from "react";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect } from "react";
import firebaseConfig from "./firebase-config"
import { useLoaderData } from "react-router";


//useoutlet

// export const postScoreToFirebase = async (playerName, score) => { //use this to make it more modular and the same for fetch
//   try {
//     const docRef = await addDoc(usersCollection, {
//       playerName: playerName,
//       age: age,
//       score: JSON.stringify(score),
//     });
//     console.log('Document written with ID: ', docRef.id);
//     fetchData().then((userData) => {
//       setData(userData);
//     });

//   } catch (error) {
//     console.error('Error adding document: ', error);
//   }
// }


export default function FirebaseDev() {
  firebase.initializeApp(firebaseConfig);
  const score = useLoaderData("1");

  const db = getFirestore(); // Replace with your Firestore initialization code
  const usersCollection = collection(db, 'LeaderBoard2'); // Specify the name of your collection

  const [playerName, setPlayerName] = useState('Joar')

  const q = query(usersCollection, playerName);

  const [data, loading, error] = useCollection(q);
  //TODO modular 
  async function pushInformation(playerName, age) {
    try {
      const docRef = await addDoc(usersCollection, {
        playerName: playerName,
        age: age,
        score: JSON.stringify(score),
      });
      console.log('Document written with ID: ', docRef.id);
      fetchData().then((userData) => {
        setData(userData);
      });

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }


  async function fetchData() {
    try {
      const querySnapshot = await getDocs(usersCollection);
      const userData = querySnapshot.docs.map((doc) => doc.data());
      // 'userData' now contains an array of objects representing your Firestore documents
      return userData;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return []; // Handle the error gracefully
    }
  }

  const [dat, setData] = useState([]);

  useEffect(() => {
    fetchData().then((userData) => {
      setData(userData);
    });
  }, []);


  return (
    <div>

      <h1>SpotyHigher Firebase mock</h1>
      <button onClick={() => pushInformation("Joar", "6", "2")}> Push</button>
      <h1>My Data</h1>
      <ul>
        {dat.map((item, index) => (
          <li key={index}>
            Player Name: {item.playerName}, Score: {item.score}
          </li>
        ))}
      </ul>

    </div>
  )
}

import LeaderBoardkladd from "./LeaderBoardkladd";
import { collection, addDoc, getFirestore, query, where, getDocs } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { useState } from "react";
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect } from "react";
import { push } from "@firebase/database";





export default function HomePage() {

  const db = getFirestore(); // Replace with your Firestore initialization code
  const usersCollection = collection(db, 'LeaderBoard'); // Specify the name of your collection

  const [playerName, setPlayerName] = useState('Joar')

  const q = query(usersCollection, playerName);

  const [data, loading, error] = useCollection(q);


  const addScore = () => {
    addDoc(data, {
      playerName: playerName
    })
  }
  async function pushInformation(playerName, age, score) {
    try {
      const docRef = await addDoc(usersCollection, {
        playerName: playerName,
        age: age,
        score: score,
      });
      console.log('Document written with ID: ', docRef.id);
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

      <h1>SpotyHigher</h1>
      {/* <LeaderBoardkladd /> */}
      <button addClick={pushInformation("Joar", "6", "2")}> Push</button>
      <h1>My Data</h1>
      <ul>
        {dat.map((item, index) => (
          <li key={index}>{item.fieldName}</li>
        ))}
      </ul>
    </div>
  )
}
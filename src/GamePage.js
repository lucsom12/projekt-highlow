import TrackDisplay from "./TrackDisplay";
import React, { useEffect, useState } from "react";
import { addDoc, collection, getFirestore } from "@firebase/firestore";
import FirebaseDev from "./components/FirebaseDev";

function GamePage({ tracks }) {
    const [score, setScore] = useState(0);
    const [hiScore, setHiScore] = useState(0);

    function updateScore() {
        setScore(score + 1)
        setHiScore(Math.max(hiScore, score + 1))
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function twoRandomInts(maxLength) {
        const value1 = getRandomInt(maxLength)
        let value2 = getRandomInt(maxLength)
        while (value2 === value1) {
            value2 = getRandomInt(maxLength)
        }
        return [value1, value2]
    }
    async function postScore() {
        const db = getFirestore();
        const scoresCollection = collection(db, "LeaderBoard2");
        await addDoc(scoresCollection, { score: score });


    }

    const [randInts, setRandInts] = useState(twoRandomInts(tracks.length));

    return (
        <div className='container'>
            <div className="row d-flex justify-content-center align-items-center">
                <p>Highest Score: {hiScore}</p>
                <p>Score: {score}</p>
                <TrackDisplay track={tracks[randInts[0]]} length={tracks.length} scoreFunction={updateScore} />
                <TrackDisplay track={tracks[randInts[1]]} length={tracks.length} scoreFunction={updateScore} />
                <button onClick={postScore}>Post to firebase</button>
            </div>
        </div>
    )
}


export default GamePage
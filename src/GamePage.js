import TrackDisplay from "./TrackDisplay";
import React, { useEffect, useState } from "react";

function GamePage({ tracks }) {
    const [score, setScore] = useState(0);
    const [hiScore, setHiScore] = useState(0);

    function updateScore() {
        // setScore((object) => {
        //     const clone = object
        //     return clone + 1
        //  })
        //setScore(score + 1)
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

    const [randInts, setRandInts] = useState(twoRandomInts(tracks.length));

    return (
        <div className='container'>
            <div className="row d-flex justify-content-center align-items-center">
                <p>Highest Score: {hiScore}</p>
                <p>Score: {score}</p>
                <TrackDisplay track={tracks[randInts[0]]} length={tracks.length} scoreFunction={updateScore} />
                <TrackDisplay track={tracks[randInts[1]]} length={tracks.length} scoreFunction={updateScore} />
            </div>
        </div>
    )
}


export default GamePage
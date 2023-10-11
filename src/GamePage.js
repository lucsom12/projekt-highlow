import TrackDisplay from "./TrackDisplay";
import React, { useEffect, useState } from "react";

function GamePage({ tracks }) {
    const [score, setScore] = useState(0);
    const [hiScore, setHiScore] = useState(0);

    function updateScore(newScore) {
        setScore(newScore)
        setHiScore(Math.max(hiScore, score))
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
                < TrackDisplay track={tracks[randInts[0]]} length={tracks.length} />
                <TrackDisplay track={tracks[randInts[1]]} length={tracks.length} />
            </div>
        </div>
    )
}


export default GamePage
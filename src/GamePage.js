import TrackDisplay from "./TrackDisplay";
import React, { useEffect, useState } from "react";

function GamePage({ tracks }) {
    
    console.log(tracks)
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
                    < TrackDisplay track={tracks[randInts[0]]} length={tracks.length} />
                    <TrackDisplay track={tracks[randInts[1]]} length={tracks.length} />
            </div>
        </div>
    )
}


export default GamePage
import TrackDisplay from "./TrackDisplay";
import React, { useState } from "react";

function GamePage({ tracks }) {
    let trackList = tracks
    let trackIndex = []
    const [score, setScore] = useState(0);
    const [hiScore, setHiScore] = useState(0);
    const [showTrackPopularity, setShowTrackPopularity] = useState(false);
    const [randTracks, setRandTracks] = useState(twoRandomTracks(trackList));

    function evaluateChoice(trackId) {
        console.log("hello")
        for (let i = 0; i < randTracks.length; i++) {
            const other = Math.abs(i-1)

            console.log(trackId + " " + randTracks[i].id)

            if (randTracks[i].id === trackId) {
                if (randTracks[i].popularity >= randTracks[other].popularity) {
                    updateScore(trackId)
                }
                else {
                    gameOver()
                }
            }
        }
    }

    function updateScore(trackId) {
        console.log('success')
        // setScore((object) => {
        //     const clone = object
        //     return clone + 1
        //  })
        const newScore = score + 1;
        setScore(newScore)
        setHiScore(Math.max(hiScore, newScore))
        //setShowTrackPopularity(true)
        //paus
        //setShowTrackPopularity(false)
        updateTrackList()
    }

    function gameOver(trackId) {
        console.log('game over')
    }

    function updateTrackList() {
        if (trackList.length <= 2) {
            alert('congrats you got max score!')
            console.log('done')
        }
        const remove = [trackIndex[0], trackIndex[1]];
 
        console.log("pre: " + trackList.length)
        for (let i = remove.length - 1; i >= 0; i--) trackList.splice(remove[i], 1);

        console.log("post: " + trackList.length)

        setRandTracks(twoRandomTracks(trackList))
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

    function twoRandomTracks(tracks) {
        const randIDs = twoRandomInts(tracks.length)
        return [tracks[randIDs[0]], tracks[randIDs[1]]]
    }


    return (
        <div className='container'>
            <div className="row d-flex justify-content-center align-items-center">
                <p>Highest Score: {hiScore}</p>
                <p>Score: {score}</p>
                <TrackDisplay track={randTracks[0]} length={trackList.length} scoreFunction={evaluateChoice} showPopularity={showTrackPopularity}/>
                <TrackDisplay track={randTracks[1]} length={trackList.length} scoreFunction={evaluateChoice} showPopularity={showTrackPopularity}/>
            </div>
        </div>
    )
}


export default GamePage
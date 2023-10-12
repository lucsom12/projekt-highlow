import TrackDisplay from "./TrackDisplay";
import React, { useState } from "react";

function GamePage({ tracks }) {
    let trackList = tracks
    let trackIndex = []
    let streak = 0 
    const maxStreak = 2
    const [score, setScore] = useState(0);
    const [hiScore, setHiScore] = useState(0);
    const [showTrackPopularity, setShowTrackPopularity] = useState(false);
    const [randTracks, setRandTracks] = useState(twoRandomTracks(trackList));
    const [isDisabled, setDisabled] = useState(false);

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    function evaluateChoice(trackId) {
        console.log("hello")
        for (let i = 0; i < randTracks.length; i++) {
            const otherIndex = Math.abs(i-1)

            console.log(trackId + " " + randTracks[i].id)

            if (randTracks[i].id === trackId) {
                if (randTracks[i].popularity >= randTracks[otherIndex].popularity) {
                    stateSuccess(otherIndex)
                }
                else {
                    stateGameOver()
                }

                return
            }
        }
    }

    function updateScore() {
        const newScore = score + 1;
        setScore(newScore)
        setHiScore(Math.max(hiScore, newScore))
    }
    
    function stateSuccess(loserIndex) {
        console.log('success')
        updateScore()
        updateTrackList(2000, loserIndex)
    }

    function stateGameOver() {
        console.log('game over')
        alert('game over')
        endGame()
    }

    function endGame() {
        setShowTrackPopularity(true)
        setDisabled(true)
    }

    async function updateTrackList(popularityDelay, loserIndex) {
        setShowTrackPopularity(true)
        await timeout(popularityDelay)
        setShowTrackPopularity(false)

        let remove = [trackIndex[loserIndex]];

        streak += 1;
        if (streak === maxStreak) {
            streak = 0
            remove.push(trackIndex[Math.abs(loserIndex-1)])
        }

        console.log("streak: " + streak)
 
        console.log("pre: " + trackList.length)
        for (let i = remove.length - 1; i >= 0; i--) trackList.splice(remove[i], 1);

        console.log("post: " + trackList.length)

        
        if (trackList.length <= 2) {
            endGame()
            alert('congrats you got max score!')
            console.log('done')
        }

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
                <TrackDisplay track={randTracks[0]} length={trackList.length} scoreFunction={evaluateChoice} showPopularity={showTrackPopularity} isDisabled={isDisabled}/>
                <TrackDisplay track={randTracks[1]} length={trackList.length} scoreFunction={evaluateChoice} showPopularity={showTrackPopularity} isDisabled={isDisabled}/>
            </div>
        </div>
    )
}


export default GamePage
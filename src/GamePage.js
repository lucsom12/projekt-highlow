import TrackDisplay from "./TrackDisplay";
import React, { useEffect, useState } from "react";
import { addDoc, collection, getFirestore } from "@firebase/firestore";

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
    const [playerName, setPlayerName] = useState("Anders");

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    function evaluateChoice(trackId) {
        console.log("hello")
        for (let i = 0; i < randTracks.length; i++) {
            const otherIndex = Math.abs(i - 1)

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
            remove.push(trackIndex[Math.abs(loserIndex - 1)])
        }

        console.log("streak: " + streak)

        console.log("pre: " + trackList.length)
        for (let i = remove.length - 1; i >= 0; i--) trackList.splice(remove[i], 1);

        console.log("post: " + trackList.length)

        if (trackList.length <= 2) {
            alert('congrats you got max score!')
            console.log('done')
            endGame()
            return
        }

        const rand = getRandomTracks(trackList, 2)
        console.log(rand)
        setRandTracks(rand)
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function randomIntArray(length, maxValue) {
        let list = []
        for (let i = 0; i < length; i++) {
            let val = getRandomInt(maxValue)
            if (i > 0) {
                while (val === list[i - 1]) val = getRandomInt(maxValue)
            }

            console.log("val: " + val)
            list.push(val)
        }

        console.log("test: " + list)
        return list
    }

    function getRandomTracks(trackList, amount) {
        // const randArray = randomIntArray(amount, trackList.length-1)
        let pickedTracks = []
        // for (let i; i < randArray.length; i++) {
        //     pickedTracks.push(trackList[randArray[i]]) 
        // }

        randomIntArray(amount, trackList.length - 1).forEach((index) => {
            pickedTracks.push(trackList[index])
        })

        return pickedTracks
    }

    function twoRandomInts(maxValue) {
        const value1 = getRandomInt(maxValue)
        let value2 = getRandomInt(maxValue)
        while (value2 === value1) {
            value2 = getRandomInt(maxValue)
        }
        return [value1, value2]
    }
    async function postScore() {
        const db = getFirestore();
        const scoresCollection = collection(db, "LeaderBoard2");
        await addDoc(scoresCollection, { Name: playerName, score: score });
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
                <TrackDisplay track={randTracks[0]} length={trackList.length} scoreFunction={evaluateChoice} showPopularity={showTrackPopularity} isDisabled={isDisabled} />
                <TrackDisplay track={randTracks[1]} length={trackList.length} scoreFunction={evaluateChoice} showPopularity={showTrackPopularity} isDisabled={isDisabled} />
            </div>
        </div>
    )
}

export default GamePage
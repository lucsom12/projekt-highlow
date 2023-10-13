import TrackDisplay from "./TrackDisplay";
import React, { useState } from "react";

function GamePage({ tracks }) {
    const [trackList, setTrackList] = shuffle([tracks]);
    console.log(trackList)
    let trackIndex = [];
    let streak = 0;
    const maxStreak = 2;
    const [score, setScore] = useState(0);
    const [hiScore, setHiScore] = useState(0);
    const [showTrackPopularity, setShowTrackPopularity] = useState(false);
    const [isDisabled, setDisabled] = useState(false);

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    function evaluateChoice(trackId) {
        // for (let i = trackList.length-1; i >= trackList.length-2; i--) {
            
        // }
        if (trackList[trackList.length-1].id === trackId) {
            if (trackList[trackList.length-1].popularity >= trackList[trackList.length-2].popularity) {
                stateSuccess(trackList.length-2);
            }
            else {
                stateGameOver();
            }

            return;
        }

        if (trackList[trackList.length-2].id === trackId) {
            if (trackList[trackList.length-2].popularity >= trackList[trackList.length-1].popularity) {
                stateSuccess(trackList.length-1);
            }
            else {
                stateGameOver();
            }

            return;
        }
    }

    function updateScore() {
        const newScore = score + 1;
        setScore(newScore);
        setHiScore(Math.max(hiScore, newScore));
    }
    
    async function updateTrackList(popularityDelay, loserIndex) {
        setShowTrackPopularity(true);
        await timeout(popularityDelay);
        setShowTrackPopularity(false);
        
        trackList.pop()
        trackList.pop()
        // setTrackList((object) => {
        //     const clone = object;
        //     clone.pop()
        //     clone.pop()
        //     return clone;
        // })
    }

    function stateSuccess(loserIndex) {
        console.log('success');
        updateScore();
        updateTrackList(2000, loserIndex);
    }

    function stateGameOver() {
        console.log('game over');
        alert('game over');
        endGame();
    }

    function endGame() {
        setShowTrackPopularity(true);
        setDisabled(true);
    }


    return (
        <div className='container'>
            <div className="row d-flex justify-content-center align-items-center">
                <p>Highest Score: {hiScore}</p>
                <p>Score: {score}</p>
                <TrackDisplay track={trackList[trackList.length-1]} length={trackList.length} scoreFunction={evaluateChoice} showPopularity={showTrackPopularity} isDisabled={isDisabled}/>
                <TrackDisplay track={trackList[trackList.length-2]} length={trackList.length} scoreFunction={evaluateChoice} showPopularity={showTrackPopularity} isDisabled={isDisabled}/>
            </div>
        </div>
    )
}

export default GamePage
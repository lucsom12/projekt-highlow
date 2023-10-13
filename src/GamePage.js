import TrackDisplay from "./TrackDisplay";
import React, { useState } from "react";

function GamePage({ tracks }) {
    const trackList = tracks;
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
        if (trackList[trackList.length-1].id === trackId) {
            compareTracks(1);
        }
        else {
            compareTracks(2);
        }
    }

    function compareTracks(index) {
        const otherIndex = (index === 1) ? 2 : 1; 
        if (trackList[trackList.length-index].popularity >= trackList[trackList.length-otherIndex].popularity) {
            stateSuccess(index);
        }
        else {
            stateGameOver();
        }
    }

    function updateScore() {
        const newScore = score + 1;
        setScore(newScore);
        setHiScore(Math.max(hiScore, newScore));
    }
    
    async function updateTrackList(popularityDelay, winnerSide) {
        setShowTrackPopularity(true);
        await timeout(popularityDelay);
        setShowTrackPopularity(false);
        
        if (trackList.length <= 2) {
            alert('congrats you got max score!')
            console.log('done')
            endGame()
            return
        }
        else {
            trackList.pop()
        }
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
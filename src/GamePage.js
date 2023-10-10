import TrackDisplay from "./TrackDisplay";



function GamePage({ tracks }) {

    return (
        <div>
            < TrackDisplay track={tracks[twoRandomInts(tracks.length)[0]]} length={tracks.length} />
            < TrackDisplay track={tracks[twoRandomInts(tracks.length)[1]]} length={tracks.length} />
        </div>

    )

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

export default GamePage
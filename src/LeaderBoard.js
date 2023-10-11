import { useEffect, useState } from "react";


function LeaderBoard() {
    const [players, setPlayers] = useState([])
    let mockPlayers = [
        { name: 'adam', score: 200 },
        { name: 'leo', score: 100 },
        { name: 'luc', score: 300 },
        { name: 'joar', score: 33 }
    ];
    useEffect(() => {
        setPlayers(mockPlayers.sort(compare))
    }, [])

    return (
        <div>
            {players.map(player => (
                <Entry key={player.name} name={player.name} score={player.score} />
            ))}
        </div>
    )

}

function Entry({ name, score }) {
    return <li>{name}: {score} </li>
}

function compare(a, b) {
    if (a.score > b.score) {
        return -1;
    }
    if (a.score < b.score) {
        return 1;
    }
    return 0;
}


export default LeaderBoard
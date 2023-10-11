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
        <div className="container-md">
            <ul className="list-group list-group-numbered">
                {players.map((player, index) => (
                    <Entry key={player.name} name={player.name} score={player.score} />
                ))}
            </ul>
        </div>
    )

}

function Entry({ name, score, index }) {
    return <li className="list-group-item"> {name}: {score} </li>
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
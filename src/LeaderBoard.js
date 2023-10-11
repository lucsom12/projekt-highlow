import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { useEffect, useState } from "react";


function LeaderBoard() {

    const db = getFirestore();
    const scoresCollection = collection(db, "LeaderBoard2");
    const [players, setPlayers] = useState([])
    let mockPlayers = [
        { name: 'adam', score: 200 },
        { name: 'leo', score: 100 },
        { name: 'luc', score: 300 },
        { name: 'joar', score: 33 }
    ];
    useEffect(() => {
        async function fetchData() {
            try {
                const querySnapshot = await getDocs(scoresCollection);
                const data = querySnapshot.docs.map((doc) => {
                    const { playerName, score } = doc.data();
                    return { playerName, score };
                });
                // Sort the data by score in descending order
                data.sort((a, b) => b.score - a.score);
                setPlayers(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching data from Firebase: ", error);
            }
        }

        fetchData();
    }, [scoresCollection]);



    return (
        <div className="container-md">
            <h1>LeaderBoard</h1>
            <ul className="list-group list-group-numbered">
                {players.map((player, index) => (
                    <Entry key={player.name} name={player.playerName} score={player.score} />
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
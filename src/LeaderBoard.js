import { collection, getDocs, getFirestore } from "@firebase/firestore";
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
        async function fetchData() {
            const db = getFirestore();
            const scoresCollection = collection(db, "LeaderBoard2");

            console.log("fetching data");
            try {
                const querySnapshot = await getDocs(scoresCollection);
                const data = []
                querySnapshot.forEach((doc) => {
                    const { playerName, score } = doc.data();
                    data.push({ playerName, score });
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
    }, []);



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
import { collection, getDocs, getFirestore, addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import HighscoreForm from "./HighScoreModal";

function LeaderBoard() {

    const [players, setPlayers] = useState([]);
    const { score, artist } = useParams();


    const location = useLocation();
    let cameFromModal = location.state && location.state.fromModal;

    async function submitScore(name, score, artist) {
        console.log("did I come from modal?", { cameFromModal })
        console.log("Player ID", name, score, artist)
        const db = getFirestore();
        const scoresCollection = collection(db, "LeaderBoard2");

        await addDoc(scoresCollection, { name: name, score: score, artist: artist });//want to store the score before posting
    }
    useEffect(() => {

        // let mockPlayers = [
        //   { name: "adam", score: 200 },
        //   { name: "leo", score: 100 },
        //   { name: "luc", score: 300 },
        //   { name: "joar", score: 33 },
        // ];
        // setPlayers(mockPlayers);

        async function fetchData() {
            const db = getFirestore();
            const scoresCollection = collection(db, "LeaderBoard2");


            console.log("fetching data");
            try {
                const querySnapshot = await getDocs(scoresCollection);
                const data = []
                querySnapshot.forEach((doc) => {
                    const { name, score, artist } = doc.data();
                    data.push({ name, score, artist });
                });
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
            <h1>LeaderBoard {score}</h1>
            <ul className="list-group list-group-numbered">

                {players.map((player, index) => (
                    <Entry
                        key={player.name}
                        name={player.name}
                        score={player.score}
                        artist={player.artist}
                    />
                ))}
                {/* <HighscoreForm show={cameFromModal} score={score} artist={artist} submitScore={submitScore} /> */}
                {console.log(cameFromModal)}
                {cameFromModal && <HighscoreForm show={cameFromModal} score={score} artist={artist} submitScore={submitScore} />}

            </ul>
            <p>
            </p>
        </div>
    );
}

function Entry({ name, score, artist }) {
    return (
        <li className="list-group-item">
            {" "}
            Name: {name}, Score: {score}, Artist: {artist}
        </li>
    );
}
export default LeaderBoard;


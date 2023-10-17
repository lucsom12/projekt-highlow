import { collection, getDocs, getFirestore, addDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import HighscoreForm from "./HighScoreModal";

function LeaderBoard() {
    const [players, setPlayers] = useState([]);
    const { score, artist } = useParams();
    const location = useLocation();
    let cameFromModal = location.state && location.state.fromModal;

    async function fetchData() {
        const db = getFirestore();
        const scoresCollection = collection(db, "LeaderBoard2");

        console.log("fetching data");
        try {
            const querySnapshot = await getDocs(scoresCollection);
            const data = [];
            querySnapshot.forEach((doc) => {
                const { name, score, artist } = doc.data();
                data.push({ name, score, artist });
            });
            data.sort((a, b) => b.score - a.score);
            setPlayers(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching data from Firebase: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function submitScore(name, score, artist) {
        console.log("did I come from modal?", { cameFromModal });
        console.log("Player ID", name, score, artist);
        const db = getFirestore();
        const scoresCollection = collection(db, "LeaderBoard2");

        await addDoc(scoresCollection, {
            name: name,
            score: score,
            artist: artist,
        }); //want to store the score before posting
        fetchData();
    }
    return (
        <div className="leaderboard-container">
            <div className="leaderboard">
                <h1 className="py-2 leaderboard-header-text">Leaderboard</h1>
                <div className="leaderboard-body">
                    <ol>
                        {players.map((player, index) => (
                            <Entry
                                key={index}
                                name={player.name}
                                score={player.score}
                            />
                        ))}
                    </ol>
                </div>
            </div>
            {cameFromModal && (
                <HighscoreForm
                    show={cameFromModal}
                    score={score}
                    artist={artist}
                    submitScore={submitScore}
                />
            )}
        </div>
    );
}

function Entry({ name, score }) {
    return (
        <li>
            <mark>{name}</mark>
            <small>{score}</small>
        </li>
    );
}
export default LeaderBoard;

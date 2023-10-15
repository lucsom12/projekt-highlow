import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function LeaderBoard() {

    const [players, setPlayers] = useState([]);
    const location = useLocation();
    const { score } = useParams();
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
                <HighscoreForm />
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
            {name}: {score}: {artist}
        </li>
    );
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
export default LeaderBoard;

function HighscoreForm() {
    return (
        <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            New message
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">
                                    Recipient:
                                </label>
                                <input type="text" class="form-control" id="recipient-name" />
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">
                                    Message:
                                </label>
                                <textarea class="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" class="btn btn-primary">
                            Send message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

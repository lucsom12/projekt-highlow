import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function LeaderBoard() {
  const [players, setPlayers] = useState([]);
  const location = useLocation();
  const score = location.state ? location.state.score : 0;
  const artist = location.state ? location.state.artist : "";
  useEffect(() => {
    let mockPlayers = [
      { name: "adam", score: 200 },
      { name: "leo", score: 100 },
      { name: "luc", score: 300 },
      { name: "joar", score: 33 },
    ];
    setPlayers(mockPlayers);

    //     async function fetchData() {
    //         const db = getFirestore();
    //         const scoresCollection = collection(db, "LeaderBoard2");

    //         console.log("fetching data");
    //         try {
    //             const querySnapshot = await getDocs(scoresCollection);
    //             const data = []
    //             querySnapshot.forEach((doc) => {
    //                 const { playerName, score } = doc.data();
    //                 data.push({ playerName, score });
    //             });

    //             // Sort the data by score in descending order
    //             data.sort((a, b) => b.score - a.score);
    //             setPlayers(data);
    //             console.log(data)
    //         } catch (error) {
    //             console.error("Error fetching data from Firebase: ", error);
    //         }
    //     }

    //     fetchData();
  }, []);

  return (
    <div className="container-md">
      <h1>LeaderBoard</h1>
      <ul className="list-group list-group-numbered">
        {players.map((player, index) => (
          <Entry
            key={player.name}
            name={player.playerName}
            score={player.score}
          />
        ))}
        <highscoreForm />
      </ul>
      <p>
        {artist} {score}
      </p>
    </div>
  );
}

function Entry({ name, score, index }) {
  return (
    <li className="list-group-item">
      {" "}
      {name}: {score}{" "}
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

function highscoreForm() {
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

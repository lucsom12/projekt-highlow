import { useNavigate } from "react-router-dom";

function GameOverModal({ score, show, handleClose, handlePlayAgain, artist }) {
  const navigate = useNavigate();
  return (
    <div
      className={`modal ${show ? "show" : ""}`}
      tabIndex="-1"
      style={show ? { display: "block" } : { display: "none" }}
      data-bs-backdrop="static" data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal">
          <div className="modal-header">
            <h5 className="modal-title h4 strong">Game Over</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body display-5">
            <p>Score: {score}</p>
          </div>
          <div className="modal-footer justify-content-center text-center">
            <button
              type="button"
              className="btn modal-close"
              onClick={() => navigate("/home")}
            >
              Home
            </button>
            <button
              type="button"
              className="btn modal-leaderboard"
              onClick={() => navigate(`/leader-board/${score}/${artist}`, { state: { fromModal: true } })}
            >
              Submit to Leaderboard
            </button>
            <button
              type="button"
              className="btn modal-playagain"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}



export default GameOverModal;

import { useNavigate } from "react-router-dom";

function GameOverModal({ score, show, handleClose, artist }) {
  const navigate = useNavigate();
  return (
    <div
      className={`modal ${show ? "show" : ""}`}
      tabIndex="-1"
      style={show ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Game Over</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>Score: {score}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(0)}
            >
              Play Again
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                navigate("/leader-board", {
                  state: { score: score, artist: artist },
                  replace: false,
                })
              }
            >
              Leader Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameOverModal;

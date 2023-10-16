import { useState } from "react";

export default function HighscoreForm({ show, score, artist, submitScore }) {
  console.log("Time for form");
  console.log(artist);

  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(show); 

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleFormSubmit = () => {
    submitScore(name, score, artist);
    setIsVisible(false);
  };
  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <div
      className={`modal ${isVisible ? "show" : ""}`}
      tabIndex="-1"
      style={isVisible ? { display: "block" } : { display: "none" }}
      data-bs-backdrop="static" data-bs-keyboard="false"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="justify-content-center">
            <h3 className="modal-title" id="exampleModalLabel">
              Submit to Leaderboard
              
            </h3>
            <h5 className="strong text-center">Score: <span style={{color:"#00991c"}}>{score}</span> on <span style={{color:"#ff8800"}}>{artist}</span></h5> 
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recipient-name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              onClick={handleFormSubmit}
              type="button"
              className="btn modal-leaderboard"
            >
              Submit Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function HighscoreForm({ show, score, artist, submitScore }) {
  console.log("Time for form");
  console.log(artist);

  const [name, setName] = useState(''); // State to store the name input
  const [isVisible, setIsVisible] = useState(show); // Initialize the visibility using the prop

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleFormSubmit = () => {
    // Call the submitScore function with the name, score, and artist
    submitScore(name, score, artist);
    setIsVisible(false);
  };
  const handleClose = () => {
    // Call the submitScore function with the name, score, and artist
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
            <h5 className="modal-title" id="exampleModalLabel">
              Submit Your Score: {score} on {artist}
            </h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose} // Call handleClose to close the modal
            >
              Close
            </button>
            <button
              onClick={handleFormSubmit}
              type="button"
              className="btn btn-primary"
            >
              Submit Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

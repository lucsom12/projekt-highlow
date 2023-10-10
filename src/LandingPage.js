import "./App.css";

function LandingPage() {
  return (
    <div className="container-fluid h-100">
      <div className="row d-flex flex-column justify-content-center vh-100">
        <div className="col-12 text-start">
          <h1 id="higher">Higher &#8593;</h1>
          <div style={{position: 'relative'}}>
            <h1 className="mr-2" id="lower">&#8595; Lower</h1>
            <p id="spotify">Spotify Edition</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

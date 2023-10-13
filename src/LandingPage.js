import "./App.css";
import spotifyLogo from "./assets/spotifyLogoBlack.png";
import brutTopRight from "./assets/gol_about_texture.png"
import BubblyButton from "./BubblyButton";

function LandingPage() {
  return (
    <div className="container-fluid pt-5 mt-5">
      <img id="bgTopRight" src={brutTopRight} alt="bg sugar"></img>
      <div className="row mt-5 pt-5 d-flex flex-column justify-content-center">
        <div className="col-12 text-start">
          <h1 id="higher">Higher &#8593;</h1>
          <div style={{ position: "relative" }}>
            <h1 className="mr-2" id="lower">
              &#8595; Lower
            </h1>
            <p id="spotify">
              Spotify Edition
              <img
                src={spotifyLogo}
                alt="spotify logo"
                width="40"
                height="40"
              ></img>
            </p>
          </div>
          <div className="row col-4 offset-4 mt-5 pt-2 d-flex justify-content-center align-items-center">
            < BubblyButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

import "./App.css";

function TrackDisplay(props /*{ track, length }*/) {
  function handleClick() {
    console.log("rumpa!");
    // alert('hello')
    props.scoreFunction();
  }

  if (props.length > 0) {
    return (
      <div style={{ display: "inline" }}>
        <img
          className="mx-4"
          src={props.track.album.images[0].url}
          onClick={handleClick}
          alt=""
          width="550"
          height="550"
        />
        <p className="imagetext-1 display-3" style={{ display: "inline", color: "red"}}>test</p>
      </div>
    );
  }
}

export default TrackDisplay;

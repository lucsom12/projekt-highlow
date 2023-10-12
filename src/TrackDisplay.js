import React, { useEffect } from 'react';

function TrackDisplay(props) {
    function handleClick() {
        // alert('hello')
        props.scoreFunction(props.track.id)
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
        <button type="button" onClick={() => handleClick()} className="btn btn-primary col-4" disabled={props.isDisabled}></button>
      </div>
    );
  }
}

export default TrackDisplay;

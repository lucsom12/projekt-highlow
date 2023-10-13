import React, { useEffect, useRef } from "react";
function TrackDisplay(props) {
  function handleClick() {
    console.log("rumpa!");
    props.scoreFunction();
  }
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (imgRef.current) {
        imgRef.current.classList.add("dimmed");
      }
      if (textRef.current) {
        textRef.current.classList.add("faded-in");
      }
      if (textRef2.current) {
        textRef2.current.classList.add("faded-in");
      }
    }, 100);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  if (props.length > 0) {
    return (
      <div
        style={{
          display: "inline-flex",
          position: "relative",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <img
          ref={imgRef}
          className="img-fluid"
          src={props.track.album.images[0].url}
          onClick={handleClick}
          alt=""
        />
        <p ref={textRef} className="imagetext-1">
          "{props.track.name}"
        </p>
        <p ref={textRef2} className="imagetext-2">Popularity Score {props.track.popularity}/100</p>
      </div>
    );
  }
}
export default TrackDisplay;

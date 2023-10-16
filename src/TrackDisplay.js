import React, { useEffect, useRef } from "react";
function TrackDisplay(props) {
  function handleClick(choice) {
    props.scoreFunction(choice);
  }
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

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

  useEffect(() => {
    const timer2 = setTimeout(() => {
      if (textRef3.current) {
        textRef3.current.classList.add("faded-in");
      }
    }, 10);
    return () => {
      clearTimeout(timer2);
    };
  }, [props.showPopularity]);

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
          alt=""
        />
        <p ref={textRef} className="imagetext-1">
          "{props.track.name}"
        </p>
        {props.isLeft && (
          <p ref={textRef2} className="imagetext-2">
            Popularity Score: {props.track.popularity}/100
          </p>
        )}
        {props.showPopularity && props.isRight && (
          <p ref={textRef3} className="imagetext-3">
            Popularity Score: {props.track.popularity}/100
          </p>
        )}
        {props.isRight && (
          <>
            <button
              type="button"
              onClick={() => handleClick("higher")}
              className="btn higher-button"
              disabled={props.isDisabled}
            >
              Higher <span className="uniup">&#9650;&#xfe0e;</span>
            </button>
            <button
              type="button"
              onClick={() => handleClick("lower")}
              className="btn lower-button"
              disabled={props.isDisabled}
            >
              Lower <span className="unidown">&#9660;&#xfe0e;</span>
            </button>
          </>
        )}
      </div>
    );
  }
}
export default TrackDisplay;

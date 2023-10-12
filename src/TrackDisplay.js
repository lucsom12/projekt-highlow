import React, { useEffect } from 'react';

function TrackDisplay(props) {
    function handleClick() {
        // alert('hello')
        props.scoreFunction(props.track.id)
    }

    if (props.length > 0 || props.showPopularity === true) {
        return (
            <button type="button" onClick={() => handleClick()} className="btn btn-primary col-4" disabled={props.isDisabled}>
                < img src={props.track.album.images[0].url} style={{outline: "thick solid white", boxShadow: "16px 16px #191414"}}alt="" width="256" height="256"/>
                <p>{props.track.name}</p>
                {props.showPopularity && (
                    <p>{props.track.popularity}</p>
                )}
            </button>
        )
    }

}

export default TrackDisplay
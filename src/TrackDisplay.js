function TrackDisplay({ track, length }) {
    function handleClick() {
        console.log("rumpa!")
        // alert('hello')
    }

    if (length > 0) {
        return (
            <button type="button" onClick={() => handleClick()} className="btn btn-primary col-4">
                < img src={track.album.images[0].url} style={{outline: "thick solid white", boxShadow: "16px 16px #191414"}}alt="" width="256" height="256"/>
                <p>{track.name}</p>
            </button>
        )
    }

}

export default TrackDisplay
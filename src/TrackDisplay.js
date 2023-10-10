function TrackDisplay({ track, length }) {

    if (length > 0) {
        return (
            <div className="col-4">
                < img src={track.album.images[0].url} style={{outline: "thick solid white", boxShadow: "16px 16px #191414"}}alt="" width="256" height="256"/>
                <p>{track.name}</p>
            </div>

        )
    }

}

export default TrackDisplay
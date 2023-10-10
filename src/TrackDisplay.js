

function TrackDisplay({ track, length }) {

    if (length > 0) {
        return (
            <div>
                < img src={track.album.images[0].url} alt="" />
                <p>{track.name}</p>
            </div>

        )
    }

}


export default TrackDisplay
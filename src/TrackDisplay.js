

function TrackDisplay({ track }) {


    return (
        <div>
            < img src={track.album.images[0].url} alt="" />
            <p>{track.name}</p>
        </div>

    )
}


export default TrackDisplay
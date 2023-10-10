import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import ApiHandler from "./ApiHandler";

const CLIENT_ID = "41a89822d42c452fb778e429576a972b";
const CLIENT_SECRET = "40a6ddb0f73d480094f24bd837e3dfba";

function App() {

 /* async function fetchTopTracks(artistID) {
    var topTracks = await fetch(
      "https://api.spotify.com/v1/artists/" +
      artistID +
      "/top-tracks" +
      "?market=SE",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => console.log(data.tracks));
  }*/

  return (
    <ApiHandler />
  );

  /* function TrackImage(track) {
     if (tracksFromArtist.length > 8) {
       const image = track.album.images[0].url;
       return (
         <div className="row col-sm-4 mb-4">
           <img src={image} />
         </div>
       );
     }
   } */
}

export default App;

/*albums.forEach(async (album) => {
  var tracks = await fetch(
    "https://api.spotify.com/v1/albums/" + album.id + "/tracks",
    artistParameters
  )
    .then((response) => response.json())
    .then((data) => {
      return data.items;
    });
  console.log(tracks);
  tracks.forEach((track) => {
    tracSet.add(track);
  });
});
console.log(tracSet); */

//console.log(tracSet);
/*trackSet.forEach(async (track) => {
  const song = await fetch(
    "https://api.spotify.com/v1/tracks/" + track + "?market=SE",
    artistParameters
  );
  const data = await song.json();
  songs.push(data);
});
console.log(songs);*/

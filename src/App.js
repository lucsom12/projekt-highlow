import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

const CLIENT_ID = "41a89822d42c452fb778e429576a972b";
const CLIENT_SECRET = "40a6ddb0f73d480094f24bd837e3dfba";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const artistParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    var authParamers = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParamers)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function search() {
    const trackSet = new Set();
    const trackAndPopularity = {};
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    var albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?market=SE&limit=5&offset=0",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.items;
      });

    const fetchTrackPromises = albums.map(async (album) => {
      const response = await fetch(
        "https://api.spotify.com/v1/albums/" + album.id + "/tracks?limit=5",
        artistParameters
      );
      const data = await response.json();
      return data.items;
    });

    Promise.all(fetchTrackPromises)
      .then((trackLists) => {
        const trackpromises = [];

        trackLists.forEach((tracks) => {
          tracks.forEach((track) => {
            trackSet.add(track.id);

            const trackPromise = fetch(
              "https://api.spotify.com/v1/tracks/" + track.id + "?market=SE",
              artistParameters
            ).then((response) => response.json());
            trackpromises.push(trackPromise);
          });
        });
        return Promise.all(trackpromises);
      })
      .then((trackArray) => {
        trackArray.forEach((track) => {
          trackAndPopularity[track.name] = track.popularity;
        });
        console.log(trackAndPopularity);
      });
  }

  async function fetchTopTracks(artistID) {
    var topTracks = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/top-tracks" +
        "?market=SE",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => console.log(data.tracks));
  }

  return (
    <div className="App">
      <FormControl
        placeholder="search for artist"
        type="input"
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            search();
          }
        }}
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </div>
  );
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

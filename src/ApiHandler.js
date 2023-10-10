import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

const CLIENT_ID = "41a89822d42c452fb778e429576a972b";
const CLIENT_SECRET = "40a6ddb0f73d480094f24bd837e3dfba";

function ApiHandler() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracksFromArtist, setTracksFromArtist] = useState([]);
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
  async function searchArtist() {
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
        setTracksFromArtist(trackArray);
        trackArray.forEach((track) => {
          trackAndPopularity[track.name] = track.popularity;
        });
        console.log(trackAndPopularity);
      });
  }
  return (
    <div className="App">
      <FormControl
        placeholder="search for artist"
        type="input"
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            searchArtist();
          }
        }}
        onChange={(event) => setSearchInput(event.target.value)}
      />

    </div>
  );
}

export default ApiHandler;

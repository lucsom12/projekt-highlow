import GamePage from "./GamePage";
import React, { useEffect, useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import _, { shuffle } from "lodash";
import SearchBar from "./SearchBar"; // Import the SearchBar component

const CLIENT_ID = "41a89822d42c452fb778e429576a972b";
const CLIENT_SECRET = "40a6ddb0f73d480094f24bd837e3dfba";
const maxAlbums = 5;
const maxTracks = 5;

function ApiHandler() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracksFromArtist, setTracksFromArtist] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [artistDisplay, setArtistDisplay] = useState("");

  const { setGameStarted } = useOutletContext();


  const artistParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    var authParameters = {
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

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  const fetchSearchResults = useCallback(
    _.debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
  
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=artist`,
        artistParameters
      );
      if (!response.ok) {
        console.error("Error fetching search results:", response.statusText);
        return;
      }
      const data = await response.json();
      setSearchResults(data.artists.items || []);
    }, 300),
    [accessToken]
  );
  
  useEffect(() => {
    if (searchInput) {
      fetchSearchResults(searchInput);
    } else {
      fetchSearchResults.cancel(); // Cancel the debounced function
      setSearchResults([]);
    }
  }, [searchInput, fetchSearchResults]);

  async function searchArtist(artistName = searchInput) {
    setArtistDisplay(artistName);
    setGameStarted(true);
    const trackSet = new Set();
    const trackAndPopularity = {};
    var artistID = await fetch(
      `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    var albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
      artistID +
      `/albums?market=SE&limit=${maxAlbums}&offset=0`,
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.items;
      });

    const fetchTrackPromises = albums.map(async (album) => {
      const response = await fetch(
        "https://api.spotify.com/v1/albums/" + album.id + `/tracks?limit=${maxTracks}`,
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
        setTracksFromArtist(shuffle(trackArray));
        trackArray.forEach((track) => {
          trackAndPopularity[track.name] = track.popularity;
        });
      });
  }

  function playAgain(){
    searchArtist(artistDisplay);
  }
  

  return (
    <div className="App">
      <div className="row d-flex">
        {tracksFromArtist.length === 0 ? (
          <div className="col-8 offset-2 mt-5">
            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchResults={searchResults}
              searchArtist={searchArtist}
              setSearchResults={setSearchResults}
            />
          </div>
        ) : (
          <div className="col-12">
            <h1 className="artisttext">Current Artist: {artistDisplay}</h1>
            <GamePage tracks={tracksFromArtist} resetGame={playAgain}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiHandler;

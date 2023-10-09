import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';

const CLIENT_ID = '41a89822d42c452fb778e429576a972b';
const CLIENT_SECRET = '40a6ddb0f73d480094f24bd837e3dfba';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    var authParamers = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParamers)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, []);

  async function search() {
    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParameters)
      .then(response => response.json())
      .then(data => {
        return data.artists.items[0].id
      });

    var albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?market=SE&limit=10&offset=0', artistParameters)
      .then(response => response.json())
      .then(data => console.log(data))

    var topTracks = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/top-tracks' + '?market=SE', artistParameters)
      .then(response => response.json())
      .then(data => console.log(data));


  }


  return (
    <div className="App">

      <FormControl
        placeholder='search for astirs'
        type='input'
        onKeyDown={event => {
          if (event.key == "Enter") {
            search()
          }
        }}
        onChange={event => setSearchInput(event.target.value)}
      />
    </div>
  );
}

export default App;

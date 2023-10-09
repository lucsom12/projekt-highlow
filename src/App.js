import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';

const CLIENT_ID = '41a89822d42c452fb778e429576a972b';
const CLIENT_SECRET = '40a6ddb0f73d480094f24bd837e3dfba';

function App() {
  const [accesToken, setAccessToken] = useState('');

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

  return (
    <div className="App">
      <p>New single from eyes closed: </p>
    </div>
  );
}

export default App;

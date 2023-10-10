import React, { Component } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';

// Initialize Firebase with your Firebase project configuration


class FirebaseButtonExample extends Component {
  constructor() {
    super();
    this.state = {
      data: '', // Store data read from the database
      newData: '', // Data to write to the database
    };
  }

  // Function to write data to the Firebase Realtime Database
  writeData = () => {
    const { newData } = this.state;

    // Replace 'your_database_path' with the actual path in your database
    set(ref(database, 'your_database_path'), newData);
  };

  // Function to read data from the Firebase Realtime Database
  readData = () => {
    // Replace 'your_database_path' with the actual path in your database
    get(ref(database, 'your_database_path'))
      .then(snapshot => {
        const data = snapshot.val();
        this.setState({ data });
      })
      .catch(error => {
        console.error('Error reading data:', error);
      });
  };

  handleInputChange = (event) => {
    this.setState({ newData: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Highscore</h2>
        <div>
          <input
            type="text"
            placeholder="Enter data"
            value={this.state.newData}
            onChange={this.handleInputChange}
          />
          <button onClick={this.writeData}>Write Data</button>
          <button onClick={this.readData}>Read Data</button>
        </div>
        <div>
          <h3>Read Data:</h3>
          <p>{this.state.data}</p>
        </div>
      </div>
    );
  }
}

export default FirebaseButtonExample;

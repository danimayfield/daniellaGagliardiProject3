import './index.css';
import { useState, useEffect } from 'react';
import firebase from './firebase.js';
// import {MouseOver, MouseOut} from 'Hover.js';

function App() {
  // Piece of state to hold data array:
  const [listingInfo, setListingInfo] = useState([])

  // Use effect to hold database info:
  useEffect(() => {
    // Variable to hold info from firebase
    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {


      // variable to hold data object from firebase
      const data = response.val();

      // iterate through the data object
      for (let property in data) {
        // Use spread operator to add each data object into the state array of listingInfo
        setListingInfo(...listingInfo, data[property])
      }
    })

  }, [])

  useEffect(() => console.log('info->', listingInfo), [listingInfo])
  //------------
  return (
    <main>
      <h1>Sprinkling Rainbows Shop</h1>
      <h2>Filter Area</h2>
      <div className="inventoryGrid">
        {
          // Map through listingInfo & use the results to populate info!
          listingInfo.map(results => {
            return (
              <div key={results.listing_id} className="inventoryCard">
                <img src={results.image} alt={results.title} className="inventoryImage" />
                <h3>{results.title}</h3>
                <p>$ {(results.price.amount) / (results.price.divisor)}</p>
              </div>
            )
          })
        }
      </div>

    </main>
  );
}


export default App;


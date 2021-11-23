import './index.css';
import axios from 'axios';
import firebase from 'firebase';
import { useState, useEffect } from 'react';

function App() {
  // Piece of state to hold data array:
  const [listingInfo, setListingInfo] = useState([])
  // Piece of state to hold images array:
  const [imageArray, setImageArray] = useState([])

  // Use effect to hold database info:
  useEffect(()=> {
    // Variable to hold info from firebase
    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {
      console.log(response.val());
    })


  },[])


  // UseEffect to make get request to API for inital data
  useEffect(() => {
    axios.get('https://openapi.etsy.com/v2/shops/19596701/listings/active', {
      params: {
        api_key: 'to7fqul9bxkgli6kttn96ky4',
        limit: "35"
      }
    })
      .then(function (response) {
        console.log(response.data.results)
        // set the data state to take in the results array to be used in JSX
        setListingInfo(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])
  


  // UseEffect to make get request to 2nd endpoint for image data
  useEffect(() => {
    // Define array to gather listing image ids by using map method
    const newArr = listingInfo.map((listing) => {
      const listingId = listing.listing_id
      return listingId
    })
    // Define array to hold the image urls
    const imageArr = []
    // Loop through the array with listing id's
    newArr.forEach((listingId) => {
      // Call the 2nd api endpoint here
      axios.get(`https://openapi.etsy.com/v2/listings/${listingId}/images`, {
        params: {
          api_key: 'to7fqul9bxkgli6kttn96ky4'
        }
      })
      .then(function(response) {
        // console.log("response-->>",response.data.results[0].url_fullxfull);
        // Take the response of the second endpoint and store it in variable
        const response2 = response.data.results[0].url_fullxfull
        // push the response2 variable to the empty image array
        imageArr.push(response2)
      })
      .catch(function(error){
        console.log(error);
      })
      setImageArray(imageArr)
    })
    console.log(imageArr);
  }, [listingInfo])

  useEffect(() => {
    console.log("IMAGE ARRAY ---->>>",imageArray)
    const finalArray = listingInfo.map((listing, listingIndex) => {
      console.log(listing)
      imageArray.forEach( (url, urlIndex) => {
        console.log(url)
        if(listingIndex === urlIndex) {
         listing.imageUrl = url
        console.log("it matches")
        }
      })
      return listing
    })
    console.log("FINAL ARRAY!!!!!",finalArray)
   }, [imageArray])

  return (
    <div>
      <header>
        <h1>My Shop</h1>
      </header>
      <main>
        {
          listingInfo.map(results => {
            return (
              <div key={results.listing_id}>
                <h2>{results.title}</h2>
                <p>$ {results.price}</p>
              </div>
            )
          })
        }

      </main>
    </div>
  );
}





export default App;

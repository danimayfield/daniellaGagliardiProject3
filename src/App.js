import './index.css';
import { useState, useEffect } from 'react';
import firebase from './Firebase.js';
import Header from './Header';


function App() {
  // Piece of state to hold data array:
  const [listingInfo, setListingInfo] = useState([])
  // Piece of state to hold cart items in an array:
  const [cart, setCart] = useState([])
  // Piece of state holding the count of items in the cart:
  const [cartCount, setCartCount] = useState(0)

  // Use effect to hold database info:
  useEffect(() => {
    // Variable to hold info from firebase
    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {


      // variable to hold data object from firebase
      const data = response.val();

      // Set the data to the state
      setListingInfo(data.results)
    })

  }, [])


  function addToCart(result) {
    setCart([...cart, result])
  }

  useEffect(() => {
    setCartCount(cart.length)
  }, [cart])



  useEffect(() => console.log('cart info->', cart), [cart])
  //------------
  return (
    <div>
      <i class="fas fa-shopping-cart cart"><span className="cartCount">{cartCount}</span></i>
      
      <Header />
      <main>
        <h1>Sprinkling Rainbows Shop</h1>
        <h2>Filter Area</h2>
        <div className="inventoryGrid">
          {
            // Map through listingInfo & use the results to populate info!
            listingInfo.map(result => {
              return (
                <div key={result.listing_id} className="inventoryCard">
                  <div className="inventoryCart" onClick={() => addToCart(result)}>
                    <i className="fas fa-cart-plus addCartIcon"></i>
                  </div>
                  <img src={result.image} alt={result.title} className="inventoryImage" />
                  <h3>{result.title}</h3>
                  <p>$ {(result.price.amount) / (result.price.divisor)}</p>

                </div>
              )
            })
          }
        </div>

      </main>
    </div>
  );
}


export default App;

  // function MouseOver(event) {
  //   event.classList.remove("none")
  // }

  // function MouseOut(event) {
  //   event.classList.add("none")
  // }


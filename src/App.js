import './index.css';
import { useState, useEffect } from 'react';
import firebase from './Firebase.js';
import Header from './Header';


function App() {
  // Piece of state to hold data array:
  const [listingInfo, setListingInfo] = useState([])
  // Permanent piece of state holding data array:
  const [permListingInfo, setPermListingInfo] = useState([])
  // Piece of state to hold cart items in an array:
  const [cart, setCart] = useState([])
  // Piece of state holding the count of items in the cart:
  const [cartCount, setCartCount] = useState(0)
  // Piece of state toggling the cart on and off:
  const [showCart, setShowCart] = useState(false)
  // Piece of state holding the user's choice of filter:
  const [filterBy, setFilterBy] = useState(" ")

  const filterTypes = ["All", "Earrings", "Vases", "Planters", "Stickers", "DIY Kits"]

  // Use effect to hold database info:
  useEffect(() => {
    // Variable to hold info from firebase
    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {

      // variable to hold data object from firebase
      const data = response.val();

      // Set the data to the state
      setListingInfo(data.results)
      setPermListingInfo(data.results)
    })

  }, [])


  function addToCart(result) {
    setCart([...cart, result])
  }

  useEffect(() => {
    setCartCount(cart.length)
  }, [cart])


  function convertType(filterType) {
    if (filterType === "Planters") {
      setFilterBy("Planter")
    } else if (filterType === "Vases") {
      setFilterBy("Vase")
    } else if (filterType === "Stickers") {
      setFilterBy("Sticker")
    } else if (filterType === "DIY Kits") {
      setFilterBy("DIY")
    } else if (filterType === "All") {
      setFilterBy(" ")
    } else {
      setFilterBy(filterType)
    }
  }

  useEffect(() => {
    const filterResults = permListingInfo.filter(listingObject => {
      return listingObject.title.includes(filterBy)
    })
    setListingInfo(filterResults)
  }, [filterBy, permListingInfo])


  return (
    <div>
      <i className="fas fa-shopping-cart cart" onClick={() => setShowCart(!showCart)}><span className="cartCount">{cartCount}</span>
        {
          showCart && (
            <div className="cartInfo">
              <h4>CART</h4>
              <p>You're eligible for free shipping!</p>
              {
                cart.length > 0
                  ?
                  (cart.map(result => {
                    return (

                      <div key={result.listing_id} className="cartList">
                        <p>{result.title.slice(0, 40)}...</p>
                        <p>$ {(result.price.amount) / (result.price.divisor)}</p>
                      </div>

                    )
                  }))
                  : null
              }
              <button>Checkout</button>
            </div>
          )
        }
      </i>

      <Header />
      <main>
        <h1>Sprinkling Rainbows Shop</h1>

        <h2>Let's Shop!</h2>
        <div>
          {
            filterTypes.map(filterType => {
              return <span key={filterType} onClick={() => convertType(filterType)}>{filterType}</span>
            })
          }
        </div>


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

      <footer>

      </footer>
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


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
  // Piece of state toggling the active state of the filter choice:
  const [activeType, setActiveType] = useState("")
  // Piece of state toggling whether one is hovering over something or not:
  const [isHoverActive, setIsHoverActive] = useState(false)
  // Piece of state holding the listing_id of the card they are hovering over:
  const [hoveredId, setHoveredId] = useState('')


  // Create an array of the different filter types
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

  // Function to add results from listingInfo into the cart state. Results is passed through as an argument
  function addToCart(result) {
    setCart([...cart, result])
  }

  // Variable to hold remove cart function that will set the state of the cart to filter out the index of the array that the user choose's when clicking the trash can icon
  const removeFromCart = index =>
    setCart(result => result.filter((_, i) => i !== index));


  // Watch the cart for any changes and re-render if their are any changes
  useEffect(() => {
    // Set the state of cartCount to whatever the length of the array of the cart array is
    setCartCount(cart.length)
  }, [cart])

  // Function to convert the title of the filter to the actual keyword string we will use to filter to the data
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

  // Watch for changes in the filterBy and permListingInfo state to do the following:
  useEffect(() => {
    // Set a variable to hold a filtered array of objects from the firebase database
    const filterResults = permListingInfo.filter(listingObject => {
      // Return all listing objects with a title that includes the keyword the user chose that is saved in the filterByState
      return listingObject.title.includes(filterBy)
    })
    // Set the listingInfo state which displays on the page to the filtered results
    setListingInfo(filterResults)
  }, [filterBy, permListingInfo])


  return (
    <div>
      {/* Cart Icon that toggles the cart to open & close */}
      <i 
      className="fas fa-shopping-cart cart" 
      onClick={() => setShowCart(!showCart)}
      >
      <span className="cartCount">{cartCount}</span>
        {
          showCart && (
            <div className="cartInfo">
              <h4>CART</h4>
              <p>You're eligible for free shipping!</p>
              <div className="cartContainer">
                {
                  cart.length > 0
                    ?
                    (cart.map((result, index) => {
                      const price = (result.price.amount) / (result.price.divisor)
                      const roundedPrice = price.toFixed(2);
                      return (

                        <div key={result.listing_id} className="cartList">
                          <p>{result.title.slice(0, 40)}...</p>
                          <p>$ {roundedPrice}</p>
                          <i
                            class="fas fa-trash deleteIcon"
                            onClick={()=>removeFromCart(index)}
                            ></i>
                        </div>

                      )
                    }))
                    : null
                }
              </div>
              <a href="https://www.etsy.com/shop/SunSprinklesShop?utm_source=google&utm_medium=cpc&utm_campaign=Search_CA_DSA_GGL_ENG_Jewelry_Categories_Ext&utm_ag=Jewelry-Catch%2BAll&utm_custom1=_k_Cj0KCQiAys2MBhDOARIsAFf1D1eGuO9ns6BOcVf3pAZsSO06va6ur2yOTlIJqW_PuRwit64HTDu-aiQaAkgDEALw_wcB_k_&utm_content=go_10059171047_99900993103_544524839660_aud-904454927189%3Adsa-41052322647_c_&utm_custom2=10059171047&gclid=Cj0KCQiAys2MBhDOARIsAFf1D1eGuO9ns6BOcVf3pAZsSO06va6ur2yOTlIJqW_PuRwit64HTDu-aiQaAkgDEALw_wcB" className="checkoutButton">Checkout</a>
            </div>
          )
        }
      </i>

      <Header />
      <main className="pageWrapper">
        <h1>
          Welcome!
        </h1>
        <h2>
          Looking for something cute? You've come to the right place!
        </h2>
        <h4>
          Browse By:
        </h4>
        <ul className="filterContainer">
          {
            // Map through the filterTypes array & return each string as it's own span element.
            filterTypes.map(filterType => {
              return <li
                key={filterType}
                onClick={() => {
                  convertType(filterType)
                  setActiveType(filterType)
                }}
                className={`filterOptions ${activeType === filterType ? 'filterActive' : null}`}
              >
                {filterType}</li>
            })
          }
        </ul>


        <div className="inventoryGrid">
          {
            // Map through listingInfo & use the results to populate info!
            listingInfo.map(result => {
              // set price as a variable
              const price = (result.price.amount) / (result.price.divisor)
              // fix 2 decimal points to the price
              const roundedPrice = price.toFixed(2);

              return (
                <div
                  key={result.listing_id}
                  className="inventoryCard"
                  onMouseOver={() => {
                    setIsHoverActive(true)
                    setHoveredId(result.listing_id)
                  }}
                >
                  {isHoverActive && (hoveredId === result.listing_id) && (
                    <div className="inventoryCart" onClick={() => addToCart(result)}>
                      <i className="fas fa-cart-plus addCartIcon"></i>
                    </div>
                  )}

                  <img src={result.image} alt={result.title} className="inventoryImage" />
                  <h3>{result.title.slice(0, 40)}...</h3>
                  <p>$ {roundedPrice}</p>

                </div>
              )
            })
          }

        </div>
      </main>

      <footer>
        <div className="footerContainer">
          <a className="footerLink" href="https://www.etsy.com/shop/SunSprinklesShop?utm_source=google&utm_medium=cpc&utm_campaign=Search_CA_DSA_GGL_ENG_Jewelry_Categories_Ext&utm_ag=Jewelry-Catch%2BAll&utm_custom1=_k_Cj0KCQiAys2MBhDOARIsAFf1D1eGuO9ns6BOcVf3pAZsSO06va6ur2yOTlIJqW_PuRwit64HTDu-aiQaAkgDEALw_wcB_k_&utm_content=go_10059171047_99900993103_544524839660_aud-904454927189%3Adsa-41052322647_c_&utm_custom2=10059171047&gclid=Cj0KCQiAys2MBhDOARIsAFf1D1eGuO9ns6BOcVf3pAZsSO06va6ur2yOTlIJqW_PuRwit64HTDu-aiQaAkgDEALw_wcB">All images and products credited to: SunSprinklesShop</a>
          <p>Header, logo and website credited to Dani Mayfield</p>
          <a className="footerLink" href="https://github.com/danimayfield/daniellaGagliardiProject3"><i className="fab fa-github"></i></a>
          <a className="footerLink" href="https://www.linkedin.com/in/daniella-mayfield-5a6a99222/"><i className="fab fa-linkedin"></i></a>
        </div>
      </footer>
    </div>
  );
}


export default App;


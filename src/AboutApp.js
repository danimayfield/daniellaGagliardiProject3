  // FOR DAVID: I am leaving this in my project as I intend to work on this once we learn about routing in react so I can create a separate About page and I will connect to the API to get the info from the shop for the about page. This API call is not included in my project3

  // UseEffect to make get request to API for getting general info about the shop
  // useEffect(() => {
  //   axios.get('https://openapi.etsy.com/v2/shops/19596701', {
  //     params: {
  //       api_key: 'to7fqul9bxkgli6kttn96ky4',
  //     }
  //   })
  //     .then(function (response) {
  //       console.log(response.data.results)
  //       // set the data state to take in the results array to be used in JSX
  //       setListingInfo(response.data.results);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [])
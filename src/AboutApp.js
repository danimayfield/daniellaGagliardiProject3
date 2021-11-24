  // UseEffect to make get request to API for inital data
  useEffect(() => {
    axios.get('https://openapi.etsy.com/v2/shops/19596701', {
      params: {
        api_key: 'to7fqul9bxkgli6kttn96ky4',
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
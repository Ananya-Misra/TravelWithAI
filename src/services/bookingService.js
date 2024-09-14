    // Function to get auto-complete suggestions for stays
  export const fetchStaySuggestions = async (query) => {
    console.log("the booking query"+ query);
    if (!query) {
      throw new Error('Query parameter is required.');
    }
  
    const url = `https://booking-com18.p.rapidapi.com/stays/auto-complete?query=${encodeURIComponent(query)}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '611bb635a1msh751fc124ab6b7f1p120b9ejsn1da5de547b0b',
        'x-rapidapi-host': 'booking-com18.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.data[0].id;
    } catch (error) {
      console.error('Error fetching stay suggestions:', error.message);
      throw error;
    }
  };
  
  // Function to search for stays based on locationId and dates
  export const fetchStaysByLocationId = async (locationId, checkinDate, checkoutDate) => {
    if (!locationId || !checkinDate || !checkoutDate) {
   
      throw new Error('locationId, checkinDate, and checkoutDate parameters are required.');
    }
    const url = `https://booking-com18.p.rapidapi.com/stays/search?locationId=${encodeURIComponent(locationId)}&checkinDate=${checkinDate}&checkoutDate=${checkoutDate}&units=metric&temperature=c`;
    console.log("the url"+ url);
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '611bb635a1msh751fc124ab6b7f1p120b9ejsn1da5de547b0b',
        'x-rapidapi-host': 'booking-com18.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
    const hotels = result.data;
    console.log(JSON.stringify(hotels, null, 2));
    
    // Extract the name field from each product
    const hotelDetails = hotels.map(hotel => ({
        name: hotel.name,
        priceBreakdown: hotel.priceBreakdown.grossPrice.value + hotel.priceBreakdown.excludedPrice.value,
        reviewScoreWord: hotel.reviewScoreWord,
        reviewCount: hotel.reviewCount
      }));
      return hotelDetails;
    } catch (error) {
      console.error('Error fetching stays search results:', error.message);
      throw error;
    }
  };
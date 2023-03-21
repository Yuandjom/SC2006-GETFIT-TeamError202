import React from 'react'
import Navbar from 'scenes/navbar'
import "./explore.css";
import map from "./map.png"
import {
   useJsApiLoader,
   GoogleMap,
   Marker,
   Autocomplete,
} from '@react-google-maps/api'
import { useRef, useState} from 'react'
import { Box, Typography, CardContent, Card } from '@mui/material';
import Spinner from 'components/Spinner';

function ExplorePage() {
   const { isLoaded } = useJsApiLoader({
       //idk why i use REACT_APP never work
       googleMapsApiKey: "AIzaSyBDZjux3Ro6hPFyqTxKdG7Y6_fkOpeKEFY",
       libraries: ['places'],
   })
   //const [map, setMap] = useState(/** @type google.maps.Map */(null))
   const searchInput = useRef()
   const mapRef = useRef()

   const [currentPosition, setCurrentPosition] = useState(null) //what i added
   const [nearbyPlaces, setNearbyPlaces] = useState([])
   const [searchRadius, setSearchRadius] = useState(0)
   const [markers, setMarkers] = useState([])
   const [selectedMarkers, setSelectedMarkers] = useState([])
   const [places, setPlaces] = useState({
    name: '', 
    business_status: '', 
    opening_hours: '', 
    vicinity: '',
    distance: '',
    contact: ''
   });

   //access current location
   if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
           (position) => {
             const { latitude, longitude } = position.coords;
             if(currentPosition == null)
               setCurrentPosition({ lat: latitude, lng: longitude });
           },
           (error) => {
             console.error(error);
             console.log("Geolocation is not supported by this browser.");
           }
         );
       } else {
           console.log("Geolocation is not supported by this browser.");
         }
  
   //manually search current location
   const handleLocationSearch = (e) => {
       e.preventDefault();
       const geocoder = new window.google.maps.Geocoder();
       const address = searchInput.current.value;
  
       geocoder.geocode({ address }, (results, status) => {
         if (status === "OK") {
           const lat = results[0].geometry.location.lat();
           const lng = results[0].geometry.location.lng();
  
           setCurrentPosition({ lat, lng });
         } else {
           alert("Geocode was not successful for the following reason: " + status);
         }
       });
   };

   if(currentPosition){
      //create a new PlacesService object
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));

      // Define the request object
      const request = {
        location: currentPosition,
        radius: searchRadius,
        type: 'gym'
      };

      // Call the PlacesService nearbySearch method
      service.nearbySearch(request, (results, status) => {
          if (status === 'OK') {
          setNearbyPlaces(results);
          //setMarkers(results);
        }
  }, [currentPosition]);
  }
  

  const handleChange = (event) => {
    setSearchRadius(event.target.value);
  };

   if (!isLoaded) {
       return <Spinner></Spinner>
   }

   const DisplayMarker = (place) => {
        let openingHours = 'Not Available'
        // Create a DistanceMatrixService object
        const distanceService = new window.google.maps.DistanceMatrixService();
        // Call the distance matrix service to get the distance between the user's location and the place
        distanceService.getDistanceMatrix({
        origins: [currentPosition],
        destinations: [place.geometry.location],
        travelMode: window.google.maps.TravelMode.DRIVING, 
        unitSystem: window.google.maps.UnitSystem.METRIC, // Use metric units (km)
        }, (response, status) => {
          if (status === 'OK') {
        // Get the distance value from the response
        const distance = response.rows[0].elements[0].distance.text; 

        console.log(place)
        
        //get details
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({ placeId: place.place_id }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              console.log(place); // detailed information about the place  
              openingHours = place.current_opening_hours ? place.current_opening_hours.weekday_text.join('\n') : 'Not Available'
              console.log(openingHours)
              setPlaces({name : place.name, business_status: place.business_status, opening_hours: openingHours, vicinity: place.formatted_address, distance: distance, contact: place.formatted_phone_number})
        }
      })  
        
  } else {
    console.error('Error getting distance: ', status);
  }
});
}

   return (
       <div>
           <Navbar />
           <div className='explore-page'>
               <div className='enter-details'>
                   <form id='enter-details-form'>
                        <div className='locationInput'>
                       <label htmlFor="location-input">Your Location:</label>

                       <Autocomplete>
                           <input type="text" id='searchBox' placeholder='Search' size='64' ref={searchInput} />
                       </Autocomplete>

                       <button type="submit"  onClick={handleLocationSearch} >Enter</button>
                       </div>

                       <div className='searchRadius'>
                       <label htmlFor="radius-input">Select Search Radius (km):</label>
                       <select id="radius-input" value={searchRadius} onChange={handleChange} >
                           <option value="">--Select radius--</option>
                           <option value="1000">1 km</option>
                           <option value="2000">2 km</option>
                           <option value="5000">5 km</option>
                           <option value="10000">10 km</option>
                       </select>
                       </div>

                   </form>
                   {/* <div id = 'details-panel'></div> */}
                   <Box sx={{ minWidth: 275 }}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            Name of location: {places.name}
                          </Typography>
                          <Typography sx={{ fontSize: 14 }}  component="div">
                            Opening Status: {places.business_status}
                          </Typography>
                          <Typography  sx={{ mb: 1.5 }} color="text.secondary">
                            Opening Hours: {places.opening_hours}
                          </Typography>
                          <Typography variant="body1">
                            Distance: {places.distance} 
                            <br />
                            Vicinity: {places.vicinity}
                            <br />
                            Contact: {places.contact}
                          </Typography>
                        </CardContent>
                      </Card>
                  </Box>

               </div>
               {/* "https://api.mapbox.com/styles/v1/kavita99/streets-v11/static/-122.4194,37.7749,12/500x500?access_token={pk.eyJ1Ijoia2F2aXRhOTkiLCJhIjoiY2xlbGJobXBtMHRwazNwcGRvb2gyczdoNiJ9.9m7kO12Jp60Cjf7Rkushow}" */}
               {/**some time can work */}

               <GoogleMap
                   center={currentPosition}
                   zoom={15}
                   mapContainerStyle={{ width: '60vw', height: '80vh' }}
                   options={{
                       fullscreenControl: false
                   }}
                   ref={mapRef}
                   //onLoad = {onMapLoad}
               >
                   {currentPosition && <Marker position={currentPosition} />}
                   {nearbyPlaces.map(place => ( <Marker key={place.place_id} position={place.geometry.location} icon={{url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}} onClick = {() => {DisplayMarker(place)}} />))}  {/* onClick={() => { setSelectedMarkers(place); }}*/}
                   {/*selectedMarkers? 
                   (<InfoWindow position={{lat: selectedMarkers.lat, lng: selectedMarkers.lng}}> 
                        <div>
                            <p>Gym Spotted!</p>
                        </div>
                   </InfoWindow>): null*/}
                   {/*<Circle center = {currentPosition} radius = {searchRadius} strokeOpacity= '0.5' strokeWeight= '2' clickable= 'false' draggable= 'false' editable= 'false' visible= 'true' zIndex= '3' fillOpacity= '0.05' strokeColor= '#8BC34A' fillColor= "#8BC34A" />*/}
                </GoogleMap>

                {/*<div className = 'display-details'>
                    <h2>Location details: </h2>
                    <sidePanel />
                </div>*/}

               {/*<div className='location-details' >
                   <h2></h2>
                   <div className="details-container">
                       <h3>Gym and Fitness Center</h3>
                       <p>Distance: 1.2km</p>
                       <p>Timings:
                           Sunday 8am - 10pm
                           Rest of the week 7am - 10pm
                       </p>
                       <p>Website: www.activesg.com</p>
                </div>*/ }
           </div>
       </div>
   )
}

export default ExplorePage

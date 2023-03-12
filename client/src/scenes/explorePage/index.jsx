import React from 'react'
import Navbar from 'scenes/navbar'
import "./explore.css";
import map from "./map.png"
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    StreetViewPanorama,
    StreetViewService,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import { Box, Typography } from '@mui/material';
import { Place } from '@mui/icons-material';


function ExplorePage() {
    const { isLoaded } = useJsApiLoader({
        //idk why i use REACT_APP never work
        googleMapsApiKey: "AIzaSyBDZjux3Ro6hPFyqTxKdG7Y6_fkOpeKEFY",
        libraries: ['places'],
    })
    const center = { lat: 1.3521, lng: 103.8198 }
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    const searchInput = useRef()

    if (!isLoaded) {
        return (<Typography>
            Not loaded
        </Typography>)
    }

    return (
        <div>
            <Navbar />
            <div className='explore-page'>
                <div className='enter-details'>
                    <form>
                        <label htmlFor="location-input">Your Location:</label>

                        <Autocomplete>
                            <input type="text" id='searchBox' placeholder='Search' size='120' ref={searchInput} />
                        </Autocomplete>
                        {/* <input type="text" id="location-input" /> */}



                        <label htmlFor="radius-input">Select Search Radius (km):</label>
                        <select id="radius-input">
                            <option value="1">1 km</option>
                            <option value="5">5 km</option>
                            <option value="10">10 km</option>
                            <option value="20">20 km</option>
                        </select>

                        <button type="submit">View Options</button>
                    </form>
                </div>
                {/* "https://api.mapbox.com/styles/v1/kavita99/streets-v11/static/-122.4194,37.7749,12/500x500?access_token={pk.eyJ1Ijoia2F2aXRhOTkiLCJhIjoiY2xlbGJobXBtMHRwazNwcGRvb2gyczdoNiJ9.9m7kO12Jp60Cjf7Rkushow}" */}
                {/**some time can work */}

                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '50vw', height: '90vh' }}
                    options={{
                        fullscreenControl: false
                    }}

                >

                </GoogleMap>


                {/* <div className='location-details'>
                    <h2>Jurong West ActiveSG Gym</h2>
                    <div className="details-container">
                        <h3>Gym and Fitness Center</h3>
                        <p>Distance: 1.2km</p>
                        <p>Timings:
                            Sunday 8am - 10pm
                            Rest of the week 7am - 10pm
                        </p>
                        <p>Website: www.activesg.com</p>
                    </div>
                    <h2>Anytime Fitness</h2>
                    <div className="details-container">
                        <h3>Gym and Fitness Center</h3>
                        <p>Distance: 3.5km</p>
                        <p>Timings:
                            Open 24 hours
                        </p>
                        <p>Website: anytimefitness.sg</p>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default ExplorePage
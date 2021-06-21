import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'

const api = process.env.REACT_APP_GOOGLE_API_KEY

function MapComponent(props) {
    return(
       <GoogleMap
       defaultZoom={12}
       defaultCenter={{ lat: 40.730610, lng: -73.935242}}>
           {props.creatures.map(creature => <Marker position={{lat: parseFloat(creature.location.split(",")[0]), lng: parseFloat(creature.location.split(",")[1])}}></Marker>)}
       </GoogleMap> 
    )
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent))

function Map(props) {
    return(
       <WrappedMap creatures = {props.creatures} 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${api}`}
            loadingElement={<div style={{ height:"100%"}} />}
            containerElement={<div style={{ height:"100%"}} />}
            mapElement={<div style={{ height:"100%"}} />}
       /> 
    )
}

export default Map;
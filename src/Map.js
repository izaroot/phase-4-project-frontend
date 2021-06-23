import React, { useState } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, InfoBox } from 'react-google-maps'

const api = process.env.REACT_APP_GOOGLE_API_KEY

function MapComponent(props) {
    const [selectedCreature, setSelectedCreature] = useState(null)
    return(
       <GoogleMap
       defaultZoom={12}
       defaultCenter={{ lat: 40.730610, lng: -73.935242}}>
           {props.creatures.map(creature => <Marker
                            visible = {creature.id > 0 ? true : false} 
                            key = {creature.id}
                            draggable = {true}
                            onMouseOver={() => setSelectedCreature(creature)}
                            onClick={() => props.setCreature(creature)} 
                            position={{lat: parseFloat(creature.location.split(",")[0]), lng: parseFloat(creature.location.split(",")[1])}}>
            {selectedCreature === creature ? 
                <InfoWindow
                    pixelOffset={-10}
                    onCloseClick={() => setSelectedCreature(null)}
                >
                    <div>{selectedCreature.name}</div>
                </InfoWindow> : null
            }</Marker>)}
       </GoogleMap> 
    )
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent))

function Map(props) {
    return(
       <WrappedMap creatures = {props.creatures} setCreature={props.setCreature}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${api}`}
            loadingElement={<div style={{ height:"100%"}} />}
            containerElement={<div style={{ height:"100%"}} />}
            mapElement={<div style={{ height:"100%"}} />}
       /> 
    )
}

export default Map;
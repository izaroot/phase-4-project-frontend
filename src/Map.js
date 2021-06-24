import React, { useState } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, InfoBox } from 'react-google-maps'

const api = process.env.REACT_APP_GOOGLE_API_KEY


function MapComponent(props) {
    const [selectedCreature, setSelectedCreature] = useState(null)
    // let iconMarker = new window.google.maps.MarkerImage(
    //     "https://lh3.googleusercontent.com/bECXZ2YW3j0yIEBVo92ECVqlnlbX9ldYNGrCe0Kr4VGPq-vJ9Xncwvl16uvosukVXPfV=w300",
    //     null, /* size is determined at runtime */
    //     null, /* origin is 0,0 */
    //     null, /* anchor is bottom center of the scaled image */
    //     new window.google.maps.Size(32, 32)
    // )
    
    let urlImg = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    // () => {
    //     let zero = (35, 35)
    //     let notZero = (40, 40)
    //     if(props.creatures.length >= 3){
    //         return not
    //     }
    //     else{
    //         return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    //     }
    // }
    
    return(
       <GoogleMap
       defaultZoom={12}
       defaultCenter={{ lat: 40.730610, lng: -73.935242}}>
           {props.creatures.map(creature => <Marker
                            visible={true}
                            icon={{url: urlImg, scaledSize: new window.google.maps.Size(
                                props.filteredCreatures.find(storedCreature => storedCreature.id === creature.id) ? 40
                                    : 0, 
                                props.filteredCreatures.find(storedCreature => storedCreature.id === creature.id) ? 40
                                    : 0)
                                }}
                            key={creature.id}
                            onMouseOver={() => setSelectedCreature(creature)}
                            onClick={() => props.setCreature(creature)} 
                            position={{lat: parseFloat(creature.location.split(",")[0]), lng: parseFloat(creature.location.split(",")[1])}}>
            {selectedCreature === creature ? 
                <InfoWindow
                    pixelOffset={-10}
                    onCloseClick={() => setSelectedCreature(null)}
                >
                    <div style={{"text-align": "center"}}>
                        
                        <img style=  {{"width":"70px", "height": "70px", "object-fit": "cover", "border-radius": "100%" }} src = {selectedCreature.image}/><br/>
                        {selectedCreature.name}
                    </div>
                </InfoWindow> : null
            }</Marker>)}
       </GoogleMap> 
    )
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent))

function Map(props) {
    return(
       <WrappedMap creatures = {props.creatures} setCreature={props.setCreature} filteredCreatures={props.filteredCreatures}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${api}`}
            loadingElement={<div style={{ height:"100%"}} />}
            containerElement={<div style={{ height:"100%"}} />}
            mapElement={<div style={{ height:"100%"}} />}
       /> 
    )
}

export default Map;
import React, {Component} from 'react'
import Map from '../Map'

export default class MapContainer extends Component{

    render(){
        return(
            <div id="mapContainer">
                <div id="mapWrapper">
                <Map creatures = {this.props.creatures} filteredCreatures={this.props.filteredCreatures} setCreature={this.props.setSelectedCreature}/>
                </div>
                <div>Filters</div>
            </div>
        )
    }
}
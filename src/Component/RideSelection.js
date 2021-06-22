import React, {Component} from 'react'

export default class RideSelection extends Component{

    state={
        user_id: null,
        creature_id: null,
        starting_location: "",
        ending_location: "",
        distance: 0.0,
        duration: 0.0,
        price: 0.0
    }

    render(){
        return(
            <div>
                <div>Ride Selection</div>
                <h3>{this.props.creature.name}</h3>
            </div>
            
        )
    }
}
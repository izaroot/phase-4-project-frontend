import React, {Component} from 'react'

export default class RideSummaryCard extends Component{

    render(){
        return(
            <div className = "ride-summary-card">
                <h3>Creature: {this.props.trip.creature.name}</h3>
                <h3>Distance: {Math.floor(this.props.trip.distance * 10)/10} miles</h3>
                <h3>Duration: {Math.ceil(this.props.trip.duration)} hours</h3>
                <h3>Price: ${Math.ceil(this.props.trip.price * 100)/100}</h3>
            </div>
        )
    }
}
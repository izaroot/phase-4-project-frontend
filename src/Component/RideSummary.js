import React, {Component} from 'react'
import SummaryMap from '../SummaryMap'
import { Grid } from 'semantic-ui-react'

export default class RideSummary extends Component{

    render(){
        return(
            <Grid centered>
                <Grid.Column>
                <h2>Your trip summary. Thank you for choosing Crea-Hitch-Ure.</h2>
                <h3>Distance: {Math.floor(this.props.tripObj.distance * 10)/10} miles</h3>
                <h3>Duration: {Math.ceil(this.props.tripObj.duration)} hours</h3>
                <h3>Price: ${Math.ceil(this.props.tripObj.price * 100)/100}</h3>
                <h3>{this.props.tripObj.creature.name} thanks you.</h3>
                <div id="SummaryMapContainer">
                    <div id="SummaryMapWrapper">
                        <SummaryMap tripObj = {this.props.tripObj}/>
                    </div>
                </div>
                </Grid.Column>
            </Grid>
        )
    }
}
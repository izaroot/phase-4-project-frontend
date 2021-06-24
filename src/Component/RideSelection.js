import React, {Component} from 'react'
import { Form, Input, Button, Segment } from 'semantic-ui-react'

export default class RideSelection extends Component{

    state={
        user_id: null,
        creature_id: null,
        starting_location: "",
        ending_location: "",
        distance: 30.0,
        duration: 0.0,
        price: 0.0
    }

    // componentDidMount() {
    //     this.setState({
            
    //     })
    // }

    createNewTrip = () => {

        let starting_location = this.state.starting_location

        let latConv = 0.0145
        let lngConv = 0.0190

        let latMax = 40.795660
        let latMin = 40.669250
        let simLat = Math.floor((latMin + (latMax - latMin)*Math.random())*1000000)/1000000

        let lngMin = -74.070133
        let lngMax = -73.806579
        let simLng = Math.floor((lngMin + (lngMax - lngMin)*Math.random())*1000000)/1000000

        let simLocation = simLat.toString().concat(",", simLng.toString())

        let latInit = starting_location.split(",")[0]
        let lngInit = starting_location.split(",")[1]

        let latDelta = Math.abs(simLat - latInit)
        let lngDelta = Math.abs(simLng - lngInit)

        let latMiles = Math.floor((latDelta/latConv)*10)/10
        let lngMiles = Math.floor((lngDelta/lngConv)*10)/10

        let simDistance = (latMiles + lngMiles) * ((Math.random()*2)+1)

        let minDuration = simDistance/(this.props.creature.top_speed) + 1

        let estDuration = this.state.duration * (Math.random() + .5)

        let simDuration = minDuration > estDuration ? minDuration : estDuration

        let durPrice = parseFloat(simDuration) * 1
        let disPrice = simDistance * .5
        let multiplier = this.props.creature.tier_multiplier >= 1 ? this.props.creature.tier_multiplier : 1
        let actualPrice = (durPrice + disPrice) * multiplier

        let tripObj = {
            user_id: this.state.user_id,
            creature_id: this.state.creature_id,
            starting_location: this.state.starting_location,
            ending_location: simLocation,
            distance: simDistance,
            duration: simDuration,
            price: actualPrice
        }

        fetch(`http://localhost:3000/creatures/${this.state.creature_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                location: simLocation
            })
        }).then(resp => resp.json())
        .then( updatedCreature => {
            this.props.updateCreatLoc(updatedCreature)    
        })
        

        fetch('http://localhost:3000/trips', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(tripObj)
        }).then(resp => resp.json())
        .then(resp => this.props.setTripObj(resp))
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.creature.id !== prevState.creature_id) {
            // console.log(prevProps)
            
            this.setState({
                user_id: this.props.userObj.id,
                creature_id: this.props.creature.id,
                starting_location: this.props.creature.location
        }, () => this.priceChange())}
        
    }

    priceChange = () => {
        let durPrice = parseFloat(this.state.duration) * 1
        let disPrice = this.state.distance * .5
        let multiplier = this.props.creature.tier_multiplier >= 1 ? this.props.creature.tier_multiplier : 1 
        let price = (durPrice + disPrice) * multiplier
        
        this.setState({
            price
        })
    }

    handleChange = (e, data) => {
        let packet = !!e.target.value ? e.target : data 
        this.setState({
            [packet.name]: packet.value
        }, () => this.priceChange())

    }

    render(){
        return(
            <div>
                
                <Form onChange={(e) => this.handleChange(e)}>
                  
                        
                    <Form.Radio onChange={(e, data) => this.handleChange(e, data)} type="radio" value="1" checked={1 == this.state.duration} label="1 hour" name="duration"></Form.Radio>
                    <Form.Radio onChange={(e, data) => this.handleChange(e, data)} type="radio" value="2" checked={2 == this.state.duration} label="2 hours" name="duration"></Form.Radio>
                    <Form.Radio onChange={(e, data) => this.handleChange(e, data)} type="radio" value="6" checked={6 == this.state.duration} label="6 hours"name="duration"></Form.Radio>
                    <Form.Radio onChange={(e, data) => this.handleChange(e, data)} type="radio" value="12" checked={12 == this.state.duration} label="12 hours"name="duration"></Form.Radio>
                    <Form.Radio onChange={(e, data) => this.handleChange(e, data)} type="radio" value="24" checked={24 == this.state.duration} label="1 day"name="duration"></Form.Radio>
                    <Form.Radio onChange={(e, data) => this.handleChange(e, data)} type="radio" value="48" checked={48 == this.state.duration} label="2 days"name="duration"></Form.Radio><br/><br/>
                   <Form.Input type="range" min="0" max="100" step="10" value={this.state.distance} name="distance" labelPosition="" label={`${this.state.distance} miles`} >
                    </Form.Input>
                    
                </Form>
                <h3>{this.props.creature.name}</h3><br/>
                <div>Estimated Price ${this.state.price}</div><br/>
                {!!this.props.userObj.id ?<Button onClick={this.createNewTrip}>Giddyup!</Button> : <h4>Login to start your trip.</h4>}
                
            </div>
            
        )
    }
}
import React, {Component} from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

export default class RideSelection extends Component{

    state={
        user_id: null,
        creature_id: null,
        starting_location: "",
        ending_location: "",
        distance: 20.0,
        duration: 0.0,
        price: 0.0
    }

    // componentDidMount() {
    //     this.setState({
            
    //     })
    // }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.creature.id !== prevState.creature_id) {
            // console.log(prevProps)
            this.setState({
                user_id: this.props.userObj.id,
                creature_id: this.props.creature.id,
                starting_location: this.props.creature.location
        })}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return(
            <div>
                <div>Ride Selection</div>
                <Form onChange={(e) => this.handleChange(e)}>
                    <Form.Radio type="radio" value="1" checked={1 == this.state.duration} label="1 hour" name="duration"></Form.Radio>
                    <Form.Radio type="radio" value="2" checked={2 == this.state.duration} label="2 hours" name="duration"></Form.Radio>
                    <Form.Radio type="radio" value="6" checked={6 == this.state.duration} label="6 hours"name="duration"></Form.Radio>
                    <Form.Radio type="radio" value="12" checked={12 == this.state.duration} label="12 hours"name="duration"></Form.Radio>
                    <Form.Radio type="radio" value="24" checked={24 == this.state.duration} label="1 day"name="duration"></Form.Radio>
                    <Form.Radio type="radio" value="48" checked={48 == this.state.duration} label="2 days"name="duration"></Form.Radio>
                   <Form.Input type="range" min="0" max="100" step="10" value={this.state.distance} name="distance" label={`${this.state.distance} miles`} >
                    </Form.Input>
                </Form>
                <h3>{this.props.creature.name}</h3>
            </div>
            
        )
    }
}
import React, {Component} from 'react'
import { Item, Segment } from 'semantic-ui-react'
import RideSummaryCard from '../Component/RideSummaryCard'


export default class AccountContainer extends Component{


    render(){
        return(
            <Segment.Group horizontal>
                <Segment>
                    <h2>My Account</h2>
                    <img style=  {{"width":"200px", "height": "200px", "object-fit": "cover", "border-radius": "100%" }} src ={this.props.user.image}/>
                    <h3>{this.props.user.username}</h3>
                    <h3>Email: {this.props.user.email}</h3>
                    <h3>Membership Tier: {this.props.user.membership_tier}</h3>
                </Segment>
                <Segment style={{"height" : "600px", "overflow" : "scroll"}}>
                {!!this.props.user.trips ?
                <div>
                    <Item.Group>
                        {this.props.trips.map(trip => <RideSummaryCard trip = {trip}></RideSummaryCard>)}
                    </Item.Group>
               </div>
               : null }
               </Segment>
            </Segment.Group>
        )
    }
}
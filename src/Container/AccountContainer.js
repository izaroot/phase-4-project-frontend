import React, {Component} from 'react'
import RideSummaryCard from '../Component/RideSummaryCard'


export default class AccountContainer extends Component{


    render(){
        return(
            <div>
                <h2>My Account</h2>
                <img src = "https://lh3.googleusercontent.com/pw/ACtC-3cMwwbvIx5xdVA9uytYYbUqRDtnprkq7faRhz8fqmZCytUavcZZPh12AcYwJPJJY_tQiiKw9Yo9wa-DWEDIA1v73a8bp-w-1iGMXniSW2PeEnX0hwqcS_TMt8rSU4GzY-YkQZSKpAObjL83jU4vARKT=w504-h896-no?authuser=0"/>
                <h3>{this.props.user.username}</h3>
                <h3>Email: {this.props.user.email}</h3>
                <h3>Membership Tier: {this.props.user.membership_tier}</h3>
                {this.props.trips.map(trip => <RideSummaryCard trip = {trip}></RideSummaryCard>)}
            </div>
        )
    }
}
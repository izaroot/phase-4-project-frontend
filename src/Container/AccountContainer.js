import React, {Component, createRef} from 'react'
import { Item, Segment } from 'semantic-ui-react'
import RideSummaryCard from '../Component/RideSummaryCard'
import { Form, Button, Ref, Visibility, Sticky, Grid } from 'semantic-ui-react'


export default class AccountContainer extends Component{

    state={
        calculations: {
            direction: 'none',
            height: 0,
            width: 0,
            topPassed: false,
            bottomPassed: false,
            pixelsPassed: 0,
            percentagePassed: 0,
            topVisible: false,
            bottomVisible: false,
            fits: false,
            passing: false,
            onScreen: false,
            offScreen: false,
          },
        displayEdit:false,
        email: this.props.user.email,
        image: this.props.user.image,
        bio: this.props.user.bio,
        tier: this.props.user.membership_tier
    }

    contextRef = createRef()

    handleUpdate = (e, { calculations }) => this.setState({ calculations })

    toggleEdit = () => {
        this.setState({
            displayEdit:!this.state.displayEdit
        })
    }

    updateHandler = (e, data) => {
        let packet = !!e.target.value ? e.target : data 
        // debugger
        this.setState({
            [packet.name]: packet.value
        })

    }

    submitHandler = () => {
       let {email, image, bio, tier} = this.state
       fetch(`http://localhost:3000/users/${this.props.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            email,
            image,
            bio,
            membership_tier: tier
        }),
      })
        .then((r) => r.json())
        .then((userObj) => {
            this.props.updateUserData(userObj)
            this.toggleEdit()
        });
    }

    render(){
        const { calculations } = this.state

        return(
            <Ref innerRef={this.contextRef}>
            <Grid columns={2}>
                <Grid.Column>
                <Sticky>
                <Segment>
                    <h2>My Account</h2>
                    <img style=  {{"width":"200px", "height": "200px", "object-fit": "cover", "border-radius": "100%" }} src ={this.props.user.image}/>
                    <h3>{this.props.user.username}</h3>
                    {this.state.displayEdit 
                    ? <div>
                        <Form onSubmit = {() => this.submitHandler()} onChange = {(e, data) => this.updateHandler(e)}>
                            <Form.Input label="Image:" name = "image" value={this.state.image}></Form.Input>
                            <Form.Input label="Email:" name = "email" value={this.state.email}></Form.Input>
                            <Form.TextArea label="Bio:" name = "bio" value={this.state.bio}></Form.TextArea>
                            <Form.Radio onChange = {(e, data) => this.updateHandler(e, data)} name = "tier" label="Platinum" value="Platinum" checked={"Platinum" == this.state.tier}></Form.Radio>
                            <Form.Radio onChange = {(e, data) => this.updateHandler(e, data)} name = "tier" label="Gold" value="Gold" checked={"Gold" == this.state.tier}></Form.Radio>
                            <Form.Radio onChange = {(e, data) => this.updateHandler(e, data)} name = "tier" label="Silver" value="Silver" checked={"Silver" == this.state.tier}></Form.Radio>
                            <Form.Button>Submit</Form.Button>
                        </Form>
                        <br/>
                        <Button onClick = {this.toggleEdit}>Cancel</Button>
                    </div>
                    :<div>
                        <h3>Email: {this.props.user.email}</h3>
                        <h3>About Me: {this.props.user.bio}</h3>
                        <h3>Membership Tier: {this.props.user.membership_tier}</h3>
                        <p onClick = {this.toggleEdit}>Edit user information.</p>
                    </div>}
                    
                </Segment>
                </Sticky>
                </Grid.Column>
                
                <Grid.Column>
                <Visibility onUpdate={this.handleUpdate}>
                <Segment>
                {!!this.props.user.trips ?
                <div>
                    <Item.Group>
                        {this.props.trips.map(trip => <RideSummaryCard trip = {trip}></RideSummaryCard>)}
                    </Item.Group>
               </div>
               : null }
               </Segment>
               </Visibility>
               </Grid.Column>
            </Grid>
            </Ref>
        )
    }
}
import React, {Component} from 'react'
import { Item, Modal, Button, Header } from 'semantic-ui-react'
import SummaryMap from '../SummaryMap'

export default class RideSummaryCard extends Component{

    state={
        open:false
    }

    render(){
        return(
            <Item>
            <img style=  {{"margin-right": "20px","width":"85px", "height": "85px", "object-fit": "cover", "border-radius": "100%" }} src={this.props.trip.creature.image} />

            <Item.Content>
                <Item.Header as='a'>{this.props.trip.created_at}</Item.Header>
                <Item.Meta>You rode with {this.props.trip.creature.name}</Item.Meta>
                <Item.Description>
               Distance: {Math.floor(this.props.trip.distance * 10)/10} miles<br/>
               Duration: {Math.ceil(this.props.trip.duration)} hours<br/>
               Price: ${Math.ceil(this.props.trip.price * 100)/100}
               </Item.Description>
                <Item.Extra>
    <Modal
                 onClose={() => this.setState({open: false})}
                 onOpen={() => this.setState({open: true})}
                 open={this.state.open}
                trigger={<Button>Trip Details</Button>}
                >
      <Modal.Header>Trip Date: {this.props.trip.created_at}</Modal.Header>
      <Modal.Content>
         <Modal.Description>
          <Header></Header>
            <div id="SummaryMapContainer">
                    <div id="SummaryMapWrapper">
                        <SummaryMap tripObj = {this.props.trip}/>
                    </div>
            </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='gray' onClick={() => this.setState({open:false})}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
                </Item.Extra>
            </Item.Content>
            </Item>
            
        )
    }
}
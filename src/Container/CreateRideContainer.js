import React, {Component} from 'react'
import MapContainer from '../Component/MapContainer';
import RideSelection from '../Component/RideSelection'


export default class CreateRideContainer extends Component{

    state = {
        creatures:[],
        selectedCreature: {}
      }
    
      componentDidMount(){
      fetch("http://localhost:3000/creatures")
      .then((r) => r.json())
      .then((creaturesArray) => {
        this.setState({
          creatures: creaturesArray
        })
      });
      }

    setSelectedCreature = (creature) => {
      this.setState({
        selectedCreature: creature
      })
    }

    render(){
        return(
            <div>
              <RideSelection creature={this.state.selectedCreature} userObj = {this.props.userObj}/>
              <MapContainer setSelectedCreature={this.setSelectedCreature} creatures={this.state.creatures}/>
            </div>
        )
    }
}
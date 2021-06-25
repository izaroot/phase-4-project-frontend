import React, {Component} from 'react'
import MapContainer from '../Component/MapContainer';
import RideSelection from '../Component/RideSelection'
import RideSummary from '../Component/RideSummary';
import { Segment } from 'semantic-ui-react';


export default class CreateRideContainer extends Component{

    state = {
        // creatures:[],
        // filteredCreatures: [],
        selectedCreature: {},
        tripObj:{}
      }

      setTripObj = (tripObj) => {
        this.setState({
          tripObj:tripObj
        })
      }

    //   getCreatures = () => {
    //     fetch("http://localhost:3000/creatures")
    //   .then((r) => r.json())
    //   .then((creaturesArray) => {
    //     this.setState({
    //       creatures: creaturesArray,
    //       filteredCreatures: creaturesArray
    //     })
    //   })
    //   }

      // resetCreatures = () => {
      //   this.setState({
      //     filteredCreatures: this.state.creatures
      //   })
      // }
    
      // componentDidMount(){
      //   this.getCreatures()
      // }

    setSelectedCreature = (creature) => {
      this.setState({
        selectedCreature: creature
      })
    }

    updateCreatLoc = (updatedCreature) => {
      let updatedCreatures = this.props.filteredCreatures.map(creature => creature.id !== updatedCreature.id ? creature : updatedCreature )
      this.setState({
        filteredCreatures: updatedCreatures
      })
    }

    // filterTest = () => {
    //   let filteredCreatures = this.props.creatures.filter(creature => creature.id === 6)
    //   this.setState({
    //     filteredCreatures:filteredCreatures
    //   })
    // }

    render(){
        return(
            <div>
              {!this.state.tripObj.id  
              ? <Segment.Group horizontal>
                <Segment>
                <RideSelection addTrip={this.props.addTrip} setTripObj = {this.setTripObj} getCreatures = {this.getCreatures} updateCreatLoc={this.updateCreatLoc} creature={this.state.selectedCreature} userObj = {this.props.userObj}/>
                </Segment>
                <Segment>
              <MapContainer setSelectedCreature={this.setSelectedCreature} creatures={this.props.creatures} filteredCreatures={this.props.filteredCreatures}/>
              </Segment>
              </Segment.Group>
              : <RideSummary tripObj = {this.state.tripObj}></RideSummary>}
              
            </div>
        )
    }
}
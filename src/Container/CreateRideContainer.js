import React, {Component} from 'react'
import MapContainer from '../Component/MapContainer';
import RideSelection from '../Component/RideSelection'


export default class CreateRideContainer extends Component{

    state = {
        // creatures:[],
        // filteredCreatures: [],
        selectedCreature: {}
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
              <RideSelection getCreatures = {this.getCreatures} updateCreatLoc={this.updateCreatLoc} creature={this.state.selectedCreature} userObj = {this.props.userObj}/>
              <MapContainer setSelectedCreature={this.setSelectedCreature} creatures={this.props.creatures} filteredCreatures={this.props.filteredCreatures}/>
              <button onClick = {this.props.filterTest}>Show Creatures</button>
              {/* <button onClick = {this.resetCreatures}>Reset Creatures</button> */}
            </div>
        )
    }
}
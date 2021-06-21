import React, {Component} from 'react'
import Map from '../Map'


export default class CreateRideContainer extends Component{

    state = {
        creatures:[],
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


    render(){
        return(
            <div id="mapContainer">
                <div id="mapWrapper">
                <Map creatures = {this.state.creatures}/>
                </div>
            </div>
        )
    }
}
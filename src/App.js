import React, {Component} from 'react'
import './App.css';
import Map, {MapComponent} from './Map';



class App extends Component{

  // constructor(){
  //     super()
      
  // }

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

export default App;

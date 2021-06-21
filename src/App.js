import React, {Component} from 'react'
import './App.css';
import Map from './Map';



class App extends Component{

  // constructor(){
  //     super()
      
  // }

  state = {}

  componentDidMount(){
    
    
  }
  


  render(){
    return( 
      <div id="mapContainer">
        <div id="mapWrapper">
          <Map />
        </div>
      </div>
      
    )
  }
}

export default App;

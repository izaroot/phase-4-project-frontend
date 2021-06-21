import React, {Component} from 'react'
import './App.css';
import Map, {MapComponent} from './Map';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import CreateRideContainer from './Container/CreateRideContainer';
import LoginContainer from './Container/LoginContainer'
import ShowCreaturesContainer from './Container/ShowCreaturesContainer';
import ViewRideContainer from './Container/ViewRideContainer';
import AccountContainer from './Container/AccountContainer';




class App extends Component{

  // constructor(){
  //     super()
      
  // }

  state={
      isLoggedIn: false,
      user: {}
  }
  
  componentDidMount(){
    localStorage.token ? this.setState({isLoggedIn: true}) : this.setState({isLoggedIn: false})
  }
  

  handleLogin = (state) => {
      fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          username: state.username,
          password: state.password
        })
      })
      .then(resp => resp.json())
      .then(userJWT => {
        if (userJWT.message){
          alert(userJWT.message)
        }
        else{
          localStorage.token = userJWT.jwt
          this.setState({
              user: userJWT.user,
              isLoggedIn: true
          })
        }
      })
  }


  render(){
    return( 
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/newride">New Ride</Link>
            </li>
            <li>
              <Link to="/creatures">Creatures</Link>
            </li>
            <li>
              <Link to="/viewride">View Ride</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </nav>
        <Switch>
            <Route exact path="/">
                  {this.state.isLoggedIn ? null : <LoginContainer handleLogin={this.handleLogin} />}
            </Route>
            <Route path="/newride">
                <CreateRideContainer />
            </Route>
            <Route path="/creatures" >
                <ShowCreaturesContainer />
            </Route>
            <Route path="/viewride">
                <ViewRideContainer />
            </Route>
            <Route path="/account">
                <AccountContainer />
            </Route>
        </Switch>
      </Router>
      
      
    )
  }
}

export default App;

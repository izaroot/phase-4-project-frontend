import React, {Component} from 'react'
import './App.css';
import Map, {MapComponent} from './Map';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
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

  getUserData = () => {
    fetch("http://localhost:3000/getuser",
    {headers:{
      "Authorization":`Bearer ${localStorage.token}`
    }})
    .then((r) => r.json())
    .then((user) => this.setState({user}))
  }
  
  componentDidMount(){
    if (localStorage.token) {
      this.setState({isLoggedIn: true})
      this.getUserData()
    } else {
      this.setState({isLoggedIn: false})
    }
  }

  setUser = (user) => {
    this.setState({
        user,
        isLoggedIn: true
    })
  }

  handleLogout = () => {
    this.setState({
      user: {},
      isLoggedIn: false
    })
    localStorage.clear()
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
            {this.state.isLoggedIn ? <Button onClick={this.handleLogout}>Logout</Button> : null}
          </ul>
        </nav>
        <Switch>
            <Route exact path="/">
                  {this.state.isLoggedIn ? null : <LoginContainer setUser={this.setUser} />}
            </Route>
            <Route path="/newride">
                <CreateRideContainer userObj = {this.state.user} />
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

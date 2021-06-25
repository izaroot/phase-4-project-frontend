import React, {Component} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom'
import {Button, Menu} from 'semantic-ui-react'
import CreateRideContainer from './Container/CreateRideContainer';
import LoginContainer from './Container/LoginContainer'
import ShowCreaturesContainer from './Container/ShowCreaturesContainer';
import AccountContainer from './Container/AccountContainer';




class App extends Component{

  // constructor(){
  //     super()
      
  // }

  state={
      isLoggedIn: false,
      user: {},
      creatures:[],
      filteredCreatures: [],
      selectedCreature: {},
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handlePageChange = (newUrl) => {
    this.props.history.push(newUrl)
    }


  getCreatures = () => {
    fetch("http://localhost:3000/creatures")
  .then((r) => r.json())
  .then((creaturesArray) => {
    this.setState({
      creatures: creaturesArray,
    }
    // ,this.setState({filteredCreatures: creaturesArray})
    )
  })
  }

  filterTest = () => {
    let filteredCreatures = this.state.creatures//.filter(creature => creature.id !== 0)
    this.setState({
      filteredCreatures:filteredCreatures
    })
  }

  getUserData = () => {
    fetch("http://localhost:3000/getuser",
    {headers:{
      "Authorization":`Bearer ${localStorage.token}`
    }})
    .then((r) => r.json())
    .then((user) => {
      this.handlePageChange('/newride')
      this.setState({user})
    })
  }

  updateUserData = (userObj) => {
    this.setState({
      user: userObj
    })
  }
  
  componentDidMount(){
    this.getCreatures()
    if (localStorage.token) {
      this.setState({isLoggedIn: true})
      this.getUserData()
    } else {
      this.setState({isLoggedIn: false})
    }
  }

  setUser = (user) => {
    this.handlePageChange('/newride')
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

  addTrip = (tripObj) => {
    this.setState({
      user: {...this.state.user, 
        trips:[...this.state.user.trips, tripObj]
      }
    })
  }

  render(){
    const { activeItem } = this.state
    return( 
      <Router>
         <Menu>
         <Link {...(this.state.isLoggedIn ? {onClick: this.handleLogout} : {to: "/login"}  )}>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
         {this.state.isLoggedIn ? "Logout" : "Login"}
        </Menu.Item>
        </Link>

        <Link to="/newride">
        <Menu.Item
          name='newride'
          active={activeItem === 'newride'}
          onClick={this.handleItemClick}
        >
         New Ride
        </Menu.Item>
        </Link>

        <Link to="/creatures">
        <Menu.Item
          name='creatures'
          active={activeItem === 'creatures'}
          onClick={this.handleItemClick}
        >
          Creatures
        </Menu.Item>
        </Link>

        {this.state.isLoggedIn ?
        <Link to="/account">
        <Menu.Item
          name='account'
          active={activeItem === 'account'}
          onClick={this.handleItemClick}
        >
          Account
        </Menu.Item>
        </Link>
        : null}
      </Menu>
        <Switch>
            <Route exact path="/login">
                  {this.state.isLoggedIn ? null : <LoginContainer setUser={this.setUser} />}
            </Route>
            <Route path="/newride">
                <CreateRideContainer addTrip={this.addTrip} getUserData={this.getUserData} filterTest={this.filterTest} userObj = {this.state.user} creatures={this.state.creatures} filteredCreatures={this.state.filteredCreatures} />
            </Route>
            <Route path="/creatures" >
                <ShowCreaturesContainer creatures = {this.state.creatures} />
            </Route>
            <Route path="/account">
                <AccountContainer updateUserData = {this.updateUserData} user = {this.state.user} trips = {this.state.user.trips}/>
            </Route>
        </Switch>
      </Router>
      
      
    )
  }
}

export default withRouter(App);

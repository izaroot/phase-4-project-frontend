import React, {Component} from 'react'
import {Form, Input} from 'semantic-ui-react'


export default class LoginContainer extends Component{

    state={
        username: "",
        password: "",
        loginDisplay: true
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
            this.props.setUser(userJWT.user)
            this.handleInputClear()
          }
        })
    }

    handleRegister = (state) => {
        fetch('http://localhost:3000/signup', {
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
            this.props.setUser(userJWT.user)
            this.handleInputClear()
          }
        })
    }

    handleInputClear = () => {
        this.setState({
            username: "",
            password: ""
        })
    }

    handleLoginDisplay = () => {
        this.setState({
            loginDisplay: !this.state.loginDisplay
        })
    }

    render(){
        return(
            <div>
                <Form onChange={(e) => this.handleInputChange(e)} 
                onSubmit={() => {this.state.loginDisplay ? this.handleLogin(this.state) : this.handleRegister(this.state)}}>
                <Form.Input
                    autoComplete="off"
                    placeholder='Username'
                    name='username'
                    value={this.state.username}
                    />
                    <Form.Input
                    type="password"
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    />
                    <Form.Button content={this.state.loginDisplay ? 'Login' : 'Register'} />
                    <div onClick={this.handleLoginDisplay}>Click here to {this.state.loginDisplay ? 'register' : 'login'}</div>
                </Form>
                
            </div>
        )
    }
}
import React, {Component} from 'react'
import {Form, Input} from 'semantic-ui-react'


export default class LoginContainer extends Component{

    state={
        username: "",
        password: ""
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div>
                <Form onChange={(e) => this.handleInputChange(e)} onSubmit={() => this.props.handleLogin(this.state)}>
                <Form.Input
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
                    <Form.Button content='Login' />
                </Form>
            </div>
        )
    }
}
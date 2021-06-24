import React, {Component} from 'react'

export default class CreatureCard extends Component{

    render(){
        return(
            <div>
                <img src = {this.props.creature.image}/>
                <h3>Name: {this.props.creature.name}</h3>
                <h4>Species: {this.props.creature.species}</h4>
            </div>
        )
    }
}
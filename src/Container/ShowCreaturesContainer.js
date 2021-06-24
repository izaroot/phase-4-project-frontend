import React, {Component} from 'react'
import CreatureCard from '../Component/CreatureCard'


export default class ShowCreaturesContainer extends Component{


    render(){
        return(
            <div>
                {this.props.creatures.map(creature => <CreatureCard creature = {creature}></CreatureCard>)}
            </div>
        )
    }
}
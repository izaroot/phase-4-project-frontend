import React, {Component} from 'react'
import {Card, Image, Icon} from 'semantic-ui-react'

export default class CreatureCard extends Component{

    render(){
        return(
            <Card>
                <Image fluid  style=  {{"width":"200", "height": "250px", "object-fit": "cover"}}
                centered src={this.props.creature.image}  ui={true} />
                <Card.Content>
                <Card.Header>{this.props.creature.name}</Card.Header>
                <Card.Meta>
                    <span>{this.props.creature.species}</span>
                </Card.Meta>
                <Card.Description>
                    Category: {this.props.creature.category}<br/>
                    Tier: {this.props.creature.tier}
                </Card.Description>
                </Card.Content>
                
            </Card>
            
        )
    }
}

import React, {Component} from 'react'
import CreatureCard from '../Component/CreatureCard'
import { Checkbox } from 'semantic-ui-react'
import { Segment } from 'semantic-ui-react'


export default class ShowCreaturesContainer extends Component{


    state ={ 
        speciesFilter: [],
        tierFilter: []
    }

    handleChange = (e) =>{
        debugger
    }

    speciesSelect = (e, data) => {
        
        let currentFilter = this.state.speciesFilter
        if(currentFilter.some(value => value === data.value)){
            this.setState({
                speciesFilter: currentFilter.filter(value => value !== data.value)
            })
        }
        else{
            this.setState({
                speciesFilter: [...currentFilter, data.value]
            })
        }
    }

    tierSelect = (e, data) => {
        
        let currentFilter = this.state.tierFilter
        if(currentFilter.some(value => value === data.value)){
            this.setState({
                tierFilter: currentFilter.filter(value => value !== data.value)
            })
        }
        else{
            this.setState({
                tierFilter: [...currentFilter, data.value]
            })
        }
    }

    render(){

        let filterCreatures = this.props.creatures.filter(creature =>{ 

            let speciesSatisfied = false
            if(this.state.speciesFilter.length === 0){
                speciesSatisfied = true
            }
            else if(this.state.speciesFilter.includes(creature.species)){
                speciesSatisfied = true
            }
            else{
                speciesSatisfied = false
            }

           let tierSatisfied = false
           if(this.state.tierFilter.length === 0){
            tierSatisfied = true
            }
            else if(this.state.tierFilter.includes(creature.tier)){
                tierSatisfied = true
            }
            else{
                tierSatisfied = false
            }

            if (speciesSatisfied && tierSatisfied){
                return creature
            }
        })
        

        return(
            <Segment.Group horizontal>
                <Segment padded="very">
                    <div style={{"width":"700px"}}>
                        <h3>Species:</h3>
                        <Checkbox label="Bird" onChange={(e, data) => this.speciesSelect(e, data)} value="Bird" checked={this.state.speciesFilter.some(value => value === "Bird")} toggle/><br/>
                        <Checkbox label="Bison" onChange={(e, data) => this.speciesSelect(e, data)} value="Bison" checked={this.state.speciesFilter.some(value => value === "Bison")} toggle/><br/>
                        <Checkbox label="Cat" onChange={(e, data) => this.speciesSelect(e, data)} value="Cat" checked={this.state.speciesFilter.some(value => value === "Cat")} toggle/><br/>
                        <Checkbox label="Dog" onChange={(e, data) => this.speciesSelect(e, data)} value="Dog" checked={this.state.speciesFilter.some(value => value === "Dog")} toggle/><br/>
                        <Checkbox label="Dragon" onChange={(e, data) => this.speciesSelect(e, data)} value="Dragon" checked={this.state.speciesFilter.some(value => value === "Dragon")} toggle/><br/>
                        <Checkbox label="Hippogriff" onChange={(e, data) => this.speciesSelect(e, data)} value="Hippogriff" checked={this.state.speciesFilter.some(value => value === "Hippogriff")} toggle/><br/>
                        <Checkbox label="Hobbit" onChange={(e, data) => this.speciesSelect(e, data)} value="Hobbit" checked={this.state.speciesFilter.some(value => value === "Hobbit")} toggle/><br/>
                        <Checkbox label="Hog" onChange={(e, data) => this.speciesSelect(e, data)} value="Hog" checked={this.state.speciesFilter.some(value => value === "Hog")} toggle/><br/>
                        <Checkbox label="Horse" onChange={(e, data) => this.speciesSelect(e, data)} value="Horse" checked={this.state.speciesFilter.some(value => value === "Horse")} toggle/><br/>
                        <Checkbox label="Human" onChange={(e, data) => this.speciesSelect(e, data)} value="Human" checked={this.state.speciesFilter.some(value => value === "Human")} toggle/><br/>
                        <Checkbox label="Kraken" onChange={(e, data) => this.speciesSelect(e, data)} value="Kraken" checked={this.state.speciesFilter.some(value => value === "Kraken")} toggle/><br/>
                        <Checkbox label="Pokemon" onChange={(e, data) => this.speciesSelect(e, data)} value="Pokemon" checked={this.state.speciesFilter.some(value => value === "Pokemon")} toggle/><br/>
                        <Checkbox label="Snail" onChange={(e, data) => this.speciesSelect(e, data)} value="Snail" checked={this.state.speciesFilter.some(value => value === "Snail")} toggle/><br/>
                        <Checkbox label="Toy" onChange={(e, data) => this.speciesSelect(e, data)} value="Toy" checked={this.state.speciesFilter.some(value => value === "Toy")} toggle/><br/>
                        <Checkbox label="Train" onChange={(e, data) => this.speciesSelect(e, data)} value="Train" checked={this.state.speciesFilter.some(value => value === "Train")} toggle/><br/>
                        <Checkbox label="Turtle" onChange={(e, data) => this.speciesSelect(e, data)} value="Turtle" checked={this.state.speciesFilter.some(value => value === "Turtle")} toggle/><br/>
                        <br/>
                        <br/>
                        <h3>Tier:</h3>
                        <Checkbox label="Silver" onChange={(e, data) => this.tierSelect(e, data)} value="Silver" checked={this.state.tierFilter.some(value => value === "Silver")} toggle/><br/>
                        <Checkbox label="Gold" onChange={(e, data) => this.tierSelect(e, data)} value="Gold" checked={this.state.tierFilter.some(value => value === "Gold")} toggle/><br/>
                        <Checkbox label="Platinum" onChange={(e, data) => this.tierSelect(e, data)} value="Platinum" checked={this.state.tierFilter.some(value => value === "Platinum")} toggle/><br/>
                    </div>
                </Segment>
                <Segment>
                <div className="ui grid cards centered columns">
                    {filterCreatures.map(creature => <CreatureCard creature = {creature}></CreatureCard>)}
                </div>
                </Segment>
            </Segment.Group>
        )
    }
}
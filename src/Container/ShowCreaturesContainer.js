import React, {Component} from 'react'
import CreatureCard from '../Component/CreatureCard'
import { Checkbox } from 'semantic-ui-react'


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
            <div>
                <div>
                    <Checkbox label="Dog" onChange={(e, data) => this.speciesSelect(e, data)} value="Dog" checked={this.state.speciesFilter.some(value => value === "Dog")} toggle/>
                    <Checkbox label="Dragon" onChange={(e, data) => this.speciesSelect(e, data)} value="Dragon" checked={this.state.speciesFilter.some(value => value === "Dragon")} toggle/>
                    <Checkbox label="Kraken" onChange={(e, data) => this.speciesSelect(e, data)} value="Kraken" checked={this.state.speciesFilter.some(value => value === "Kraken")} toggle/>
                    <Checkbox label="Cat" onChange={(e, data) => this.speciesSelect(e, data)} value="Cat" checked={this.state.speciesFilter.some(value => value === "Cat")} toggle/>
                    <Checkbox label="Hog" onChange={(e, data) => this.speciesSelect(e, data)} value="Hog" checked={this.state.speciesFilter.some(value => value === "Hog")} toggle/>
                
                </div>
                <div>
                <Checkbox label="Silver" onChange={(e, data) => this.tierSelect(e, data)} value="Silver" checked={this.state.tierFilter.some(value => value === "Silver")} toggle/>
                <Checkbox label="Gold" onChange={(e, data) => this.tierSelect(e, data)} value="Gold" checked={this.state.tierFilter.some(value => value === "Gold")} toggle/>
                <Checkbox label="Platinum" onChange={(e, data) => this.tierSelect(e, data)} value="Platinum" checked={this.state.tierFilter.some(value => value === "Platinum")} toggle/>
                </div>
                <div className="ui grid cards centered columns">
                    {filterCreatures.map(creature => <CreatureCard creature = {creature}></CreatureCard>)}
                </div>
            </div>
        )
    }
}
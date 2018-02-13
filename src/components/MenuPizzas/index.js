import React, { Component } from 'react';
import './MenuPizzas.css';
import PizzaCard from '../PizzaCard'

class MenuPizzas extends Component {
	constructor(){
		super()
		this.state = {
			yourSelection:[],
			pizzas: [],
			loading:true
		}
	}

	componentWillMount(){
		fetch('http://192.168.0.11:8080/pizzas').then(res => res.json())
		.then(res => {
			this.setState({
				pizzas:res.data,
				loading: false
			})
		})

		
	}
	vote = () =>{
		console.log('vote!')
	}
  render() {
	return (
	<div className="Pizzas-menu">
		<h3>Vote ur pizza :)</h3>
		<h4>Happy friday bro! <span role="img" aria-label="icon">🤘🏼</span></h4>

		<input type="text" placeholder="Filter ur pizza"/>
		<div className="Select-pizza">
		{
			 this.state.loading ? <h3 className="loading"> Loading...</h3> :
			 
			 
			 	this.state.pizzas.map((pizza, index)=>{
				return (
					<PizzaCard 
						key={index}
						name={pizza.name}
						ingredients={pizza.ingredients}
						image={pizza.image}
						vote={this.vote}
					/>)
						}
					)
		
	}
		</div>
		<form>
			<h2>Your selection</h2>
			<ul>
				{
					this.state.yourSelection.map((pizza)=>{
						return(
						<li>{pizza.name}</li>
						)
					})
				}
			</ul>
			<button className="Submit-votes">Submit your votes!</button>
		</form>
	</div>
	);
  }
}

export default MenuPizzas;

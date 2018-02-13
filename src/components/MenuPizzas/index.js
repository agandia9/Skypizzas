import React, { Component } from 'react';
import './MenuPizzas.css';
import PizzaCard from '../PizzaCard'

class MenuPizzas extends Component {
	constructor(){
		super()
		this.state = {
			yourSelection:[],
			pizzas: [{name:'Pizza 1', ingredientes:['ing1','ing2','ing3'], image:'https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f355.svg'}, {name:'Pizza 2', ingredientes:['ing1','ing2','ing3'], image:'https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f355.svg'}, {name:'Pizza 3', ingredientes:['ing1','ing2','ing3'], image:'https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f355.svg'}, {name:'Pizza 4', ingredientes:['ing1','ing2','ing3'], image:'https://s0.wp.com/wp-content/mu-plugins/wpcom-smileys/twemoji/2/svg/1f355.svg'}]
		}
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
			this.state.pizzas.map((pizza, index)=>{
				return (
					<PizzaCard 
						key={index}
						name={pizza.name}
						ingredientes={pizza.ingredientes}
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

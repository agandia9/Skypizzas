import React, { Component } from 'react';
import './MenuPizzas.css';
import PizzaCard from '../PizzaCard'

class MenuPizzas extends Component {
	constructor(){
		super()
		this.state = {
			pizzas: ['', '', '', '']
		}
	}
  render() {
	return (
	<div className="Pizzas-menu">
		<h3>Vote ur pizza :)</h3>
		<h4>Happy friday bro! <span role="img" aria-label="icon">🤘🏼</span></h4>
		<input type="text"/>
		<div className="Select-pizza">
		{
			this.state.pizzas.map((pizza, index)=>{
				return (
					<PizzaCard key={index} />
					)
			})
			
		}
		</div>
	</div>
	);
  }
}

export default MenuPizzas;

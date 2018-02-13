import React, { Component } from 'react';
import './PizzaCard.css';

class PizzaCard extends Component {
  render() {
	return (
	<div className="thumbnail">
		<h3>{this.props.name}</h3>
		<p>{this.props.ingredientes}</p>
		<img src={this.props.image} alt="pizza"/>
		<button onClick={this.props.vote}>Vote for me!</button>
	</div>
	);
  }
}

export default PizzaCard;
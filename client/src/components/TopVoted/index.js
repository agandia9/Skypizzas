import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import './TopVoted.css';

class TopVoted extends Component {
	constructor(){
		super()
		this.state={
			ranking:[]
		}
	}
	componentWillMount(){
		fetch('https://hidden-peak-45393.herokuapp.com/votes').then(res => res.json())
		.then(res => {
			const result = Object.keys(res.data).map(function(key) {
			  return {name: key, quantity: res.data[key]};
			}).sort((a,b)=>{
				return b.quantity - a.quantity
			});
			this.setState({
				ranking:result
			})
		})
	}
	render() {
		return (
		<div class="TopVoted-menu">
			<h1>Top Voted Ranking <span role="img">🏆</span></h1>
			{
				this.state.ranking.map((pizza, index)=>{
					return <p className="pizza-ranking">{index+1  + ' - ' + pizza.name.substr(0,1).toUpperCase() + pizza.name.substr(1)} | { 'Votes => ' + pizza.quantity}</p>
				})
			}
			
			<Link to='/'>Home</Link>
		</div>
		);
	}
}

export default TopVoted;
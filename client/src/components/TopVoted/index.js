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

		//console.log('hi from top voted!')
		fetch('http://192.168.0.11:8080/votes').then(res => res.json())
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
			<h2>Top Voted :)</h2>
			{
				//console.log(this.state.ranking)
				this.state.ranking.map((pizza, index)=>{
					return <p>{pizza.name} - {pizza.quantity}</p>
				})
			}
			<Link to='/'>Home</Link>
		</div>
		);
	}
}

export default TopVoted;
import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import './TopVoted.css';

class TopVoted extends Component {
	constructor(){
		super()
		this.state={
			ranking:[],
			rankingUsers:[]
		}
	}
	componentWillMount(){
		fetch('https://hidden-peak-45393.herokuapp.com/votes').then(res => res.json())
		.then(res => {
			//console.log(res)
			const result = Object.keys(res.data).map(function(key) {
			  return {name: key, quantity: res.data[key]};
			}).sort((a,b)=>{
				return b.quantity - a.quantity
			});
			this.setState({
				ranking:result
			})
		})
		fetch('https://hidden-peak-45393.herokuapp.com/users').then(res => res.json())
		.then((res =>{
			this.setState({rankingUsers:res.data})
		}))
	}
	render() {
		return (
		<div className="TopVoted-menu">
			<div className="TopVoted">
				<h1>Top Voted Ranking <span role="img">🏆</span></h1>
				{
					this.state.ranking.map((pizza, index)=>{
						return <p className="pizza-ranking">{index+1  + ' - ' + pizza.name.substr(0,1).toUpperCase() + pizza.name.substr(1)} <br /> { 'Votes: ' + pizza.quantity}</p>
					})
				}
			</div>
			<div className="Users">
				<h1>Who voted? <span role="img">👥</span></h1>
				{
					this.state.rankingUsers.map((user)=>{
						console.log(user)
						return user.voted === true ? <p className="user-ranking">{user.realname[0].toUpperCase() +  '' + user.realname.substr(1)}</p> : ''
					})
				}
			</div>
			<Link to='/'>Home</Link>
		</div>
		);
	}
}

export default TopVoted;
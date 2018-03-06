import React, { Component } from 'react';
import c3 from 'c3'
import {Carousel} from 'react-bootstrap'
//import { BrowserRouter, Route, Link } from 'react-router-dom'
import './Statistics.css';

class Statistics extends Component {
	constructor(){
		super()
		this.state ={
			votes:[]
		}
	}
	componentWillMount(){
		fetch('https://hidden-peak-45393.herokuapp.com/votes/old').then((res)=>res.json()).then((data)=>{
			let things = data.data
			
			// Enhanced Object Literals => Object.keys(things).map(function(k) { return {[k]:things[k]} })
			let arrOfThings = Object.keys(things).map(function(k) { return [k,things[k]] })
			//let arrOfThingsAdv = Object.keys(arrOfThings).map(function(k) { return [k,things[k]] })
			for(let i of arrOfThings){
				console.log(i)
				this.setState((prevState)=>{
					votes:prevState.votes.push(Object.keys(i[1]).map(function(k) { return [k,i[1][k]] }))
				})
			}
				
		})
	}
	render(){

		return(
			<div>
				<h1>Historical Statistic</h1>
				{
					this.state.votes.map((res, i)=>{
						return(<div id={"b"+i}></div>)
					})
				}
				{
					this.state.votes.forEach((votes, i)=>{
						console.log(votes)
						console.log(i)
						var chart = c3.generate({
							bindto: `#b${i}`,
							data: {
							  columns: votes,
							  type: 'bar'
							},

						});
					})
				}
				
			</div>)
	}
}

export default Statistics;
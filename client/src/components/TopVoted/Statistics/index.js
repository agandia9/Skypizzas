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
		return fetch('https://hidden-peak-45393.herokuapp.com/votes/old').then((res)=>res.json()).then((data)=>{
			let things = data.data
			let arr = []
			for(let i in things){
				var name = i
				var arr1 = []
				arr1.push(name)
				
				things[i].forEach((vote)=>{
					arr1.push(vote)
				})
				arr.push(arr1)
				
			}
			this.setState({
				votes: arr
			})
			// for (var i = 0; i < Object.keys(things).length; i++) {
			// 	const property = Object.keys(things)[i]
			// 	Object.keys(things[property])
			// }

			
			//console.log(thingsMore)
			// // Enhanced Object Literals => Object.keys(things).map(function(k) { return {[k]:things[k]} })
			// let arrOfThings = Object.keys(things).map(function(k) { return [k,things[k]] })
			// //let arrOfThingsAdv = Object.keys(arrOfThings).map(function(k) { return [k,things[k]] })
			// let arr = []
			// arrOfThings.forEach((days)=>{
			// 	console.log(Object.keys(days[1]).map(function(k) { return [k,days[1][k]] }))
			// })

			// 	this.setState((prevState)=>{
			// 		return {votes:arrOfThings }
			// 	})
				
		})
	}
	render(){
		{
			var chart = c3.generate({
							bindto: `#chart`,
							data: {
							  columns: 
								this.state.votes
								
							}
						});
			var chart = c3.generate({
							bindto: `#chart2`,
							data: {
							  columns: 
								this.state.votes,
								type : 'donut',
								
							}
						});
		}

		return(
			<div className="statistic">
				<h1>Historical Statistic</h1>
				{
					console.log(this.state.votes)
				}
				<div id="chart"></div>
				<div id="chart2"></div>
			
			</div>)
	}
}

export default Statistics;
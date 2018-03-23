import React, { Component } from 'react';
import c3 from 'c3'
import 'c3/c3.css';
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
			// // Enhanced Object Literals => Object.keys(things).map(function(k) { return {[k]:things[k]} })
			// let arrOfThings = Object.keys(things).map(function(k) { return [k,things[k]] })
		})
	}
	render(){
		{
			var chart = c3.generate({
							bindto: `#chart`,
							data: {
							  columns: 
								this.state.votes,
								selection: {
								    grouped: true
								  }
								
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
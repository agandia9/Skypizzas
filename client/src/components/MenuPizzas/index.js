import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert'

import './MenuPizzas.css';

import PizzaCard from '../PizzaCard'

class MenuPizzas extends Component {
	constructor(){
		super()
		this.state = {
			yourSelection:[],
			pizzas: [],
			loading:true,
			name:'',
			filteredName: '',
			thing:0
		}
	}
  
  secretClick = () => {
    this.setState({
      thing: this.state.thing+1
    })

  }


	componentWillMount(){
		fetch('https://hidden-peak-45393.herokuapp.com/pizzas').then(res => res.json())
		.then(res => {
			this.setState({
				pizzas:res.data,
				loading: false
			})
		})
	}

	filteredPizza = (e)=>{ 
		this.setState({ filteredName: e.target.value})
	}

	filterNames = (id) => {
		const { pizzas, filteredName } = this.state
		if (filteredName === '') {
			return true
		} else if (id.name.includes(filteredName)) {
			return true
		} else {
			return false
		}
	}


	vote = (e) =>{
		if(this.state.yourSelection.length > 2){
			return 'u focking idiot.'
		}else{
			let pizzaVoted = e.target.getAttribute('data')
			this.setState({
				yourSelection:this.state.yourSelection.concat(pizzaVoted)
			})
		}
		swal ("Pizza Added!" ,  "" ,  "success" )
	}

	deleteSelection =(e)=>{
				let pizzaToDelete = e.target.getAttribute('data')
				this.setState({
					yourSelection: this.state.yourSelection.filter((name)=>{
						return name !== pizzaToDelete
					})
				})
			
	}

	pushUpvotes = (e) => {
		e.preventDefault()
		if(this.state.yourSelection.length === 0){
			swal ( "Error ocurred in Democracy.exe" ,  "I will apply 155 article to u. 🤬" ,  "error" )
		}
		else{
				swal({
					title:'One step more, ur name?',
						content: {
						element: "input",
						attributes: {
						  placeholder: "Type your Github name ..."
						}
					  },

				}).then((value)=>{
					this.setState({
						name:value
					})
				}).then(()=>{
					var obj = {name: this.state.name, vote1:this.state.yourSelection[0], vote2:this.state.yourSelection[1], vote3:this.state.yourSelection[2]}
					var data = JSON.stringify(obj)
					console.log(data)

					fetch('https://hidden-peak-45393.herokuapp.com/votes',{
						method: "post",
						body: data,
						headers: {
							'content-type': 'application/json'
						}
					}).then((res)=>{
						return res.json()
					}).then((res)=>{
						if(res.status === "KO"){
							swal('Something failed...' ,'', 'error')
						}else{
							swal('U voted correctly 🤩','Wait for PETA time!', 'success')
						}
					}).catch((err)=>{
						swal('Something failed...' ,'', 'error')
					})
					// for get votes!
					// fetch('https://hidden-peak-45393.herokuapp.com/votes',{
					//     method: "GET",
					//     body: obj
					// }).then((res)=>{
					// 	return res.json()
					// }).then((res)=>{
					// 	console.log(res)
					// })
				}).then(()=>{  
						this.setState({
							yourSelection:[]
						})
					})
				
				
			}

	}

  render() {
  	{
  		if(this.state.thing === 5){
  			console.log('????')
  			return(<Redirect push to="admin"></Redirect>)
  		}
  	}
  	const {pizzas, filteredPizza } = this.state
	return (
	<div className="Pizzas-menu">
		<h3>Vote ur pizza :)</h3>
		<h4>Happy friday bro! <span role="img" aria-label="icon" onClick={this.secretClick}>🤘🏼</span></h4>
		<input type="text" placeholder="Filter ur pizza" onChange={this.filteredPizza}/>
		<div className="Select-pizza">
		{
			 this.state.loading ? <h3 className="loading"> Loading...</h3> : 
				pizzas.filter(this.filterNames).map((pizza, index)=>{
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
	{/*separate in component...*/}
		<form>
			<h1>Your selection</h1>
			<ul>
				{
					this.state.yourSelection.map((pizza, index)=>{
						return(
						<li key={index}> {pizza}<span role="img"  data={pizza} onClick={this.deleteSelection}>❌</span></li>
						)
					})
				}
			</ul>
			<button onClick={this.pushUpvotes} className="Submit-votes">Submit your votes!</button>
		</form>
		<Link to='/topvoted'>Top Voted</Link>
	</div>
	);
  }
}

export default MenuPizzas;

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import PinPanel from './PinPanel'

class AdminPlace extends Component{
	constructor(){
		super()

		this.state={
			pin: '',
			showPanel: false
		}
	}
	changePin = (e) =>{
		const pin = e.target.value
		this.setState({pin})
	}
	checkPin = (pin) =>{
		var obj = {pin}
		var data = JSON.stringify(obj)
		fetch('https://hidden-peak-45393.herokuapp.com/admin/pin',{
						method: "post",
						body: data,
						headers: {
							'content-type': 'application/json'
						}
					})
				.then(res=>{
					return res.json()
				}).then(res=>{
					console.log(res)
					if(res.status ==='OK'){
						this.setState({showPanel: true})
					}
				})
	}
	resetVotes(e){
		e.preventDefault()
		fetch('https://hidden-peak-45393.herokuapp.com/votes/reset').then(res => res.json())
		.then(res => {
			if(res.status==='OK'){
				swal ("Votes deleted!" ,  "" ,  "success")
			}
		})
	}
	render(){
		return(
			<div className="Pizzas-menu">
				<h1>Admin Area</h1>
				<PinPanel checkPin={this.checkPin}/>
				{(this.state.showPanel) ? 
				<div>
					<div>
						<button className="button-admin" onClick={this.resetVotes}>Reset Votes</button>
					</div>
					<div>
						<h2>Add Users</h2>
						<textarea name="" id="" cols="30" rows="10" placeholder="Users here"></textarea>
					</div>
					<div>
						<h2>Delete Users</h2>
						<button>Delete users</button>
					</div>
				</div>
				:
				undefined
				}
				<Link to="/">Go to home</Link>
			</div>
		)
	}
}
export default AdminPlace
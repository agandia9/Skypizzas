import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import PinPanel from './PinPanel'

class AdminPlace extends Component{
	constructor(){
		super()
		this.state={
			correctPin: '',
			showPanel: false,
			addingUsers:''
		}
	}
	componentWillMount(){
		window.scrollTo(0, 0)
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
						this.setState({showPanel: true, correctPin: pin })

					}
				})
	}
	resetVotes = (e) => {
		e.preventDefault()
		var pin = this.state.correctPin
		var obj = {pin}
		var data = JSON.stringify(obj)
		fetch('https://hidden-peak-45393.herokuapp.com/votes/reset',{
			body: data,
			method: 'post',
			headers: {
				'content-type': 'application/json'
			}
		}).then(res => res.json())
		.then(res => {
			if(res.status==='OK'){
				swal ("Votes deleted!" ,  "" ,  "success")
			}
		})
	}
	changingUsers=(e)=>{
		this.setState({addingUsers:e.target.value})
	}
	addUsers=()=>{
		let users = this.state.addingUsers.split('\n').map((user)=>{
			var singleUser = user.split(':')
			return {name:singleUser[0], realname:singleUser[1]}
		})

		var obj = {pin:this.state.correctPin,users:users}
		var data = JSON.stringify(obj)

		fetch('https://hidden-peak-45393.herokuapp.com/users',{
			method:'post',
			body: data,
			headers: {
				'content-type': 'application/json'
			}
		}).then((res)=>{
			res.json()
			swal('Users added properly','','success')
		}).catch((res)=>{
			swal('Something failed','','error')
		})
	}
	deleteUsers=()=>{
		var pin = this.state.correctPin
		var obj = {pin}
		var data = JSON.stringify(obj)
		console.log(data)
		fetch('https://hidden-peak-45393.herokuapp.com/users',{
						method: "delete",
						body: data,
						headers: {
							'content-type': 'application/json'
						}
					})
				.then(res=>{
					swal('Users deleted properly','','success')
				}).catch(()=>{
					swal('Something failed','','error')
				})
	}
	render(){
		return(
			<div className="Pizzas-menu">
				<h1>Admin Area</h1>
				<PinPanel checkPin={this.checkPin}/>
				{(this.state.showPanel) ? 
				<div className="admin-options">
					<div>
						<h2>Reset Votes</h2>
						<button className="button-admin" onClick={this.resetVotes}>Reset Votes</button>
					</div>
					<div>
						<h2>Add Users</h2>
							<textarea  name="" id="" cols="30" rows="10" placeholder="USER_GITHUB:REALNAME" onChange={this.changingUsers}></textarea>
							<button className="button-admin" onClick={this.addUsers}>Add :)</button>
					</div>
					<div>
						<h2>Delete Users</h2>
						<button className="button-admin" onClick={this.deleteUsers}>Delete users</button>
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
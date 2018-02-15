import React, { Component } from 'react';
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
    checkPin = (e) =>{
        e.preventDefault()
        var obj = {pin: this.state.pin}
        var data = JSON.stringify(obj)
        fetch('http://192.168.0.11:8080/admin/pin',{
						method: "post",
						body: data,
						headers: {
							'content-type': 'application/json'
						}
                    })
                .then(res=>{
                    return res.json()
                }).then(res=>{
                    if(res.status ==='OK'){
                        this.setState({showPanel: true})
                    }
                })
    }
    resetVotes(e){
        e.preventDefault()
        fetch('http://192.168.0.11:8080/votes/reset').then(res => res.json())
		.then(res => {
            if(res.status==='OK'){
                swal ("Votes deleted!" ,  "" ,  "success" )
            }
		})
    }
    render(){
        return(
            <div className="Pizzas-menu">
                <h1>Admin Area</h1>
                <PinPanel />
                <input type="password" placeholder="Enter pin" onChange={this.changePin}/>
                <button onClick={this.checkPin}>Check</button>
                {(this.state.showPanel) ? 
                <button onClick={this.resetVotes}>Reset Votes</button>
                :
                undefined
                }
            </div>
        )
    }
}
export default AdminPlace
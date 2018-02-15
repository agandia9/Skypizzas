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
    checkPin = (pin) =>{
        var obj = {pin}
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
                    console.log(res)
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
                <h1 onClick={this.countUp}>Admin Area</h1>
                <PinPanel checkPin={this.checkPin}/>
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
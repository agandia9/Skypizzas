import React, {Component} from 'react'
import './PinPanel.css'

class PinPanel extends Component{
	constructor(){
		super()
		this.state={
			pin: ''
		}
	}
	addNumber=(e)=>{
		e.preventDefault()
		const pin = this.state.pin + e.target.value
		this.setState({pin})
	}
	clearPin=(e)=>{
		e.preventDefault()
		this.setState({pin:''})
	}
	checkPin =(e)=>{
		e.preventDefault()
		this.props.checkPin(this.state.pin)
	}
	render(){
		return(
			<div className="container-pin-panel"> 
				<button value="1" className="round-button" onClick={this.addNumber}>1</button>
				<button value="2" className="round-button" onClick={this.addNumber}>2</button>
				<button value="3" className="round-button" onClick={this.addNumber}>3</button>
				<button value="4" className="round-button" onClick={this.addNumber}>4</button>
				<button value="5" className="round-button" onClick={this.addNumber}>5</button>
				<button value="6" className="round-button" onClick={this.addNumber}>6</button>
				<button value="7" className="round-button" onClick={this.addNumber}>7</button>
				<button value="8" className="round-button" onClick={this.addNumber}>8</button>
				<button value="9" className="round-button" onClick={this.addNumber}>9</button>
				<button className="round-button" onClick={this.clearPin}>x</button>
				<button value="0" className="round-button" onClick={this.addNumber}>0</button>
				<button className="round-button" onClick={this.checkPin}>✓</button>
			</div>
		)
	}
}

export default PinPanel
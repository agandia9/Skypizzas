import React, { Component } from 'react';
import './TopVoted.css';

class TopVoted extends Component {
	componentWillMount(){
		console.log('hi from top voted!')
	}
  render() {
	return (
	<div class="TopVoted-menu">
		<h2>Top Voted :)</h2>
	</div>
	);
  }
}

export default TopVoted;
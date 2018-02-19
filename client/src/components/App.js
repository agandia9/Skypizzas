import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import './App.css';

import MenuPizzas from './MenuPizzas'
import TopVoted from './TopVoted'
import AdminPlace from './AdminPlace'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="Main">
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">SkyPizzas <span role="img" aria-label="icon" onClick={this.secretClick}>🍕</span></h1>
              <p className="App-intro">Deadline for voting is set at 12:00 AM of every friday <span role="img" aria-label="icon">🕛</span></p>
              <p className="App-intro">You MUST vote 3 pizzas and you can distribute the votes as you want</p>
            </header>
            <Route exact path='/' component={MenuPizzas} />
            <Route path='/topvoted' component={TopVoted} />
            <Route path='/admin' component={AdminPlace} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

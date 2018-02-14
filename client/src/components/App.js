import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css';

import MenuPizzas from './MenuPizzas'
import TopVoted from './TopVoted'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="Main">
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">SkyPizzas <span role="img" aria-label="icon">🍕</span></h1>
              <p className="App-intro">Deadline for voting is set at 11:00 AM of every friday<span role="img" aria-label="icon">🕚</span>You can vote max. 3 pizzas</p>
            </header>
            <Route exact path='/' component={MenuPizzas} />
            <Route path='/topvoted' component={TopVoted} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

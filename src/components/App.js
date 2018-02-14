import React, { Component } from 'react';

import './App.css';

import MenuPizzas from './MenuPizzas'

class App extends Component {
  render() {
    return (
      <div className="Main">
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">SkyPizzas <span role="img" aria-label="icon">🍕</span></h1>
            <p className="App-intro">Deadline for voting is set at 11:00 AM of every friday<span role="img" aria-label="icon">🕚</span>You can vote max. 3 pizzas</p>
          </header>
          <MenuPizzas />
        </div>
      </div>
    );
  }
}

export default App;

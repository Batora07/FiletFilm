import React, {Component} from 'react';
import './App.css';
import {Home} from './routes';
import { Header } from './components';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Header badge={15} />
        <Home />
      </div>
    );
  }
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MemoryRouter as Router, Route, Link } from 'react-router-dom';
import Documentation from './Documentation';
import EvaluateGS from './EvaluateGS';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          Realizacja zadania nr 2 w ramach laboratorium TCh <br />
          Eliza Kozioł
          <Link to="/evaluategs">Kalkulator ciągu geometrycznego GS Cal</Link>
          <Link to="/docs">Documentation</Link>
        </header>
        <div>
          <Route path="/evaluategs" component={EvaluateGS} />
          <Route path="/docs" component={Documentation} />
        </div>
      </div>
    </Router>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import home from'./pages/home';





<Route exact path="/" component={home} />

function App() {
  return (

    <div className="wrapper">
      <Router>
      <Switch>
      <Route exact path="/" component={home} />
      </Switch>
      </Router>
      </div>

  );
}

export default App;

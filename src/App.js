import './App.css';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import LeaderBoard from './components/LeaderBoard.js';

function App() {

	return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/leaderboard">LeaderBoard</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/leaderboard">
            <LeaderBoard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

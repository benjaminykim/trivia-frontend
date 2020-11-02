import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import LeaderBoard from './components/LeaderBoard';

/*
*	Handles application routing for Home and LeaderBoard
*/
export default function App() {
	return (
		<Router>
      <div className="scaffold">
        <Navbar expand="lg" bg="dark" variant="dark" className="navbar" style={{zIndex:5}} sticky="top">
          <Navbar.Brand href="/">Tandem Trivia</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/leaderboard">LeaderBoard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

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
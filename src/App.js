import './App.css';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Trivia from './components/Trivia';

function App() {
	const [session, setSession] = useState(false);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {

	});

	async function startTrivia() {
		console.log("Start Trivia Fetch");
		await axios.get("https://dev.briefs.link/trivia")
				.then(response => {
					console.log(response);
					setQuestions(response.data);
					setSession(true);
		});
	}

  return (
		<Container className="main">
			<div className="main-header">Tandem Trivia!</div>
			{(session)
			? <Trivia questions={questions}></Trivia>
			: <Button
					variant="outline-primary"
					onClick={startTrivia}
				>
					Start Trivia!
				</Button>
			}
		</Container>
  );
}

export default App;

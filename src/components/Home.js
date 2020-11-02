import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Trivia from './Trivia';

/*
*	Fetches trivia questions from backend, presents them in Trivia
*/
function Home() {
	const [questions, setQuestions] = useState([]);

	async function startTrivia() {
		await axios.get("https://dev.briefs.link/trivia")
				.then(response => {
					setQuestions(response.data);
		});
	}

  return (
		<Container className="main">
			<div className="main-header">Tandem Trivia!</div>
			{(questions.length !== 0)
				? <Trivia questions={questions}></Trivia>
				: <Button onClick={startTrivia}>Start Trivia!</Button>}
		</Container>
  );
}

export default Home;

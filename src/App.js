import './App.css';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [session, setSession] = useState(false);

	useEffect(() => {

	});

	async function startTrivia(event) {
		await axios.get("http://localhost:8080/trivia")
				.then(response => {
					setSession(true);
					console.log(response);
		});
	}

  return (
		<Container className="main">
				<Button
					variant="outline-primary"
					onClick={startTrivia}
				>
					Start Trivia!
				</Button>
		</Container>
  );
}

export default App;

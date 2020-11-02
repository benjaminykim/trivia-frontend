import '../App.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React} from 'react';
import axios from 'axios';

function LeaderBoard() {
	async function startTrivia() {
		console.log("Start Trivia Fetch");
		await axios.get("https://dev.briefs.link/trivia")
				.then(response => {
					console.log(response);
		});
	}

  return (
		<Container className="main">
			<div className="main-header">Tandem Trivia!</div>
		</Container>
  );
}

export default LeaderBoard;

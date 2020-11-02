import '../App.css';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useState, useEffect } from 'react';
import axios from 'axios';

function LeaderBoard() {
	const [scores, setScores] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const result = await axios('https://dev.briefs.link/score');
			setScores(result.data);
			console.log(result);
			console.log(scores);
		}
		fetchData();
	});

	const tIndex = {
    fontSize: '2rem',
    color: 'white',
  };

	const tEntry = {
    fontSize: '1.2rem',
    color: 'white',
  };

  return (
		<Container className="main">
			<div className="main-header">LeaderBoard</div>
			<div className="score-table">
				<Table responsive bordered hover variant="dark">
					<thead>
						<tr>
							<td style={tIndex}>Username</td>
							<td style={tIndex}>Score</td>
						</tr>
					</thead>
					<tbody>
						{scores.map((record) => {
							return (
								<tr>
									<td style={tEntry}>{record.user}</td>
									<td style={tEntry}>{record.score}</td>
								</tr>
							);
						}
						)}
					</tbody>
				</Table>
			</div>
		</Container>
  );
}

export default LeaderBoard;

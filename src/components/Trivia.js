import '../App.css';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { shuffle, getRandomInt, insert } from '../Helper';
import axios from 'axios';

function Trivia(props) {
	const [qIndex, setQIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [finish, setFinish] = useState(false);
	const [scoreSubmitted, setScoreSubmitted] = useState(false);
	const [name, setName] = useState('');

	const [text, setText] = useState('');
	const [correctIndex, setIndex] = useState(-1);
	const [answers, setAnswers] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(-1);

	useEffect(() => {
		let question = props.questions[qIndex];
		setText(question.question);

		let correctIndex = getRandomInt(question.incorrect.length + 1);
		setIndex(correctIndex);

		let answer = question.incorrect;
		shuffle(answer);
		insert(answer, correctIndex, question.correct);
		setAnswers(answer);
	}, [qIndex, props.questions, finish]);

	function onClick(index) {
		setSelectedIndex(index);
	}

	function onSubmit() {
		setSelectedIndex(-1);
		var qScore = (selectedIndex === correctIndex) ? 1 : 0;
		setScore(score + qScore);
		if (qIndex === 9) {
			setFinish(true);
		} else {
			setQIndex(qIndex + 1);
		}
	}

	function handleChange(event) {
		setName(event.target.value);
	}

	function handleKeyPress(event) {
		if (event.charCode===13) {
			submitScore();
		}
	}

	async function submitScore() {
		console.log("Start Trivia Fetch");
		const payload = {'user': name, 'score': score};
		console.log(payload);
		await axios.post("https://dev.briefs.link/score", payload)
			.then(response => {
				setScoreSubmitted(true);
				console.log(response);
				console.log("successful score post");
		});
	}

	if (finish) {
		return (
			<Container className="question">
				<div className="result">Your score is {score}/10!</div>
				{
					(scoreSubmitted)
						? <div className="result">Thanks for submitting your score, {name}</div>
						:	<div className="input">
								<InputGroup>
									<InputGroup.Prepend>
											<InputGroup.Text id="basic-addon3">
												your name:
											</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
											aria-label="url"
											aria-describedby="basic-addon2"
											onChange={handleChange}
											onKeyPress={handleKeyPress}
									/>
									<InputGroup.Append>
											<Button
										variant="outline-secondary"
										onClick={submitScore}
											>
												Submit
											</Button>
									</InputGroup.Append>
								</InputGroup>
							</div>
				}
			</Container>
		);
	} else {
	return (
		<Container className="question">
			<div className="question-header">{text}</div>
			{
				answers.map(function(record, index) {
					if (selectedIndex === index) {
						return (<div className="question-answer selected" onClick={() => onClick(index)}>{record}</div>);
					}
					return (<div className="question-answer" onClick={() => onClick(index)}>{record}</div>);
				})
			}
			{(selectedIndex === -1) ? <Button className="button-submit" disabled={true}>Submit</Button> : <Button className="button-submit" onClick={onSubmit}>Submit</Button>}
		</Container>
	);
	}
}


export default Trivia;

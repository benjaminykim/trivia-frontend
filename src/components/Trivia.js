import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import { shuffle, getRandomInt, insert } from '../Helper';
import axios from 'axios';

function Trivia(props) {
	/* tracks how many questions completed and user score */
	const [qIndex, setQIndex] = useState(0);
	const [score, setScore] = useState(0);

	/* tracks question data */
	const [text, setText] = useState('');
	const [answers, setAnswers] = useState([]);
	const [correctIndex, setIndex] = useState(-1);
	const [selectedIndex, setSelectedIndex] = useState(-1);

	/* tracks user meta data and score submission */
	const [scoreSubmitted, setScoreSubmitted] = useState(false);
	const [name, setName] = useState('');

	/*
	* if the quiz is not finished
	*		get next question
	*		determine correct index, shuffle incorrect answers, and insert correct answer
	*/
	useEffect(() => {
		if (qIndex < 10) {
			let question = props.questions[qIndex];
			setText(question.question);

			let correctIndex = getRandomInt(question.incorrect.length + 1);
			setIndex(correctIndex);

			let answer = question.incorrect;
			shuffle(answer);
			insert(answer, correctIndex, question.correct);
			setAnswers(answer);
		}
	}, [qIndex, props.questions]);

	/*
	*	Updates score, and question index
	*/
	function onSubmit() {
		var qScore = (selectedIndex === correctIndex) ? 1 : 0;
		setScore(score + qScore);
		setQIndex(qIndex + 1);
		setSelectedIndex(-1);
	}

	function handleKeyPress(event) {
		if (event.charCode===13) {
			submitScore();
		}
	}

	async function submitScore() {
		const payload = {'user': name, 'score': score};
		await axios.post("https://dev.briefs.link/score", payload)
			.then(() => {
				setScoreSubmitted(true);
		});
	}

	if (qIndex === 10) {
		// presents the user the submission or trivia results
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
											onChange={(event) => setName(event.target.value)}
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
	// presents the user a question
	return (
		<Container className="question">
			<div className="question-header">{text}</div>
			{
				answers.map(function(record, index) {
					if (selectedIndex === index) {
						return (<div className="question-answer selected" onClick={() => setSelectedIndex(index)}>{record}</div>);
					}
					return (<div className="question-answer" onClick={() => setSelectedIndex(index)}>{record}</div>);
				})
			}
			{(selectedIndex === -1)
				? <Button className="button-submit" disabled={true}>Submit</Button>
				: <Button className="button-submit" onClick={onSubmit}>Submit</Button>
			}
		</Container>
	);
	}
}


export default Trivia;

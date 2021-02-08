import React from "react";
import {
  Button,
  LinearProgress,
  Container,
  Checkbox
} from "@material-ui/core";
import P1 from "../../../assets/fonts/p1";
import P2 from "../../../assets/fonts/p2";
import P3 from "../../../assets/fonts/p3";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.rows,
      index: this.props.index ?? 0,
      curr_answer: {},
      assign: this.props.assignment ?? [],
      score: this.props.score ?? 0,
      times: {}
    };
  }

  handleChange = (value, num) => {
    this.setState((state) => {
      const curr_answer = state.curr_answer;
      curr_answer[num] = value;
      return { ...state, curr_answer };
    });
  };

  handleNext = () => {
    const { curr_answer, index, questions, assign, score, times } = this.state;
    let addScore = 0;
    // extract user's answer from curr_answer object
    const studentAnswer = [];
    for (let an in curr_answer) {
      if (curr_answer[an]) {
        studentAnswer.push(an);
      }
    }
    if (JSON.stringify(studentAnswer.sort()) === JSON.stringify(questions[index].answers.sort())) {
      console.log("Answer is CORRECT");
      addScore = 1;
    } else {
      console.log("Answer is WRONG");
      questions.push(questions[index]);
      if (times[JSON.stringify(questions[index])]) {
        times[JSON.stringify(questions[index])] = times[JSON.stringify(questions[index])]+1;
      } else {
        times[JSON.stringify(questions[index])] = 1;
      }
      this.setState({ questions, times });
    }
    assign.push({
      question: questions[index].question,
      choices: questions[index].choices,
      answers: questions[index].answers,
      studentAnswer,
    });
    this.setState({
      score: score + addScore,
      index: index + 1,
      assign,
      curr_answer: {},
    });
  };

  render() {
    const { questions, index, assign, score, curr_answer, times } = this.state;
    const progress = Math.floor((index / questions.length) * 100);
    return (
      <div>
        <Container style={{ marginTop: "5%" }}>
          {
            this.props.mode !== "test" && 
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: 20 }}
              onClick={() => {
                this.props.handleSaveAssignment(index, questions, assign, score);
              }}
            >
              Save
            </Button>
          }
          
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => (window.location = "/")}
          >
            Quit
          </Button>
        </Container>
        <Container style={{ marginTop: "10%" }}>
          {index !== questions.length ? (
            <div>
              <P1 className="font-weight-light">{questions[index].question}</P1>
              {questions[index].choices.map((choice) => (
                <div className="row">
                <Checkbox 
                  checked={curr_answer[choice] ?? false}
                  color="primary"
                  onChange={(e) => this.handleChange(e.target.checked, choice)}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <P2>{choice}</P2>
                </div>
              ))}
              {
                times[JSON.stringify(questions[index])] >= 3 && 
                <P3>You have answered this question for 3 times, here is the answer: {JSON.stringify(questions[index].answers)}</P3>
              }
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
              >
                Next
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.props.handleNext(score, assign)}
              >
                Go "Fill in Blank" section
              </Button>
              <br />
            </div>
          )}
          <br />
          <LinearProgress variant="determinate" value={progress} />
        </Container>
      </div>
    );
  }
}

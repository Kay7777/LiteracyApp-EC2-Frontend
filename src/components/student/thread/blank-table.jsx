import React from "react";
import {
  Button,
  LinearProgress,
  Container,
  TextField,
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
      studentAnswer: "",
      assign: this.props.assignment ?? [],
      score: this.props.score ?? 0,
      times: {}
    };
  }

  handleNext = () => {
    const { studentAnswer, index, questions, assign, score, times } = this.state;
    let addScore = 0;
    if (questions[index].answer === studentAnswer) {
      console.log("Answer is CORRECT");
      addScore += 1;
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
      realAnswer: questions[index].answer,
      studentAnswer,
    });
    this.setState({
      score: score + addScore,
      index: index + 1,
      assign,
      studentAnswer: "",
    });
  };

  render() {
    const { questions, index, assign, score, times, studentAnswer } = this.state;
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
              onClick={() =>
                this.props.handleSaveAssignment(index, questions, assign, score)
              }
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
              <br />
              <TextField value={studentAnswer} label="Answer" style={{width: 200}} onChange={(e) => this.setState({studentAnswer: e.target.value})}/>
              {
                times[JSON.stringify(questions[index])] >= 3 && 
                <P3>You have answered this question for 3 times, here is the answer: {questions[index].answer}</P3>
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
                Go "Short Answer" Section
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

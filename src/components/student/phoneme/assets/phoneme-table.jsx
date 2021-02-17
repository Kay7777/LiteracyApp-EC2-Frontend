import React from "react";
import WordCard from "./wordcard";
import {
  Button,
  LinearProgress,
  Container,
} from "@material-ui/core";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

class PhonemeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: false,
      answer: false,
      input: "",
      questions: this.props.rows,
      index: this.props.index ?? 0,
      assign: this.props.assignment ?? [],
      score: this.props.score ?? 0,
      times: {}
    };
  }

  handleFlip = async () => {
    const { questions, input, assign, index, score, times } = this.state;
    if (questions[index].phoneme === input) {
      this.setState({
        correct: true,
        answer: true,
        score: score + 1
      });
    } else {
      if (times[JSON.stringify(questions[index])]) {
        times[JSON.stringify(questions[index])] = times[JSON.stringify(questions[index])]+1;
      } else {
        times[JSON.stringify(questions[index])] = 1;
      }
      questions.push({
        phoneme: questions[index].phoneme,
        word: questions[index].word
      });
      this.setState({
        correct: false,
        answer: true,
        questions,
        times
      });
    }
    assign.push({
      word: questions[index].word,
      phoneme: questions[index].phoneme,
      answer: input,
    });
    this.setState({ assign });
  };

  changeQuestion = async () => {
    await this.setState({
      index: this.state.index + 1,
      answer: false,
      input: "",
    });
  };

  render() {
    const { index, questions, assign, score,answer,correct, input, times} = this.state;
    const progress = ((index + 1) / questions.length) * 100;
    return (
      <div>
        <Container style={{ marginTop: "5%" }}>
          {
            this.props.mode !== "test" && 
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: 20 }}
              onClick={() => this.props.handleSaveAssignment(index, questions, assign, score)}
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
            <div style={{ margin: "30px 25%" }}>
              <WordCard
                word={questions[index].word}
                phoneme={questions[index].phoneme}
                input={input}
                answered={answer}
                correct={correct}
                handleClick={() => this.handleFlip(index)}
                handleInput={(input) => this.setState({ input })}
                next={this.changeQuestion}
                last={index + 1 === questions.length}
                update={() => this.props.handleNext(score, assign)}
              />
              <LinearProgress variant="determinate" value={progress} />
            </div>
            {
                times[JSON.stringify(questions[index])] >= 3 && 
                <P3>You have answered this question for 3 times, here is the answer: {questions[index].phoneme}</P3>
              }
        </Container>
      </div>
    );
  }
}

export default PhonemeTable;

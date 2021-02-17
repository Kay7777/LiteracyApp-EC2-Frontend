import React from "react";
import axios from "axios";
import {
  Button,
  Container,
  Paper,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import AudioRecord from "./audiorecord";
import keys from "../../../../assets/keys";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PhonemeAudioTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerAudio: null,
      alert: false,
      questions: this.props.rows,
      index: this.props.index ?? 0,
      assign: this.props.assignment ?? [],
      score: this.props.score ?? 0
    };
  }

  handleUpload = async (file) => {
    const uploadConfig = await axios.get("/api/phoneme/audio");
    await axios
      .put(uploadConfig.data.url, file, {
        headers: {
          "Content-type": file.type,
        },
      })
      .catch((err) => console.log(err));
    await this.setState({answerAudio: uploadConfig.data.key, alert: true});
  };

  handleChangeQuestion = () => {
    const { index, answerAudio, questions, assign } = this.state;
    assign.push({
      audios: questions[index].audios,
      question: questions[index].question,
      answer: answerAudio
    });
    if (index+1 === questions.length ) {
      this.props.handleNext(assign);
    } else {
      this.setState({ index: index + 1, assign,  answerAudio: null});
    }
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  render() {
    const { index, questions, assign } = this.state;
    const progress = Math.floor(((index + 1) / questions.length) * 100);
    return (
      <div>
        <Container style={{ marginTop: "5%" }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: 20 }}
            onClick={() => this.props.handleSaveAssignment(index, questions, assign)}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => (window.location = "/")}
          >
            Quit
          </Button>
        </Container>
        <Container style={{ marginTop: "10%" }}>
          <Paper>
              <div>
                <Container>
                  <P2>{questions[index].question}</P2>
                  <br />
                  {questions[index].audios.map((audio) => {
                    return <audio src={keys.AWS + audio} controls="controls" />;
                  })}
                  <hr />
                  <AudioRecord
                    handleUpload={(file) => this.handleUpload(file)}
                  />
                  <br />
                  <LinearProgress variant="determinate" value={progress} />
                </Container>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{marginLeft: 10, marginTop: 15}}
                  onClick={this.handleChangeQuestion}
                >
                  Next Question
                </Button>
              </div>
          </Paper>
        </Container>
        <Snackbar
          open={this.state.alert}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
        >
          <Alert onClose={this.handleClose} severity="success">
            Saved Successfully!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default PhonemeAudioTable;

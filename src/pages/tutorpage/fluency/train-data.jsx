import React from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container, Snackbar, InputLabel, Select, MenuItem } from "@material-ui/core";
import Table from "../../../assets/table/fluencytable";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class FluencyTutorTrainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainDataW1: [],
      trainDataW2: [],
      alert: false,
      trainAddParagraph: "",
      trainAddQuestion: "",
      trainAddChoice1: "",
      trainAddChoice2: "",
      trainAddChoice3: "",
      trainAddChoice4: "",
      trainAddAnswer: "",
      section: "w1"
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/fluency/traindata/w1/table");
    const doc2 = await axios.get("/api/fluency/traindata/w2/table");
    if (doc1) {
      this.setState({ trainDataW1: doc1.data });
    }
    if (doc2) {
      this.setState({ trainDataW2: doc2.data });
    }

  };

  addNewTrain = async () => {
    const {
      trainAddParagraph,
      trainAddQuestion,
      trainAddChoice1,
      trainAddChoice2,
      trainAddChoice3,
      trainAddChoice4,
      trainAddAnswer,
      section
    } = this.state;
    const data = {
      paragraph: trainAddParagraph,
      question: trainAddQuestion,
      choices: [
        trainAddChoice1,
        trainAddChoice2,
        trainAddChoice3,
        trainAddChoice4,
      ],
      answer: trainAddAnswer,
    };
    if (section === "w1") {
      await axios.post("/api/fluency/assign/w1", { data });
    } else {
      await axios.post("/api/fluency/assign/w2", { data });
    }

    await this.setState({
      alert: true,
      trainAddParagraph: "",
      trainAddQuestion: "",
      trainAddChoice1: "",
      trainAddChoice2: "",
      trainAddChoice3: "",
      trainAddChoice4: "",
      trainAddAnswer: "",
    });
    this.componentDidMount();
  };

  deleteTrainData = async (id) => {
    await axios.delete("/api/fluency/assign/" + id);
    this.componentDidMount();
    this.setState({ alert: true });
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  }

  render() {
    const {
      trainDataW1,
      trainDataW2,
      alert,
      trainAddParagraph,
      trainAddQuestion,
      trainAddChoice1,
      trainAddChoice2,
      trainAddChoice3,
      trainAddChoice4,
      trainAddAnswer,
      section
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Fluency Session Data</h2>
          <Button variant="contained" color="default" href="/tutor/fluency">
            Go Back
          </Button>
        </div>
        <Container>
          <InputLabel id="label">Assignment Section</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={section}
            onChange={this.handleSectionChange}
          >
            <MenuItem value="w1">Week 1</MenuItem>
            <MenuItem value="w2">Week 2</MenuItem>
          </Select>
        </Container>
        <br />
        {
          section === "w1" ?
            <Container>
              <TextField
                id="standard-multiline-flexible"
                label="Paragraphy"
                multiline
                style={{ width: 600 }}
                rowsMax={20}
                value={trainAddParagraph}
                autoComplete="off"
                onChange={(e) =>
                  this.setState({ trainAddParagraph: e.target.value })
                }
              />
              <br />
              <TextField
                id="standard-multiline-flexible"
                label="Question"
                multiline
                style={{ width: 600 }}
                rowsMax={20}
                value={trainAddQuestion}
                autoComplete="off"
                onChange={(e) =>
                  this.setState({ trainAddQuestion: e.target.value })
                }
              />
              <br />
              <TextField
                id="standard-basic"
                label="Choice1"
                value={trainAddChoice1}
                autoComplete="off"
                style={{ width: 300, marginRight: 10 }}
                onChange={(e) => this.setState({ trainAddChoice1: e.target.value })}
              />
              <TextField
                id="standard-basic"
                label="Choice2"
                autoComplete="off"
                value={trainAddChoice2}
                style={{ width: 300 }}
                onChange={(e) => this.setState({ trainAddChoice2: e.target.value })}
              />
              <br />
              <TextField
                id="standard-basic"
                label="Choice3"
                autoComplete="off"
                value={trainAddChoice3}
                style={{ width: 300, marginRight: 10 }}
                onChange={(e) => this.setState({ trainAddChoice3: e.target.value })}
              />
              <TextField
                id="standard-basic"
                label="Choice4"
                autoComplete="off"
                value={trainAddChoice4}
                style={{ width: 300 }}
                onChange={(e) => this.setState({ trainAddChoice4: e.target.value })}
              />
              <br />
              <TextField
                id="standard-basic"
                label="Answer"
                autoComplete="off"
                value={trainAddAnswer}
                style={{ width: 300 }}
                onChange={(e) => this.setState({ trainAddAnswer: e.target.value })}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 10, marginLeft: 10 }}
                onClick={this.addNewTrain}
              >
                Add
              </Button>
              <br />
              <br />
              <h4>Total questions: {trainDataW1.length}</h4>
              <Table
                rows={trainDataW1}
                handleDelete={(id) => this.deleteTrainData(id)}
                name="TrainData"
              />
            </Container>
            :
            <Container>
              <TextField
                id="standard-multiline-flexible"
                label="Paragraphy"
                multiline
                style={{ width: 600 }}
                rowsMax={20}
                value={trainAddParagraph}
                autoComplete="off"
                onChange={(e) =>
                  this.setState({ trainAddParagraph: e.target.value })
                }
              />
              <br />
              <TextField
                id="standard-multiline-flexible"
                label="Question"
                multiline
                style={{ width: 600 }}
                rowsMax={20}
                value={trainAddQuestion}
                autoComplete="off"
                onChange={(e) =>
                  this.setState({ trainAddQuestion: e.target.value })
                }
              />
              <br />
              <TextField
                id="standard-basic"
                label="Choice1"
                value={trainAddChoice1}
                autoComplete="off"
                style={{ width: 300, marginRight: 10 }}
                onChange={(e) => this.setState({ trainAddChoice1: e.target.value })}
              />
              <TextField
                id="standard-basic"
                label="Choice2"
                autoComplete="off"
                value={trainAddChoice2}
                style={{ width: 300 }}
                onChange={(e) => this.setState({ trainAddChoice2: e.target.value })}
              />
              <br />
              <TextField
                id="standard-basic"
                label="Choice3"
                autoComplete="off"
                value={trainAddChoice3}
                style={{ width: 300, marginRight: 10 }}
                onChange={(e) => this.setState({ trainAddChoice3: e.target.value })}
              />
              <TextField
                id="standard-basic"
                label="Choice4"
                autoComplete="off"
                value={trainAddChoice4}
                style={{ width: 300 }}
                onChange={(e) => this.setState({ trainAddChoice4: e.target.value })}
              />
              <br />
              <TextField
                id="standard-basic"
                label="Answer"
                autoComplete="off"
                value={trainAddAnswer}
                style={{ width: 300 }}
                onChange={(e) => this.setState({ trainAddAnswer: e.target.value })}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 10, marginLeft: 10 }}
                onClick={this.addNewTrain}
              >
                Add
          </Button>
              <br />
              <br />
              <h4>Total questions: {trainDataW2.length}</h4>
              <Table
                rows={trainDataW2}
                handleDelete={(id) => this.deleteTrainData(id)}
                name="TrainData"
              />
            </Container>
        }
        <br />
        <br />
        <Snackbar
          open={alert}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
        >
          <Alert onClose={this.handleClose} severity="success">
            Operation Successfully!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default FluencyTutorTrainPage;

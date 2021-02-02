import React from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container, InputLabel, Select, MenuItem } from "@material-ui/core";
import Table from "../../../components/tutor/print/data-table/multiple-choice-table";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PrintData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qW1: [],
      qW2: [],
      qAccess: [],
      question: "",
      choice1: "",
      choice2: "",
      answer: "",
      choices: [],
      alert: false, section: "w1"
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/print/multiple/w1");
    const doc2 = await axios.get("/api/print/multiple/w2");
    const doc3 = await axios.get("/api/print/multiple/access");
    if (doc1) {
      this.setState({ qW1: doc1.data });
    }
    if (doc2) {
      this.setState({ qW2: doc2.data });
    }
    if (doc3) {
      this.setState({ qAccess: doc3.data });
    }
  };

  addData = async () => {
    const { question, choices, section } = this.state;
    await axios.post("/api/print/multiple", {
      question: question,
      choices: choices,
      version: section
    });
    await this.setState({
      question: "",
      choice1: "",
      choice2: "",
      answer: "",
      choices: [],
    });
    this.componentDidMount();
  };

  deleteData = async (row) => {
    await axios.delete("/api/print/multiple/" + row._id);
    this.componentDidMount();
  };

  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  }

  renderTable = () => {
    const { section, qW1, qW2, qAccess } = this.state;
    switch (section) {
      case "w1":
        return <Container>
          <Table data={qW1} handleDelete={this.deleteData} />
        </Container>
      case "w2":
        return <Container>
          <Table data={qW2} handleDelete={this.deleteData} />
        </Container>
      case "access":
        return <Container>
          <Table data={qAccess} handleDelete={this.deleteData} />
        </Container>
    }
  }

  render() {
    const {
      qW1, qW2,
      question,
      choice1,
      choice2,
      answer,
      choices,
      alert, section
    } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Print Multiple Choice Question data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/print">
            Go back
          </Button>
        </div><Container>
          <InputLabel id="label">Assignment Section</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={section}
            onChange={this.handleSectionChange}
          >
            <MenuItem value="access">Access</MenuItem>
            <MenuItem value="w1">Week 1</MenuItem>
            <MenuItem value="w2">Week 2</MenuItem>
          </Select>
        </Container>
        <Container>
          <h5>
            Example: Out of word pairs below, select the one word that looks
            most like it could be a real word in English. For example, out of
            beff-ffeb, the correct answer is beff as the ff letter pattern is
            always present at the end of a word.
          </h5>
          <li>vadd-vaad</li>
          <li>dau-daw</li>
          <li>dau-daw</li>
          <TextField
            label="question"
            value={question}
            style={{ width: 500 }}
            autoComplete="off"
            onChange={(e) => this.setState({ question: e.target.value })}
          />
          <br />
          <TextField
            label="choice1"
            value={choice1}
            autoComplete="off"
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ choice1: e.target.value })}
          />
          <TextField
            label="choice2"
            value={choice2}
            autoComplete="off"
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ choice2: e.target.value })}
          />
          <TextField
            label="answer"
            autoComplete="off"
            value={answer}
            style={{ marginRight: 10 }}
            onChange={(e) => this.setState({ answer: e.target.value })}
          />
          <Button
            variant="outlined"
            color="default"
            style={{ marginRight: 10, marginTop: 10 }}
            onClick={() => {
              this.setState((state) => {
                const { choice1, choice2, answer, choices } = state;
                const newChoice = {
                  choice1: choice1,
                  choice2: choice2,
                  answer: answer,
                };
                choices.push(newChoice);
                this.setState({
                  choice1: "",
                  choice2: "",
                  answer: "",
                });
                return {
                  choices,
                  ...state,
                };
              });
            }}
          >
            Add a choice
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={() => this.setState({ choices: [] })}
          >
            empty entries
          </Button>
          <div className="row" style={{ marginTop: 10, marginLeft: 10 }}>
            <h5>Choices you entered:</h5>
            <h4>
              {choices.map(
                (choice) =>
                  choice.choice1 +
                  "/" +
                  choice.choice2 +
                  "/" +
                  choice.answer +
                  ","
              )}
            </h4>
          </div>
          <h5>
            (Each entry contains one choice1, one choice2 and one answer, but do
            not include - or / )
          </h5>
          <Button variant="outlined" color="primary" onClick={this.addData}>
            Add a question
          </Button>

        </Container>
        <br />
        <br />
        {this.renderTable()}
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

export default PrintData;

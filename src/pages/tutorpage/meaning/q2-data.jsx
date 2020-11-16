import React from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField, Button, Container, InputLabel, Select, MenuItem } from "@material-ui/core";
import Table from "../../../components/tutor/meaning/data-table/q2-table";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class MeaningData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qW1: [],
      qW2: [],
      level: "",
      question: "",
      answer: [],
      curr_answer: "",
      alert: false,
      section: "w1"
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/meaning/q2/w1");
    const doc2 = await axios.get("/api/meaning/q2/w2");
    if (doc1) {
      this.setState({ qW1: doc1.data });
    }
    if (doc2) {
      this.setState({ qW2: doc2.data });
    }
  };

  addData = async () => {
    const { level, question, answer, section } = this.state;
    await axios.post("/api/meaning/q2", {
      level: level,
      question: question,
      answer: answer,
      version: section
    });
    await this.setState({ level: "", question: "", answer: [] });
    this.componentDidMount();
  };

  deleteData = async (row) => {
    await axios.delete("/api/meaning/q2/" + row._id);
    this.componentDidMount();
  };

  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  }

  render() {
    const { qW1, qW2, section, level, question, answer, curr_answer, alert } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Meaning Question 2 Data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/meaning">
            Go back
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
        <Container>
          <h5>
            Example: List 2 prefixes and suffixes with meaning and word
            examples.
          </h5>
          <TextField
            label="level"
            value={level}
            autoComplete="off"
            style={{ marginRight: 5 }}
            onChange={(e) => this.setState({ level: e.target.value })}
          />
          <TextField
            label="question"
            style={{ width: 500 }}
            autoComplete="off"
            value={question}
            onChange={(e) => this.setState({ question: e.target.value })}
          />
          <br />
          <TextField
            label="answer"
            autoComplete="off"
            value={curr_answer}
            onChange={(e) => this.setState({ curr_answer: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}
            onClick={() =>
              this.setState((state) => {
                const answer = state.answer;
                answer.push(curr_answer);
                this.setState({ curr_answer: "" });
                return { answer, ...state };
              })
            }
          >
            Add an answer
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={() => this.setState({ answer: [] })}
          >
            empty answers
          </Button>
          <br />
          <div className="row" style={{ marginTop: 10, marginLeft: 10 }}>
            <h5>Answers you entered:</h5>
            <h4>{answer.map((answer) => answer + ",")}</h4>
          </div>
          <h5>
            (You can provide multiple correct answers, but do not include / )
          </h5>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 5 }}
            onClick={this.addData}
          >
            Add a question
          </Button>

        </Container>
        <br />
        <br />
        <Container>
          {
            section === "w1" ?
              <Table data={qW1} handleDelete={this.deleteData} />
              :
              <Table data={qW2} handleDelete={this.deleteData} />
          }
        </Container>

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

export default MeaningData;

import React from "react";
import axios from "axios";
import { TextField, Button, Container, InputLabel, Select, MenuItem } from "@material-ui/core";
import Table from "../../../components/tutor/phoneme/blank-table";

class PhonemeTutorPhonemeData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blankAnswerDataW1: [],
      blankAnswerDataW2: [],
      blankAnswerAccess: [],
      question: "",
      answer: "",
      section: "w1",
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/phoneme/blank/table/w1");
    const doc2 = await axios.get("/api/phoneme/blank/table/w2");
    const doc3 = await axios.get("/api/phoneme/blank/table/access");
    if (doc1) {
      this.setState({ blankAnswerDataW1: doc1.data });
    }
    if (doc2) {
      this.setState({ blankAnswerDataW2: doc2.data });
    }
    if (doc3) {
      this.setState({ blankAnswerAccess: doc3.data });
    }
  };

  addNewData = async () => {
    const {  answer, question, section } = this.state;
    await axios.post("/api/phoneme/blank", { answer, question, version: section });
    await this.setState({ answer: "", question: "" });
    this.componentDidMount();
  };

  deleteData = async (id) => {
    await axios.delete("/api/phoneme/blank/" + id);
    this.componentDidMount();
  };

  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  }

  renderTable = () => {
    const { section, blankAnswerDataW1, blankAnswerDataW2, blankAnswerAccess } = this.state;
    switch (section) {
      case "w1":
        return <Container>
          <Table
            rows={blankAnswerDataW1}
            handleDelete={this.deleteData}
          />
        </Container>
      case "w2":
        return <Container>
          <Table
            rows={blankAnswerDataW2}
            handleDelete={this.deleteData}
          />
        </Container>
      case "access":
        return <Container>
          <Table
            rows={blankAnswerAccess}
            handleDelete={this.deleteData}
          />
        </Container>
    }
  }

  render() {
    const { question, answer, choices, section } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Modify the blank question Data</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/phoneme">
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
            <MenuItem value="access">Access</MenuItem>
            <MenuItem value="w1">Week 1</MenuItem>
            <MenuItem value="w2">Week 2</MenuItem>
          </Select>
        </Container>
        <Container>
          <TextField
            id="standard-basic"
            label="question"
            value={question}
            autoComplete="off"
            style={{ marginRight: 20, width: 500}}
            onChange={(e) => this.setState({ question: e.target.value })}
          />
          <br />
          <TextField
            id="standard-basic"
            label="answer"
            value={answer}
            autoComplete="off"
            style={{ marginRight: 20, width: 300}}
            onChange={(e) => this.setState({ answer: e.target.value })}
          />
          <Button variant="contained" color="primary" style={{ marginLeft: 5, marginTop: 10}} onClick={this.addNewData}>
            Add
          </Button>
        </Container>
        <br />
        <br />
        {this.renderTable()}
        <br />
        <br />
      </div>
    );
  }
}

export default PhonemeTutorPhonemeData;

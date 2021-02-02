import React from "react";
import axios from "axios";
import { TextField, Button, Container, InputLabel, Select, MenuItem } from "@material-ui/core";
import Table from "../../../components/tutor/phoneme/short-answer-table";

class PhonemeTutorPhonemeData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortAnswerDataW1: [],
      shortAnswerDataW2: [],
      shortAnswerAccess: [],
      question: "",
      answers: "",
      section: "w1",
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/phoneme/short/table/w1");
    const doc2 = await axios.get("/api/phoneme/short/table/w2");
    const doc3 = await axios.get("/api/phoneme/short/table/access");
    if (doc1) {
      this.setState({ shortAnswerDataW1: doc1.data });
    }
    if (doc2) {
      this.setState({ shortAnswerDataW2: doc2.data });
    }
    if (doc3) {
      this.setState({ shortAnswerAccess: doc3.data });
    }
  };

  addNewData = async () => {
    const {  answers, question, section } = this.state;
    await axios.post("/api/phoneme/short", { answers: answers.split(","), question, version: section });
    await this.setState({ answers: "", question: "" });
    this.componentDidMount();
  };

  deleteData = async (id) => {
    await axios.delete("/api/phoneme/short/" + id);
    this.componentDidMount();
  };

  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  }

  renderTable = () => {
    const { section, shortAnswerDataW1, shortAnswerDataW2, shortAnswerAccess } = this.state;
    switch (section) {
      case "w1":
        return <Container>
          <Table
            rows={shortAnswerDataW1}
            handleDelete={this.deleteData}
          />
        </Container>
      case "w2":
        return <Container>
          <Table
            rows={shortAnswerDataW2}
            handleDelete={this.deleteData}
          />
        </Container>
      case "access":
        return <Container>
          <Table
            rows={shortAnswerAccess}
            handleDelete={this.deleteData}
          />
        </Container>
    }
  }

  render() {
    const { question, answers, section } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Modify the Short Answers Question Data</h2>
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
            style={{ marginRight: 20, width: 400}}
            onChange={(e) => this.setState({ question: e.target.value })}
          />
          <br />
          <TextField
            id="standard-basic"
            label="answers"
            value={answers}
            autoComplete="off"
            style={{ marginRight: 20, width: 200}}
            onChange={(e) => this.setState({ answers: e.target.value })}
          />
           <Button variant="contained" color="primary" style={{ marginLeft: 5, marginTop: 10}} onClick={this.addNewData}>
            Add
          </Button>
          <p>(Using comma to separate choices and answers, no space is required, like qwe,asd,zxc)</p>
         
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

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
      qAccess: [],
      question: "",
      answer: "",
      alert: false,
      section: "w1"
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/meaning/q2/w1");
    const doc2 = await axios.get("/api/meaning/q2/w2");
    const doc3 = await axios.get("/api/meaning/q2/access");
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
    const {  question, answer, section } = this.state;
    await axios.post("/api/meaning/q2", {
      question: question,
      answer: answer.split(","),
      version: section
    });
    await this.setState({  question: "", answer: [] });
    this.componentDidMount();
  };

  deleteData = async (row) => {
    await axios.delete("/api/meaning/q2/" + row._id);
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
    const { qW1, qW2, section,question, answer, alert } = this.state;

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
            <MenuItem value="access">Access</MenuItem>
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
            value={answer}
            style={{ width: 200 }}
            onChange={(e) => this.setState({ answer: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: 5, marginTop: 10 }}
            onClick={this.addData}
          >
            Add
          </Button>
          <p>(You can provide multiple correct answers and separate them by comma )</p>
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

export default MeaningData;

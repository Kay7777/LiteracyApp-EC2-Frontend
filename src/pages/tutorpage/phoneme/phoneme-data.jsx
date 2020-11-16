import React from "react";
import axios from "axios";
import { TextField, Button, Container, InputLabel, Select, MenuItem } from "@material-ui/core";
import Table from "../../../components/tutor/phoneme/phonemetable";

class PhonemeTutorPhonemeData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phonemeDataW1: [],
      phonemeDataW2: [],
      word: "",
      phoneme: "",
      level: "",
      section: "w1",
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/phoneme/phoneme/table/w1");
    const doc2 = await axios.get("/api/phoneme/phoneme/table/w2");
    if (doc1) {
      this.setState({ phonemeDataW1: doc1.data });
    }
    if (doc2) {
      this.setState({ phonemeDataW2: doc2.data });
    }
  };

  addNewData = async () => {
    const { word, phoneme, level, section } = this.state;
    await axios.post("/api/phoneme/phoneme", { word, phoneme, level, version: section });
    await this.setState({ word: "", phoneme: "", level: "" });
    this.componentDidMount();
  };

  deleteData = async (id) => {
    await axios.delete("/api/phoneme/phoneme/" + id);
    this.componentDidMount();
  };

  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  }

  render() {
    const { word, phoneme, level, phonemeDataW1, phonemeDataW2, section } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Modify the Phoneme Data</h2>
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
            <MenuItem value="w1">Week 1</MenuItem>
            <MenuItem value="w2">Week 2</MenuItem>
          </Select>
        </Container>
        <Container>
          <TextField
            id="standard-basic"
            label="Word"
            value={word}
            autoComplete="off"
            style={{ marginRight: 20 }}
            onChange={(e) => this.setState({ word: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Phoneme"
            value={phoneme}
            autoComplete="off"
            style={{ marginRight: 20 }}
            onChange={(e) => this.setState({ phoneme: e.target.value })}
          />
          <TextField
            id="standard-basic"
            label="Level"
            value={level}
            autoComplete="off"
            style={{ marginRight: 20 }}
            onChange={(e) => this.setState({ level: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={this.addNewData}>
            Add
          </Button>
        </Container>
        <br />
        <br />
        {
          section === "w1" ?
            <Container>
              <Table
                rows={phonemeDataW1}
                handleDelete={this.deleteData}
                name="testData"
                one="word"
                two="phoneme"
                three="level"
              />
            </Container>
            :
            <Container>
              <Table
                rows={phonemeDataW2}
                handleDelete={this.deleteData}
                name="testData"
                one="word"
                two="phoneme"
                three="level"
              />
            </Container>
        }
        <br />
        <br />
      </div>
    );
  }
}

export default PhonemeTutorPhonemeData;

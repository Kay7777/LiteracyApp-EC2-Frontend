import React from "react";
import axios from "axios";
import { Button, Container, TextField, InputLabel, Select, MenuItem } from "@material-ui/core";
import AudioTable from "../../../components/tutor/phoneme/audiotable";

class PhonemeTutorAudioData extends React.Component {
  constructor() {
    super();
    this.state = {
      audioDataW1: [],
      audioDataW2: [],
      question: "",
      audios: [],
      section: "w1"
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/phoneme/audio/table/w1");
    const doc2 = await axios.get("/api/phoneme/audio/table/w2");
    if (doc1) {
      this.setState({ audioDataW1: doc1.data });
    }
    if (doc2) {
      this.setState({ audioDataW2: doc2.data });
    }
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ wrongAlert: false, rightAlert: false });
  };

  handleAddEntry = async () => {
    const { audios } = this.state;
    // upload audio
    if (audios.length !== 0) {
      // apply urls
      const promises1 = await audios.map(async (audio) => {
        const doc = await axios.get("/api/phoneme/audio", { type: audio.type });
        return doc.data;
      });
      const uploadConfigs = await Promise.all(promises1);
      // upload audios
      const promises2 = await audios.map(async (file, index) => {
        await axios
          .put(uploadConfigs[index].url, file, {
            headers: {
              "Content-type": file.type,
            },
          })
          .catch((err) => console.log(err));
      });
      await Promise.all(promises2);
      // add entry
      const audioKeys = [];
      uploadConfigs.forEach((audio) => {
        audioKeys.push(audio.key);
      });
      await axios.post("/api/phoneme/audio", {
        audios: audioKeys,
        question: this.state.question,
        version: this.state.section
      });
      await this.setState({ question: "", audios: [] });
      this.componentDidMount();
    }
  };

  handleDeleteEntry = async (id) => {
    await axios.delete("/api/phoneme/audio/" + id);
    this.componentDidMount();
  };


  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  }

  render() {
    const { audioDataW1, audioDataW2, question, section } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Audio data</h2>
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
        <br />
        <Container>
          <TextField
            label="Question Content"
            value={question}
            style={{ width: 400 }}
            autoComplete="off"
            multiline
            onChange={(e) => this.setState({ question: e.target.value })}
          />
          <input
            type="file"
            accept="audio/*"
            multiple={true}
            onChange={(e) => {
              this.setState({ audios: Array.from(e.target.files) });
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleAddEntry}
          >
            Add
          </Button>
        </Container>
        <br />
        {
          section === "w1" ?
            <Container>
              <AudioTable rows={audioDataW1} handleDelete={this.handleDeleteEntry} />
            </Container>
            :
            <Container>
              <AudioTable rows={audioDataW2} handleDelete={this.handleDeleteEntry} />
            </Container>
        }
      </div>
    );
  }
}

export default PhonemeTutorAudioData;

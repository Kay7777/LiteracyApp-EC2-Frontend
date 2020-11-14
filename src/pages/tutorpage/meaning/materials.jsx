import React from "react";
import axios from "axios";
import keys from "../../../assets/keys";
import { Button, Container, TextField, InputLabel, Select, MenuItem } from "@material-ui/core";

class MeaningTutorMaterials extends React.Component {
  constructor() {
    super();
    this.state = {
      w1v1: null,
      w1v2: null,
      w2v1: null,
      w2v2: null,
      file: null,
      w1v1Desc: null,
      w1v2Desc: null,
      w2v1Desc: null,
      w2v2Desc: null,
      section: "w1v1"
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/meaning/materials/w1v1");
    const doc2 = await axios.get("/api/meaning/materials/w1v2");
    const doc3 = await axios.get("/api/meaning/materials/w2v1");
    const doc4 = await axios.get("/api/meaning/materials/w2v2");
    if (doc1.data) {
      this.setState({
        w1v1: {
          video: doc1.data.video,
          desc: doc1.data.desc
        }
      });
    } else {
      this.setState({ w1v1: null })
    }
    if (doc2.data) {
      this.setState({
        w1v2: {
          video: doc2.data.video,
          desc: doc2.data.desc
        }
      });
    } else {
      this.setState({ w1v2: null })
    }
    if (doc3.data) {
      this.setState({
        w2v1: {
          video: doc3.data.video,
          desc: doc3.data.desc
        }
      });
    } else {
      this.setState({ w2v1: null })
    }
    if (doc4.data) {
      this.setState({
        w2v2: {
          video: doc4.data.video,
          desc: doc4.data.desc
        }
      });
    } else {
      this.setState({ w2v2: null })
    }
  };

  handleMaterialsAdd = async () => {
    const { file, section, w1v1Desc, w1v2Desc, w2v1Desc, w2v2Desc } = this.state;
    if (!!file) {
      const doc = await axios.get("/api/meaning/video", { type: file.type });
      const uploadConfigs = doc.data;
      await axios
        .put(uploadConfigs.url, file, {
          headers: {
            "Content-type": file.type,
          },
        })
        .catch((err) => console.log(err));
      if (section === "w1v1") {
        await axios.post("/api/meaning/materials/w1v1",
          { desc: w1v1Desc, video: uploadConfigs.key });
      } else if (section === "w1v2") {
        await axios.post("/api/meaning/materials/w1v2",
          { desc: w1v2Desc, video: uploadConfigs.key });
      } else if (section === "w2v1") {
        await axios.post("/api/meaning/materials/w2v1",
          { desc: w2v1Desc, video: uploadConfigs.key });
      } else if (section === "w2v2") {
        await axios.post("/api/meaning/materials/w2v2",
          { desc: w2v2Desc, video: uploadConfigs.key });
      }
      this.componentDidMount();
    }
  };

  handleMaterialsDelete = async () => {
    const { section } = this.state;
    if (section === "w1v1") {
      await axios.delete("/api/meaning/materials/w1v1");
    } else if (section === "w1v2") {
      await axios.delete("/api/meaning/materials/w1v2");
    } else if (section === "w2v1") {
      await axios.delete("/api/meaning/materials/w2v1");
    } else if (section === "w2v2") {
      await axios.delete("/api/meaning/materials/w2v2");
    }
    this.componentDidMount();
  };

  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  }

  renderContent = () => {
    const { section, w1v1, w1v2, w2v1, w2v2 } = this.state;
    switch (section) {
      case "w1v1":
        if (w1v1) {
          return <div>
            <h5>{w1v1.desc}</h5>
            <iframe width="40%" src={keys.AWS + w1v1.video}></iframe>
            <Button variant="outlined" color="danger" onClick={this.handleMaterialsDelete}>Delete</Button>
          </div>;
        } else {
          return <div>
            <TextField
              style={{ width: "50%", marginRight: 10 }}
              multiline={true}
              placeholder="description"
              onChange={(e) => this.setState({ w1v1Desc: e.target.value })}
            />
            <br /><br />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => this.setState({ file: e.target.files[0] })}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleMaterialsAdd}
            >
              Add
          </Button>
          </div>
        }

      case "w1v2":
        if (w1v2) {
          return <div>
            <h5>{w1v2.desc}</h5>
            <iframe width="40%" src={keys.AWS + w1v2.video}></iframe>
            <Button variant="outlined" color="danger" onClick={this.handleMaterialsDelete}>Delete</Button>
          </div>;
        } else {
          return <div>
            <TextField
              style={{ width: "50%", marginRight: 10 }}
              multiline={true}
              placeholder="description"
              onChange={(e) => this.setState({ w1v2Desc: e.target.value })}
            />
            <br /><br />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => this.setState({ file: e.target.files[0] })}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleMaterialsAdd}
            >
              Add
          </Button>
          </div>
        }

      case "w2v1":
        if (w2v1) {
          return <div>
            <h5>{w2v1.desc}</h5>
            <iframe width="40%" src={keys.AWS + w2v1.video}></iframe>
            <Button variant="outlined" color="danger" onClick={this.handleMaterialsDelete}>Delete</Button>
          </div>;
        } else {
          return <div>
            <TextField
              style={{ width: "50%", marginRight: 10 }}
              multiline={true}
              placeholder="description"
              onChange={(e) => this.setState({ w2v1Desc: e.target.value })}
            />
            <br /><br />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => this.setState({ file: e.target.files[0] })}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleMaterialsAdd}
            >
              Add
          </Button>
          </div>
        }
      case "w2v2":
        if (w2v2) {
          return <div>
            <h5>{w2v2.desc}</h5>
            <iframe width="40%" src={keys.AWS + w2v2.video}></iframe>
            <Button variant="outlined" color="danger" onClick={this.handleMaterialsDelete}>Delete</Button>
          </div>;
        } else {
          return <div>
            <TextField
              style={{ width: "50%", marginRight: 10 }}
              multiline={true}
              placeholder="description"
              onChange={(e) => this.setState({ w2v2Desc: e.target.value })}
            />
            <br /><br />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => this.setState({ file: e.target.files[0] })}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleMaterialsAdd}
            >
              Add
          </Button>
          </div>
        }
    }
  }

  render() {
    const { section } = this.state;
    return (
      <div>
        <div className="jumbotron">
          <h2>Modify Learning Materials</h2>
          <hr />
          <Button variant="contained" color="default" href="/tutor/meaning">
            Go back
          </Button>
        </div>
        <div>
          <Container>
            <InputLabel id="label">Learning Section</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={section}
              onChange={this.handleSectionChange}
            >
              <MenuItem value="w1v1">Week1 Video1</MenuItem>
              <MenuItem value="w1v2">Week1 Video2</MenuItem>
              <MenuItem value="w2v1">Week2 Video1</MenuItem>
              <MenuItem value="w2v2">Week2 Video2</MenuItem>
            </Select>
          </Container>
          <hr />
          <Container>
            {this.renderContent()}
          </Container>
        </div>
      </div>
    );
  }
}

export default MeaningTutorMaterials;

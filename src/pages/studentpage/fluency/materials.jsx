import FluencyHeader from "../../../components/student/fluency/assets/header";
import React from "react";
import keys from "../../../assets/keys";
import { Button, Container, InputLabel, Select, MenuItem } from "@material-ui/core";
import P1 from "../../../assets/fonts/p1";
import P2 from "../../../assets/fonts/p2";
import P3 from "../../../assets/fonts/p3";
import axios from "axios";

class FluencyMaterials extends React.Component {
  constructor() {
    super();
    this.state = {
      w1v1: null,
      w1v2: null,
      w2v1: null,
      w2v2: null,
      section: "w1v1"
    };
  }

  componentDidMount = async () => {
    const doc1 = await axios.get("/api/fluency/materials/w1v1");
    const doc2 = await axios.get("/api/fluency/materials/w1v2");
    const doc3 = await axios.get("/api/fluency/materials/w2v1");
    const doc4 = await axios.get("/api/fluency/materials/w2v2");
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

          </div >;
        } else {
          return null
        }

      case "w1v2":
        if (w1v2) {
          return <div>
            <h5>{w1v2.desc}</h5>
            <iframe width="40%" src={keys.AWS + w1v2.video}></iframe>

          </div>;
        } else {
          return null
        }

      case "w2v1":
        if (w2v1) {
          return <div>
            <h5>{w2v1.desc}</h5>
            <iframe width="40%" src={keys.AWS + w2v1.video}></iframe>

          </div>;
        } else {
          return null
        }
      case "w2v2":
        if (w2v2) {
          return <div>
            <h5>{w2v2.desc}</h5>
            <iframe width="40%" src={keys.AWS + w2v2.video}></iframe>

          </div>;
        } else {
          return null
        }
    }
  }

  render() {
    const { section } = this.state;
    return (
      <div>
        <FluencyHeader part="Learning Materials" />
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
        </Container><br />
        <Container>
          {this.renderContent()}
          <br />
          <Button variant="contained" color="primary" onClick={() => window.location = "/student/fluency"}>Back</Button>
        </Container>

      </div>
    );
  }
}

export default FluencyMaterials;

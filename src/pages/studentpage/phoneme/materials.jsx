import PhonemeHeader from "../../../components/student/phoneme/assets/header";
import Materials from "../../../components/student/phoneme/learn";
import React from "react";
import { Button, Container, InputLabel, Select, MenuItem } from "@material-ui/core";
import P1 from "../../../assets/fonts/p1";
import P2 from "../../../assets/fonts/p2";
import P3 from "../../../assets/fonts/p3";
import axios from "axios";

class PhonemeMaterials extends React.Component {
  constructor() {
    super();
    this.state = {
      section: "w1v1"
    };
  }

  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  }

  render() {
    const { section } = this.state;
    return (
      <div>
        <PhonemeHeader part="Learning Materials" />
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
        <Materials section={section} />
      </div>
    );
  }
}

export default PhonemeMaterials;

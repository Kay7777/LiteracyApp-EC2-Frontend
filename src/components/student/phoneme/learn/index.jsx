import React from "react";
import { Button, Container } from "@material-ui/core";
import P1 from "../../../../assets/fonts/p1";
import P2 from "../../../../assets/fonts/p2";
import P3 from "../../../../assets/fonts/p3";
import axios from "axios";
import keys from "../../../../assets/keys";

class PhonemeMaterials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: this.props.section,
      video: null,
    };
  }

  componentDidMount = async () => {
    const { section } = this.state;
    let doc;
    if (section === "w1v1") {
      doc = await axios.get("/api/phoneme/materials/w1v1");
    } else if (section === "w1v2") {
      doc = await axios.get("/api/phoneme/materials/w1v2");
    } else if (section === "w2v1") {
      doc = await axios.get("/api/phoneme/materials/w2v1");
    } else if (section === "w2v2") {
      doc = await axios.get("/api/phoneme/materials/w2v2");
    }
    if (doc) {
      this.setState({ video: doc.data.video });
    }
  };

  render() {
    const { video } = this.state;
    return (
      <Container>
        {
          video ? <div>
            <iframe width="40%" src={keys.AWS + video}></iframe>
          </div> : null
        }
      </Container>
    );
  }
}

export default PhonemeMaterials;

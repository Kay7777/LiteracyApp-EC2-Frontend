import React from "react";
import PhonemeIntro from "../../../components/student/phoneme/assign/trainintro";
import PhonemeTrain from "../../../components/student/phoneme/assign/trainpart";
import PhonemeProgress from "../../../components/student/phoneme/assign/train-progress";
import PhonemeHeader from "../../../components/student/phoneme/assets/header";
import { Container } from "@material-ui/core";

class PhonemePractise extends React.Component {
  state = {
    start: false,
    id: "",
    version: "w1"
  };

  render() {
    const { start, id, version } = this.state;
    return (
      <div>
        <Container>
          {start ? (
            id === "" ? (
              <PhonemeTrain version={version} />
            ) : (
                <PhonemeProgress id={id} />
              )
          ) : (
              <div>
                <PhonemeHeader part="Training Assignment" />
                <PhonemeIntro
                  handleClick={(id, version) => this.setState({ start: !start, id, version })}
                />
              </div>
            )}
        </Container>
      </div>
    );
  }
}
export default PhonemePractise;

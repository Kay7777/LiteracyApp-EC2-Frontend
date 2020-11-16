import React from "react";
import MeaningIntro from "../../../components/student/meaning/assign/trainintro";
import MeaningTrain from "../../../components/student/meaning/assign/trainpart";
import MeaningProgress from "../../../components/student/meaning/assign/train-progress";
import MeaningHeader from "../../../components/student/meaning/assets/header";
import { Container } from "@material-ui/core";

class MeaningPractise extends React.Component {
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
              <MeaningTrain version={version} />
            ) : (
                <MeaningProgress id={id} />
              )
          ) : (
              <div>
                <MeaningHeader part="Training Assignment" />
                <MeaningIntro
                  handleClick={(id, version) => this.setState({ start: !start, id, version })}
                />
              </div>
            )}
        </Container>
      </div>
    );
  }
}
export default MeaningPractise;

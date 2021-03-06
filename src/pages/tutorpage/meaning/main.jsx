import React from "react";
import TrainCard from "../../../assets/cards/trainpagecard";
import { Container } from "@material-ui/core";

class MeaningTutorMain extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Meaning Session Tutor Main Page</h2>
          <hr />
        </div>
        <Container>
          <h3>Review Students' Assignments and Performance</h3>
          <div className="row">
            <TrainCard
              title="Students' Access Assignment"
              page="/tutor/meaning/test"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Assignment"
              page="/tutor/meaning/assign"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Performance"
              page="/tutor/meaning/performance"
              description="In this part, you can check students' performance"
            />
          </div>
        </Container>
        <hr />

        <Container>
          <h3>Modify Meaning Database</h3>
          <div className="row">
            <TrainCard
              title="Modify Learning Materials"
              page="/tutor/meaning/materials"
              description="In this part, you can modify learning materials"
            />
            <TrainCard
              title="Modify Meaning Short Answer Data"
              page="/tutor/meaning/short"
              description="You can modify Short Answer data here"
            />
            <TrainCard
              title="Modify Meaning Blank Question Data"
              page="/tutor/meaning/blank"
              description="You can modify blank question data here"
            />
            <TrainCard
              title="Modify Meaning Multiple Choice Data"
              page="/tutor/meaning/multiple"
              description="You can modify Multiple Choice data here"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default MeaningTutorMain;

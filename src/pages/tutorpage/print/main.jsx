import React from "react";
import TrainCard from "../../../assets/cards/trainpagecard";
import { Container } from "@material-ui/core";

class PrintTutorMain extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Print Session Tutor Main Page</h2>
          <hr />
        </div>
        <Container>
          <h3>Review Students' Assignments and Performance</h3>
          <div className="row">
            <TrainCard
              title="Students' Access Assignment"
              page="/tutor/print/test"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Assignment"
              page="/tutor/print/assign"
              description="In this part, you can review students' testing assignment"
            />
            <TrainCard
              title="Students' Performance"
              page="/tutor/print/performance"
              description="In this part, you can check students' performance"
            />
          </div>
        </Container>
        <hr />

        <Container>
          <h3>Modify Print Database</h3>
          <div className="row">
            <TrainCard
              title="Modify Learning Materials"
              page="/tutor/print/materials"
              description="In this part, you can modify learning materials"
            />
            <TrainCard
              title="Modify Print Short-Answer Question Data"
              page="/tutor/print/short"
              description="You can modify Print Short-answer Question data here"
            />
            <TrainCard
              title="Modify Print Multiple Choice Data"
              page="/tutor/print/multiple"
              description="You can modify Multiple Choice question here"
            />
             <TrainCard
              title="Modify Print Blank Question Data"
              page="/tutor/print/blank"
              description="You can modify Print blank Question data here"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default PrintTutorMain;

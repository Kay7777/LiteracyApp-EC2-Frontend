import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import Q1Table from "../../../components/tutor/meaning/assign-table/short-answer-table";
import Q2Table from "../../../components/tutor/meaning/assign-table/blank-table";
import Q3Table from "../../../components/tutor/meaning/assign-table/multiple-choice-table";

class MeaningTutorTestOneAssign extends React.Component {
  constructor(props) {
    super(props);
    this.state = { assignment: null };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/meaning/test/" + this.props.match.params.id
    );
    this.setState({ assignment: doc.data });
  };

  render() {
    const { assignment } = this.state;
    return (
      <div>
        {assignment ? (
          <div>
            <div className="jumbotron">
              <h2>Review Student' Access Assignment</h2>
              <h3>Student: {assignment.studentName}</h3>
              <h3>Email: {assignment.studentEmail}</h3>
              <hr />
              <Button
                variant="contained"
                color="default"
                href="/tutor/meaning/test"
              >
                Go back
              </Button>
            </div>

            <Container>
              <h3>Question 1</h3>
              <Q1Table data={assignment.q1Assign} />
              <hr />
              <h3>Question 2</h3>
              <Q2Table data={assignment.q2Assign} />
              <hr />
              <h3>Question 3</h3>
              <Q3Table data={assignment.q3Assign} />
              <hr />
              <h4>Student's new score is {assignment.newScore}.</h4>
            </Container>
          </div>
        ) : null}
      </div>
    );
  }
}

export default MeaningTutorTestOneAssign;

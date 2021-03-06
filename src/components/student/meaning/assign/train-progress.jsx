import React from "react";
import axios from "axios";
import Q1Table from "../../thread/multiple-table";
import Q2Table from "../../thread/blank-table";
import Q3Table from "../../thread/short-table";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class MeaningTrainPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q1: [],
      q2: [],
      q3: [],
      q1Index: 0,
      q2Index: 0,
      q3Index: 0,
      q1Score: 0,
      q2Score: 0,
      q3Score: 0,
      q1Assign: [],
      q2Assign: [],
      q3Assign: [],
      q_show: 0,
      alert: false,
      version: null
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/meaning/student/progress/" + this.props.id
    );
    const {
      q1Assign,
      q1Questions,
      q1Score,
      q1Index,
      q2Assign,
      q2Questions,
      q2Score,
      q2Index,
      q3Assign,
      q3Questions,
      q3Score,
      q3Index,
      version
    } = doc.data;
    if (q3Assign.length !== 0) {
      this.setState({
        q1Score: q1Score,
        q2Score: q2Score,
        q3Score: q3Score,
        q1Assign,
        q2Assign,
        q3Assign,
        q_show: 2,
        q1Index,
        q2Index,
        q3Index,
        version
      });
    } else if (q2Assign.length !== 0) {
      this.setState({
        q1Score: q1Score,
        q2Score: q2Score,
        q1Assign,
        q2Assign,
        q_show: 1,
        q1Index,
        q2Index,
        version
      });
    } else {
      this.setState({
        q1Score: q1Score,
        q1Assign,
        q_show: 0,
        q1Index,
        version
      });
    }
    this.setState({ q1: q1Questions, q2: q2Questions, q3: q3Questions });
  };

  handleSaveAssignment = async () => {
    const {
      q1,
      q2,
      q3,
      q1Score,
      q2Score,
      q3Score,
      q1Assign,
      q2Assign,
      q3Assign,
      q1Index,
      q2Index,
      q3Index,
    } = this.state;
    // 1. Clean the student last progress and delete the old progress
    const doc1 = await axios.put("/api/meaning/student/progress", {
      newProgress: "",
      version: this.state.version
    });
    if (doc1.data !== "") {
      await axios.delete("/api/meaning/student/progress/" + doc1.data);
    }

    // 2. save progress into database and save progress_id into student database
    const doc2 = await axios.post("/api/meaning/student/progress", {
      q1Score,
      q2Score,
      q3Score,
      q1Assign,
      q2Assign,
      q3Assign,
      q1Index,
      q2Index,
      q3Index,
      q1Questions: q1,
      q2Questions: q2,
      q3Questions: q3,
      version: this.state.version
    });
    await axios.put("/api/meaning/student/progress", {
      newProgress: doc2.data._id,
      version: this.state.version
    });
    // show alert bar
    this.setState({ alert: true });
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  handleSubmit = async (q3_score, q3Assign) => {
    const { q1_score, q2_score, q1Assign, q2Assign, version } = this.state;
    const newScore = q1_score + q2_score + q3_score;
    await axios.post("/api/meaning/assign", {
      newScore,
      q1Assign,
      q2Assign,
      q3Assign,
      version
    });
    await axios.put("/api/meaning/score", { newScore });
    window.location = "/student/meaning";
  };

  renderQuestion = () => {
    const {
      q_show,
      q1,
      q2,
      q3,
      q1Assign,
      q2Assign,
      q3Assign,
      q1Index,
      q2Index,
      q3Index,
      q1Score,
      q2Score,
      q3Score,
    } = this.state;
    switch (q_show) {
      case 0:
        return (
          <Q1Table
            rows={q1}
            mode="assign"
            assignment={q1Assign}
            index={q1Index}
            score={q1Score}
            handleSaveAssignment={(index, questions, assign, score) => {
              this.setState(
                {
                  q1Index: index,
                  q1: questions,
                  q1Score: score,
                  q1Assign: assign,
                },
                this.handleSaveAssignment
              );
            }}
            handleNext={(q1Score, q1Assign) =>
              this.setState({ q1Score, q1Assign, q_show: q_show + 1 })
            }
          />
        );
      case 1:
        return (
          <Q2Table
            rows={q2}
            mode="assign"
            assignment={q2Assign}
            index={q2Index}
            score={q2Score}
            handleSaveAssignment={(index, questions, assign, score) => {
              this.setState(
                {
                  q2Index: index,
                  q2: questions,
                  q2Score: score,
                  q2Assign: assign,
                },
                this.handleSaveAssignment
              );
            }}
            handleNext={(q2Score, q2Assign) =>
              this.setState({ q2Score, q2Assign, q_show: q_show + 1 })
            }
          />
        );
      case 2:
        return (
          <Q3Table
            rows={q3}
            mode="assign"
            assignment={q3Assign}
            index={q3Index}
            score={q3Score}
            handleSaveAssignment={(index, questions, assign, score) => {
              this.setState(
                {
                  q3Index: index,
                  q3: questions,
                  q3Score: score,
                  q3Assign: assign,
                },
                this.handleSaveAssignment
              );
            }}
            handleNext={(q3Score, q3Assign) =>
              this.handleSubmit(q3Score, q3Assign)
            }
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { q1 } = this.state;
    return (
      <div>
        {q1.length !== 0 ? this.renderQuestion() : null}
        <Snackbar
          open={this.state.alert}
          autoHideDuration={2000}
          onClose={this.handleCloseAlert}
        >
          <Alert onClose={this.handleClose} severity="success">
            Saved Successfully!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default MeaningTrainPart;

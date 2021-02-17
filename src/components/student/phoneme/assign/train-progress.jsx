import React from "react";
import axios from "axios";
import Q0Table from "../assets/phoneme-table";
import Q1Table from "../assets/audio-table";
import Q2Table from "../../thread/multiple-table";
import Q3Table from "../../thread/blank-table";
import Q4Table from "../../thread/short-table";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PhonemeTrainPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q0: [],
      q1: [],
      q2: [],
      q3: [],
      q4: [],
      q0Index: 0,
      q1Index: 0,
      q2Index: 0,
      q3Index: 0,
      q4Index: 0,
      q0Score: 0,
      q2Score: 0,
      q3Score: 0,
      q4Score: 0,
      q0Assign: [],
      q1Assign: [],
      q2Assign: [],
      q3Assign: [],
      q4Assign: [],
      q_show: 0,
      alert: false,
      version: null
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get(
      "/api/phoneme/student/progress/" + this.props.id
    );
    const {
      q0Score,
      q2Score,
      q3Score,
      q4Score,
      q0Assign,
      q1Assign,
      q2Assign,
      q3Assign,
      q4Assign,
      q0Index,
      q1Index,
      q2Index,
      q3Index,
      q4Index,
      q0Questions,
      q1Questions,
      q2Questions,
      q3Questions,
      q4Questions,
      version
    } = doc.data;
    if (q4Assign.length !== 0) {
      this.setState({
        q0Score,
        q2Score,
        q3Score,
        q4Score,
        q0Assign,
        q1Assign,
        q2Assign,
        q3Assign,
        q4Assign,
        q_show: 4,
        q0Index,
        q1Index,
        q2Index,
        q3Index,
        q4Index,
        version
      });
    } else if (q3Assign.length !== 0) {
      this.setState({
        q0Score,
        q2Score,
        q3Score,
        q0Assign,
        q1Assign,
        q2Assign,
        q3Assign,
        q_show: 3,
        q0Index,
        q1Index,
        q2Index,
        q3Index,
        version
      });
    } else if (q2Assign.length !== 0) {
      this.setState({
        q0Score,
        q2Score,
        q0Assign,
        q1Assign,
        q2Assign,
        q_show: 2,
        q0Index,
        q1Index,
        q2Index,
        version
      });
    } else if (q1Assign.length !== 0) {
      this.setState({
        q0Score,
        q0Assign,
        q1Assign,
        q_show: 1,
        q0Index,
        q1Index,
        version
      });
    } else {
      this.setState({
        q0Score,
        q0Assign,
        q_show: 0,
        q0Index,
        version
      });
    }
    this.setState({ q0: q0Questions, q1: q1Questions, q2: q2Questions, q3: q3Questions, q4: q4Questions });
  };

  handleSaveAssignment = async () => {
    const {
      q0,
      q1,
      q2,
      q3,
      q4,
      q0Score,
      q2Score,
      q3Score,
      q4Score,
      q0Assign,
      q1Assign,
      q2Assign,
      q3Assign,
      q4Assign,
      q0Index,
      q1Index,
      q2Index,
      q3Index,
      q4Index
    } = this.state;
    // 1. Clean the student last progress and delete the old progress
    const doc1 = await axios.put("/api/phoneme/student/progress", {
      newProgress: "",
      version: this.state.version
    });
    if (doc1.data !== "") {
      await axios.delete("/api/phoneme/student/progress/" + doc1.data);
    }

    // 2. save progress into database and save progress_id into student database
    const doc2 = await axios.post("/api/phoneme/student/progress", {
      q0Score,
      q2Score,
      q3Score,
      q4Score,
      q0Assign,
      q1Assign,
      q2Assign,
      q3Assign,
      q4Assign,
      q0Index,
      q1Index,
      q2Index,
      q3Index,
      q4Index,
      q0Questions: q0,
      q1Questions: q1,
      q2Questions: q2,
      q3Questions: q3,
      q4Questions: q4,
      version: this.state.version
    });
    await axios.put("/api/phoneme/student/progress", {
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

  handleSubmit = async (q4_score, q4Assign) => {
    const { q0_score, q2_score, q3_score, q0Assign, q1Assign, q2Assign, q3Assign, version } = this.state;
    const newScore = q0_score  + q2_score + q3_score + q4_score;
    await axios.post("/api/phoneme/assign", {
      newScore,
      q0Assign,
      q1Assign,
      q2Assign,
      q3Assign,
      q4Assign,
      version
    });
    window.location = "/student/phoneme";
  };

  handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    this.setState({ alert: false });
  };

  renderQuestion = () => {
    const {
      q_show,
      q0,
      q1,
      q2,
      q3,
      q4,
      q0Assign,
      q1Assign,
      q2Assign,
      q3Assign,
      q4Assign,
      q0Index,
      q1Index,
      q2Index,
      q3Index,
      q4Index,
      q0Score,
      q2Score,
      q3Score,
      q4Score,
    } = this.state;
    switch (q_show) {
      case 0:
        return (
          <Q0Table
            rows={q0}
            mode="assign"
            assignment={q0Assign}
            index={q0Index}
            score={q0Score}
            handleSaveAssignment={(index, questions, assign, score) => {
              this.setState(
                {
                  q0Index: index,
                  q0: questions,
                  q0Score: score,
                  q0Assign: assign,
                },
                this.handleSaveAssignment
              );
            }}
            handleNext={(q0Score, q0Assign) =>
              this.setState({ q0Score, q0Assign, q_show: q_show + 1 })
            }
          />
        );
      case 1:
        return (
          <Q1Table
            rows={q1}
            mode="assign"
            assignment={q1Assign}
            index={q1Index}
            handleSaveAssignment={(index, questions, assign) => {
              this.setState(
                {
                  q1Index: index,
                  q1: questions,
                  q1Assign: assign,
                },
                this.handleSaveAssignment
              );
            }}
            handleNext={( q1Assign) =>
              this.setState({ q1Assign, q_show: q_show + 1 })
            }
          />
        );
      case 2:
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
      case 3:
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
        case 4:
          return (
            <Q4Table
              rows={q4}
              mode="assign"
              assignment={q4Assign}
              index={q4Index}
              score={q4Score}
              handleSaveAssignment={(index, questions, assign, score) => {
                this.setState(
                  {
                    q4Index: index,
                    q4: questions,
                    q4Score: score,
                    q4Assign: assign,
                  },
                  this.handleSaveAssignment
                );
              }}
              handleNext={(q4Score, q4Assign) =>
                this.handleSubmit(q4Score, q4Assign)
              }
            />
          );
      default:
        return null;
    }
  };

  render() {
    const { q0 } = this.state;
    return (
      <div>
        {!!q0.length ? this.renderQuestion() : null}
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

export default PhonemeTrainPart;

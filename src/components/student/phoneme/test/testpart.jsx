import React from "react";
import axios from "axios";
import Q0Table from "../assets/phoneme-table";
import Q1Table from "../../thread/multiple-table";
import Q2Table from "../../thread/blank-table";
import Q3Table from "../../thread/short-table";

class phonemeTestPart extends React.Component {
  constructor() {
    super();
    this.state = {
      q0: [],
      q1: [],
      q2: [],
      q3: [],
      q0_score: 0,
      q1_score: 0,
      q2_score: 0,
      q0Assign: [],
      q1Assign: [],
      q2Assign: [],
      q_show: -1,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/phoneme/student/test");
    const { q0, q1, q2, q3 } = doc.data;
    await this.setState({ q0, q1, q2, q3 });
  };

  handleSubmit = async (q3_score, q3Assign) => {
    const { q0_score, q1_score, q2_score, q0Assign, q1Assign, q2Assign } = this.state;
    const newScore = q0_score + q1_score + q2_score + q3_score;
    await axios.post("/api/phoneme/test", {
      newScore,
      q0Assign,
      q1Assign,
      q2Assign,
      q3Assign,
    });
    await axios.post("/api/phoneme/score", { newScore });
    window.location = "/student/phoneme";
  };

  renderQuestion = () => {
    const { q_show, q0, q1, q2, q3 } = this.state;
    switch (q_show) {
      case -1:
        return (
          <Q0Table
            rows={q0}
            mode="test"
            handleNext={(q0_score, q0Assign) =>
              this.setState({ q0_score, q0Assign, q_show: q_show + 1 })
            }
          />
        );
      case 0:
        return (
          <Q1Table
            rows={q1}
            mode="test"
            handleNext={(q1_score, q1Assign) =>
              this.setState({ q1_score, q1Assign, q_show: q_show + 1 })
            }
          />
        );
      case 1:
        return (
          <Q2Table
            rows={q2}
            mode="test"
            handleNext={(q2_score, q2Assign) =>
              this.setState({ q2_score, q2Assign, q_show: q_show + 1 })
            }
          />
        );
      case 2:
        return (
          <Q3Table
            rows={q3}
            mode="test"
            handleNext={(q3_score, q3Assign) =>
              this.handleSubmit(q3_score, q3Assign)
            }
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { q0 } = this.state;
    return !!q0.length ? this.renderQuestion() : null;
  }
}

export default phonemeTestPart;

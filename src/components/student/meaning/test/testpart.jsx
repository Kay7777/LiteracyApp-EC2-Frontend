import React from "react";
import axios from "axios";
import Q1Table from "../../thread/multiple-table";
import Q2Table from "../../thread/blank-table";
import Q3Table from "../../thread/short-table";

class MeaningTestPart extends React.Component {
  constructor() {
    super();
    this.state = {
      q1: [],
      q2: [],
      q3: [],
      q1_score: 0,
      q2_score: 0,
      q1Assign: [],
      q2Assign: [],
      q_show: 0,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/meaning/student/test");
    const { q1, q2, q3 } = doc.data;
    await this.setState({ q1, q2, q3 });
  };

  handleSubmit = async (q3_score, q3Assign) => {
    const { q1_score, q2_score, q1Assign, q2Assign } = this.state;
    const newScore = q1_score + q2_score + q3_score;
    console.log(q1_score, q2_score, q3_score, q1Assign, q2Assign, q3Assign);
    await axios.post("/api/meaning/test", {
      newScore,
      q1Assign,
      q2Assign,
      q3Assign,
    });
    await axios.put("/api/meaning/score", { newScore });
    window.location = "/student/meaning";
  };

  renderQuestion = () => {
    const { q_show, q1, q2, q3 } = this.state;
    switch (q_show) {
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
    const { q1 } = this.state;
    return q1.length !== 0 ? this.renderQuestion() : null;
  }
}

export default MeaningTestPart;

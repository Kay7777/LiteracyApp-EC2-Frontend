import React from "react";
import { Button, Container, InputLabel, Select, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";

class FluencyAssignIntro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "w1"
    }
  }

  renderButtons = () => {
    const { currentUser } = this.props;
    const { section } = this.state;
    if (!currentUser) return null;
    if (section === "w1") {
      if (currentUser.fluency_score.length === 1) {
        switch (currentUser.fluency_progress.w1) {
          case "":
            return (
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ marginLeft: 20, marginRight: 10 }}
                onClick={() => this.props.handleClick("", "w1")}
              >
                Start
              </Button>
            );
          default:
            return (
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ marginLeft: 20, marginRight: 10, textTransform: "none" }}
                  onClick={() =>
                    this.props.handleClick(currentUser.fluency_progress.w1, "w1")
                  }
                >
                  Resume last assignment
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ marginRight: 10, textTransform: "none" }}
                  onClick={() => this.props.handleClick("", "w1")}
                >
                  Start new assignment
                </Button>
              </div>
            );
        }
      } else {
        return <h4 style={{ marginRight: 20 }}>You have finished assignment 1!</h4>
      }
    } else {
      if (new Date().getTime() - new Date(currentUser.createdAt).getTime() < 604800000) {
        return <h4 style={{ marginRight: 20 }}>You need to wait for one week to do assignment 2!</h4>
      } else if (currentUser.fluency_score.length === 2) {
        switch (currentUser.fluency_progress.w2) {
          case "":
            return (
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ marginLeft: 20, marginRight: 10 }}
                onClick={() => this.props.handleClick("", "w2")}
              >
                Start
              </Button>
            );
          default:
            return (
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ marginLeft: 20, marginRight: 10, textTransform: "none" }}
                  onClick={() =>
                    this.props.handleClick(currentUser.fluency_progress.w2, "w2")
                  }
                >
                  Resume last assignment
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ marginRight: 10, textTransform: "none" }}
                  onClick={() => this.props.handleClick("", "w2")}
                >
                  Start new assignment
                </Button>
              </div>
            );
        }
      } else if (currentUser.fluency_score.length === 1) {
        return <h4 style={{ marginRight: 20 }}>You need to do assignment 1 first!</h4>
      } else {
        return <h4 style={{ marginRight: 20 }} >You have finished assignment 2!</h4>
      }
    }
  };

  handleSectionChange = (e) => {
    this.setState({ section: e.target.value });
  }

  render() {
    const { section } = this.state;
    return (
      <Container>
        <Container>
          <InputLabel id="label">Assignment Section</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={section}
            onChange={this.handleSectionChange}
          >
            <MenuItem value="w1">Week 1</MenuItem>
            <MenuItem value="w2">Week 2</MenuItem>
          </Select>
        </Container><br />
        <h4 className="text-primary">
          placeholder: Introduction for speed training
        </h4>
        <hr />
        <div className="row">
          {this.renderButtons()}
          <Button
            variant="contained"
            color="inherit"
            size="large"
            onClick={() => (window.location = "/student/fluency")}
          >
            Go Back
          </Button>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FluencyAssignIntro);

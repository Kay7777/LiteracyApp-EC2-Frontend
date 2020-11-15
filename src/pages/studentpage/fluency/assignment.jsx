import React from "react";
import FluencyIntro from "../../../components/student/fluency/assign/assignintro";
import FluencyMain from "../../../components/student/fluency/assign/assignpart";
import FluencyProgress from "../../../components/student/fluency/assign/assign-progress";
import FluencyHeader from "../../../components/student/fluency/assets/header";
import { Container } from "@material-ui/core";

class FluencyAssignment extends React.Component {
  state = {
    understand: false,
    id: "",
    version: "w1"
  };

  render() {
    const { understand, id, version } = this.state;
    return (
      <div>
        {understand ? (
          <Container>
            {id === "" ? <FluencyMain version={version} /> : <FluencyProgress progress_id={id} />}
          </Container>
        ) : (
            <div>
              <FluencyHeader part="Training Assignment" />
              <FluencyIntro
                handleClick={(id, version) =>
                  this.setState({ understand: !understand, id, version })
                }
              />
            </div>
          )}
      </div>
    );
  }
}
export default FluencyAssignment;

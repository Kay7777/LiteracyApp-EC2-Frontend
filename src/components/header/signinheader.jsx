import React from "react";
import P1 from "../../assets/fonts/p1";
import P2 from "../../assets/fonts/p2";

export default () => {
  return (
    <div>
      <P1>Welcome to Literacy Training</P1>
      <hr />
      <P2 className="text-danger">
        You have not Signed In yet. Please Sign In by clicking the red top right
        button.
    </P2>
    </div>

  );
};

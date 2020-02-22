import {Progress, ProgressContainer} from "./Styles";
import React from "react";

export const ProgressBar = ({progress}) => {
  return (
    <ProgressContainer>
      <Progress progress={progress} />
    </ProgressContainer>
  );
};

import {Image, Progress, ProgressContainer, Result, Wrapper} from "./Styles";
import React from "react";
import doneImg from "../../assets/check_circle_outline-24px.svg";
import failedImg from "../../assets/highlight_off-24px.svg";

export const ProgressBar = ({ progress }) => {
  let imageSrc;

  if (progress && progress.state === "done") {
    imageSrc = doneImg;
  } else if (
    progress &&
    (progress.state === "canceled" || progress.state === "error")
  ) {
    imageSrc = failedImg;
  }

  return (
    <Wrapper>
      <ProgressContainer progress={progress ? progress.state : null}>
        <Progress progress={progress ? progress.percentage : 0} />
      </ProgressContainer>
      <Image src={imageSrc} />
    </Wrapper>
  );
};

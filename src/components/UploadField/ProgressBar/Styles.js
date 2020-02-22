import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  height: 24px;
`;

export const ProgressContainer = styled.div`
  display: flex;
  height: 8px;
  width: 100%;
  background-color: ${props =>
    (props.progress &&
      (props.progress === "canceled" || props.progress === "error") &&
      "red") ||
    "rgb(183, 155, 229)"};
  border-radius: 5px;
`;

export const Progress = styled.div`
  width: ${props => props.progress + "%"};
  border-radius: 5px;
  height: 100%;
  background-color: rgba(103, 58, 183, 1);
`;

export const Image = styled.img`
  margin-left: 30px;
`;

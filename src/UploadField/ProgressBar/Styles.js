import styled from "styled-components";

export const ProgressContainer = styled.div`
  width: 80px;
  height: 8px;
  background-color: rgb(183, 155, 229);
  border-radius: 5px;
`;

export const Progress = styled.div`
  width: ${props => props.progress + "%"};
  border-radius: 5px;
  height: 100%;
  background-color: rgba(103, 58, 183, 1);
`;

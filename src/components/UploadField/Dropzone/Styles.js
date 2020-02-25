import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: 2px dashed rgba(52, 55, 61, 0.25);
  color: #ccc;
  background-color: ${props => (props.highlight ? "rgb(188, 185, 236)" : "none")};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;
  opacity: 0.5;
`;

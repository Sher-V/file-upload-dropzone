import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  box-shadow: 0 0 10px rgba(22, 18, 61, 0.49);
  padding: 50px 100px;
  margin-top: 200px;
  background-color: white;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Files = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  overflow-y: auto;
`;

export const File = styled.div`
  height: 20px;
  margin-bottom: 20px;
`;

export const Buttons = styled.div`
  align-self: flex-end;
  width: 95px;
  height: 35px;
`;

export const Button = styled.button`
  font-size: 14px;
  height: 36px;
  min-width: 88px;
  padding: 6px 16px;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: none;
  border-radius: 2px;
  background: rgba(103, 58, 183, 1);
  color: #fff;
  outline: none;

  &:disabled {
    background: rgb(189, 189, 189);
    cursor: default;
  }
`;

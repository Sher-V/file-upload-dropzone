import React, { useRef } from "react";
import { Box } from "@material-ui/core";
import cloudUploadImage from "./cloud_upload-24px.svg";
import styled from "styled-components";

const Image = styled.img`
  width: 80px;
  height: 80px;
`;

export const Dropzone = ({ disabled, onFilesAdded }) => {
  const inputRef = useRef(null);

  const openFileDialog = () => {
    if (disabled) return;
    inputRef.current.click();
  };

  const onDrop = event => {
    event.preventDefault();
    if (disabled) return;
    const files = event.dataTransfer.files;
    const arrFiles = fileListToArray(files);
    onFilesAdded(arrFiles);
  };

  const onInputChange = event => {
    if (disabled) return;
    const files = event.target.files;
    const arrFiles = fileListToArray(files);
    onFilesAdded(arrFiles);
  };

  const fileListToArray = list => {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      bgcolor="text.disabled"
      width={200}
      height={200}
      onClick={openFileDialog}
      onDrop={onDrop}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      <input
        type="file"
        multiple={true}
        style={{ display: "none" }}
        ref={inputRef}
        onChange={onInputChange}
      />
      <Image src={cloudUploadImage} />
    </Box>
  );
};

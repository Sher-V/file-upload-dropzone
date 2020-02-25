import React, { useRef, useState } from "react";
import cloudUploadImage from "../assets/cloud_upload-24px.svg";
import { Container, Content, Image } from "./Styles";

export const Dropzone = ({ successfulUpload, disabled, onFilesAdded }) => {
  const inputRef = useRef(null);
  const [highlight, setHighlight] = useState(false);

  if (successfulUpload) {
    inputRef.current.value = null;
  }
  const openFileDialog = () => {
    if (disabled) return;
    inputRef.current.click();
  };

  const onDrop = event => {
    event.preventDefault();
    if (disabled) return;
    setHighlight(false);
    const files = event.dataTransfer.files;
    const arrFiles = fileListToArray(files);
    onFilesAdded(arrFiles);
  };

  const onDragOver = event => {
    event.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };

  const onDragLeave = event => {
    if(disabled) return;
    setHighlight(false);
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
    <Container
      onClick={openFileDialog}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      style={{ cursor: disabled ? "default" : "pointer" }}
      highlight={highlight}
    >
      <input
        type="file"
        multiple={true}
        style={{ display: "none" }}
        ref={inputRef}
        onChange={onInputChange}
      />
      <Content>
        <Image src={cloudUploadImage} />
        <span>Upload Files</span>
      </Content>
    </Container>
  );
};

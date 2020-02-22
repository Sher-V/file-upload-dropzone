import React, { useRef } from "react";
import cloudUploadImage from "../assets/cloud_upload-24px.svg";
import { Container, Content, Image } from "./Styles";

export const Dropzone = ({ successfulUpload, disabled, onFilesAdded }) => {
  const inputRef = useRef(null);

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
    <Container
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
      <Content>
        <Image src={cloudUploadImage} />
        <span>Upload Files</span>
      </Content>
    </Container>
  );
};

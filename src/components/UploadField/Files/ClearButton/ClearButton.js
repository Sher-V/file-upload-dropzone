import clearButton from "../../../assets/clear-24px.svg";
import { ClearBtn } from "./Styles";
import React from "react";

export const ClearButton = ({
  file,
  uploadStatus,
  cancelUpload,
  removeFile,
  uploadProgress
}) => {
  if (
    uploadProgress[file.name] &&
    (uploadProgress[file.name].state === "error" ||
      uploadProgress[file.name].state === "canceled" ||
      uploadProgress[file.name].state === "done")
  )
    return null;
  return (
    <ClearBtn
      onClick={() => {
        if (uploadStatus) cancelUpload(file);
        else removeFile(file);
      }}
    >
      <img src={clearButton} alt="Cancel" />
    </ClearBtn>
  );
};

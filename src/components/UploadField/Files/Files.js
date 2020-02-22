import React from "react";
import { File, Row, FilesWrapper } from "./Styles";
import { ClearButton } from "./ClearButton/ClearButton";

export const Files = ({
  files,
  uploadStatus,
  removeFile,
  cancelUpload,
  clearButton,
  renderProgressBar,
  uploadProgress
}) => {
  return (
    <FilesWrapper>
      {files.map((file, index) => (
        <File key={index}>
          <Row>
            {file.name}
            <ClearButton
              uploadProgress={uploadProgress}
              uploadStatus={uploadStatus}
              removeFile={removeFile}
              cancelUpload={cancelUpload}
              file={file}
            />
          </Row>
          {renderProgressBar(file)}
        </File>
      ))}
    </FilesWrapper>
  );
};

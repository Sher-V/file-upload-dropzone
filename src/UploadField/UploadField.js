import React, { useState } from "react";
import { Dropzone } from "./Dropzone/Dropzone";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import * as axios from "axios";
import { File, Files } from "./Styles";
import {ProgressBar} from "./ProgressBar/ProgressBar";

export const UploadField = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfulUpload, setSuccessfulUpload] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState(false);

  console.log("render");

  const onFilesAdded = acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  };

  const uploadFiles = async () => {
    setUploadProgress({});
    setUploadingStatus(true);
    const promises = [];
    files.forEach(file => {
      promises.push(sendRequest(file));
    });
    try {
      await Promise.all(promises);
      setSuccessfulUpload(true);
      setUploadingStatus(false);
    } catch (e) {
      //error handling
    }
  };

  const sendRequest = file => {
    return new Promise((resolve, reject) => {

      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          setUploadProgress(prevState => ({...prevState, ...copy}) );
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        setUploadProgress(prevState => ({...prevState, ...copy}));
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        setUploadProgress(prevState => ({...prevState, ...copy}));
        reject(req.response);
      });

      const formData = new FormData();
      formData.set("file", file, file.name);
      console.log(formData.get("file"))
      req.open("POST", "http://localhost:8000/upload");
      req.send(formData);
    });
  };

  const renderProgressBar = (file) => {
    const progress = uploadProgress[file.name];
    if(uploadingStatus || successfulUpload) {
      return (
        <div>
          <ProgressBar progress={progress ? progress.percentage : 0}/>
        </div>
      )
    }
  }

  const renderButtons = () => {
    if (successfulUpload) {
      return (
        <Button
          size={"medium"}
          onClick={() => {
            setFiles([]);
            setSuccessfulUpload(false);
          }}
        >
          Clear
        </Button>
      );
    } else {
      return (
        <Button size={"medium"} disabled={files.length < 0 || uploadingStatus} onClick={uploadFiles}>
          Upload
        </Button>
      );
    }
  };

  return (
    <Box width={700} display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row">
        <Dropzone
          onFilesAdded={onFilesAdded}
          disabled={uploadingStatus || successfulUpload}
        />
        <Files>
          {files.map((file, index) => (
            <File key={index}>
              {file.name}
              {renderProgressBar(file)}
            </File>
          ))}
        </Files>
      </Box>
      <Box alignSelf="flex-end" width={95} height={35}>
        {renderButtons()}
      </Box>
    </Box>
  );
};

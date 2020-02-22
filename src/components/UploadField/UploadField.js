import React, { useEffect, useRef, useState } from "react";
import { Dropzone } from "./Dropzone/Dropzone";
import * as axios from "axios";
import {Button, Buttons, Container, Content, File, Files} from "./Styles";
import { ProgressBar } from "./ProgressBar/ProgressBar";

export const UploadField = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfulUpload, setSuccessfulUpload] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState(false);

  const [canceledFile, setCanceledFile] = useState(null);
  const cancelablePromises = useRef();

  useEffect(() => {
    cancelablePromises.current = cancelablePromises.current || [];
    if (cancelablePromises.current.length) {
      cancelablePromises.current[
        cancelablePromises.current.findIndex(
          file => file.filename === canceledFile
        )
      ].cancel();
    }
  }, [canceledFile]);

  const onFilesAdded = acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  };

  const uploadFiles = async () => {
    setUploadProgress({});
    setUploadingStatus(true);
    const promises = [];
    files.forEach(file => {
      const promise = sendRequest(file);
      promises.push(promise.promise);
      cancelablePromises.current.push(promise);
    });
    await Promise.all(promises);
    setSuccessfulUpload(true);
    setUploadingStatus(false);
  };

  const sendRequest = file => {
    const formData = new FormData();
    formData.set("file", file, file.name);

    const CancelToken = axios.CancelToken;
    let cancel;
    const promise = axios
      .post("http://localhost:8000/upload", formData, {
        onUploadProgress: event => {
          const percentCompleted = Math.round(
            (event.loaded * 100) / event.total
          );
          if (percentCompleted === 100)
            setUploadProgress(prevState => ({
              ...prevState,
              ...{
                [file.name]: {
                  state: "done",
                  percentage: 100
                }
              }
            }));
          else
            setUploadProgress(prevState => ({
              ...prevState,
              ...{
                [file.name]: {
                  state: "pending",
                  percentage: percentCompleted
                }
              }
            }));
        },
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      })
      .catch(err => {
        if (axios.isCancel(err)) console.log("Request canceled");
      });

    return {
      promise,
      cancel,
      filename: file.name
    };
  };

  const renderProgressBar = file => {
    const progress = uploadProgress[file.name];
    if (uploadingStatus || successfulUpload) {
      return (
        <div>
          <ProgressBar progress={progress ? progress.percentage : 0} />
        </div>
      );
    }
  };

  const renderButtons = () => {
    if (successfulUpload) {
      return (
        <Button
          onClick={() => {
            setFiles([]);
            setSuccessfulUpload(false);
            setCanceledFile(null);
            cancelablePromises.current = null;
          }}
        >
          Clear
        </Button>
      );
    } else {
      return (
        <Button
          disabled={!files.length || uploadingStatus}
          onClick={uploadFiles}
        >
          Upload
        </Button>
      );
    }
  };

  const cancelUpload = file => {
    setCanceledFile(file.name);
  };

  return (
    <Container>
      <Content>
        <Dropzone
          successfulUpload={successfulUpload}
          onFilesAdded={onFilesAdded}
          disabled={uploadingStatus || successfulUpload}
        />
        <Files>
          {files.map((file, index) => (
            <File key={index}>
              {file.name}
              {renderProgressBar(file)}
              <button onClick={() => cancelUpload(file)}>ClearButton</button>
            </File>
          ))}
        </Files>
      </Content>
      <Buttons>
        {renderButtons()}
      </Buttons>
    </Container>
  );
};

import React, { useEffect, useReducer, useRef, useState } from "react";
import { Dropzone } from "./Dropzone/Dropzone";
import * as axios from "axios";
import {
  Button,
  Buttons,
  ClearButton,
  Container,
  Content,
  File,
  Row
} from "./Styles";
import { ProgressBar } from "./ProgressBar/ProgressBar";
import {
  initialState,
  reducer,
  setCanceledFile,
  setFiles,
  setSuccessfulUpload,
  setUploadStatus,
  setUploadProgress,
  setRemovedFile,
  clearFiles,
  clearUploadProgress,
  setStateToInitial
} from "./Reducer/Reducer";
import clearButton from "../assets/clear-24px.svg";
import { Files } from "./Files/Files";

export const UploadField = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cancelablePromises = useRef();

  useEffect(() => {
    cancelablePromises.current = cancelablePromises.current || [];
    if (cancelablePromises.current.length) {
      cancelablePromises.current[
        cancelablePromises.current.findIndex(
          file => file.filename === state.canceledFile
        )
      ].cancel();
    }

    // cancel all promises on unmount
    return () => {
      cancelablePromises.current.forEach(p => p.cancel());
      cancelablePromises.current = [];
    };
  }, [state.canceledFile]);

  const onFilesAdded = acceptedFiles => {
    dispatch(setFiles(acceptedFiles));
  };

  const uploadFiles = async () => {
    dispatch(clearUploadProgress());
    dispatch(setUploadStatus(true));
    state.files.forEach(file =>
      cancelablePromises.current.push(sendRequest(file))
    );
    const promises = Object.values(cancelablePromises.current).map(
      cancelablePromise => cancelablePromise.promise
    );
    await Promise.all(promises);
    dispatch(setSuccessfulUpload(true));
    dispatch(setUploadStatus(false));
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
            dispatch(
              setUploadProgress({
                [file.name]: {
                  state: "done",
                  percentage: 100
                }
              })
            );
          else
            dispatch(
              setUploadProgress({
                [file.name]: {
                  state: "pending",
                  percentage: percentCompleted
                }
              })
            );
        },
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      })
      .catch(err => {
        if (axios.isCancel(err))
          dispatch(
            setUploadProgress({
              [file.name]: {
                state: "canceled",
                percentage: 0
              }
            })
          );
        else {
          dispatch(
            setUploadProgress({
              [file.name]: {
                state: "error",
                percentage: 0
              }
            })
          );
        }
      });

    return {
      promise,
      cancel,
      filename: file.name
    };
  };

  const renderProgressBar = file => {
    const progress = state.uploadProgress[file.name];
    if (state.uploadStatus || state.successfulUpload) {
      return <ProgressBar progress={progress} />;
    }
  };

  const renderButtons = () => {
    if (state.successfulUpload) {
      return (
        <Button
          onClick={() => {
            setStateToInitial(dispatch);
            cancelablePromises.current = [];
          }}
        >
          Clear
        </Button>
      );
    }

    return (
      <Button
        disabled={!state.files.length || state.uploadStatus}
        onClick={uploadFiles}
      >
        Upload
      </Button>
    );
  };

  const removeFile = file => {
    dispatch(setRemovedFile(file.name));
  };

  const cancelUpload = file => {
    dispatch(setCanceledFile(file.name));
  };

  return (
    <Container>
      <Content>
        <Dropzone
          successfulUpload={state.successfulUpload}
          onFilesAdded={onFilesAdded}
          disabled={state.uploadStatus || state.successfulUpload}
        />
        <Files
          files={state.files}
          uploadProgress={state.uploadProgress}
          cancelUpload={cancelUpload}
          clearButton={clearButton}
          removeFile={removeFile}
          renderProgressBar={renderProgressBar}
          uploadStatus={state.uploadStatus}
        />
      </Content>
      <Buttons>{renderButtons()}</Buttons>
    </Container>
  );
};

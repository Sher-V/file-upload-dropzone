import produce from "immer";

const SET_FILES = "SET_FILES",
  SET_UPLOAD_PROGRESS = "SET_UPLOAD_PROGRESS",
  SET_SUCCESSFUL_UPLOAD = "SET_SUCCESSFUL_UPLOAD",
  SET_UPLOAD_STATUS = "SET_UPLOAD_STATUS",
  SET_CANCELED_FILE = "SET_CANCELED_FILE",
  SET_REMOVED_FILE = "SET_REMOVED_FILE",
  CLEAR_FILES = "CLEAR_FILES",
  CLEAR_UPLOAD_PROGRESS = "CLEAR_UPLOAD_PROGRESS";

export const initialState = {
  files: [],
  uploadProgress: {},
  successfulUpload: false,
  uploadStatus: false,
  canceledFile: null
};

export const reducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case SET_FILES:
      draft.files = draft.files.concat(action.acceptedFiles);
      break;
    case CLEAR_FILES:
      draft.files = [];
      break;
    case SET_UPLOAD_PROGRESS:
      draft.uploadProgress = {
        ...draft.uploadProgress,
        ...action.uploadProgress
      };
      break;
    case CLEAR_UPLOAD_PROGRESS:
      draft.uploadProgress = {};
      break;
    case SET_SUCCESSFUL_UPLOAD:
      draft.successfulUpload = action.successfulUpload;
      break;
    case SET_UPLOAD_STATUS:
      draft.uploadStatus = action.uploadStatus;
      break;
    case SET_REMOVED_FILE:
      const index = draft.files.findIndex(
        file => file.name === action.filename
      );
      draft.files.splice(index, 1);
      break;
    case SET_CANCELED_FILE:
      draft.canceledFile = action.filename;
      break;
    // no default
  }
});

export const setFiles = acceptedFiles => ({ type: SET_FILES, acceptedFiles });

export const clearFiles = () => ({ type: CLEAR_FILES });

export const setUploadProgress = uploadProgress => ({
  type: SET_UPLOAD_PROGRESS,
  uploadProgress
});

export const clearUploadProgress = () => ({ type: CLEAR_UPLOAD_PROGRESS });

export const setSuccessfulUpload = successfulUpload => ({
  type: SET_SUCCESSFUL_UPLOAD,
  successfulUpload
});

export const setUploadStatus = uploadStatus => ({
  type: SET_UPLOAD_STATUS,
  uploadStatus
});

export const setRemovedFile = filename => ({
  type: SET_REMOVED_FILE,
  filename
});

export const setCanceledFile = filename => ({
  type: SET_CANCELED_FILE,
  filename
});

export const setStateToInitial = dispatch => {
  dispatch(clearFiles());
  dispatch(clearUploadProgress());
  dispatch(setSuccessfulUpload(false));
  dispatch(setCanceledFile(null));
};

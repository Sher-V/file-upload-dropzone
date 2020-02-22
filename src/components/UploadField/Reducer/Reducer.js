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

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_FILES:
      if (action.acceptedFiles)
        return {
          ...state,
          files: [...state.files, ...action.acceptedFiles]
        };
      return {
        ...state,
        files: []
      };
    case CLEAR_FILES:
      return {
        ...state,
        files: []
      };
    case SET_UPLOAD_PROGRESS:
      if (action.uploadProgress)
        return {
          ...state,
          uploadProgress: {
            ...state.uploadProgress,
            ...action.uploadProgress
          }
        };
      return {
        ...state,
        uploadProgress: {}
      };
    case CLEAR_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: []
      };
    case SET_SUCCESSFUL_UPLOAD:
      return {
        ...state,
        successfulUpload: action.successfulUpload
      };
    case SET_UPLOAD_STATUS:
      return {
        ...state,
        uploadStatus: action.uploadStatus
      };
    case SET_REMOVED_FILE:
      return {
        ...state,
        files: state.files.filter(file => file.name !== action.filename)
      };
    case SET_CANCELED_FILE:
      return {
        ...state,
        canceledFile: action.filename
      };
  }
};

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

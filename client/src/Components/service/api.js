import axios from "axios";

import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from "../constants/config";

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // stop global loader here
    return processsResponse(response);
  },

  function (error) {
    // stop global loader here
    return Promise.reject(processError(error));
  }
);

const processsResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      mes: response?.mes,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    // request made and server responded a status other
    // that fails out of the range 2.x.x
    console.log("ERROR IN RESPONSE : ", error.toJSON());
    return {
      isError: true,
      mes: API_NOTIFICATION_MESSAGE.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    // request made but no response was received
    console.log("ERROR IN REQUEST : ", error.toJSON());
    return {
      isError: true,
      mes: API_NOTIFICATION_MESSAGE.requestFailure,
      code: "",
    };
  } else {
    // something happen in setting up request that triggers an error
    console.log("ERROR IN NETWORK : ", error.toJSON());
    return {
      isError: true,
      mes: API_NOTIFICATION_MESSAGE.networkError,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
}

export { API };

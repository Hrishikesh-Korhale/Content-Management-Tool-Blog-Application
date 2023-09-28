// API_NOTIFICATION_MESSAGE

export const API_NOTIFICATION_MESSAGE = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded, please wait",
  },
  sucess: {
    title: "sucess",
    message: "Data is sucessfully loaded",
  },
  responseFailure: {
    title: "Error",
    message:
      "An Error occured while fetching response from the server. Please try again",
  },
  requestFailure: {
    title: "Error",
    message: "An Error occured while parsing request data",
  },
  networkError: {
    tilte: "Error",
    message:
      "Unable to connect with the server. Please check internet connectivity and try again later",
  },
};

// API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL: { url : '/' , method: 'POST/GET/PUT/DELETE' params: true/false, query: true/false}

export const SERVICE_URLS = {
  userSignup: { url: "/signup", method: "POST" },
};

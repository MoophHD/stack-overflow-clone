import axios from "axios";

const addTokenToHeader = (token) => {
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.Authorization;
  }
};

const storeAuthToken = (token) => {
  localStorage.token = token;
};

const setAuthToken = (token) => {
  addTokenToHeader(token);
  storeAuthToken(token);
};

export default setAuthToken;

import axios from 'axios';
import {IS_LOADING, SNACKBAR_OPEN} from "../reducers";
import config from "./Config";
import {logout} from "../services/AuthServices";

axios.defaults.baseURL = config.API_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 0;

export const ApiUtils = {
  axios: axios.create({baseURL: config.API_URL, withCredentials: true, timeout: 0}),
  dispatch: null,
  state: null,
  navigate: null
};

const changeLoaderStatus = () => {
  ApiUtils.dispatch({type: IS_LOADING, payload: {isLoad: false}});
  ApiUtils.dispatch({type: 'IS_NOT_LOADING', payload: true});
};

// Add a request interceptor
ApiUtils.axios.interceptors.request.use(function (config) {
  ApiUtils.dispatch({type: IS_LOADING, payload: {isLoad: ApiUtils.state.loaderState}});
  return config;
}, function (error) {
  changeLoaderStatus();
  if (!error.response) {
    ApiUtils.dispatch({type: SNACKBAR_OPEN, payload: {isNotify: true, severity: 'error', message: error.message}});
    return Promise.reject(error.message);
  }
  let message = error?.response?.data?.error || error?.response?.data?.errors?.join(', ');
  // Do something with request error
  ApiUtils.dispatch({type: SNACKBAR_OPEN, payload: {isNotify: true, severity: 'error', message: message}});
  return Promise.reject(message);
});

ApiUtils.axios.interceptors.response.use(function (response) {
  changeLoaderStatus();
  return response;
}, function (error) {
  changeLoaderStatus();
  if (!error.response) {
    ApiUtils.dispatch({type: SNACKBAR_OPEN, payload: {isNotify: true, severity: 'error', message: error.message}});
    return Promise.reject(error.message);
  }
  if (401 === error.response.status) {
    sessionStorage.clear();
    localStorage.clear();
    logout(ApiUtils.dispatch, ApiUtils.navigate).then(r => r);
  }
  let message = error?.response?.data?.error || error?.response?.data?.errors?.join(', ');
  ApiUtils.dispatch({type: SNACKBAR_OPEN, payload: {isNotify: true, severity: 'error', message: message}});
  return Promise.reject(message);
});

export default (url, method, params, data, responseType) => ApiUtils.axios.request({
  url,
  method,
  params,
  data,
  responseType
});

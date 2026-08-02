import axios from 'axios';

// Strip a stray leading BOM/whitespace so a bad env var value can't silently
// turn baseURL into an unparseable URL (seen when the value was re-pasted
// into Vercel's env var UI from a BOM-prefixed source).
const baseURL = (import.meta.env.VITE_API_BASE_URL || '').replace(/^\uFEFF/, '').trim();

const ApiClient = axios.create({
  baseURL,
  timeout: 15000
});

ApiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      return Promise.reject({message: error.message});
    }
    return Promise.reject({
      message: error.response.statusText,
      statusCode: error.response.status,
      ...error.response.data
    });
  }
);

//Function create auttentication header with token in localStorage
export const setAuthorizationHeader = ({token}) => {
  console.log('Dentro: ', token);
  ApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

//Function delete autenticatios headers
export const removeAuthorizationHeader = () => {
  delete ApiClient.defaults.headers.common['Authorization'];
};

export default ApiClient;

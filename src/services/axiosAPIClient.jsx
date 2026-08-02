import axios from 'axios';

const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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

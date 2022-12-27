import axios from "axios";

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const expectedError =
      err.response && err.response.status >= 400 && err.response.status < 500;
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found1`);
    }
    throw err;
  }
);
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

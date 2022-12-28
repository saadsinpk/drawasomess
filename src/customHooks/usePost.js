import { getTokenSession } from "../website/utils/common";
import http from "../services/httpServices";
import config from ".../services/config.json";
import { useState } from "react";

const usePost = () => {

  const [res, setRes] = useState({ data: null, error: null, isLoading: false });

  const secret = process.env.REACT_APP_SECRET;
  const authentication = getTokenSession();
  const headers = {
    secret: `${secret}`,
    authentication: `token ${authentication}`,
    "Content-Type": "multipart/form-data",
  };

  const callAPI  = async (url, payload) => {
    console.log("inner")
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    http
      .post(`${config.apiEndPoint}${url}`, payload, {
        headers,
      })
      .then((res) => {
        
        setRes({ data: res.data, isLoading: false, error: null });
      })
      .catch((error) => {
        setRes({ data: null, isLoading: false, error });
      });
  };
  // console.log("outer",res)
  return [res, callAPI];
};
export default usePost;

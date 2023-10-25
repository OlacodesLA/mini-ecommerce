import { fmtResponse } from "@/utils";
import axios from "axios";
import toast from "react-hot-toast";

const checkInternetConnectivity = () => {
  if (!navigator.onLine) {
    toast.error("No interneet connection");
    return Promise.reject(new Error("No internet connection"));
  }
  return Promise.resolve();
};

const baseURL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_URL_STAGGING
    : process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION;

const service = axios.create({
  baseURL,
  withCredentials: true,
});

// request interceptor
axios.interceptors.request.use(
  async function (config) {
    await checkInternetConnectivity();

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  // @ts-ignore

  (response) => {
    // Return the entire AxiosResponse object
    return fmtResponse(response, false);
  },
  function (error) {
    console.log(error, "this is the error from the interceptor----2");

    // Check if error is an axios error
    if (error && !error.response.data) {
      const { response } = error;
      return fmtResponse(response, true);
    } else {
      const { response } = error;
      return fmtResponse(response, true);
    }
  }
);

export default service;

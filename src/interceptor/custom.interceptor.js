import axios from "axios";

const instance = axios.create();

const userBrigate = "admin";
const passwordBrigate = "SuperSecretPwd";
const token = Buffer.from(`${userBrigate}:${passwordBrigate}`, "utf8").toString(
  "base64"
);

// Req interceptor
instance.interceptors.request.use(
  function (request) {
    const isLogin = request.url.includes("login");
    request.headers.authorization = `Basic ${token}`;
    request.headers["Content-Type"] = "application/json";
    // if (!isLogin) {
    //   // Tambah authnya disini
    //   request.headers.authorization = `Basic ${token}`;
    //   request.headers["Content-Type"] = "application/json";
    // }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;

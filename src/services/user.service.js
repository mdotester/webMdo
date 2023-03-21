import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import axios from "axios";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointAD}`;

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

// const userBrigate = "contactCenter";
const userBrigate = "admin";
// const passwordBrigate = "C0nt4ctC3nter!14017";
const passwordBrigate = "SuperSecretPwd";
const token = Buffer.from(`${userBrigate}:${passwordBrigate}`, "utf8").toString("base64");

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
};

function login(username, password) {
  console.log("baseUrl:", baseUrl);
  console.log("token:", token);
  return axios
    .post(
      baseUrl,
      {
        userLogin: username,
        password: password,
        channelId: "Test Channel",
        userAgent: "Firefox",
        ipAddress: "172.18.141.41",
      },
      {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
          // "Access-Control-Allow-Credentials": "true",
        },
      }
    )
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      console.log(user);
      if (user.data.status == true) {
        userSubject.next(user);
        localStorage.setItem("user", JSON.stringify(user));
        // console.log("save user session");
      }
      return user;
    })
    .catch(console.err);
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/login");
}

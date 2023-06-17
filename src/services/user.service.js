import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "../helpers";
import { postApi } from "../common/api";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointAD}`;

const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

// const userBrigate = "contactCenter";
// const passwordBrigate = "C0nt4ctC3nter!14017";
const userBrigate = "admin";
const passwordBrigate = "SuperSecretPwd";
// const token = Buffer.from(`${userBrigate}:${passwordBrigate}`, "utf8").toString(
//   "base64"
// );

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
};

function login(username, password) {
  return postApi(baseUrl, {
    userLogin: username,
    password: password,
    channelId: "Test Channel",
    userAgent: "Firefox",
    ipAddress: "172.18.141.41",
  })
    .then((user) => {
      // console.log(user, "<<<<<<<<<<<");
      if (user.status == true) {
        userSubject.next(user);
        localStorage.setItem("user", JSON.stringify(user));
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

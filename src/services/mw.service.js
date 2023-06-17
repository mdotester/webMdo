import { postApi } from "../common/api";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const mwService = {
  createAlert,
  updateCacheEsb,
};

const user = "admin";
const password = "SuperSecretPwd";
const token = Buffer.from(`${user}:${password}`, "utf8").toString("base64");
const endpointCreateAlert = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointCreateAlert}`;
const endpointUpdateCache = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointUpdateCache}`;

function createAlert(reqBody) {
  const bodyReq = JSON.stringify(reqBody);
  return postApi(endpointCreateAlert, bodyReq)
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    .catch((err) => console.log("createAlert error : ", err));
}

function updateCacheEsb(reqBody) {
  const bodyReq = JSON.stringify(reqBody);
  console.log(endpointUpdateCache);
  return postApi(endpointUpdateCache, bodyReq)
    .then((resp) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      console.log(resp);
      //   if (user.data.status == true) {
      //     userSubject.next(user);
      //     localStorage.setItem("user", JSON.stringify(user));
      //     // console.log("save user session");
      //   }
      return resp;
    })
    .catch(console.err);
}

import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const mwService = {
  updateCacheEsb,
};

const user = "admin";
const password = "SuperSecretPwd";
const token = Buffer.from(`${user}:${password}`, "utf8").toString("base64");
const endpointUpdateCache = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointUpdateCache}`;

function updateCacheEsb(reqBody) {
  let bodyReq = JSON.stringify(reqBody);
  //   console.log(bodyReq);
  console.log(endpointUpdateCache);
  return axios
    .post(endpointUpdateCache, bodyReq, {
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": "true",
      },
    })
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

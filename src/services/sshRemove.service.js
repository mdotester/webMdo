import getConfig from "next/config";
import axios from "axios";

const { publicRuntimeConfig } = getConfig();
const endpointLaunchAnsible = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointLaunchAnsible}`;

const user = "admin";
const password = "SuperSecretPwd";
const token = Buffer.from(`${user}:${password}`, "utf8").toString("base64");

export const ansibleService = {
  ansibleLaunch,
};

function ansibleLaunch() {
  // let bodyReq = JSON.stringify(reqBody);
  return (
    axios
      // .post(`${endpointLaunchAnsible}`, bodyReq, {
      .post(endpointLaunchAnsible, bodyReq, {
        headers: {
          Authorization: `Basic crGU7ZVYLkMjpXPq30L2LlQjdKVkqd`,
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Credentials": "true",
        },
      })
      .then((resp) => {
        console.log(resp);
        return resp;
      })
      .catch(console.err)
  );
}

import getConfig from "next/config";
import axios from "axios";

const { publicRuntimeConfig } = getConfig();
const endpointAuditTrail = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointAuditTrail}`;

const user = "admin";
const password = "SuperSecretPwd";
const token = Buffer.from(`${user}:${password}`, "utf8").toString("base64");

export const auditService = {
  auditGet,
  auditInsert,
};

function auditGet() {
  return axios
    .get(endpointAuditTrail, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    .then((resp) => {
      return resp.data;
    })
    .catch(console.err);
}

function auditInsert(reqBody) {
  let bodyReq = JSON.stringify(reqBody);
  return (
    axios
      // .post(`${endpointAuditTrail}`, bodyReq, {
      .post(endpointAuditTrail, bodyReq, {
        headers: {
          Authorization: `Basic ${token}`,
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

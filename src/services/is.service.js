import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import axios from "axios";
import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const endpointFetchService = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointFetchService}`;
const endpointEsbGet = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointEsbGet}`;

const user = "admin";
const password = "SuperSecretPwd";
const token = Buffer.from(`${user}:${password}`, "utf8").toString("base64");

export const isService = {
  fetchService,
};

function fetchService() {
  // console.log("endpointFetchService:", endpointFetchService);
  // console.log("token:", token);
  return axios
    .post(
      endpointFetchService,
      {},
      {
        headers: {
          // Authorization: `Basic ${token}`,
          // Ini sementara dihardcode
          Authorization: `Basic YWRtaW46U3VwZXJTZWNyZXRQd2Q=`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    )
    .then((resp) => {
      return resp.data; //Mengembalikan response data.
    })
    .catch(console.err);
}

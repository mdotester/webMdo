import getConfig from "next/config";
import axios from "axios"

const { publicRuntimeConfig } = getConfig();
const endpointEsbGet = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointEsbGet}`;

const user = "admin";
const password = "SuperSecretPwd";
const token = Buffer.from(`${user}:${password}`, "utf8").toString("base64");

export const updateServiceEsb = {
    esbGetService,
};

function esbGetService() {
    return axios
      .get(endpointEsbGet, {
        headers: {
          Authorization: `Basic ${token}`,
        }
      })
      .then((resp) => {
        return resp.data;
      })
      .catch(console.err);
  }
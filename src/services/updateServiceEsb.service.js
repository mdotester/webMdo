import getConfig from "next/config";
import { getApi } from "../common/api";

const { publicRuntimeConfig } = getConfig();
const endpointEsbGet = `${publicRuntimeConfig.apiCloseUrl}${publicRuntimeConfig.endpointEsbGet}`;

const user = "admin";
const password = "SuperSecretPwd";
const token = Buffer.from(`${user}:${password}`, "utf8").toString("base64");

export const updateServiceEsb = {
  esbGetService,
};

function esbGetService() {
  return getApi(endpointEsbGet).catch(console.err);
}

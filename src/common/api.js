import axios from "../interceptor/custom.interceptor";

async function getApi(url) {
  return axios.get(url).then((res) => res.data);
}

async function postApi(url, data) {
  return axios.post(url, data, { method: "POST" }).then((res) => res.data);
}

export { getApi, postApi };

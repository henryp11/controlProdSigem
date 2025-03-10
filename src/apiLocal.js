// import Cookies from "universal-cookie";
// const cookies = new Cookies();
// let baseurl = cookies.get("baseUrl");

const BASE_URL = "http://localhost:3001";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

async function callApi(endpoint, options = {}) {
  await simulateNetworkLatency();

  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const apiLocal = {
  produccion: {
    list() {
      return callApi("/produccion");
    },

    create(OT) {
      return callApi(`/produccion`, {
        method: "POST",
        body: JSON.stringify(OT),
      });
    },
    read(idOT) {
      return callApi(`/produccion/${idOT}`);
    },
    update(idOT, updates) {
      return callApi(`/produccion/${idOT}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
    },
  },
  inventario: {
    list() {
      return callApi("/inventario");
    },
    read(idPT) {
      return callApi(`/inventario/${idPT}`);
    },
    update(idPT, updates) {
      return callApi(`/inventario/${idPT}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
    },
  },
};

export default apiLocal;

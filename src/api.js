import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
let baseurl = cookies.get("baseUrl");
let tipoUser = cookies.get("usrTipo");

const BASE_URL = "http://localhost:3001";
const BASE_URL_FINAL = `${baseurl}/LoadProduc.php`;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

const handleCheckAutMP = (usuario) => {
  if (usuario === "1" || usuario === 1) {
    return "1";
  } else {
    return "3";
  }
};

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

async function callApiWeb(token, options = {}) {
  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const url = BASE_URL_FINAL;
  await axios
    .get(url, {
      params: {
        p1: token,
      },
    })
    .then((response) => {
      console.log(response);
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const api = {
  produccion: {
    list() {
      return callApi("/produccion");
    },
    list2(token) {
      return callApiWeb(token);
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
  materiasPrimas: {
    list() {
      return callApi("/materiasprimas");
    },
    update(idOT, updates1, updates2, idPT, idMPAlter, nombreMP, cantCambio) {
      let formIni = updates1;
      let formFin = updates2;
      const positionPTOrg = formFin.PT.map((item) => item.itemPT).indexOf(idPT);

      console.log(formFin);

      JSON.stringify(formIni, function (key, value) {
        // let arrayPT = value;
        // console.log(arrayPT.PT[0].unidMed);

        if (key === "PT") {
          let arrayPT = value;
          // const formFin = this.state.form2;
          const positionPT = arrayPT.map((item) => item.itemPT).indexOf(idPT);
          console.log(arrayPT);
          //return [{ ...arrayPT[0], unidMed: "pruebaSpread" }];
          return (formIni = {
            ...arrayPT[positionPT],
            cambiosOK: handleCheckAutMP(tipoUser),
            MP: [
              {
                ...arrayPT[positionPT].MP[0],
                action: "1",
                idMPAlter: idMPAlter,
                descripMPAlter: nombreMP,
                cantAlter: cantCambio,
              },
            ],
          });
        } else {
          return value;
        }
      });

      console.log(formIni);
      formFin.PT[positionPTOrg] = formIni;
      console.log(formFin);

      // Orig. DB Local
      // return callApi(`/produccion/${idOT}`, {
      //   method: "PUT",
      //   body: JSON.stringify(formFin),
      // });
      try {
        const response = fetch(
          `${baseurl}/SaveProduc.php?p1=${cookies.get("token")}`,
          {
            method: "POST",
            body: JSON.stringify(formFin),
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default api;

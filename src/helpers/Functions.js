import CryptoJS from "crypto-js";

//FUNCION de ASCII a hexadecimal
const ascii_to_hexa = (str) => {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
};

export const Encriptar = (texto, estado) => {
  var origKey = ascii_to_hexa("CapSoft2021EcCapCapSoft2021EcCap");
  //convierte la cadena dada en hexadecimal, para poder procesar adecuadamente
  var key = CryptoJS.enc.Hex.parse(origKey);
  var result = "";
  if (estado === true) {
    //encriptar
    result = CryptoJS.AES.encrypt(texto, key, {
      mode: CryptoJS.mode.ECB,
    }).toString();
  } else {
    //desencriptar
    var decrypted = CryptoJS.AES.decrypt(texto.toString(), key, {
      mode: CryptoJS.mode.ECB,
    });
    result = decrypted.toString(CryptoJS.enc.Utf8);
  }
  return result;
};

export const addZero = (dato) => {
  if (dato.toString().length === 1) {
    return `0${dato}`;
  } else {
    return dato;
  }
};

export const formatoFecha = () => {
  const fecha = new Date();
  const mes = fecha.getMonth() + 1;
  // const fechaFormat = `${addZero(fecha.getDate())}/${addZero(
  //   mes
  // )}/${fecha.getFullYear()}`;
  const fechaFormat = `${fecha.getFullYear()}-${addZero(mes)}-${addZero(
    fecha.getDate()
  )}`;
  return fechaFormat;
};

export const formatoFechaModal = (tipoFecha) => {
  const fecha = new Date();
  const mes = fecha.getMonth() + 1;
  if (tipoFecha === 1) {
    const fechaFormat = `${fecha.getFullYear()}-${addZero(mes)}-${addZero(
      fecha.getDate()
    )}`;
    return fechaFormat;
  } else {
    const fechaFormat = `${fecha.getFullYear()}-${addZero(mes)}-${addZero(
      fecha.getDate()
    )}T${addZero(fecha.getHours())}:${addZero(fecha.getMinutes())}`;
    return fechaFormat;
  }
};

export const escapeRegExp = (string) => {
  //return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return string.replace(/\+/g, "%2B");
};

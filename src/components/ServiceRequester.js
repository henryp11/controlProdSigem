import React from 'react';
import CryptoJS from 'crypto-js';

class ServiceRequester extends React.Component {
  state = {
    palabra: '',
    palabraEncrip: '',
    palabraDesEncrip: '',
    keyHexa: '',
    token: '',
    tokenDes: '',
  };
  /*----------------------------------------*/
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //FUNCION de hexadecimal a ASCII
  hex_to_ascii(str1) {
    var hexa = str1.toString();
    var mystr = '';
    for (var n = 0; n < hexa.length; n += 2) {
      mystr += String.fromCharCode(parseInt(hexa.substr(n, 2), 16));
    }
    return mystr;
  }

  //FUNCION de ASCII a hexadecimal
  ascii_to_hexa(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }

  Encriptar(texto, estado) {
    var origKey = this.ascii_to_hexa('CapSoft2021EcCapCapSoft2021EcCap');
    //convierte la cadena dada en hexadecimal, para poder procesar adecuadamente
    var key = CryptoJS.enc.Hex.parse(origKey);
    var result = '';
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
  }

  procesar() {
    // INIT
    let datoCadena = this.state.palabra;
    if (datoCadena !== '') {
      // document.getElementById("demo0").innerHTML =
      //   "Ingresaste el dato: " + datoCadena;
      var datoEnc = '';
      var datoDes = '';
      //llama a las funciones de encriptado y desencriptado
      datoEnc = this.Encriptar(datoCadena, true);
      // document.getElementById("demo1").innerHTML =
      //   "Dato encriptado => " + datoEnc;
      this.setState({ palabraEncrip: datoEnc });
      datoDes = this.Encriptar(datoEnc, false);
      this.setState({ palabraDesEncrip: datoDes });
      // document.getElementById("demo2").innerHTML =
      //   "Dato desencriptado => " + datoDes;
      // document.getElementById("demo3").innerHTML = this.ascii_to_hexa(
      //   "CapSoft2021EcCapCapSoft2021EcCap" );

      this.setState({
        keyHexa: this.ascii_to_hexa('CapSoft2021EcCapCapSoft2021EcCap'),
      });
    } else alert('¡Debes ingresar un texto para poder procesar!');
  }

  procesarToken() {
    // INIT
    let datoCadena = this.state.token;
    if (datoCadena !== '') {
      var datoDes = '';
      //llama a las funciones de encriptado y desencriptado
      datoDes = this.Encriptar(this.state.token, false);
      this.setState({ tokenDes: datoDes });

      this.setState({
        keyHexa: this.ascii_to_hexa('CapSoft2021EcCapCapSoft2021EcCap'),
      });
    } else alert('¡Debes ingresar un texto para poder procesar!');
  }

  render() {
    console.log(this.state.palabra);
    console.log(this.state.palabraEncrip);
    console.log(this.state.token);
    console.log(this.state.tokenDes);

    return (
      <div>
        <h1>
          Palabra Original: {this.state.palabra} <br />
          <input type='text' name='palabra' onChange={this.handleChange} />
        </h1>

        <h1>Palabra encriptada: {this.state.palabraEncrip}</h1>
        <h1>Palabra Desencriptada: {this.state.palabraDesEncrip}</h1>

        <h1>Key en Hexadecimal: {this.state.keyHexa} </h1>

        <button
          onClick={() => {
            this.procesar();
          }}
        >
          ENCRIPTAR
        </button>
        <h2>
          Token: {this.state.token} <br />
          <input type='text' name='token' onChange={this.handleChange} />
        </h2>
        <h2>Token Desencriptado: {this.state.tokenDes}</h2>
        <button
          onClick={() => {
            this.procesarToken();
          }}
        >
          DESENCRIPTAR
        </button>
      </div>
    );
  }
}

export default ServiceRequester;

// /*import sha256 from "crypto-js/sha256";
// import hmacSHA512 from "crypto-js/hmac-sha512";
// import Base64 from "crypto-js/enc-base64";
// import CryptoJS from "crypto-js"; */

// import Rijndael from "rijndael-js";
// import utf8 from "utf8";

// class ServiceRequester extends React.Component {
//   state = {
//     palabra: "",
//     palabraEncrip: "",
//   };

// /*  encriptar(message) {
//     //const miDato = utf8.encode("casa");
//     const cipher = CryptoJS.AES.encrypt(message, "Ecuador", {
//       mode: CryptoJS.mode.ECB,
//     });
//     // Convierta los datos cifrados en Base64
//     //const base64Cipher = cipher.ciphertext.toString(CryptoJS.enc.Base64);
//     let prueba1 = CryptoJS.enc.Base64.stringify(cipher.ciphertext);
//     console.log(prueba1);
//   }

//   desencriptar() {
//     const decipher = CryptoJS.AES.decrypt(
//       "TA5x88EOIetUrxGnACOGVA==",
//       "CapSoft2021EcCap",
//       {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.ZeroPadding,
//         iv: "",
//       }
//     ); */

//     // Convierta el objeto descifrado en una cadena UTF8
//   /*  const resultDecipher = CryptoJS.enc.Utf8.stringify(decipher);
//     console.log(resultDecipher);
//   }*/

//   getCrypto(word, status) {
//      // let original = "algo";
//      let key = "CapSoft2021EcCapSoft2021EcCapSof"; // 32 length
//      //let iv = "0000000000000000"; // 16 length
//      // let cipher = new Rijndael(key, "cbc");
//      let cipher = new Rijndael(key, "ecb");
//     //let ciphertext = cipher.encrypt(word, 128, iv);
//     let ciphertext = cipher.encrypt(word, 128);

//      //let ciphertext2 = cipher.encrypt("Gato".split("").map((num)=>{return num.charCodeAt(0)}), 128, iv);
//      // let resultado = ciphertext.toString("base64");

//      //console.log(ciphertext.toString("base64"));
//      // console.log(cipher.decrypt(ciphertext, 128, iv).toString());
//      let micasa = btoa("casa");

//     //if (status) {
//     let resultEncript = ciphertext
//       .map((num) => {
//         return String.fromCharCode(num).toString();
//       })
//       .reduce((acc, item) => {
//         return (acc += item);
//       });
//     let previo = utf8.encode(resultEncript);

//     //.toString();
//     //let salida = btoa(resultEncript);
//     // let salida = btoa(utf8.encode(resultEncript));
//     /*let salida = btoa(
//       encodeURIComponent(resultEncript).replace(
//         /%([0-9A-F]{2})/g,
//         function toSolidBytes(match, p1) {
//           return String.fromCharCode("0x" + p1);
//         }
//       )
//     ); */
//     // this.setState({ palabra: resultEncript });
//     //} else {
//     let resultDesencrip = cipher
//       //.decrypt(ciphertext, 128, iv)
//       .decrypt(ciphertext, 128)
//       .map((num) => {
//         return String.fromCharCode(num).toString();
//       })
//       .reduce((acc, item) => {
//         return (acc += item);
//       })
//       .toString();
//     //this.setState({ palabraEncrip: resultDesencrip });
//     //}

//     console.log(micasa);
//     console.log("--- palabra: " + this.state.palabra);
//     console.log(ciphertext);
//     console.log("--- Encript Utf8: " + utf8.encode(resultEncript));
//     console.log("--- Encript Normal: " + resultEncript);
//     //console.log("--- Encript salida: " + salida);
//     console.log("--- DesEncript: " + resultDesencrip);
//   }

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   render() {
//     console.log(this.state.palabra);
//     console.log(this.state.palabraEncrip);

//     return (
//       <div>
//         <h1>Palabra Original: {this.state.palabra}</h1>
//         <input type="text" name="palabra" onChange={this.handleChange} />
//         <h1>Palabra encriptada: {this.state.palabraEncrip}</h1>
//         <button
//           onClick={() => {
//             this.encriptar("casa");
//           }}
//         >
//           Prueba
//         </button>
//         <button onClick={this.desencriptar}>DESENCRIPTA</button>

//         {/* <button onClick={() => this.getCrypto(this.state.palabra, true)}>
//           ENCRIPTAR
//         </button>
//         <button onClick={() => this.getCrypto(this.state.palabra, false)}>
//           DESENCRIPTAR
//         </button> */}
//       </div>
//     );
//   }
// }

// export default ServiceRequester;

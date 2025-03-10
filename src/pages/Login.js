import React from "react";
import "../styles/forms.css";
import axios from "axios"; //Dependendia para hacer peticiones a una API
//import publicIP from "react-native-public-ip";
import { Encriptar, addZero, escapeRegExp } from "../helpers/Functions";
import Cookies from "universal-cookie";

const fecha = new Date();
const mes = fecha.getMonth() + 1;
const fechaFormat = `|${fecha.getFullYear() - 2000}${addZero(mes)}${addZero(
  fecha.getDate()
)}${addZero(fecha.getHours())}${addZero(fecha.getMinutes())}${addZero(
  fecha.getSeconds()
)}`;
//const fechaFormat = `${fecha.getFullYear()}0${fecha.getMonth() + 1}${fecha.getDate()}|${fecha.getHours()}0${fecha.getMinutes()}${fecha.getSeconds()}`;
//const baseUrl = "http://localhost:3002/usuarios";
var tipoProt = "";
if (window.location.protocol !== "https:") tipoProt = "http://";
else tipoProt = "https://";

const baseUrl2 = tipoProt + "capacity-ecuador.com/utiles/getIp.php";
const baseUrl3 =
  tipoProt + "capacity-ecuador.com/utiles/startData.php?p1=destino"; //Web final
// tipoProt + "capacity-ecuador.com/utiles/startData.php?p2=destino"; //pruebas
const baseUrl4 =
  tipoProt + "capacity-ecuador.com/utiles/startData.php?p1=linkWeb";

var baseUrl = "";
var webDirection = "";
const cookies = new Cookies();

class Login extends React.Component {
  state = {
    form: {
      username: "",
      password: "",
      token: "",
      // esadmin: ""
    },
    ip: "",
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Verifico si el usuario esta logueado para que redirija al menú y vicesersa
  componentDidMount() {
    this.fetchIP();
    this.fetchRouteData();
    this.fetchWebUrl();
    //Indico si existe la cookie username (puede ser cualquiera de referencia), redirija al menu
    if (cookies.get("usrId")) {
      window.location.href = `./#/produccion`;
      // window.location.href = `./moverprint/produccion`;
    }
  }

  fetchIP = async () => {
    await axios
      .get(baseUrl2)
      .then((response) => {
        this.setState({ ip: response.data.toString().trim() });
        // console.log(this.state.ip);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchRouteData = async () => {
    await axios
      .get(baseUrl3)
      .then((response) => {
        console.log(response);
        baseUrl = `${response.data.toString().trim()}`;
        console.log(baseUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchWebUrl = async () => {
    await axios
      .get(baseUrl4)
      .then((response) => {
        webDirection = `${response.data.toString().trim()}`;
        cookies.set("webDirection", webDirection, { path: "/" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Metodo para realizar petición http e iniciar sesión
  iniciarSesion = async () => {
    await this.setState({
      form: {
        ...this.state.form,
        token: escapeRegExp(
          Encriptar(
            `${this.state.ip}|${this.state.form.username}|${this.state.form.password}${fechaFormat}`,
            true
          )
        ),
      },
    });
    //Uso el método get de axios en donde paso la URL y luego los parámetros como objeto
    await axios
      .get(`${baseUrl}/CheckIn.php`, {
        params: {
          p1: this.state.form.token,
          // username: this.state.form.username,
          // password: this.state.form.password,
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((response) => {
        // console.log(response);
        cookies.set("token", this.state.form.token, { path: "/" });
        console.log(cookies.get("token"));
        var respuestaOk = response.split("|")[0];
        var respuestaIdUser = response.split("|")[1];
        var respuestaIdTipoUser = response.split("&")[1];

        if (respuestaOk === "1") {
          cookies.set("baseUrl", baseUrl, { path: "/" });
          cookies.set("usrId", respuestaIdUser, { path: "/" });
          cookies.set("usrTipo", respuestaIdTipoUser, { path: "/" });
          window.location.href = "./#/produccion"; //aqui redirijo a una ruta una vez que inicio de sesión sea correcto
          // window.location.href = "./moverprint/produccion"; //aqui redirijo a una ruta una vez que inicio de sesión sea correcto
        } else {
          alert("Usuario o contraseña incorrecto");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <>
        <section className="mainForm">
          <form onSubmit={this.handleSubmit} className="loginForm">
            <h1 className="formTittle">Acceso</h1>
            <div className="formUserName">
              <label htmlFor="">Usuario:</label>
              <input
                className="inputUser"
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="formUserPass">
              <label htmlFor="">Contraseña:</label>
              <input
                className="inputUser"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <button
              className="btnCustom"
              onClick={() => {
                this.iniciarSesion();
              }}
            >
              Ingresar
            </button>
          </form>
        </section>
      </>
    );
  }
}

export default Login;

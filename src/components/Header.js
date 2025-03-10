import React from "react";
import Logo from "../images/Logo.png";
import "../styles/header.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const year = new Date().getFullYear();
const cookies = new Cookies();
let baseurl = cookies.get("baseUrl");
let web = cookies.get("webDirection");

const urlCheckout = `${baseurl}/CheckOut.php`;
console.log(cookies.get("usrId"));
class Header extends React.Component {
  cerrarSesion = async () => {
    await axios
      .get(urlCheckout, {
        params: {
          p1: cookies.get("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        //Asi remuevo las cookies
        cookies.remove("token", { path: "/" });
        cookies.remove("usrId", { path: "/" });
        cookies.remove("usrTipo", { path: "/" });
        window.location.href = "./";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <header className="header">
        <Link to="/">
          <img src={Logo} className="header-logo" alt="logo" />
        </Link>
        <h2>
          Control De Producción e Inventarios <br />
          <a href={web} target="_blank" rel="noreferrer" className="credits">
            {`SiGeM Business Software ERP® / Capacity-Soft ${year}`}
          </a>
        </h2>
        <div className="header-btnCustom">
          <Link to="/produccion" className="btnCustom">
            Producción
          </Link>
          <Link to="/inventario" className="btnCustom">
            Inventario
          </Link>
          <button
            to="/"
            className="btnCustom btnCustom-exit"
            onClick={() => this.cerrarSesion()}
          >
            {/* Salir */}
            <span class="icon-exit"></span>
          </button>
        </div>
      </header>
    );
  }
}

export default Header;

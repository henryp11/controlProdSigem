import React from "react";
// import ReactDOM from "react-dom"; //Importo reactDom para hacer portales: Portal me ayuda a renderizar algo afuera de la app principal para evitar problemas de diseño en css como el z-index
import "../styles/modal.css";
import "../styles/fonts.css";
//import api from "../api";
import { Link } from "react-router-dom";
import { formatoFecha } from "../helpers/Functions";
import Cookies from "universal-cookie";
const cookies = new Cookies();
let baseurl = cookies.get("baseUrl");

class Modal extends React.Component {
  state = {
    loading: true,
    error: null,
    data: {
      id: "",
      descrip: "",
      cantActual: "",
      unidMed: "",
      cantFisica: "",
      observInv: "",
      action: "",
      fechaRegistro: "",
    },
  };

  componentDidMount() {
    this.fetchInven();
  }

  fetchInven = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `${baseurl}/LoadInven.php?p1=${cookies.get("token")}`
      );
      const data = await response.json();
      const dataPTUnique =
        data.inventario[
          data.inventario
            .map((item) => item.id)
            .indexOf(this.props.match.params.PtId)
        ];
      // console.log(dataPTUnique);
      this.setState({
        loading: false,
        data: dataPTUnique,
      });
      this.setState({
        data: { ...this.state.data, fechaRegistro: formatoFecha() },
      });
      // this.setState({ data: { fechaRegistro: formatoFecha() } });
      // console.log(this.state.data);
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
        action: "1",
      },
    });
    // this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault(); //Aplico la detención del evento para que no recargue la página
    this.setState({ loading: true, error: null });

    /////////
    try {
      const response = await fetch(
        `${baseurl}/SaveInven.php?p1=${cookies.get("token")}`,
        {
          method: "POST",
          body: JSON.stringify(this.state.data),
        }
      );
      console.log(response);
      this.setState({ loading: false });
      this.props.history.push(`/inventario`);
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    // console.log(this.state.data);
    const dataInven = this.state.data;
    // if (!isOpen) {
    //   return null;
    // }

    // return ReactDOM.createPortal(
    console.log(dataInven);
    return (
      <div className="myModal">
        <div className="modal_container">
          <form onSubmit={this.handleSubmit} className="modal_form">
            <h1 className="modal_title">Ingresando datos item:</h1>
            <h3 className="modal_item">{`${dataInven.id} / ${dataInven.descrip}`}</h3>
            <div className="modal_data">
              <label>Fecha Registro:</label>
              <span>{dataInven.fechaRegistro}</span>
              {/* <input
                type="date"
                name="fechaRegistro"
                onChange={this.handleChange}
                // defaultValue={!dataInven.fechaRegistro && formatoFecha()}
                // defaultValue={dataInven.fechaRegistro}
                // value={dataInven.fechaRegistro}
                className="inputUser"
              /> */}
            </div>
            <div className="modal_data">
              <label htmlFor="">Cant. Actual:</label>
              <input
                type="number"
                name="cantFisica"
                onChange={this.handleChange}
                value={dataInven.cantFisica}
                className="inputUser"
              />
            </div>
            <div className="modal_data">
              <label htmlFor="">Observaciones:</label>
              <input
                type="text"
                onChange={this.handleChange}
                name="observInv"
                value={dataInven.observInv}
                className="inputUser"
              />
            </div>
            <div className="btn_container">
              <button className="btnCustom">
                <span class="icon-floppy-disk"></span>
                {/* guardar */}
              </button>
              <Link className="btnCustom btnCustomCancel" to={`/inventario`}>
                {/* cancelar */}
                <span className="icon-cancel-circle"></span>
              </Link>
            </div>
          </form>
        </div>
      </div>
      // document.getElementById("modal")
    );
  }
}

export default Modal;

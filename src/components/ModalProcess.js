import React from "react";
import "../styles/modal.css";
import "../styles/fonts.css";
//import api from "../api";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { formatoFechaModal } from "../helpers/Functions";
import MiniLoad from "../components/MiniLoad";

const cookies = new Cookies();
let baseurl = cookies.get("baseUrl");
let tipoUser = cookies.get("usrTipo");
var fechaModal = "";
var fechaModalHora = "";

// const procesos = [
//   {
//     idProceso: "P0000",
//     nombreProceso: "Selección Material",
//     prioridad: "1",
//     fechaIniProc: "2021-11-11 14:22",
//     fechaFinProc: "",
//   },
//   {
//     idProceso: "P0001",
//     nombreProceso: "Troquelado",
//     prioridad: "2",
//     fechaIniProc: "",
//     fechaFinProc: "",
//   },
//   {
//     idProceso: "P0002",
//     nombreProceso: "Impresion",
//     prioridad: "3",
//     fechaIniProc: "",
//     fechaFinProc: "",
//   },
// ];

class ModalProcess extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    formI: {
      idPed: "",
      idCli: "",
      nomCli: "",
      fechaIni: "",
      fechaProy: "",
      observOT: "",
      PT: [
        {
          itemPT: "",
          nombrePT: "",
          cantPT: "",
          unidMed: "",
          idFamilia: "",
          cantReemplaza: "",
          fechaInicio: "",
          fechaFinal: "",
          cambiosOK: "",
          MP: [],
          procesos: [
            {
              idProceso: "",
              nombreProceso: "",
              prioridad: "",
              fechaIniProc: "",
              fechaFinProc: "",
              action: "",
            },
          ],
        },
      ],
    },
  };

  componentDidMount() {
    this.fetchProcess();
    fechaModal = formatoFechaModal(1);
    fechaModalHora = formatoFechaModal();
    console.log({ fechaModal, fechaModalHora });
  }

  fetchProcess = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `${baseurl}/LoadProduc.php?p1=${cookies.get("token")}`
      );
      const data = await response.json();
      this.setState({
        loading: true,
        data: {
          produccion: data.produccion,
        },
      });

      const dataOtUniqueFilter = await this.state.data.produccion.filter(
        (orden) => orden.id === this.props.match.params.ordenId
      );

      this.setState({
        loading: false,
        formI: dataOtUniqueFilter[0],
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleCheckAut = (usuario) => {
    if (usuario === "1") {
      return "1";
    } else {
      return "3";
    }
  };
  // FUNCION PARA ACCEDER Y MODIFICAR UN SEGUNDO NIVEL DE OBJETOS CON ARRAYS
  handleChangeLV2 = (e) => {
    this.setState({
      formI: {
        ...this.state.formI,
        PT: [
          ...this.state.formI.PT.map((itemPT) => {
            if (itemPT.itemPT !== this.props.match.params.PtId) return itemPT;
            return {
              ...itemPT,
              [e.target.name]: e.target.value,
              cambiosOK: this.handleCheckAut(tipoUser),
            };
          }),
        ],
      },
    });
  };

  //Para fecha PT sin considerar estatus cambiosOk

  handleChangeLV2Dates = (e) => {
    this.setState({
      formI: {
        ...this.state.formI,
        PT: [
          ...this.state.formI.PT.map((itemPT) => {
            if (itemPT.itemPT !== this.props.match.params.PtId) return itemPT;
            return {
              ...itemPT,
              [e.target.name]: e.target.value,
            };
          }),
        ],
      },
    });
  };

  // FUNCION PARA ACCEDER Y MODIFICAR UN TERCER NIVEL DE OBJETOS CON ARRAYS

  handleChangeLV3 = (idProceso) => (e) => {
    this.setState({
      formI: {
        ...this.state.formI,
        PT: [
          ...this.state.formI.PT.map((itemPT) => {
            if (itemPT.itemPT !== this.props.match.params.PtId) return itemPT;
            return {
              ...itemPT,
              procesos: [
                ...this.state.formI.PT[
                  this.state.formI.PT.map(({ itemPT }) => itemPT).indexOf(
                    this.props.match.params.PtId
                  )
                ].procesos.map((idProc) => {
                  //if (idProc.idProceso !== "P0002") return idProc;
                  if (idProc.idProceso !== idProceso) return idProc;
                  return {
                    ...idProc,
                    [e.target.name]: e.target.value,
                    action: "1",
                  };
                }),
              ],
            };
          }),
        ],
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault(); //Aplico la detención del evento para que no recargue la página
    this.setState({ loading: true, error: null });
    /////////
    try {
      const response = await fetch(
        `${baseurl}/SaveProduc.php?p1=${cookies.get("token")}`,
        {
          method: "POST",
          body: JSON.stringify(this.state.formI),
        }
      );
      console.log(response);
      this.setState({ loading: false });
      //this.fetchProcess();
      this.props.history.push(`/produccion/${this.props.match.params.ordenId}`);
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, error: error });
    }
  };

  disabledInput = (statusPT) => {
    if (statusPT === "2") return "disabled";
  };

  render() {
    if (this.state.loading) {
      return <MiniLoad />;
    }

    const datos = this.state.formI;
    const modalItem = this.props.match.params.PtId; //Variable de Item proveniente de la ruta de ReactRoute
    const posicionPT = datos.PT.map(({ itemPT }) => itemPT).indexOf(modalItem);
    const objetoPT = datos.PT[posicionPT];

    console.log(datos);
    //console.log(objetoPT);
    return (
      <div className="myModal">
        <div className="modal_container modal_container_process">
          <form onSubmit={this.handleSubmit} className="modal_form">
            <h1 className="modal_title">Seguimiento y Procesos del item:</h1>
            <h3 className="modal_item">{`${objetoPT.itemPT} | ${objetoPT.nombrePT}`}</h3>
            <div className="modal_item-checkDates">
              <span className="modal_item-checkDates--datos">
                <label>Fecha Inicio:</label>
                <input
                  className="modal_item-checkDates--datos--input"
                  type="date"
                  name="fechaInicio"
                  //defaultValue={fechaModal}
                  defaultValue={objetoPT.fechaInicio}
                  min={datos.fechaIni}
                  onChange={this.handleChangeLV2Dates}
                />
              </span>
              <span className="modal_item-checkDates--datos">
                <label>Fecha Fin:</label>
                <input
                  className="modal_item-checkDates--datos--input"
                  type="date"
                  name="fechaFinal"
                  //defaultValue={fechaModal}
                  defaultValue={objetoPT.fechaFinal}
                  min={datos.fechaIni}
                  onChange={this.handleChangeLV2Dates}
                />
              </span>
              <span className="modal_item-checkDates--datos">
                <label>Cant. Original a Producir:</label>
                <span>{objetoPT.cantPT}</span>
              </span>
              <span className="modal_item-checkDates--datos">
                <label>
                  {objetoPT.cambiosOK === "2"
                    ? "Cant. Real Producida: (No se puede editar)"
                    : "Cant. Real Producida:"}
                </label>
                <input
                  className="modal_item-checkDates--datos--input"
                  type="number"
                  name="cantReemplaza"
                  defaultValue={objetoPT.cantReemplaza}
                  onChange={this.handleChangeLV2}
                  min={0}
                  disabled={objetoPT.cambiosOK === "2" ? true : false}
                />
              </span>
            </div>
            <div>
              <ol className="listProcesos">
                <li>
                  <span>#</span>
                  <span>Proceso</span>
                  <span>Fecha - Hora Inicio</span>
                  <span>Fecha - Hora Fin</span>
                </li>
                {objetoPT.procesos.map((procesos) => {
                  return (
                    <li key={procesos.idProceso}>
                      <span className="counterPT">{procesos.prioridad}</span>
                      <span>{procesos.nombreProceso}</span>
                      <span>
                        <input
                          className="modal_item-checkDates--datos--input"
                          type="datetime-local"
                          name="fechaIniProc"
                          //defaultValue={fechaModalHora}
                          defaultValue={procesos.fechaIniProc}
                          min={`${datos.fechaIni}T00:00`}
                          onChange={this.handleChangeLV3(procesos.idProceso)}
                        />
                      </span>
                      <span>
                        <input
                          className="modal_item-checkDates--datos--input"
                          type="datetime-local"
                          name="fechaFinProc"
                          //defaultValue={fechaModalHora}
                          defaultValue={procesos.fechaFinProc}
                          min={`${datos.fechaIni}T00:00`}
                          onChange={this.handleChangeLV3(procesos.idProceso)}
                        />
                      </span>
                    </li>
                  );
                })}
              </ol>

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
            <div className="btn_container">
              <button className="btnCustom">
                <span class="icon-floppy-disk"></span>
                {/* guardar */}
              </button>
              <Link
                className="btnCustom btnCustomCancel"
                to={`/produccion/${this.props.match.params.ordenId}`}
              >
                {/* cancelar */}
                <span className="icon-cancel-circle"></span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ModalProcess;

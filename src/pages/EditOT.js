import React from "react";
//import api from "../api";
import FormMP from "../components/FormMP";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies();
let baseurl = cookies.get("baseUrl");
let tipoUser = cookies.get("usrTipo");
console.log({ "Tipo user": tipoUser });

class EditOT extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    form: {
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
          MP: [
            {
              idMP: "",
              nombreMP: "",
              cantPlanMP: "",
              unidMedMP: "",
              cantReal: "",
              observMP: "",
              action: "",
              idMPAlter: "",
              descripMPAlter: "",
              cantAlter: "",
              MP_Alternas: [],
            },
          ],
          procesos: [],
        },
      ],
    },
    // otInicial: [],
    // form2: {
    //   idPed: "",
    //   idCli: "",
    //   nomCli: "",
    //   fechaIni: "",
    //   fechaProy: "",
    //   observOT: "",
    //   PT: [],
    // },
  };

  componentDidMount() {
    this.fetchProduccion();
    //this.fetchData();
  }

  // Fetch para db Json Local
  // fetchData = async (e) => {
  //   this.setState({ loading: true, error: null });
  //   try {
  //     const data = await api.produccion.read(this.props.match.params.ordenId);

  //     this.setState({ loading: false, form: data, form2: data });
  //   } catch (error) {
  //     this.setState({ loading: false, error: error });
  //   }
  // };

  fetchProduccion = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `${baseurl}/LoadProduc.php?p1=${cookies.get("token")}`
      );
      const data = await response.json();
      this.setState({
        loading: false,
        data: {
          produccion: data.produccion,
        },
      });
      const dataOtUnique = await this.state.data.produccion[
        this.state.data.produccion
          .map((ot) => ot.id)
          .indexOf(this.props.match.params.ordenId)
      ];

      this.setState({
        loading: false,
        form: dataOtUnique,
        // otInicial: dataOtUnique.PT,
        // form2: dataOtUnique,
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  //función para capturar submit
  handleSubmit = async (e) => {
    e.preventDefault(); //Aplico la detención del evento para que no recargue la página
    this.setState({ loading: true, error: null });
    /////////
    try {
      const response = await fetch(
        `${baseurl}/SaveProduc.php?p1=${cookies.get("token")}`,
        // "http://190.10.224.170:8082/moverprint/SaveProduc.php",
        {
          method: "POST",
          body: JSON.stringify(this.state.form),
        }
      );
      console.log(response);
      this.setState({ loading: false });
      //console.log(response);
      this.fetchProduccion();
      this.props.history.push(`/produccion/${this.props.match.params.ordenId}`);
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, error: error });
    }
    //////////

    // Orig. DB Local
    // try {
    //   await api.produccion.update(
    //     this.props.match.params.ordenId,
    //     this.state.form2
    //   );
    //   this.setState({ loading: false });

    //   // Redirecciono al listado principal de ordenes
    //   // this.props.history.push(`/produccion`);
    //   this.fetchData();
    //   this.props.history.push(`/produccion/${this.props.match.params.ordenId}`);
    // } catch (error) {
    //   this.setState({ loading: false, error: error });
    // }
  };

  // updateState(idPT) {
  //   const formIni = this.state.form;
  //   const formFin = this.state.form2;
  //   const positionPT = formFin.PT.map((item) => item.itemPT).indexOf(idPT);
  //   if (formIni !== formFin) {
  //     formFin.PT[positionPT].MP[0] = formIni.PT[0].MP[0];
  //   }
  // }

  //Obtengo de la información original el array solo del PT de la orden, para obtener su estados inicial
  // getStatusOrgPT = (idPT) => {
  //   const stateForItem = this.state.otInicial.map((item) => {
  //     if (item.itemPT === idPT) return item.cambiosOK;
  //   });
  //   // stateForItem.filter((statusPT) => {
  //   //   return statusPT.idItem === idPT && statusPT.estadoInicial;
  //   // });
  //   console.log(stateForItem);
  // };

  // Función que evalua el estado del check de autorización
  // Si es checked envío 1 al campo del PT "cambiosOK", esto indicará
  // que los cambios fueron aprovados por el administrador.
  handleCheckAut = (value) => {
    if (value) {
      return "1";
    } else {
      return "";
    }
  };

  handleCheckAutMP = (usuario) => {
    if (usuario === "1" || usuario === 1) {
      return "1";
    } else {
      return "3";
    }
  };

  // FUNCION PARA ACCEDER Y MODIFICAR UN SEGUNDO NIVEL DE OBJETOS CON ARRAYS
  handleChangeLV2 = (item) => (e) => {
    this.setState({
      form: {
        ...this.state.form,
        PT: [
          ...this.state.form.PT.map((itemPT, pos) => {
            if (itemPT.itemPT !== item) return itemPT;
            return {
              ...itemPT,
              // Capturo el estado del Check enviando el valor a la función la cual devolverá el valor que desee.
              [e.target.name]: this.handleCheckAut(e.target.checked),
              MP: [
                {
                  ...this.state.form.PT[pos].MP[0],
                  action: this.handleCheckAut(e.target.checked),
                },
              ],
            };
          }),
        ],
      },
    });
  };

  // FUNCION PARA ACCEDER Y MODIFICAR UN TERCER NIVEL DE OBJETOS CON ARRAYS

  handleChangeLV3 = (item, matPrima) => (e) => {
    this.setState({
      form: {
        ...this.state.form,
        PT: [
          ...this.state.form.PT.map((itemPT) => {
            if (itemPT.itemPT !== item) return itemPT;
            return {
              ...itemPT,
              cambiosOK: this.handleCheckAutMP(tipoUser),
              MP: [
                ...this.state.form.PT[
                  this.state.form.PT.map(({ itemPT }) => itemPT).indexOf(item)
                ].MP.map((MPSearch) => {
                  if (MPSearch.idMP !== matPrima) return MPSearch;
                  return {
                    ...MPSearch,
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

  render() {
    if (this.state.loading) {
      return <h1>Loading......</h1>;
    }

    const datos = this.state.form;

    console.log({ "Formulario 1": datos });
    // console.log({ "Formulario 2": this.state.form2 });

    return (
      <React.Fragment>
        <h1>Editando Orden # {datos.id}</h1>
        <h2 className="editOT_title">Cliente: {datos.nomCli}</h2>
        <div className="listaOT">
          <ol className="listaOT_container">
            <li className="listaOt_item">
              <div className="listaOt_item_container listaOt_item_edit">
                <span>ID ORDEN</span>
                <span>ID PEDIDO</span>
                <span>F. INICIO</span>
                <span>F. FIN. PROYECT</span>
                <span className="hideElement">OBSERV. GENERALES OT.</span>
              </div>
            </li>

            <li className="listaOt_item">
              <div className="listaOt_item_container listaOt_item_edit">
                <span>{datos.id}</span>
                <span>{datos.idPed}</span>
                <span>{datos.fechaIni}</span>
                <span>{datos.fechaProy}</span>
                <span className="column3">
                  <i className="showElement">Obs. Orden:&nbsp;</i>
                  {datos.observOT}
                </span>
              </div>
              <ol>
                <li className="listaOt_item">
                  <div className="listaOt_item_container PT_container PT_container-detItems">
                    {tipoUser === "1" ? (
                      <span className="autPT"># | AUT</span>
                    ) : (
                      <span>#</span>
                    )}
                    <span className="idItem">ID PROD TERM</span>
                    <span className="detItem">DESCRIPCION PT</span>
                    <span className="cantProd hideElement2">CANT. PROD</span>
                    <span className="cantProdCambio hideElement2">
                      CANT. REAL PROD
                    </span>
                    <span className="unidMed hideElement2">UNID. MED</span>
                  </div>
                </li>
                {datos.PT.map((PT, pos) => {
                  return (
                    <li
                      key={PT.itemPT}
                      className={
                        PT.cambiosOK === "2"
                          ? "listaOt_item listaPT_item listaPT_item--block"
                          : "listaOt_item listaPT_item"
                      }
                    >
                      <div className="listaOt_item_container PT_container PT_container-detItems">
                        {tipoUser === "1" ? (
                          <span className="autPT" id="autPT">
                            <p className="counterPT">{pos + 1}</p>
                            <input
                              type="checkbox"
                              name="cambiosOK"
                              className="inputAutoriza"
                              onClick={this.handleChangeLV2(PT.itemPT)}
                              disabled={PT.cambiosOK === "2" ? true : false}
                            />
                          </span>
                        ) : (
                          <span className="autPT">
                            <p className="counterPT">{pos + 1}</p>
                          </span>
                        )}
                        <span className="idItem">{PT.itemPT}</span>
                        <span className="detItem">{PT.nombrePT}</span>

                        <span className="cantProd">
                          <i className="showElement3">Cant Prod: </i>
                          {PT.cantPT}&nbsp;
                          <i className="showElement2">{PT.unidMed}</i>
                        </span>

                        <span
                          className={
                            PT.cantReemplaza
                              ? "cantProdCambio valueEdit"
                              : "cantProdCambio"
                          }
                        >
                          <i className="showElement3">Cant Real PT: </i>
                          {PT.cantReemplaza}&nbsp;
                          <i
                            className={
                              PT.cantReemplaza > 0
                                ? "showElement3"
                                : "hideElement3"
                            }
                          >
                            {PT.unidMed}
                          </i>
                        </span>

                        <span className="unidMed hideElement2">
                          {PT.unidMed}
                        </span>

                        <Link
                          to={`/produccion/${this.props.match.params.ordenId}/${PT.itemPT}`}
                          className="otWrap procesosEdit btnProcess"
                        >
                          <span>
                            {PT.cambiosOK === "2"
                              ? "Fechas de Avance"
                              : "Fechas de Avance/Cambios PT"}
                          </span>
                        </Link>
                        <div className="datesPT">
                          <span>
                            <label>Fecha Inicio: </label>
                            <p className={PT.fechaInicio && "valueEdit"}>
                              {PT.fechaInicio}
                            </p>
                          </span>
                          <span>
                            <label>Fecha Final: </label>
                            <p className={PT.fechaFinal && "valueEdit"}>
                              {PT.fechaFinal}
                            </p>
                          </span>
                        </div>
                      </div>
                      {/* MATERIA PRIMA */}
                      <ol>
                        <li className="listaOt_item MP_title">
                          <div className="listaOt_item_container MP_container-edit">
                            <span>ID PROD MP</span>
                            <span>DESCRIP. MP</span>
                            <span>CANT. PLAN</span>
                            <span>UNID. MED</span>
                          </div>
                        </li>
                        {PT.MP.map((MP) => {
                          return (
                            <li
                              key={MP.idMP}
                              className="listaOt_item listaMP_item "
                            >
                              <div className="listaOt_item_container MP_container-edit">
                                <span>{MP.idMP}</span>
                                <span>{MP.nombreMP}</span>
                                <span>{MP.cantPlanMP}</span>
                                <span>{MP.unidMedMP}</span>
                                <FormMP
                                  // onChange2={(e) => {
                                  //   this.setState({
                                  //     form: {
                                  //       ...this.state.form,
                                  //       PT: [
                                  //         {
                                  //           ...this.state.form.PT[
                                  //             this.state.form.PT.map(
                                  //               (item) => item.itemPT
                                  //             ).indexOf(PT.itemPT)
                                  //           ],
                                  //           cambiosOK: "3",
                                  //           MP: [
                                  //             {
                                  //               ...this.state.form.PT[
                                  //                 this.state.form.PT.map(
                                  //                   (item) => item.itemPT
                                  //                 ).indexOf(PT.itemPT)
                                  //               ].MP[0],
                                  //               [e.target.name]: e.target.value,
                                  //               action: "1",
                                  //             },
                                  //           ],
                                  //         },
                                  //       ],
                                  //     },
                                  //   });
                                  // }}
                                  onChange2={this.handleChangeLV3(
                                    PT.itemPT,
                                    MP.idMP
                                  )}
                                  onSubmit={this.handleSubmit}
                                  formValues={this.state.form}
                                  // formValuesFinal={this.state.form2}
                                  prodTerm={PT.itemPT}
                                  idOrden={datos.id}
                                  idPT={PT.itemPT}
                                  statusPT={PT.cambiosOK}
                                />
                                {/* {this.updateState(PT.itemPT)} */}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </li>
                  );
                })}
              </ol>
            </li>
          </ol>
        </div>
      </React.Fragment>
    );
  }
}

export default EditOT;

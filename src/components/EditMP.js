import React from "react";
import "../styles/fonts.css";
import "../index.css";
//import { Link } from "react-router-dom";
import FormMP from "./FormMP";
import api from "../api";

class EditMP extends React.Component {
  state = {
    loading: true,
    error: null,
    form: {
      id: "",
      idPed: "",
      idCli: "",
      nomCli: "",
      fechaIni: "",
      fechaProy: "",
      observOT: "",
      PT: [
        {
          ot: "",
          itemPT: "",
          nombrePT: "",
          cantPT: "",
          unidMed: "",
          MP: [
            {
              idMP: "",
              nombreMP: "",
              cantPlanMP: "",
              unidMed: "",
              cantReal: "",
              observac: "",
            },
          ],
        },
      ],
    },
  };

  //Aqui pedire los datos en base al ID
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (e) => {
    this.setState({ loading: true, error: null });
    try {
      const data = await api.produccion.read(this.props.ordenId);
      this.setState({ loading: false, form: data });
      console.log(this.state.form);
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Creando función para capturar el submit
  handleSubmit = async (e) => {
    e.preventDefault(); //Aplico la detención del evento para que no recargue la página
    this.setState({ loading: true, error: null });

    try {
      await api.badges.update(this.props.ordenId, this.state.form); //Usando el método update() de la API para actualizar los datos método (PUT)
      this.setState({ loading: false });

      //Aqui quiero que se redireccione a la lista de badges al momento de crear uno
      //aqui recordar que las paginas se las estamos dando a las rutas de ReactRouter y la ruta pasa 3 props: match, history, location
      //this.props.history.push("/badges");
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    return (
      <ol>
        <li className="listaOt_item">
          <div className="listaOt_item_container MP_container-edit">
            <span>ID_PROD_MP</span>
            <span>DESCRIP. MP</span>
            <span>UNID. MED</span>
            <span>CANT. PLAN.</span>
            <span>EDICION</span>
          </div>
        </li>
        {this.props.itemsMP.map((MP) => {
          return (
            <li key={MP.idMP} className="listaOt_item listaMP_item ">
              <div className="listaOt_item_container MP_container-edit">
                <span>{MP.idMP}</span>
                <span>{MP.nombreMP}</span>
                <span>{MP.unidMed}</span>
                <span>{MP.cantPlanMP}</span>
                <FormMP
                  cantReal={MP.cantReal}
                  observac={MP.observMP}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  formValues={this.state.form.PT}
                />
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
}

export default EditMP;

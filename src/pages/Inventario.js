import React from "react";
import InvenList from "../components/InvenList";
//import api from "../api";
import { formatoFecha } from "../helpers/Functions";
import Loading from "../components/Loading";
import MiniLoad from "../components/MiniLoad";
import Error from "../components/Loading";
import Cookies from "universal-cookie";
const cookies = new Cookies();
let baseurl = cookies.get("baseUrl");

class Inventario extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  //EMPEZANDO PETICION A LA API
  componentDidMount() {
    // this.fetchData();
    // this.intervalId = setInterval(this.fetchData, 300000);
    this.fetchInventario();
    this.intervalId = setInterval(this.fetchInventario, 300000);
  }

  componentWillUnmount() {
    // Aqui elimino el intervalo si el componente ya no existe
    clearInterval(this.intervalId);
  }

  // fetchData = async () => {
  //   this.setState({ loading: true, error: null }); //Vuelvo a incializar atributos del objeto state por sin reutilizo la función

  //   //Preparo entorno para llamada a la API
  //   try {
  //     const data = await api.inventario.list();
  //     this.setState({ loading: false, data: data });
  //   } catch (error) {
  //     this.setState({ loading: false, error: error });
  //   }
  // };

  fetchInventario = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `${baseurl}/LoadInven.php?p1=${cookies.get("token")}`
      );
      const data = await response.json();
      this.setState({
        loading: false,
        data: {
          inventario: data.inventario,
        },
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    // 1º Evalúo si se está cargando los datos.
    if (this.state.loading === true && !this.state.data) {
      return <Loading />;
    }

    // Evalúo error.
    if (this.state.error) {
      // return `El error es: ${this.state.error.message}`;
      return <Error />;
    }
    return (
      <React.Fragment>
        <section>
          <div>
            <h1>Inventario a la Fecha {formatoFecha()}</h1>
          </div>
        </section>
        <InvenList listaItemsInv={this.state.data.inventario} />

        {this.state.loading && <MiniLoad />}
      </React.Fragment>
    );
  }
}

export default Inventario;

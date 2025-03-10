import React from "react";
import OpListHooks from "../components/OpListHooks";
//import api from "../api";
import Loading from "../components/Loading";
import MiniLoad from "../components/MiniLoad";
import Error from "../components/Loading";
import Cookies from "universal-cookie";

const cookies = new Cookies();

console.log(cookies.get("usrId"));
console.log({ "Tipo user": cookies.get("usrTipo") });
console.log(cookies.get("token"));
console.log(cookies.get("baseUrl"));

let tokenCookie = cookies.get("token");
let baseurl = cookies.get("baseUrl");

class Ordenes extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    //data: { produccion: [] },
  };

  //EMPEZANDO PETICION A LA API
  componentDidMount() {
    // this.fetchData();
    // this.intervalId = setInterval(this.fetchData, 300000);

    //Al usar con react-router-dom HashRouter en lugar de BrowserRouter por algun motivo la cookie
    // de token se queda como undefined a la primera carga de este componente. pero al recargar
    // Ya aparece la cookie y carga las ordenes, por eso se verifica esta condición para recargar
    // la página cuando ocurra este caso.
    if (tokenCookie === undefined) {
      window.location.reload();
    }
    this.fetchProduccion();
    this.intervalId = setInterval(this.fetchProduccion, 180000);

    if (!cookies.get("usrId")) {
      window.location.href = "./";
    }
  }

  componentWillUnmount() {
    // Aqui elimino el intervalo si el componente ya no existe
    clearInterval(this.intervalId);
  }

  // //Fetch db local
  // fetchData = async () => {
  //   this.setState({ loading: true, error: null }); //Vuelvo a incializar atributos del objeto state por sin reutilizo la función

  //   //Preparo entorno para llamada a la API
  //   try {
  //     const data = await api.produccion.list();
  //     this.setState({ loading: false, data: data });
  //   } catch (error) {
  //     this.setState({ loading: false, error: error });
  //   }
  // };

  // fetch api
  // fetchData = async () => {
  //   this.setState({ loading: true, error: null }); //Vuelvo a incializar atributos del objeto state por sin reutilizo la función

  //   //Preparo entorno para llamada a la API
  //   try {
  //     const data = await this.callApiWeb(cookies.get("token"));
  //     console.log(data);
  //     this.setState({ loading: false, data: data });
  //   } catch (error) {
  //     this.setState({ loading: false, error: error });
  //   }
  // };

  fetchProduccion = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `${baseurl}/LoadProduc.php?p1=${tokenCookie}`
      );
      console.log(response);
      const data = await response.json();
      console.log(data);

      this.setState({
        loading: false,
        data: {
          produccion: data.produccion,
        },
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
      console.log(this.state.error);
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
            <h1>Listado Ordenes de Producción a Procesar</h1>
            {/* <button onClick={() => this.cerrarSesion()}>Cerrar sesión</button> */}
          </div>
        </section>
        <OpListHooks listaOT={this.state.data} />
        {this.state.loading && <MiniLoad />}
      </React.Fragment>
    );
  }
}

export default Ordenes;

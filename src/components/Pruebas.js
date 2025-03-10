// import React, { Component, useState } from "react";
import React from "react";
// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
// } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import ExportExcel from "react-export-excel";
import api from "../apiLocal";
// const ExcelFile = ExportExcel.ExcelFile;
// const ExcelSheet = ExportExcel.ExcelSheet;
// const ExcelColumn = ExportExcel.Column;

/*const data = [
  {
    id: "E1TRM55F1-A000",
    descrip: "ET.TQM TERMICO RECUBIERTO RECT. 7.6x10.2 F1 NC",
    cantActual: "500",
    unidMed: "Miles",
    cantFisica: "",
    observInv: "",
    fechaRegistro: "",
  },
  {
    id: "E1TRM55F1-A020",
    descrip: "ET.TQM TERMICO RECUBIERTO RECT. 7.6x10.2 F1 1C",
    cantActual: "30",
    unidMed: "Miles",
    cantFisica: "28",
    observInv: "",
    fechaRegistro: "",
  },
  {
    id: "E1TRM55F1-A011",
    descrip: "ET.TQM TERMICO RECUBIERTO RECT. 7.6x10.2 F1 2C",
    cantActual: "100",
    unidMed: "Miles",
    cantFisica: "",
    observInv: "",
    fechaRegistro: "",
  },
];*/

/* const datos = {
  nombre: "xyz",
  apellido: "",
  edad: "",
  fam: [
    {
      fam1: "f1",
      fam2: "",
      sons: [{ son1: "" }],
    },
  ],
 };*/

/* function Pruebas() {
   return (
     <ExcelFile element={<button>Exportar</button>} filename="pruebaExport">
       <ExcelSheet data={data} name="Inventarios">
         <ExcelColumn label="Código Producto" value="id" />
         <ExcelColumn label="Descripción" value="descrip" />
         <ExcelColumn label="Cant. Actual Sigem" value="cantActual" />
         <ExcelColumn label="unid. Med." value="unidMed" />
       </ExcelSheet>
     </ExcelFile>
   );*/

class Pruebas extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  /* const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [datos, setDatos] = useState({
    nombre: "xyz",
    apellido: "",
    edad: "",
    fam: [
      {
        fam1: "f1",
        fam2: "",
        sons: [{ son1: "" }],
      },
    ],
  });*/

  // const [dropdown, setDropdown] = useState(false);

  /* const [mp, setMp] = useState([
    { id: "1", nameMP: "mp1" },
    { id: "2", nameMP: "mp2" },
    { id: "3", nameMP: "mp3" },
    { id: "4", nameMP: "mp4" },
    { id: "5", nameMP: "mp5" },
    { id: "6", nameMP: "mp6" },
   ]);*/

  /*const [texto, setTexto] = useState("---");

  const openCloseDrop = () => {
    setDropdown(!dropdown);
  };

  state = {
    loading: true,
    error: null,
    datos: {
      nombre: "xyz",
      apellido: "",
      edad: "",
      verificar: false,
      fam: [
        {
          fam1: "f1",
          fam2: "",
          sons: [{ son1: "" }],
        },
      ],
    },
    details: {},
  };*/

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

  fetchData = async (e) => {
    this.setState({ loading: true, error: null });
    try {
      // const data = await api.produccion.read(this.props.match.params.ordenId);
      const data = await api.produccion.list();
      // const ordenUnique = await api.produccion.read("OT003311");

      console.log(data);
      this.setState({ loading: true, data: data });

      const ordenUnique = await this.state.data[0];
      console.log(ordenUnique);
      this.setState({
        loading: false,
        formI: ordenUnique,
        formF: ordenUnique,
      });
      console.log(this.state.formI);
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleChangeLV1 = (e) => {
    this.setState({
      formI: {
        ...this.state.formI,
        [e.target.name]: e.target.value,
      },
    });
  };

  // FUNCION PARA ACCEDER Y MODIFICAR UN SEGUNDO NIVEL DE OBJETOS CON ARRAYS
  handleChangeLV2 = (e) => {
    this.setState({
      formI: {
        ...this.state.formI,
        PT: [
          ...this.state.formI.PT.map((itemPT) => {
            if (itemPT.itemPT !== "E1PROW27F3-A991") return itemPT;
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
  handleChangeLV3 = (e) => {
    this.setState({
      formI: {
        ...this.state.formI,
        PT: [
          ...this.state.formI.PT.map((itemPT) => {
            if (itemPT.itemPT !== "E1PROW27F3-A991") return itemPT;
            return {
              ...itemPT,
              procesos: [
                ...this.state.formI.PT[1].procesos.map((idProc) => {
                  if (idProc.idProceso !== "P0002") return idProc;
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

  /*handleChangeLV3old = (e) => {
    this.setState({
      formI: {
        ...this.state.formI,
        PT: [
          {
            ...this.state.formI.PT[1],
            procesos: [
              {
                ...this.state.formI.PT[1].procesos[0],
                [e.target.name]: e.target.value,
                action: "1",
              },
            ],
          },
        ],
      },
    });
  };*/

  //función para capturar submit
  handleSubmit = async (e) => {
    e.preventDefault(); //Aplico la detención del evento para que no recargue la página
    this.setState({ loading: true, error: null });

    // Orig. DB Local
    try {
      await api.produccion.update(
        "OT003311",
        //this.props.match.params.ordenId,
        this.state.formI
      );
      this.setState({ loading: false });

      // Redirecciono al listado principal de ordenes
      // this.props.history.push(`/produccion`);
      this.fetchData();
      //this.props.history.push(`/produccion/${this.props.match.params.ordenId}`);
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  /*handleCheck = () => {
    this.setState({
      datos: {
        ...this.state.datos,
        verificar: !this.state.datos.verificar,
      },
    });
  };*/

  handleChange2 = (e) => {
    // SIN HOOKS
    this.setState({
      datos: {
        fam: [
          {
            ...this.state.datos.fam[0], // this.state.datos.fam.findIndex((atrib) => atrib.fam1 === "")
            [e.target.name]: e.target.value,
          },
        ],
      },
    });

    //   // CON HOOKS

    //   setDatos({
    //     fam: [
    //       {
    //         ...datos.fam[0], // this.state.datos.fam.findIndex((atrib) => atrib.fam1 === "")
    //         [e.target.name]: e.target.value,
    //       },
    //     ],
    //   });
  };

  autorizacion = (check) => {
    this.setState({
      formI: {
        ...this.state.formI,
        PT: [
          ...this.state.formI.PT.map((itemPT) => {
            if (itemPT.itemPT !== "E1PROW27F3-A991") return itemPT;
            return {
              ...itemPT,
              cambiosOK: check,
            };
          }),
        ],
      },
    });
  };

  handleCheck = () => {
    this.state.formI.PT[1].cambiosOK
      ? this.autorizacion(false)
      : this.autorizacion(true);
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading......</h1>;
    }
    console.log(this.state.formI);
    // console.log(this.state.formI.PT[1].unidMed);
    return (
      <React.Fragment>
        <br />

        {
          //     <Dropdown
          //       isOpen={dropdown}
          //       toggle={openCloseDrop}
          //       direction="right"
          //       size="lg"
          //     >
          //       {/* caret es propiedad para que muestre icono de despliegue */}
          //       <DropdownToggle caret>Titulo drop</DropdownToggle>
          //       <DropdownMenu>
          //         <DropdownItem header>Materias Primas Disponibles</DropdownItem>
          //         <DropdownItem divider /> {/*linea divisora*/}
          //         {mp.map((item) => {
          //           return (
          //             <DropdownItem
          //               key={item.id}
          //               name="nameMP"
          //               value={item.nameMP}
          //               onClick={() => setTexto(item.nameMP)}
          //             >
          //               {item.nameMP}
          //             </DropdownItem>
          //           );
          //         })}
          //         {/* <DropdownItem>Opción 1</DropdownItem>
          //         <DropdownItem>Opción 2</DropdownItem>
          //         <DropdownItem>Opción 3</DropdownItem>
          //         <DropdownItem text="hola">opcion 4</DropdownItem>
          //         <DropdownItem disabled>Opción deshabilitada</DropdownItem> */}
          //       </DropdownMenu>
          //     </Dropdown>
        }
        {/* <h1>{texto}</h1> */}
        <h1>Form1 only Attrib</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="">Observaciones:</label>
            <input
              name="observOT"
              type="text"
              defaultValue={this.state.formI.observOT}
              onChange={this.handleChangeLV1}
            />
          </div>
          <div>
            <label htmlFor="">Unidad Medida:</label>
            <input
              name="unidMed"
              type="text"
              value={this.state.formI.PT[1].unidMed}
              onChange={this.handleChangeLV2}
            />
          </div>
          <div>
            <label htmlFor="">Nombre Proceso</label>
            <input
              name="nombreProceso"
              type="text"
              value={this.state.formI.PT[1].procesos[2].nombreProceso}
              onChange={this.handleChangeLV3}
            />
          </div>
          <div>
            <label htmlFor="">Fecha PT</label>
            <input
              name="fechaFinal"
              type="date"
              value={this.state.formI.PT[1].fechaFinal}
              onChange={this.handleChangeLV2}
            />
          </div>
          <div>
            <label htmlFor="">Fecha Proceso</label>
            <input
              name="fechaIniProc"
              type="datetime-local"
              value={this.state.formI.PT[1].procesos[2].fechaIniProc}
              onChange={this.handleChangeLV3}
            />
          </div>
          <div>
            <label htmlFor="">AUTORIZADO</label>
            <input
              name="cambiosOK"
              type="checkbox"
              onChange={this.handleCheck}
            />
          </div>
          <button>Enviar Cambios</button>
        </form>
        <div>
          <h2>Valores ingresado FORM1</h2>
          {/* <p>Nombre: {this.state.datos.nombre}</p>
          <p>Apell: {this.state.datos.apellido}</p>
          <p>Edad: {this.state.datos.edad}</p>
          <p>Verify: {this.state.datos.verificar}</p> */}
        </div>
        <h1>Form2 Array</h1>
        <form>
          <div>
            <label htmlFor="">Fam1:</label>
            <input
              name="fam1"
              type="text"
              // value={datos.fam[0].fam1}
              // onChange={this.handleChange2}
            />
          </div>
          {/* <div>
          <label htmlFor="">Fam2:</label>
          <input
            name="fam2"
            type="text"
            value={datos.fam[0].fam2}
            onChange={this.handleChange3}
          />
        </div> */}
          <div>
            <label htmlFor="">Fam3:</label>
            <input
              name="fam3"
              type="text"
              // value={datos.fam[0].fam3}
              // onChange={this.handleChange2}
            />
          </div>
        </form>
        <div>
          <h2>Valores ingresado FORM2</h2>
          {/* <p>Fam1: {datos.fam[0].fam1}</p>
          <p>Fam2: {datos.fam[0].fam2}</p>
          <p>Fam3: {datos.fam[0].fam3}</p> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Pruebas;

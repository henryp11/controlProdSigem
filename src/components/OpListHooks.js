import React, { useState } from "react";
import ItemsPT from "./ItemsPT";
import "../styles/listas.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import ExportExcel from "react-export-excel";

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.Column;

const cookies = new Cookies();

// Almacenando todos los hooks en un custom hook (Recordar debe comenzar con "use")

function useSearch(otData) {
  const [query, setQuery] = useState("");
  const [filteredOT, setFilteredOT] = useState(otData);

  React.useMemo(() => {
    const result = otData.filter((OT) => {
      return `${OT.id} ${OT.nomCli} ${OT.fechaProy}`
        .toLowerCase()
        .includes(query.toLowerCase()); //Si encuentra lo que busco mostrará ese resultado, transformo todo a minusculas para que busque en general
    });
    //Esta sección de transformar en estado la busqueda es por si cambia el listado de querys a mostar
    setFilteredOT(result);
  }, [otData, query]);

  return { query, setQuery, filteredOT };
}

function OpListHooks(props) {
  const [openPT, setOpenPT] = useState(false);
  const [otCapture, setOtCapture] = useState("");
  //const { query, setQuery, filteredOT } = useSearch(props.listaOT); //Así se usaba para BD local
  const { query, setQuery, filteredOT } = useSearch(props.listaOT.produccion); //PARA UTILIZAR EL CUSTOM HOOK

  return (
    <React.Fragment>
      {/* creando buscador */}
      <div className="search">
        <div className="search_container">
          {/* Busqueda: */}
          <span class="icon-search"></span>
          {/* <label>
          </label> */}
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Buscar: OT / Cliente / Fecha Proyectada"
          />
          <ExcelFile
            element={
              <button className="btn btnExport">
                <span className="icon-microsoftexcel"></span>
              </button>
            }
            filename="Listado_Ordenes"
          >
            <ExcelSheet data={filteredOT} name="OrdenesProd.">
              <ExcelColumn label="Código OT" value="id" />
              <ExcelColumn label="Pedido" value="idPed" />
              <ExcelColumn label="Cliente" value="nomCli" />
              <ExcelColumn label="Fecha Inicio" value="fechaIni" />
              <ExcelColumn label="Fecha Proyectada" value="fechaProy" />
              <ExcelColumn label="Observaciones" value="observOT" />
            </ExcelSheet>
          </ExcelFile>
        </div>
      </div>
      <div className="listaOT">
        <ol className="listaOT_container">
          <li className="listaOt_item">
            <div className="listaOt_item_container">
              <span>ORDEN</span>
              <span>PEDIDO</span>
              <span>ID.CLI</span>
              <span>NOMBRE CLIENTE</span>
              <span className="hideElement2">F. INICIO</span>
              <span className="hideElement2">F. FIN PROYECT.</span>
              <span className="hideElement" id="column2">
                OBSERV. GENERALES DE LA ORDEN
              </span>
            </div>
          </li>
          {filteredOT.map((OT) => {
            return (
              <li key={OT.id} className="listaOt_item">
                <div className="listaOt_item_container">
                  <span>
                    <button
                      className="otWrap"
                      onClick={() => {
                        setOpenPT(!openPT);
                        setOtCapture(OT.id);
                      }}
                    >
                      {OT.id}
                    </button>
                  </span>
                  <span>{OT.idPed}</span>
                  <span>{OT.idCli}</span>
                  <span>{OT.nomCli}</span>
                  <span className="column2">
                    <i className="showElement3">F.Ini OT: </i>
                    <span>{OT.fechaIni}</span>
                  </span>
                  <span className="column2">
                    <i className="showElement3">F.Fin OT: </i>
                    <span>{OT.fechaProy}</span>
                  </span>
                  <span className="column3">
                    <span>
                      <i className="showElement">Obs. Orden:&nbsp;</i>
                      {OT.observOT}
                    </span>
                  </span>
                  {cookies.get("usrId") && (
                    <Link
                      to={`/produccion/${OT.id}`}
                      className="btnCustom btnCustom-edit"
                    >
                      Editar
                    </Link>
                  )}
                </div>
                {otCapture === OT.id && (
                  <ItemsPT OpenPT={openPT} itemsPT={OT.PT} showMP={true} />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </React.Fragment>
  );
}

export default OpListHooks;

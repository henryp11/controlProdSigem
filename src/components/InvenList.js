import React, { useState } from "react";
import "../styles/listas.css";
import { Link } from "react-router-dom";
import ExportExcel from "react-export-excel";

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.Column;
// import api from "../api";

function useSearch(otData) {
  const [query, setQuery] = useState("");
  const [filteredOT, setFilteredOT] = useState(otData);

  React.useMemo(() => {
    const result = otData.filter((OT) => {
      return `${OT.id} ${OT.descrip}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    setFilteredOT(result);
  }, [otData, query]);

  return { query, setQuery, filteredOT };
}

function InvenList(props) {
  // const [dataINV] = useState(props.listaItemsInv);
  const { query, setQuery, filteredOT } = useSearch(props.listaItemsInv); //PARA UTILIZAR EL CUSTOM HOOK

  return (
    <React.Fragment>
      {/* creando buscador */}
      <div className="search">
        <div className="search_container">
          <span class="icon-search"></span>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Buscar: Nombre o Código de item"
          />
          <ExcelFile
            element={
              <button className="btn btnExport">
                <span class="icon-microsoftexcel"></span>
              </button>
            }
            filename="inventario_actual"
          >
            <ExcelSheet data={filteredOT} name="Inventarios">
              <ExcelColumn label="Código Producto" value="id" />
              <ExcelColumn label="Descripción" value="descrip" />
              <ExcelColumn label="Cant. Actual Sigem" value="cantActual" />
              <ExcelColumn label="unid. Med." value="unidMed" />
              <ExcelColumn label="Fecha Registro" value="fechaRegistro" />
              <ExcelColumn label="cant. Física" value="cantFisica" />
              <ExcelColumn label="Observaciones" value="observInv" />
            </ExcelSheet>
          </ExcelFile>
        </div>
      </div>

      <div className="listaOT">
        <ol className="listaOT_container">
          <li className="listaOt_item">
            <div className="listaOt_item_container lista_items_inven">
              <span>ID_PRODUCTO</span>
              <span>DESCRIPCION</span>
              <span>CANT. ACTUAL</span>
              <span>UNID. MED.</span>
              <span>FECHA REG.</span>
              <span>CANT. FISICA</span>
              <span>OBSERVACIONES</span>
            </div>
          </li>
          {filteredOT.map((item) => {
            return (
              <li key={item.id} className="listaOt_item">
                <div className="listaOt_item_container lista_items_inven">
                  <Link
                    to={`/inventario/${item.id}`}
                    className="otWrap invenEdit"
                  >
                    <span>{item.id}</span>
                  </Link>
                  <Link
                    to={`/inventario/${item.id}`}
                    className="otWrap invenEdit"
                  >
                    <span>{item.descrip}</span>
                  </Link>
                  <span>{item.cantActual}</span>
                  <span>{item.unidMed}</span>
                  <span>{item.fechaRegistro}</span>
                  <span>{item.cantFisica}</span>
                  <span>{item.observInv}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </React.Fragment>
  );
}

export default InvenList;

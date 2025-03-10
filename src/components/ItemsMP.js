import React from "react";
import "../styles/listas.css";
import "../styles/forms.css";
//import { Link } from "react-router-dom";

class ItemsMP extends React.Component {
  render() {
    return (
      <ol>
        <li className="listaOt_item MP_title">
          <div className="listaOt_item_container MP_container">
            <span>ID MAT. PRIMA</span>
            <span>DESCRIP. MP</span>
            <span className="hideElement2">CANT. PLAN.</span>
            <span className="hideElement2">CANT. REAL</span>
            <span className="hideElement2">UNID. MED</span>
            <span className="hideElement2">Observac. MP</span>
          </div>
        </li>
        {this.props.itemsMP.map((MP) => {
          return (
            <li key={MP.idMP} className="listaOt_item listaMP_item">
              <div className="listaOt_item_container MP_container">
                <span>{MP.idMP}</span>
                <span>{MP.nombreMP}</span>
                <span className="column1">
                  <i className="showElement3">Cant Plan: </i>
                  <span>
                    {MP.cantPlanMP}&nbsp;&nbsp;
                    <i className="showElement2">{MP.unidMedMP}</i>
                  </span>
                </span>
                <span className="column1">
                  <i className="showElement3">Cant Real: </i>
                  <span className={MP.cantReal > 0 && "valueEdit"}>
                    {MP.cantReal > 0 ? MP.cantReal : ""}&nbsp;&nbsp;
                    <i
                      className={
                        MP.cantReal > 0 ? "showElement3" : "hideElement3"
                      }
                    >
                      {MP.unidMedMP}
                    </i>
                  </span>
                </span>
                <span className="hideElement2">{MP.unidMedMP}</span>
                <span className="column1">
                  <i className="showElement3">Observ. MP: </i>
                  <span className={MP.observMP && "valueEdit"}>
                    {MP.observMP}
                  </span>
                </span>
                {MP.idMPAlter && (
                  <div className="formMP_elemets formMP_elemetsMP_Alter MP_container--changeMP">
                    <label>MP Alterna:</label>
                    <span>{`${MP.idMPAlter} || ${MP.descripMPAlter}`}</span>
                    <label>Cant. MP Alter:</label>
                    <span>{MP.cantAlter}</span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
}

export default ItemsMP;

import React from "react";
import ItemsMP from "./ItemsMP";

class ItemsPT extends React.Component {
  render() {
    if (this.props.OpenPT === false) {
      return null;
    }

    return (
      <ol>
        <li className="listaOt_item">
          <div className="listaOt_item_container PT_container ">
            <span># - ID PROD TERM</span>
            <span>DESCRIPCION PT</span>
            <span className="hideElement2">CANT PROD</span>
            <span className="hideElement2">CANT REAL PT</span>
            <span className="hideElement2">UNID. MED</span>
            <span className="hideElement2">FECHA INICIO</span>
            <span className="hideElement2">FECHA FINAL</span>
          </div>
        </li>
        {this.props.itemsPT.map((PT, pos) => {
          return (
            <li key={PT.itemPT} className="listaOt_item listaPT_item">
              <div className="listaOt_item_container PT_container">
                <span className="container_counter">
                  <p className="counterPT">{pos + 1}</p>
                  {PT.itemPT}
                </span>
                <span>{PT.nombrePT}</span>
                <span className="column1">
                  <i className="showElement3">Cant Prod: </i>
                  <span>
                    {PT.cantPT}&nbsp;
                    <i className="showElement2">{PT.unidMed}</i>
                  </span>
                </span>
                <span className="column1">
                  <i className="showElement3">Cant Real PT: </i>
                  <span className={PT.cantReemplaza && "valueEdit"}>
                    {PT.cantReemplaza}&nbsp;
                    <i
                      className={
                        PT.cantReemplaza > 0 ? "showElement3" : "hideElement3"
                      }
                    >
                      {PT.unidMed}
                    </i>
                  </span>
                </span>
                <span className="hideElement2">{PT.unidMed}</span>
                <span className="column1">
                  <i className="showElement3">F.Ini PT: </i>
                  <span className={PT.fechaInicio && "valueEdit"}>
                    {PT.fechaInicio}
                  </span>
                </span>
                <span className="column1">
                  <i className="showElement3">F.Fin PT: </i>
                  <span className={PT.fechaFinal && "valueEdit"}>
                    {PT.fechaFinal}
                  </span>
                </span>
              </div>
              {this.props.showMP && <ItemsMP itemsMP={PT.MP} />}
            </li>
          );
        })}
      </ol>
    );
  }
}

export default ItemsPT;

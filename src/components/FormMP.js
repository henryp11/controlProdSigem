import React, { useState } from "react";
import "../styles/fonts.css";
import "../styles/forms.css";
import { Link } from "react-router-dom";
import DropDownMP from "./DropDownMP";

function FormMP(props) {
  const [openAlterMP, setOpenAlterMP] = useState(false);

  const handleCheck = () => {
    setOpenAlterMP(!openAlterMP);
  };

  const handleClick = (e) => {
    console.log("click");
  };

  const {
    onChange2,
    onSubmit,
    prodTerm,
    // formValuesFinal,
    formValues,
    idOrden,
    idPT,
    statusPT,
  } = props;
  const arregloPT = props.formValues.PT;

  const disabledInput = (status, mpAlterna, cambiaMP) => {
    if (status === "2" || mpAlterna !== "" || cambiaMP) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit} className="formMP">
        <div className="formMP_elemets">
          <label htmlFor="">Cant. Real:</label>
          <input
            className="inputUser"
            type="number"
            name="cantReal"
            onChange={onChange2}
            value={
              arregloPT[arregloPT.map((item) => item.itemPT).indexOf(prodTerm)]
                .MP[0].cantReal > 0
                ? arregloPT[
                    arregloPT.map((item) => item.itemPT).indexOf(prodTerm)
                  ].MP[0].cantReal
                : ""
            }
            disabled={disabledInput(
              statusPT,
              arregloPT[arregloPT.map((item) => item.itemPT).indexOf(prodTerm)]
                .MP[0].idMPAlter,
              openAlterMP
            )}
          />
        </div>
        <div className="formMP_elemets">
          <label htmlFor="">Observ. MP:</label>
          <input
            className="inputUser"
            type="text"
            name="observMP"
            onChange={onChange2}
            value={
              arregloPT[arregloPT.map((item) => item.itemPT).indexOf(prodTerm)]
                .MP[0].observMP
            }
            disabled={disabledInput(
              statusPT,
              arregloPT[arregloPT.map((item) => item.itemPT).indexOf(prodTerm)]
                .MP[0].idMPAlter,
              openAlterMP
            )}
          />
        </div>
        {arregloPT[arregloPT.map((item) => item.itemPT).indexOf(prodTerm)].MP[0]
          .idMPAlter && (
          <div className="formMP_elemets formMP_elemetsMP_Alter">
            <label htmlFor="">MP Alterna:</label>
            <span>
              {
                arregloPT[
                  arregloPT.map((item) => item.itemPT).indexOf(prodTerm)
                ].MP[0].idMPAlter
              }
              {" || "}
              {
                arregloPT[
                  arregloPT.map((item) => item.itemPT).indexOf(prodTerm)
                ].MP[0].descripMPAlter
              }
            </span>
            <label htmlFor="">Cant.</label>
            <span>
              {
                arregloPT[
                  arregloPT.map((item) => item.itemPT).indexOf(prodTerm)
                ].MP[0].cantAlter
              }
            </span>
          </div>
        )}
        {/* Aplicando reemplazo de Materia Prima */}
        <div className="formMP_elemets" id="showMpAlter">
          <span>¿Cambiar MP?</span>
          <input
            type="checkbox"
            onChange={handleCheck}
            disabled={statusPT === "2" ? true : false}
          />
        </div>
        {openAlterMP && (
          <DropDownMP
            idOrden={idOrden}
            idPT={idPT}
            formValuesFinal={formValues}
            idMP={
              arregloPT[arregloPT.map((item) => item.itemPT).indexOf(prodTerm)]
                .MP[0].idMP
            }
          />
        )}
        <div className="btn_container formMP_elemets">
          {!openAlterMP && (
            <button className="btnCustom" onClick={handleClick}>
              <span class="icon-floppy-disk"></span>
              {/* guardar */}
            </button>
          )}
          <Link className="btnCustom btnCustomCancel" to={`/produccion`}>
            {/* cancelar */}
            <span className="icon-cancel-circle"></span>
          </Link>
        </div>
      </form>
    </React.Fragment>
  );
}

export default FormMP;

import React, { useState, useEffect } from 'react';
import '../styles/forms.css';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api';
import Cookies from 'universal-cookie';
import { Button, Popover, PopoverBody } from 'reactstrap';
// import Loading from "../components/Loading";
import MiniLoad from '../components/MiniLoad';
import Error from '../components/Loading';
const cookies = new Cookies();
let baseurl = cookies.get('baseUrl');

function DropdownMP(props) {
  const { idOrden, idPT, idMP, formValuesFinal } = props;
  const [dropdown, setDropdown] = useState(false);
  const [nombreMP, setTexto] = useState('');
  const [idMPAlter, setIdMPAlter] = useState('');
  const [cantCambio, setCantCambio] = useState(0);
  const [dataMP, setDataMP] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
    fetchMP();
  }, []);

  // FETCH DATA LOCAL
  // const fetchData = async () => {
  //   try {
  //     const data = await api.materiasPrimas.list();
  //     setDataMP(data);
  //     //console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchMP = async () => {
    setLoading(true);
    setError(null);
    try {
      // Funcionamiento anterior donde traía MP relacionada a la familia, donde solo se envíaba la materia prima sin variante

      // const response = await fetch(
      //   `${baseurl}/getMPData.php?p1=${cookies.get(
      //     "token"
      //   )}&p2=${idMP.substring(0, idMP.length - 2)}`
      // );

      // Nuevo funcionamiento para traer materias primas relacionadas al producto terminado a cambiar
      const response = await fetch(
        `${baseurl}/getMPData.php?p1=${cookies.get(
          'token'
        )}&p2=${idPT}&p3=${idMP}`
      );
      console.log(response);
      const data = await response.json();
      console.log(data);

      setDataMP(data.materiasPrimas);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openCloseDrop = () => {
    setDropdown(!dropdown);
  };

  const handleChange = (e) => {
    setCantCambio(e.target.value);
  };

  const updateMpAlter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.materiasPrimas.update(
        idOrden,
        formValuesFinal,
        formValuesFinal,
        idPT,
        idMPAlter,
        nombreMP,
        cantCambio
      );
      setLoading(false);

      // this.setState({ loading: false });

      // Redirecciono al listado principal de ordenes
      // this.props.history.push(`/produccion`);
      // this.fetchData();
      // this.props.history.push(`/produccion/${this.props.match.params.ordenId}`);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  console.log(idMPAlter);
  console.log(dataMP.length);
  // 1º Evalúo si se está cargando los datos.
  if (loading === true) {
    return <MiniLoad />;
  }

  if (loading === false && dataMP.length === 0) {
    return (
      <div className='alerts'>
        {`El Producto Terminado [${idPT}], no posee materia prima alterna, debe asignarla
        previamente dentro de SiGeM`}
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <React.Fragment>
      <div className='dropDownMP'>
        <Dropdown isOpen={dropdown} toggle={openCloseDrop} direction='up'>
          <DropdownToggle caret>Elegir MP</DropdownToggle>
          <DropdownMenu>
            {dataMP.map((item) => {
              return (
                <DropdownItem
                  key={item.id}
                  name='nameMP'
                  onClick={() => {
                    setTexto(item.nombreMP);
                    setIdMPAlter(item.id);
                  }}
                >
                  {item.nombreMP}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <div className='dropDownMP_content'>
          <div className='dropDownMP--containerNameMP'>
            <p>{nombreMP || '...'}</p>
            <p>
              {formValuesFinal.PT[
                formValuesFinal.PT.map((item) => item.itemPT).indexOf(idPT)
              ].MP[0].idMPAlter !== '' &&
                formValuesFinal.PT[
                  formValuesFinal.PT.map((item) => item.itemPT).indexOf(idPT)
                ].MP[0].descripMPAlter}
            </p>
          </div>
          <div className='dropDownMP--containerCantMP'>
            <input
              className='inputUser'
              type='number'
              name='cantCambio'
              onChange={handleChange}
            />
            {formValuesFinal.PT[
              formValuesFinal.PT.map((item) => item.itemPT).indexOf(idPT)
            ].MP[0].cantAlter !== '' && (
              <p>
                {
                  formValuesFinal.PT[
                    formValuesFinal.PT.map((item) => item.itemPT).indexOf(idPT)
                  ].MP[0].cantAlter
                }
              </p>
            )}
          </div>
          <Button
            onClick={updateMpAlter}
            className='btnCustom btnCustom_change'
            id='Popover1'
          >
            Cambiar
          </Button>
          <Popover
            placement='right'
            isOpen={popoverOpen}
            target='Popover1'
            toggle={toggle}
          >
            <PopoverBody>
              MP cambiada, desmarcar casilla para continuar!
            </PopoverBody>
          </Popover>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DropdownMP;

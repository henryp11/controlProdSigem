import React from 'react';
import Layout from './Layout';
import { Switch, Route, HashRouter } from 'react-router-dom'; //en version 6 de react-router-dom parece ya no uso switch sino el componente Routes
import Ordenes from '../pages/Ordenes';
import EditOT from '../pages/EditOT';
import Inventario from '../pages/Inventario';
import Pruebas from '../components/Pruebas';
import Login from '../pages/Login';
import ServiceRequester from './ServiceRequester';
import Modal from './Modal';
import ModalProcess from './ModalProcess';

// const subDominio = "moverprint";

function App() {
  return (
    <HashRouter basename='/moverprint'>
      <Layout>
        <Switch>
          {/* el atributo component ya no existe en la version 6 de reac-router-dom cambia a "element" */}
          {/* En V6, ya no permite pasar el nombre del componente directo sino que debe ir como etiqueta */}
          {/* Ej: <Route exact path="/" element={<Login/>} /> */}
          <Route exact path='/' component={Login} />
          <Route exact path='/produccion' component={Ordenes} />
          <Route exact path='/produccion/:ordenId' component={EditOT} />
          <Route exact path='/inventario' component={Inventario} />
          <Route exact path='/inventario/:PtId' component={Modal} />
          <Route
            exact
            path='/produccion/:ordenId/:PtId'
            component={ModalProcess}
          />
          <Route exact path='/pruebas3' component={Pruebas} />
          <Route exact path='/pruebas2' component={ServiceRequester} />
          {/* <Route path="*">
            <h1>Error 404 Page Not Found!!</h1>
          </Route> */}
        </Switch>
      </Layout>
    </HashRouter>
  );
}

export default App;

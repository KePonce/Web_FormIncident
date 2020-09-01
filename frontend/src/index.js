import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Inicio from './Inicio/PantallaAdmin';
import InicioAdmin from './Inicio/DatosAdmin';
import NuevoUsuario from './Inicio/NuevoUsuario';
import Solucionar from './Inicio/PantallaSolucionador';
import EditarInc from './Inicio/Editar'
import ResolveInc from './Inicio/ResolverIncidente'
import IngInconf from './Inicio/IngresarInconformidad'
import Login from './Formularios/Login'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
          <div>
              <Switch>
                {/*/Paginas*/}
                <Route exact path='/' component={Login} />
                {/*Digitador*/}
                <Route exact path='/formulario' component={App} />
                <Route exact path='/tablaincidentes' component={Inicio} />
                {/*Pagina para Encargados de Incidentes */}
                <Route exact path='/solucionarincidente' component={Solucionar} />
                <Route path="/resolverincidente/:dpi" component={ResolveInc} />
                {/*Pagina para Administrador */}
                <Route exact path='/tablageneral' component={InicioAdmin} />
                <Route path="/nuevainconformidad" component={IngInconf} />
                <Route path="/nuevousuario" component={NuevoUsuario} />

                <Route path="/tablaincidentes/:dpi" component={EditarInc} />
              </Switch>
          </div>
      </Router>,
      document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
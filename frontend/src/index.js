import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Inicio from './Inicio/Inicio';
import InicioAdmin from './Formularios/Datos_Formulario_Admin';
import InicioWorker from './Formularios/Datos_Formulario_Worker';
import EditarInc from './Inicio/Editar'
import ResolveInc from './Inicio/ResolverWorker'
import Login from './Formularios/Login'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
          <div>
              <Switch>
                  {/*/Paginas*/}
                  <Route exact path='/' component={Login} />
                  <Route exact path='/formulario' component={App} />
                  <Route exact path='/incidente' component={Inicio} />
                  <Route exact path='/incidenteAdmin' component={InicioAdmin} />
                  <Route exact path='/incidenteWorker' component={InicioWorker} />
                  <Route path="/incidente/:dpi" component={EditarInc} />
                  <Route path="/resolverincidente/:dpi" component={ResolveInc} />
              </Switch>
          </div>
      </Router>,
      document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
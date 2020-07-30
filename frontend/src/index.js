import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Inicio from './Inicio/Inicio';
import EditarInc from './Inicio/Editar'
import Login from './Formularios/Login'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
          <div>
              <Switch>
                  {/*/Paginas*/}
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/formulario' component={App} />
                  <Route exact path='/incidente' component={Inicio} />
                  <Route path="/incidente/:dpi" component={EditarInc} />
              </Switch>
          </div>
      </Router>,
      document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
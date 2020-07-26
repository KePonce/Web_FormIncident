import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Inicio from './Inicio/Inicio';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
          <div>
              <Switch>
                  {/*/Paginas*/}
                  <Route exact path='/' component={App} />
                  <Route exact path='/datos' component={Inicio} />
              </Switch>
          </div>
      </Router>,
      document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
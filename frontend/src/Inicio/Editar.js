import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Formulario from '../Formularios/Editar_Formulario';

class Editar extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Formulario/>
      </div>
    );
  }
}

export default Editar;
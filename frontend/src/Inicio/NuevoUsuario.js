import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Datos_Formulario from '../Formularios/FormularioNuevoUsuario';

class NuevoUsuario extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Datos_Formulario/>
      </div>
    );
  }
}

export default NuevoUsuario;
import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Datos_Formulario from '../Formularios/Inconformidad_Formulario';

class DatosAdmin extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Datos_Formulario/>
      </div>
    );
  }
}

export default DatosAdmin;
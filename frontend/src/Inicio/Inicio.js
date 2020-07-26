import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Formulario from '../Formularios/Editar_Formulario';
import Datos_Formulario from '../Formularios/Datos_Formulario';

class Inicio extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Datos_Formulario/>
      </div>
    );
  }
}

export default Inicio;
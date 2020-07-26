import React from 'react';
import NavBar from '../NavBar/NavBar';
import Formularios from '../Formularios/Datos_Formulario';

class Inicio extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Formularios/>
      </div>
    );
  }
}

export default Inicio;
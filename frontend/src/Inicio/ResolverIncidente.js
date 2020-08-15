import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Datos_Formulario from '../Formularios/ResolverIncidente';

class ResolverIncidente extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Datos_Formulario {...this.props}/>
      </div>
    );
  }
}

export default ResolverIncidente;
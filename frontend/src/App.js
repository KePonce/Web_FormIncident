import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Formulario from './Formularios/Formulario';

class App extends Component {
  render() {
    return (
      <>
          <NavBar/>
          <Formulario/>
      </>
    );
  }
}

export default App;
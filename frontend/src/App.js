import React, { Component } from 'react';
import NavBar from './NavBar/NavBar';
import Formularios from './Formularios/Formularios'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Formularios/>
      </div>
    );
  }
}

export default App;
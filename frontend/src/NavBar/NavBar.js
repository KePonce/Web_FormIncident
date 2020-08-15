import React from 'react';
import { controlador } from '../Formularios/controlador';

function onSubmit() {
  let ctrl = new controlador();
  ctrl.setLogout();
}

function NavBar() {

  
  

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#/formulario">Formulario</a>
        <a className="navbar-brand" href="#/incidente">Datos</a>
        <a className="navbar-brand" href="#/nuevainconformidad">Inconformidad</a>
        <a href="#/" onClick={() => onSubmit()} className="btn btn-info ">Salir</a>
      </nav>
    </>

    
  );

 
  
}

export default NavBar;
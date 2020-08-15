import React from 'react';
import { controlador } from '../Formularios/controlador';

function onSubmit() {
  let ctrl = new controlador();
  ctrl.setLogout();
}

function NavBar() {
  const ctrl = new controlador()
  if (ctrl.isAdmin() && ctrl.isLogin()) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#/tablageneral">Incidentes Reportados</a>
          <a className="navbar-brand" href="#/nuevainconformidad">Inconformidad</a>
          <a href="#/" onClick={() => onSubmit()} className="btn btn-info ">Salir</a>
        </nav>
      </>
    ); 
  }
  if (ctrl.isDigitador() && ctrl.isLogin()) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#/formulario">Formulario</a>
          <a className="navbar-brand" href="#/tablaincidentes">Incidentes</a>
          <a href="#/" onClick={() => onSubmit()} className="btn btn-info ">Salir</a>
        </nav>
      </>
    ); 
  }
  if (ctrl.isSolucionador() && ctrl.isLogin()) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#/solucionarincidente">Incidentes Asignados</a>
          <a href="#/" onClick={() => onSubmit()} className="btn btn-info ">Salir</a>
        </nav>
      </>
    ); 
  }
  else{
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#/">Debe de ingresar</a>
        </nav>
      </>
    );  
  }
}

export default NavBar;
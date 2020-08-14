import React from 'react';

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#/formulario">Formulario</a>
        <a className="navbar-brand" href="#/incidente">Datos</a>
        <a className="navbar-brand" href="#/nuevainconformidad">Inconformidad</a>
      </nav>
    </>
  );
}

export default NavBar;
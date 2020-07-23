import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Formularios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formularios: null,
    };
  }

  //Conexion con el backend en puerto 8081
  async componentDidMount() {
    const formularios = (await axios.get('http://localhost:8081/')).data;
    this.setState({
      formularios,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.formularios === null && <p>Loading formularios...</p>}
          {
            this.state.formularios && this.state.formularios.map(formulario => (
              <div key={formulario.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/formulario/${formulario.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Encargado: {formulario.encargado}</div>
                    <div className="card-body">
                      <p className="card-title">nombre: {formulario.nombre}</p>
                      <p className="card-text">dpi: {formulario.dpi}</p>
                      <p className="card-title">celular: {formulario.celular}</p>
                      <p className="card-text">inconformidad: {formulario.inconformidad}</p>
                      <p className="card-title">departamento: {formulario.departamento}</p>
                      <p className="card-text">municipio: {formulario.municipio}</p>
                      <p className="card-text">{formulario.encargado}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Formularios;
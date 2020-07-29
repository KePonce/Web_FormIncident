import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Datos_Formulario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formularios: null,
    };
  }

  //Conexion con el backend en puerto 8081
  async componentDidMount() {
    const formularios = (await axios.get('http://localhost:8081/incidente/')).data;
    console.log(formularios);
    this.setState({
      formularios,
    });
  }

  render() {
    return (
      <div className="container">
        <div><table className="table" >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">DPI</th>
              <th scope="col">Celular</th>
              <th scope="col">Inconformidad</th>
              <th scope="col">Departamento</th>
              <th scope="col">Municipio</th>
              <th scope="col">Encargado</th>
              <th scope="col">Guardar</th>
              <th scope="col">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formularios === null && <p>Loading formularios...</p>}
            {
              this.state.formularios && this.state.formularios.map(formulario => (
                    <tr>
                      <th>{formulario.IDINCIDENT}</th>
                      <td>{formulario.NOMBRE_COMPLETO}</td>
                      <td>{formulario.DPI}</td>
                      <td>{formulario.CELULAR}</td>
                      <td>{formulario.INCONFORMIDAD}</td>
                      <td>{formulario.DEPARTAMENTO}</td>
                      <td>{formulario.MUNICIPIO}</td>
                      <td>{formulario.ENCARGADO}</td>
                      <td><Link class="btn btn-outline-info "  to={"/incidente/"+formulario.DPI} >Editar</Link></td>
                      <td><input className='Borrar' type='button' value='Borrar'/></td>
                    </tr>
              ))
            }
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

export default Datos_Formulario;
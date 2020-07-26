import React, {Component} from 'react';
import axios from 'axios';

class Datos_Formulario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formularios: null,
    };
  }

  //Conexion con el backend en puerto 8081
  async componentDidMount() {
    const formularios = (await axios.get('http://localhost:8081/tabla')).data;
    this.setState({
      formularios,
    });
  }

  render() {
    return (
      <div className="container">
        <div><table class="table" >
          <thead class="thead-dark">
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
                      <th>{formulario.id}</th>
                      <td>{formulario.nombre}</td>
                      <td>{formulario.dpi}</td>
                      <td>{formulario.celular}</td>
                      <td>{formulario.inconformidad}</td>
                      <td>{formulario.departamento}</td>
                      <td>{formulario.municipio}</td>
                      <td>{formulario.encargado}</td>
                      <td><input class='Guardar' type='button' value='Guardar'/></td>
                      <td><input class='Borrar' type='button' value='Borrar'/></td>
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
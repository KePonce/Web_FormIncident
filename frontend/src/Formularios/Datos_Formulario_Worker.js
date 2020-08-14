import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
class Datos_Formulario_Worker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formularios: null,
    };
  }

  onSubmit = (dpi) => {
          
            
    axios.post('http://localhost:8082/ActualizarEstado/'+dpi,{
        id: dpi,
        estado: "Resuelto",
        
    })
    .then(function (response) {
        alert(response);
    })
    .catch(function (error) {
        console.log(error);
    });

}



  //Conexion con el backend en puerto 8081
  async componentDidMount() {
    const formularios = (await axios.get('http://localhost:8082/incidente')).data;
    
    
    this.setState({
      formularios
    });
  }

  render() {
    return (
      <div className="container">
        <div><table class="table" >
          <thead class="thead-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">DPI</th>
              <th scope="col">Celular</th>
              <th scope="col">Inconformidad</th>
              <th scope="col">Departamento</th>
              <th scope="col">Municipio</th>
              <th scope="col">Estado</th>
              <th scope="col">Direccion</th>
              <th scope="col">Resolver</th>
            </tr>
          </thead>
          <tbody>
            {this.state.formularios === null && <p>Loading formularios...</p>}
            {
              this.state.formularios && this.state.formularios.map(formulario => (
                    <tr>
                      {console.log(formulario)}
                      <td>{formulario.NOMBRE_COMPLETO}</td>
                      <td>{formulario.DPI}</td>
                      <td>{formulario.CELULAR}</td>
                      <td>{formulario.INCONFORMIDAD}</td>
                      <td>{formulario.DEPARTAMENTO}</td>
                      <td>{formulario.MUNICIPIO}</td>
                      <td>{formulario.ESTADO}</td>
                      <td>{formulario.DIRECCION}</td>
                      <td><Link class="btn btn-outline-info "  to={"/resolverincidente/"+formulario.DPI} >Resolver</Link></td>
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

export default Datos_Formulario_Worker;
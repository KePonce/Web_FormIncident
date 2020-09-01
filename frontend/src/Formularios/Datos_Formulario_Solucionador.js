import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {getHost} from './UserFunctions'
import { controlador } from './controlador'
class Datos_Formulario_Worker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formularios: null,
    };
  }

  onSubmit = (dpi) => {
          
            
    axios.post(`http://`+ getHost()+`/ActualizarEstado/`+dpi,{
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
    let ctrl = new controlador()
    const formularios = (await axios.get(`http://`+ getHost()+`/IncidenteSolucionador/`+ctrl.getUser())).data;
    
    
    this.setState({
      formularios
    });
  }

  render() {
    let ctrl = new controlador()
    console.log(ctrl.isLogin(), ctrl.isSolucionador())
    if (ctrl.isLogin() && ctrl.isSolucionador()){
      return (
        
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
                    <td>{formulario.nombre_completo}</td>
                    <td>{formulario.dpi}</td>
                    <td>{formulario.celular}</td>
                    <td>{formulario.inconformidad}</td>
                    <td>{formulario.departamento}</td>
                    <td>{formulario.municipio}</td>
                    <td class={formulario.estado == "Resuelto"?"bg-info"
                            :formulario.estado == "Terminado"?"bg-success":"bg-warning"}>{formulario.estado}</td>
                    <td>{formulario.direccion}</td>
                    <td>{formulario.estado == "Asignado"?<Link class="btn btn-outline-info "  to={"/resolverincidente/"+formulario.dpi} >Resolver</Link>
                        :formulario.estado == "Terminado"?<p>Caso Solucionado</p>:<p>Resuelto</p>}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          </div>
        
      )
    }
    else{
      return(<p>Cargando...</p>)
    }
  }
}

export default Datos_Formulario_Worker;
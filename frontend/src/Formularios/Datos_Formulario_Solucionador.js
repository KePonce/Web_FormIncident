import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {getHost} from './UserFunctions'
import { controlador } from './controlador'
class Datos_Formulario_Worker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formularios: null
    };
  }

  onSubmit = (dpi) => {            
    axios.post(`http://`+ getHost()+`/ActualizarEstado/`+dpi,{
        id: dpi,
        estado: "Resuelto",
        
    })
    .then(function (response) {
        alert(response);
        this.render()
    })
    .catch(function (error) {
        console.log(error);
    });

}

  //Conexion con el backend en puerto 8081
  async componentDidMount() {
    let ctrl = new controlador()
    const formularios = (await axios.get(`http://`+ getHost()+`/IncidenteSolucionador/`+ctrl.getUser())).data;
    document.getElementById("titulo").innerHTML = "Todos los Incidentes";
    this.setState({
      formularios
    });
    this.render()
  }

  async getResueltos(){
    let ctrl = new controlador()
    const formularios = (await axios.get(`http://`+ getHost()+`/resueltoencargado/`+ctrl.getUser())).data;
    document.getElementById("titulo").innerHTML = "Incidentes Resueltos";
    this.setState({
      formularios
    });
    this.render()
  }

  async getAsignados(){
    let ctrl = new controlador()
    const formularios = (await axios.get(`http://`+ getHost()+`/asignadoencargado/`+ctrl.getUser())).data;
    document.getElementById("titulo").innerHTML = "Incidentes Asignados";
    this.setState({
      formularios
    });
    this.render()
  }

  async getTerminados() {
    let ctrl = new controlador()
    const formularios = (await axios.get(`http://`+ getHost()+`/terminadoencargado/`+ctrl.getUser())).data;
    document.getElementById("titulo").innerHTML = "Incidentes Terminados";
    this.setState({
      formularios
    });
    this.render()
  }

  render() {
    let ctrl = new controlador()
    if (ctrl.isLogin() && ctrl.isSolucionador()){
      return (
        <div class ="container-fluid">
           <div class="btn-group col-sm-12">
              <button onClick={() => this.getAsignados()} className="btn btn-warning">Asignados</button>            
              <button onClick={() => this.getResueltos()} className="btn btn-success">Resueltos</button>            
              <button onClick={() => this.getTerminados()} className="btn btn-info">Terminados</button>            
              <button onClick={() => this.componentDidMount()} className="btn btn-dark">Todos</button>            
            </div>  
          <div>
          <h3 id="titulo">Todos los Incidentes</h3>
            <table class="table" >
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
        </div>
        
      )
    }
    else{
      return(<p>Cargando...</p>)
    }
  }
}

export default Datos_Formulario_Worker;
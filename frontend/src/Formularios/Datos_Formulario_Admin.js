import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {getHost} from './UserFunctions'
import { controlador } from './controlador'
class Datos_Formulario_Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formularios: null,
    };
  }
/*
  async getResueltos(){
    const formularios = (await axios.get('http://34.217.43.198:8082/incidenteresuelto')).data;
    this.setState({
      formularios
    });
    this.render()
  }

  async getAsignados(){
    const formularios = (await axios.get('http://34.217.43.198:8082/incidenteasignado')).data;
    this.setState({
      formularios
    });
    this.render()
  }

  async getTerminados() {
    const formularios = (await axios.get('http://34.217.43.198:8082/incidenteterminado')).data;
    this.setState({
      formularios
    });
    this.render()
  }

*/
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
    const formularios = (await axios.get(`http://`+ getHost()+`/incidente`)).data;
    this.setState({
      formularios
    });
  }

  render() {
    let ctrl = new controlador()
    return ctrl.isLogin() ?(
      /*
            DETRO DEL CONTEINER
          <div class="btn-group col-sm-12">
          <button onClick={() => this.getAsignados()} className="btn btn-warning">Asignados</button>            
          <button onClick={() => this.getResueltos()} className="btn btn-success">Resueltos</button>            
          <button onClick={() => this.getTerminados()} className="btn btn-info">terminados</button>            
          <button onClick={() => this.componentDidMount()} className="btn btn-dark">Todos</button>            
          </div>  
            */
      <div class ="container-fluid">
        <div class="table-responsive">
            <table className="table table-md" >
                <thead class="thead-dark">
                  <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">DPI</th>
                  <th scope="col">Celular</th>
                  <th scope="col">Inconformidad</th>
                  <th scope="col">Departamento</th>
                  <th scope="col">Municipio</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Encargado</th>
                  <th scope="col">Respuesta</th>
                  <th scope="col">Fecha_Creado</th>
                  <th scope="col">Fecha_Resuelto</th>
                  <th scope="col">Fecha_Terminado</th>
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
                      <td>{formulario.operador_usuario}</td>
                      <td>{formulario.respuesta}</td>
                      <td>{formulario.fecha_creado}</td>
                      <td>{formulario.fecha_resuelto}</td>
                      <td>{formulario.fecha_terminado}</td>
                    </tr>
              ))
            }
          </tbody>
        </table>
        </div>
      </div>
      
    ): <p>Cargando...</p>;
  }
}

export default Datos_Formulario_Admin;
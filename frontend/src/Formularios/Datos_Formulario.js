import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { controlador } from './controlador'
class Datos_Formulario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formularios: null,
    };
  }

  onSubmit = (dpi) => {
          
            
    axios.post('http://localhost:8082/ActualizarEstado/'+dpi,{
        id: dpi,
        estado: "Terminado",
        
    })
    .then(function (response) {
        console.log(response);
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
    let prueba ="";
    let ctrl = new controlador()
    if(ctrl.isLogin() && ctrl.isDigitador()){
      return (
        
          <div class="table-responsive">
            <table className="table table-md" >
            <thead className="thead-dark">
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
                <th scope="col">Terminar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.formularios === null && <p>Loading formularios...</p>}
                
              {
                this.state.formularios && this.state.formularios.map(formulario => (
                  
                      <tr>
                        
                        <td>{formulario.NOMBRE_COMPLETO}</td>
                        <td>{formulario.DPI}</td>
                        <td>{formulario.CELULAR}</td>
                        <td>{formulario.INCONFORMIDAD}</td>
                        <td>{formulario.DEPARTAMENTO}</td>
                        <td>{formulario.MUNICIPIO}</td>
                        <td class={formulario.ESTADO == "Resuelto"?"bg-primary":formulario.ESTADO == "Terminado"?"bg-success":"bg-warning"}>{formulario.ESTADO}</td>
                        <td>{formulario.operador_usuario}</td>
                        <td>{formulario.RESPUESTA}</td>
                        <td>{formulario.FECHA_CREADO}</td>
                        <td>{formulario.FECHA_RESUELTO}</td>
                        
                <td>{formulario.ESTADO == "Resuelto"?<a href="#/formulario" onClick={() => this.onSubmit(formulario.DPI)} className="btn btn-info btn-block">Terminar Caso</a>:formulario.ESTADO == "Terminado"?<p>Caso Finalizado</p>:<p>en proceso</p>}</td>
                      </tr>
                ))
              }
            </tbody>
          </table>
          </div>
        
      )
    }else{
      return (<p>Cargando incidentes  ...</p>);
    }
     
  }
}

export default Datos_Formulario;
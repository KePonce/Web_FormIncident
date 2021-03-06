import React from 'react';
import estilos from './estilo.css';
import axios from 'axios';
import {getHost} from './UserFunctions'
import { controlador } from './controlador'
// import Formulario_quejas from './formulario_quejas/Formulario_Quejas';

//<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></link>
class Inconformidad_Formulario extends React.Component {
    
    //Creation on vals 
    constructor(props) {
        super(props);
        this.state = {inconformidad:'', respuesta:'', estado:'', operador:'', inconformidades:null
        };
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      //Changes on inputs and selects
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }

      async componentDidMount() {
        const inconformidades = (await axios.get(`http://`+ getHost()+`/operador`)).data;
        this.setState({
            inconformidades
        });
        this.render()
      }

      handleReset = () => {
        this.setState({
            inconformidad:'', respuesta:'', estado:'', operador:''
        });
      }

      //Button function to post incidents
      onSubmit = () => {
                    if(this.state.respuesta===null){
                        this.state.respuesta=''
                    }
                    if (this.state.inconformidad==='') {
                        alert("Debe ingresar inconformidad")
                    }
                    else if (this.state.operador==="") {
                        alert("Debe seleccionar encargado")
                    }
                    else{
                        axios.post(`http://`+ getHost()+`/NuevaInconformidad`,{
                            nombre_inconformidad: this.state.inconformidad,
                            encargado: this.state.operador,
                            respuesta: this.state.respuesta,
                            estado:'Activo',
                            operador: this.state.operador
                        })
                        .then(response => {
                            alert(response.data);
                            if (response.data==="Datos insertados") {
                                this.handleReset()
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    }
                }

  render() {
    let ctrl = new controlador()
    if(ctrl.isLogin() && ctrl.isAdmin()){
        return (
            <>
            <main role="main" className="flex-shrink-0 mt-5">
                <section className="text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">Inconformidad </h1>
                    <p className="lead text-muted">Por favor llene todos los espacios</p>       
                    </div>
                </section>
                <form className="album py-5 bg-light container">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="grupo">
                        <input type="text" name="inconformidad" value={this.state.inconformidad} onChange={this.handleChange} id="inconformidad" required></input><span className="barra"></span>
                        <label>Descripción de inconformidad:</label>
                        </div>
                    </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="grupo">
                        <input type="text" name="respuesta" value={this.state.respuesta} onChange={this.handleChange} id="respuesta" required></input><span className="barra"></span>
                        <label>Escriba una respuesta predefinida si la hay</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <select id="Encargado" name="operador" value={this.state.operador} onChange={this.handleChange}  required>
                            <option></option>
                            {this.state.inconformidades === null}
                            {
                            this.state.inconformidades && this.state.inconformidades.map(inconformidades => (
                                <option>
                                    {inconformidades.usuario}
                                </option>    
                            ))
                            }
                        </select><span className="barra"></span>
                        <label>Seleccione el encargado de solucionar la inconformidad:</label>
                    </div>
                    </div>
                    <hr></hr>
                    <a href="#/nuevainconformidad" type="submit" onClick={() => this.onSubmit()} className="btn btn-info btn-block">Guardar Inconformidad</a>      
                </form>
            </main>
        </>
       )
    }
    else{
        return(<p></p>)
    }
  }
}
 
export default Inconformidad_Formulario;
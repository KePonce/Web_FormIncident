import React from 'react';
import estilos from './estilo.css';
import axios from 'axios';
// import Formulario_quejas from './formulario_quejas/Formulario_Quejas';

//<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></link>
class Inconformidad_Formulario extends React.Component {
    
    //Creation on vals 
    constructor(props) {
        super(props);
        this.state = {inconformidad:'', encargado:'', respuesta:'', estado:'', operador:''
        };
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      //Changes on inputs and selects
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }

      //Button function to post incidents
      onSubmit = () => {
                    //Ingresar nueva inconformidad
                    axios.post('http://localhost:8082/NuevaInconformidad',{
                        nombre_inconformidad: this.state.inconformidad,
                        encargado: this.state.encargado,
                        respuesta: this.state.respuesta,
                        estado:'Activo',
                        operador: 'N'
                    })
                    .then(function (response) {
                        alert(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }

  render() {
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
                <div className="col-md-6">
                    <div  className="grupo">
                    <input type="text" name="encargado" value={this.state.encargado} onChange={this.handleChange} required></input><span className="barra"></span>
                    <label>Ingrese el encargado de solucionar la inconformidad:</label>
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
                </div>
                <hr></hr>
                <a href="#/incidente" type="submit" onClick={() => this.onSubmit()} className="btn btn-info btn-block">Guardar Inconformidad</a>      
            </form>
        </main>
    </>
   )
   
  
  }
 
}
 
export default Inconformidad_Formulario;
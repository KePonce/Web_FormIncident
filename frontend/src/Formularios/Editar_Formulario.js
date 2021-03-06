import React, {Component} from 'react';
import axios from 'axios';
import {getHost} from './UserFunctions'
import { controlador } from './controlador'

class Editar_Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formulario: null,
      Usuario: "",
      Dpi: "",
      Estado: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit = (dpi) => {
    axios.post(`http://`+ getHost()+`/ActualizarInc/`+dpi,{
        encargado: this.state.Usuario,
        id: dpi,
        estado: "asignado",
    })
    .then(function (response) {
        alert(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

   async componentDidMount() {
    let userId = this.props.match.params.dpi;
    console.log(userId)
    const formularios = (await axios.get(`http://`+ getHost()+`/incidente/${userId}`)).data;
    console.log(formularios)  
    this.setState({
      formulario: formularios
    });
    
  }

  render() {
    let ctrl = new controlador()
    return  ctrl.isLogin() ? (
      <div className="container">
      <div className="row">
        <div className="jumbotron col-12">
        {this.state.formulario && this.state.formulario.map(form => (
          <div>
                <h6>{"DPI: " + form.dpi}</h6>
                <h6>{"Nombre: " + form.nombre_completo}</h6>
                <h6>{"Celular: " + form.celular}</h6>
                <h6>{"Inconformidad: " + form.inconformidad}</h6>
                <h6>{"Departamento: " + form.departamento}</h6>
                <h6>{"Municipio: " + form.municipio}</h6>
                <h6>{"Estatus: " + form.estado}</h6>
                <div className="col-sm-6"  >
                    <div  className="grupo">
                    <select  id="depto" name="Usuario" value={this.state.Usuario} onChange={this.handleChange} required>
                            <option ></option>
                            <option>VisaNet</option>
                            <option>Informatica</option>
                            <option>MIDES</option>
                        </select><span className="barra"></span>
                    <label>Usuario</label>
                    </div>
                </div>
                <a href="#/incidente" onClick={() => this.onSubmit(form.dpi)} className="btn btn-info btn-block">Asignar</a>
          </div>
             ))
        }
        </div>
      </div>
    </div>
    ) : <p>Cargando...</p>;
  }
}

export default Editar_Formulario;
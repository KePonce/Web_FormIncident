import React, {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {getHost} from './UserFunctions'
import { controlador } from './controlador';

class Editar_Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formulario: null,
      Usuario: "",
      Dpi: "",
      Estado: "",
      Descripcion: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit = (dpi) => {
    axios.post(`http://`+ getHost()+`/ResolverInc/`+dpi,{
        desc: this.state.Descripcion,
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
    const ctrl = new controlador()
    return  ctrl.isLogin() ? (
      <div className="container">
      <div className="row">
        <h1>Resolver incidente</h1>
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
                <TextField id="outlined-multiline-flexible" label="Descripcion" name="Descripcion"
                  fullWidth multiline rowsMax={5} value={this.state.Descripcion}
                  onChange={this.handleChange} variant="outlined"/>
                <div className="jumbotron col-12"> 
                <a href="#/solucionarincidente" onClick={() => this.onSubmit(form.dpi)} className="btn btn-info btn-block">Resolver</a>
                </div>
          </div>
          ))
        }
        </div>
      </div>
    </div>
    ) : <p>Cargando ...</p>;
  }
}

export default Editar_Formulario;
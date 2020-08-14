import React, {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
class Editar_Formulario extends Component {
  constructor(props) {
    super(props);
    console.log("saludo",this.props);
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
    axios.post('http://localhost:8082/ResolverInc/'+dpi,{
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
    const formularios = (await axios.get(`http://localhost:8082/incidente/${userId}`)).data;
    console.log(formularios)  
    this.setState({
      formulario: formularios
    });
    
  }

  render() {
    const bandera = true;
    return bandera == true ? (
      <div className="container">
      <div className="row">
        <div className="jumbotron col-12">
        {this.state.formulario && this.state.formulario.map(form => (
          <div>
                <h6>{"DPI: " + form.DPI}</h6>
                <h6>{"Nombre: " + form.NOMBRE_COMPLETO}</h6>
                <h6>{"Celular: " + form.CELULAR}</h6>
                <h6>{"Inconformidad: " + form.INCONFORMIDAD}</h6>
                <h6>{"Departamento: " + form.DEPARTAMENTO}</h6>
                <h6>{"Municipio: " + form.MUNICIPIO}</h6>
                <h6>{"Estatus: " + form.ESTADO}</h6>
                <TextField id="outlined-multiline-flexible" label="Descripcion" name="Descripcion"
                  fullWidth multiline rowsMax={5} value={this.state.Descripcion}
                  onChange={this.handleChange} variant="outlined"/>
                <div className="jumbotron col-12"> 
                <a href="#/incidenteWorker" onClick={() => this.onSubmit(form.DPI)} className="btn btn-info btn-block">Resolver</a>
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
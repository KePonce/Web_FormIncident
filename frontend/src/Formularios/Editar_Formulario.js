import React, {Component} from 'react';
import axios from 'axios';

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
          
            
    axios.post('http://localhost:8082/ActualizarInc/'+dpi,{
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
       
        {
              this.state.formulario && this.state.formulario.map(form => (
          <div>

          
                <h6>{"DPI: " + form.DPI}</h6>
                <h6>{"Nombre: " + form.NOMBRE_COMPLETO}</h6>
                <h6>{"Celular: " + form.CELULAR}</h6>
                <h6>{"Inconformidad: " + form.INCONFORMIDAD}</h6>
                <h6>{"Departamento: " + form.DEPARTAMENTO}</h6>
                <h6>{"Municipio: " + form.MUNICIPIO}</h6>
                <h6>{"Estatus: " + form.ESTADO}</h6>
                
                
                <div className="col-sm-6"  >
                    <div  className="grupo">
                    <select  id="depto" name="Usuario" value={this.state.Usuario} onChange={this.handleChange} required>
                            <option ></option>
                            <option>Usuario1</option>
                            <option>Usuario2</option>
                            <option>Usuario3</option>
                            
                        </select><span className="barra"></span>
                    <label>Usuario</label>
                    </div>
                </div>
                
                <a href="#/incidente" onClick={() => this.onSubmit(form.DPI)} className="btn btn-info btn-block">Editar</a>
          </div>


             ))
            }

         
        </div>
      </div>
    </div>
    ) : <p>Loading ...</p>;
      /*return (
      
        <div className="container">
          <div className="row">
            <div className="jumbotron col-12">
              <p className="lead">{formulario.id}</p>
              <p className="lead">{formulario.id}</p>
              <p className="lead">{formulario.nombre}</p>
              <p className="lead">{formulario.dpi}</p>
              <p className="lead">{formulario.celular}</p>
              <p className="lead">{formulario.departamento}</p>
              <p className="lead">{formulario.municipio}</p>
              <p className="lead">{formulario.inconformidad}</p>
              <p className="lead">{formulario.encargado}</p>
            </div>
          </div>
        </div>
      
      )*/
  }
}

export default Editar_Formulario;
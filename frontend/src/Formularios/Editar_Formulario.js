import React, {Component} from 'react';
import axios from 'axios';

class Editar_Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formulario: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const formulario = (await axios.get(`http://localhost:8081/tabla/${params.formularioId}`)).data;
    this.setState({
      formulario,
    });
  }

  render() {
    console.log(this.state)
    const {formulario} = this.state;
    if (formulario === null) return <p>Loading ...</p>;
      return (
      <>
        <div className="container">
          <div className="row">
            <div className="jumbotron col-12">
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
      </>
      )
  }
}

export default Editar_Formulario;
import React, {Component} from 'react';
import axios from 'axios';

class Editar_Formulario extends Component {
  constructor(props) {
    super(props);
    console.log("saludo",this.props);
    this.state = {
      incidente: null,
    };
  }

  async componentDidMount() {
    console.log("h",this.props);
    const { match: { params } } = this.props;
    axios.get(`http://localhost:8081/incidente/${params.DPI}`)
    .then(({ data: incidente }) => {
      console.log('incidente', incidente);
      this.setState({ incidente });
    });
  }

  render() {
    console.log("hola");
    console.log(this.props);
    const {incidente} = this.state;
    console.log(incidente);
    if (incidente === null) return <p>Loading ...</p>;
    console.log(incidente);
      return (
      <>
        <div className="container">
          <div className="row">
            <div className="jumbotron col-12">
              <p className="lead">{incidente.IDINCIDENT}</p>
              <p className="lead">{incidente.NOMBRE_COMPLETO}</p>
              <p className="lead">{incidente.DPI}</p>
              <p className="lead">{incidente.CELULAR}</p>
              <p className="lead">{incidente.DEPARTAMENTO}</p>
              <p className="lead">{incidente.MUNICIPIO}</p>
              <p className="lead">{incidente.INCONFORMIDAD}</p>
              <p className="lead">{incidente.ENCARGADO}</p>
            </div>
          </div>
        </div>
      </>
      )
  }
}

export default Editar_Formulario;
import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Formulario from '../Formularios/Editar_Formulario';

class Editar extends React.Component {

  /*constructor(){
    //super()

  }*/

  componentDidMount() {
    const { dpi } = this.props.match.params;
    console.log(this.props.match.params)
    
  }


  

  render() {
    return (
      <div>
        <NavBar/>
        <Formulario {...this.props}/>
      </div>
    );
  }
}

export default Editar;
import React, {Component} from 'react'
import { controlador } from './controlador'
import axios from 'axios';
import {getHost} from './UserFunctions'
class FormularioNuevoUsuario extends Component {
    constructor() {
        super()
        this.state ={
            user:"",
            password:'',
            rol:'',
            confirmacion: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(){
        if(this.state.confirmacion != this.state.password){
            alert("No coinciden las contraseñas")
            this.setState({
                password:"", confirmacion:""
            });
            return
        }else{      
        axios.post(`http://`+ getHost()+`/InsertarUsuario`,{
                        user: this.state.user,
                        password: this.state.password,
                        rol: this.state.rol
                    })
                    .then(function (response) {
                        alert("Ya existe este usuario")
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    this.setState({
                        user:"", password:"", rol:"", confirmacion:""
                    });
        }
        
    }
    render(){
        const ctrl = new controlador()
        return  ctrl.isLogin() ? (
            <div>
                    <div className="row">
                    <div className="col-md-3 mt-5 mx-auto">
                            <h1 className="h3 mb-3 font-weight-normal">Agregar Usuario</h1>
                            <div className="form-gruop">
                                <input type="text"
                                className="barra"
                                name="user"
                                placeholder="Ingrese Nombre de Usuario"
                                value={this.state.user}
                                onChange={this.onChange}></input>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                className="barra"
                                name="password"
                                placeholder="Ingrese la contraseña"
                                value={this.state.password}
                                onChange={this.onChange}></input>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                className="barra"
                                name="confirmacion"
                                placeholder="Confirme la contraseña"
                                value={this.state.confirmacion}
                                onChange={this.onChange}></input>
                            </div>
                            <div>
                                <select name="rol" value={this.state.rol} onChange={this.onChange} required>
                                    <option>digitador</option>
                                    <option>admin</option>
                                    <option>solucionador</option>
                                    <option>consultor</option>
                                </select>
                            </div>
                                <button onClick={() => this.onSubmit()}
                                type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                    Agregar nuevo usuario
                                </button>
                        
                        </div> 
                    </div>
                
            </div>
        ): <p>Cargando ...</p>;
    }
}

export default FormularioNuevoUsuario
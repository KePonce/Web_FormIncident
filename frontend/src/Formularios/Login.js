import React, {Component} from 'react'
import {login} from './UserFunctions'

class Login extends Component {
    constructor() {
        super()
        this.state ={
            email:"",
            password:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const user ={
            usuario: this.state.email,
            pass: this.state.password
        }
        console.log("prueba")
        login(user).then(res => {
            if(res){
                this.props.history.push(`/incidente`)
            }
        })
    }
    render(){
        return(
            <div className="container1">
                <div className="container2">
                    <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Ingreso de Personal</h1>
                            <div className="form-gruop">
                                <input type="text"
                                className="barra"
                                name="email"
                                placeholder="Ingrese el Usuario"
                                value={this.state.email}
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
                                <button type="submit"
                                className="btn btn-lg btn-primary btn-block">
                                    Entrar
                                </button>
                        </form>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
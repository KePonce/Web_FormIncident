import axios from 'axios'

export const register = newUser => {
    return axios
    .post('users/register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password
    })
    .then(res => {
        console.log("Registrado")
    })
}

//Ruta principal depende del rol de usuario
export function getPath(rol) {
    
    if(rol == 'solucionador'){
        console.log("---")
        return '/solucionarincidente'
    }else if(rol == 'digitador'){
        console.log("--1")
        return '/formulario'
    }else if(rol == 'admin'){
        console.log("--2")
        return '/tablageneral'
    }

}

export const login = user =>{
    
    return axios
    .post('http://localhost:8082/login', {
        usuario: user.usuario,
        pass: user.pass
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}
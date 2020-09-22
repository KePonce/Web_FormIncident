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
    }else if(rol == 'consultor'){
        console.log("--2")
        return '/tablageneral'
    }

}

//Ruta ip backend
export function getHost() {
   return "localhost:8082"
   //return "34.217.43.198:8082"

}

export const login = user =>{
    
    return axios
    .post(`http://`+ getHost()+`/login`, {
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
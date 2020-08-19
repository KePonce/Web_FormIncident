export class controlador {

    constructor(usuario, rol){
        
        if(typeof controlador.instance === 'object'){
            return controlador.instance;
        }

        controlador.instance = this;
        return this;
    }

    getUser(){
        return localStorage.getItem('usuario')
    }

    isAdmin(){
        return localStorage.getItem("rol") === "admin"?true:false;
    }

    isSolucionador(){
        return localStorage.getItem("rol") === "solucionador"?true:false;
    }

    isDigitador(){
        
        return localStorage.getItem("rol") === "digitador"?true:false;
    }

    isLogin(){
        return localStorage.getItem("log") == 1?true:false;
    }
    
    setLogin(usuario, rol){
        
        localStorage.setItem('usuario', usuario );
        localStorage.setItem('rol', rol );
        localStorage.setItem('log', 1 );
        
    }

    setLogout(){
        localStorage.clear();
    }

}


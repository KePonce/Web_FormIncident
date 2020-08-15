export class controlador {

    constructor(usuario, rol){
        this.usuario = usuario;
        this.rol = rol;   
        this.log = 1;

        if(typeof controlador.instance === 'object'){
            return controlador.instance;
        }

        controlador.instance = this;
        return this;
    }

    isAdmin(){
        return this.rol === "admin"?true:false;
    }

    isSolucionador(){
        return this.rol === "solucionador"?true:false;
    }

    isDigitador(){
        return this.rol === "digitador"?true:false;
    }

    isLogin(){
        return this.log == 1?true:false;
    }
    
    setLogin(usuario, rol){
        this.usuario = usuario;
        this.rol = rol;   
        this.log = 1;
    }

    setLogout(){
        
        this.rol =''
        this.usuario =''
        this.log = -1
        
    }

}


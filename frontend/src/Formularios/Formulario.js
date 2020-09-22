import React from 'react';
import estilos from './estilo.css';
import axios from 'axios';
import { controlador } from './controlador'
import {getHost} from './UserFunctions'
import FormDialog from './VentaEmergente';
// import Formulario_quejas from './formulario_quejas/Formulario_Quejas';

//<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></link>
class Formulario extends React.Component {
    
    //Creation on vals 
    constructor(props) {
        super(props);
        this.state = {name: "",dpi: "",celular:"",inconformidad:"", departamento:"", municipio:"",
        estado:"", descripcion:"", encargado:"", direccion:""
        };
       
        this.handleChange = this.handleChange.bind(this);
      }

      //Changes on inputs and selects
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
      
      async componentDidMount() {
        const inconformidades = (await axios.get(`http://`+ getHost()+`/inconformidad`)).data;
        this.setState({
            inconformidades
        });
      }

      limpiar = () => {
        this.setState({name: "",dpi: "",celular:"",inconformidad:"", departamento:"", municipio:"",
        estado:"", descripcion:"", encargado:"", direccion:""});
      }

      handleReset = () => {
        this.setState({name: "",dpi: "",celular:"",inconformidad:"", departamento:"", municipio:"",
                        estado:"", descripcion:"", encargado:"", direccion:""});
      }

      //Button function to post incidents
      onSubmit = () => {
          if (this.state.name==="") {
            alert("Debe ingresar nombre")
          }
          else if (this.state.dpi==="" || this.state.dpi.length<13 || isNaN(this.state.dpi)) {
            alert("DPI vacío o incorrecto")
          }
          else if (this.state.celular==="" || this.state.celular.length<8 || isNaN(this.state.celular)) {
            alert("Celular vacío o incorrecto")
          }
          else if (this.state.departamento==="") {
            alert("Debe de seleccionar departamento")
          }
          else if (this.state.municipio==="") {
            alert("Debe de seleccionar municipio")
          }
          else if (this.state.inconformidad==="") {
            alert("Debe seleccionar inconformidad")
          }
          else{
            axios.post(`http://`+ getHost()+`/InsertarInc`,{
                    nombre: this.state.name,
                    dpi: this.state.dpi,
                    celular: this.state.celular,
                    inconformidad: this.state.inconformidad,
                    departamento: this.state.departamento,
                    municipio: this.state.municipio,
                    estado: 'Asignado',
                    descripcion: '',
                    encargado: this.state.encargado,
                    direccion: this.state.direccion
                })
                .then(response => {
                    alert(response.data)
                    if (response.data==="Datos insertados") {
                        this.handleReset()
                    }
                    return(<FormDialog/>)
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error)
                });
          }       
        }

  render() {
    let selectt1;
    let direcinput;
        if (this.state.inconformidad==="Código no válido banco/cajero" || 
            this.state.inconformidad==="Cajero no dio dinero" || 
            this.state.inconformidad==="Usuario bloqueado banco/cajero" ){
                direcinput= <div>
                        <input type="text" name="direccion" value={this.state.direccion} onChange={this.handleChange} id="direccion" required></input><span className="barra"></span>
                            <label>Dirección*:</label>
                    </div>;
        }
        if (this.state.departamento) {
        if (this.state.departamento==="Alta Verapaz") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Cobán</option>
                        <option>Santa Cruz Verapaz</option>
                        <option>San Cristobal Verapaz</option>
                        <option>Tactíc</option> 
                        <option>Tamahú</option>
                        <option>San Miguel Tucurú</option> 
                        <option>Panzos</option>
                        <option>Senahú</option> 
                        <option>San Pedro Carchá</option>
                        <option>SanJuan Chamelco</option> 
                        <option>Lanquín</option>
                        <option>Santa María Cahabón</option> 
                        <option>Chisec</option>
                        <option>Chahal</option> 
                        <option>Fray Bartolomé de las Casas</option> 
                        <option>Santa Catarina La Tinta</option>  
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>     
                    </div>;
        } if (this.state.departamento==="Baja Verapaz") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Salamá</option>
                        <option>San Miguel Chicaj</option>
                        <option>Rabinal</option>
                        <option>Cubulco</option>
                        <option>Granados</option>
                        <option>Santa Cruz El Chol</option>
                        <option>San Jerónimo</option>
                        <option>Purulhá</option> 
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }  
        if (this.state.departamento==="Chimaltenango") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Chimaltenango</option>
                        <option>San José Poaquil</option>
                        <option>San Martín Jilotepeque</option>
                        <option>San Juan Comalapa</option>
                        <option>Santa Apolonia</option>
                        <option>Tecpán Guatemala</option>
                        <option>Patzun</option>
                        <option>San Miguel Pochuta</option>
                        <option>Patzicia</option>
                        <option>Santa Cruz Balanyá</option>
                        <option>Acatenango</option>
                        <option>San Pedro Yepocapa</option>
                        <option>San Andrés Itzapa</option>
                        <option>Parramos</option>
                        <option>Zaragoza</option>
                        <option>El Tejar</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>     
                    </div>;
        } if (this.state.departamento==="Chiquimula") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Chiquimula</option>
                        <option>San José La Arada</option>
                        <option>San Juan Hermita</option>
                        <option>Jocotán</option>
                        <option>Camotán</option>
                        <option>Olopa</option>
                        <option>Esquipulas</option>
                        <option>Concepción Las Minas</option>
                        <option>Quezaltepeque</option>
                        <option>San Jacinto</option>
                        <option>Ipala</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }  
        if (this.state.departamento==="Petén") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Flores</option>
                        <option>San José</option> 
                        <option>San Benito</option> 
                        <option>San Andrés</option>
                        <option>La Libertad</option> 
                        <option>San Francisco</option> 
                        <option>Santa Ana</option>
                        <option>Dolores</option> 
                        <option>San Luis</option>
                        <option>Sayaxche</option>
                        <option>Melchor de Mencos</option>
                        <option>Poptún</option>                      
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }    
        if (this.state.departamento==="El Progreso") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Guastatoya</option>
                        <option>Morazán</option>
                        <option>San Agustín Acasaguastlan</option>
                        <option>San Cristóbal Acasaguastlan</option>
                        <option>El Jícaro</option>
                        <option>Sansare</option>
                        <option>Sanarate</option>
                        <option>San Antonio La Paz</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }    
        if (this.state.departamento==="Quiché") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Santa Cruz del Quiche</option>
                        <option>Chiche</option>
                        <option>Chinique</option>
                        <option>Zacualpa</option>
                        <option>Chajul</option>
                        <option>Santo Tomás Chichicstenango</option>
                        <option>Patzité</option>
                        <option>San Antonio Ilotenango</option>
                        <option>San Pedro Jocopilas</option>
                        <option>Cunén</option>
                        <option>San Juan Cotzal</option>
                        <option>Joyabaj</option>
                        <option>Santa María Nebaj</option>
                        <option>Santa María Nebaj</option>
                        <option>San Andrés Sajcabajá</option>
                        <option>San Miguel Uspatán</option>
                        <option>Sacapulas</option>
                        <option>San Bartolomé Jocotenango</option>
                        <option>Canilla</option>
                        <option>Chicaman</option>
                        <option>Playa Grnade - Ixcán</option>
                        <option>Pachalúm</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }    
        if (this.state.departamento==="Escuintla") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Escuintla</option>
                        <option>Santa Lucía Cotzumalguapa</option>
                        <option>La Democracia</option>
                        <option>Siquinalá</option>
                        <option>Masagua</option>
                        <option>Pueblo Nuevo Tiquisate</option>
                        <option>La Gomera</option>
                        <option>Guanagazapa</option>
                        <option>Puerto de San José</option>
                        <option>Iztapa</option>
                        <option>Palín</option>
                        <option>San Vicente Pacaya</option>
                        <option>Nueva Concepción</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }    
        if (this.state.departamento==="Guatemala") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Guatemala</option>
                        <option>Santa Catarina Pinula</option>
                        <option>San José Pinula</option>
                        <option>San José del Golfo</option>
                        <option>Palencia</option>
                        <option>Chinautla</option>
                        <option>San Pedro Ayampuc</option>
                        <option>Mixco</option>
                        <option>San Pedro Sacatepequez</option>
                        <option>San Juan Sacatepequez</option>
                        <option>San Raymundo</option>
                        <option>Chuarrancho</option>
                        <option>Fraijanes</option>
                        <option>Amatitlán</option>
                        <option>Villa Nueva</option>
                        <option>Villa Canales</option>
                        <option>San Miguel Petapa</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }    
        if (this.state.departamento==="Huehuetenango") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Huehuetenango</option>
                        <option>Chiantla</option>
                        <option>Malacatancito</option>
                        <option>Cuilco</option>
                        <option>Nentón</option>
                        <option>San Pedro Necta</option>
                        <option>Jacaltenango</option>
                        <option>San Pedro Soloma</option>
                        <option>San Ildelfonso Ixtahuac´n</option>
                        <option>Santa Bárbara</option>
                        <option>La Libertad</option>
                        <option>La Democracia</option>
                        <option>San Miguel Acatán</option>
                        <option>San Rafael La Independencia</option>
                        <option>Todos Santos Chuchcumatán</option>
                        <option>San Juan Atitán</option>
                        <option>Santa Eulalia</option>
                        <option>San Mateo Ixtatán</option>
                        <option>Colotenango</option>
                        <option>San Sebastián Huehuetenango</option>
                        <option>Tectitán</option>
                        <option>Concepción Huista</option>
                        <option>San Juan Ixcoy</option>
                        <option>San Antonio Huista</option>
                        <option>San Sebastián Coatán</option>
                        <option>Santa Cruz Barillas</option>
                        <option>Aguacatán</option>
                        <option>San Rafael Petzal</option>
                        <option>San Gaspar Ixchil</option>
                        <option>Santiago Chimaltenango</option>
                        <option>Santa Ana Huista</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }    
        if (this.state.departamento==="Izabal") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Puerto Barrios</option>
                        <option>Livingston</option>
                        <option>El Estor</option>
                        <option>Morales</option>
                        <option>Los Amates</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }    
        if (this.state.departamento==="Jalapa") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>San Pedro Pinula</option>
                        <option>San Luis Jilotepeque</option>
                        <option>San Manuel Chaparrón</option>
                        <option>San Carlos Alzatate</option>
                        <option>Monjas</option>
                        <option>Mataquescuintla</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }     
        if (this.state.departamento==="Jutiapa") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>El Progreso</option>
                        <option>Santa Catarina Mita</option>
                        <option>Agua Blanca</option>
                        <option>Asunción Mita</option>
                        <option>Yupiltepeque</option>
                        <option>Atescatempa</option>
                        <option>Jerez</option>
                        <option>El Adelanto</option>
                        <option>Zapotitlán</option>
                        <option>Comapa</option>
                        <option>Jalpatagua</option>
                        <option>Conguaco</option>
                        <option>Moyuta</option>
                        <option>Pasaco</option>
                        <option>San José Acatempa</option>
                        <option>Quezada</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }    
        if (this.state.departamento==="Quetzaltenango") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Quetzaltenango</option>
                        <option>Olintepeque</option>
                        <option>San Carlos Sija</option>
                        <option>Sibilia</option>
                        <option>Cabrican</option>
                        <option>Cajola</option>
                        <option>San Miguel Siguilça</option>
                        <option>San Juan Ostuncalco</option>
                        <option>San Mateo</option>
                        <option>Concepción Chiquirichapa</option>
                        <option>San Martín Sacatepequez</option>
                        <option>Almolonga</option>
                        <option>Cantel</option>
                        <option>Huitán</option>
                        <option>Zunil</option>
                        <option>Colomba</option>
                        <option>San Francisco La Unión</option>
                        <option>El Palmar</option>
                        <option>Coatepeque</option>
                        <option>Génova</option>
                        <option>Flores Costa Cuca</option>
                        <option>La Esperanza</option>
                        <option>Palestina de los Altos</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }    
        if (this.state.departamento==="Retalhuleu") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Retalhuelu</option>
                        <option>San Sebastián</option>
                        <option>Santa Cruz Mulúa</option>
                        <option>San Martín Zapotitlán</option>
                        <option>San Felipe Retalhuleu</option>
                        <option>San Andrés Villa Seca</option>
                        <option>Champerico</option>
                        <option>Nuevo San Carlos</option>
                        <option>El Asintal</option>                      
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }    
        if (this.state.departamento==="Sacatepéquez") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Antigua Guatemala</option>
                                <option>Jocotenango</option>
                                <option>Pastores</option>
                                <option>Sumpango</option>
                                <option>Santo Domingo Xenacoj</option>
                                <option>Santiago Sacatepequez</option>
                                <option>San Bartolomé Milpas Altas</option>
                                <option>San Lucas Sacatepequez</option>
                                <option>Santa Lucía Milpas Altas</option>
                                <option>Magdalena Milpas Altas</option>
                                <option>Santa María de Jesús</option>
                                <option>Ciudad Vieja</option>
                                <option>San Miguel Dueñas</option>
                                <option>San Juan Alotenango</option>
                                <option>San Antonio Aguas Calientes</option>
                                <option>Santa Catarina Barahona</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }      
        if (this.state.departamento==="San Marcos") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>San Marcos</option>
                        <option>San Pedro Sacatepéquez</option>
                        <option>Comitancillo</option>
                        <option>San Antonio Sacatepéquez</option>
                        <option>San Miguel Ixtahuacan</option>
                        <option>Concepción Tutuapa</option>
                        <option>Tacaná</option>
                        <option>Sibinal</option>
                        <option>Tajumulco</option>
                        <option>Tejutla</option>
                        <option>San Rafael Pié de la Cuesta</option>
                        <option>Nuevo Progreso</option>
                        <option>El Tumbador</option>
                        <option>San José El Rodeo</option>
                        <option>Malacatán</option>
                        <option>Catarina</option>
                        <option>Ayutla</option>
                        <option>Ocos</option>
                        <option>San Pablo</option>
                        <option>El Quetzal</option>
                        <option>La Reforma</option>
                        <option>Pajapita</option>
                        <option>Ixchiguan</option>
                        <option>San José Ojetenán</option>
                        <option>San Cristóbal Cucho</option>
                        <option>Sipacapa</option>
                        <option>Esquipulas Palo Gordo</option>
                        <option>Río Blanco</option>
                        <option>San Lorenzo</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }      
        if (this.state.departamento==="Santa Rosa") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Cuilapa</option>
                        <option>Berberena</option>
                        <option>San Rosa de Lima</option>
                        <option>Casillas</option>
                        <option>San Rafael Las Flores</option>
                        <option>Oratorio</option>
                        <option>San Juan Tecuaco</option>
                        <option>Chiquimulilla</option>
                        <option>Taxisco</option>
                        <option>Santa María Ixhuatan</option>
                        <option>Guazacapán</option>
                        <option>Santa Cruz Naranjo</option>
                        <option>Pueblo Nuevo Viñas</option>
                        <option>Nueva Santa Rosa</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }      
        if (this.state.departamento==="Sololá") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Sololá</option>
                        <option>San José Chacaya</option>
                        <option>Santa María Visitación</option>
                        <option>Santa Lucía Utatlán</option>
                        <option>Nahualá</option>
                        <option>Santa Catarina Ixtahuacán</option>
                        <option>Santa Clara La Laguna</option>
                        <option>Concepción</option>
                        <option>San Andrés Semetabaj</option>
                        <option>Panajachel</option>
                        <option>Santa Catarina Palopó</option>
                        <option>San Antonio Palopó</option>
                        <option>San Lucas Tolimán</option>
                        <option>Santa Cruz La Laguna</option>
                        <option>San Pablo La Laguna</option>
                        <option>San Marcos La Laguna</option>
                        <option>San Juan La Laguna</option>
                        <option>San Pedro La Laguna</option>
                        <option>Santiago Atitlán</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }      
        if (this.state.departamento==="Suchitepéquez") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Mazatenango</option>
                        <option>Cuyotenango</option>
                        <option>San Francisco Zapotitlán</option>
                        <option>San Bernardino</option>
                        <option>San José El Ídolo</option>
                        <option>Santo Domingo Suchitepequez</option>
                        <option>San Lorenzo</option>
                        <option>Samayac</option>
                        <option>San Pablo Jocopilas</option>
                        <option>San Antonio Suchitepéquez</option>
                        <option>San Miguel Panán</option>
                        <option>San Gabriel</option>
                        <option>Chicacao</option>
                        <option>Patulul</option>
                        <option>Santa Bárbara</option>
                        <option>San Juan Bautista</option>
                        <option>Santo Tomás La Unión</option>
                        <option>Zunilito</option>
                        <option>Pueblo Nuevo Suchitepéquez</option>
                        <option>Río Bravo</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }      
        if (this.state.departamento==="Totonicapán") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Totonicapán</option>
                        <option>San Cristóbal Totonicapán</option>
                        <option>San Francisco El Alto</option>
                        <option>San Andrés Xecul</option>
                        <option>Momostenango</option>
                        <option>Santa María Chiquimula</option>
                        <option>Santa Lucía La Reforma</option>
                        <option>San Bartolo Aguas Calientes</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }      
        if (this.state.departamento==="Zacapa") {
            selectt1 =<div>                   
                        <select  id="municipio" name="municipio" value={this.state.municipio} onChange={this.handleChange}  required>
                        <option ></option>
                        <option>Zacapa</option>
                        <option>Estanzuela</option>
                        <option>Río Hondo</option>
                        <option>Gualán</option>
                        <option>Teculután</option>
                        <option>Usumatlán</option>
                        <option>Cabañas</option>
                        <option>San Diego</option>
                        <option>La Unión</option>
                        <option>Huite</option>
                        </select> <span className="barra"></span>             
                        <label>Municipio*</label>         
                    </div>;
        }  
        } 
        let ctrl = new controlador()
        return ctrl.isDigitador() ? (
    <>
        <main role="main" className="flex-shrink-0 mt-5">
            <section className="text-center">
            <div className="container">
                <h1 className="jumbotron-heading">Incidencias </h1>
                <p className="lead text-muted">Por favor llene todos los espacios</p>       
                </div>
            </section>
            <form className="album py-5 bg-light container">
                <div className="row">
                <div className="col-md-6">
                    <div className="grupo">
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} id="name" required></input><span className="barra"></span>
                    <label>Nombre Completo de Quien Reporta*:</label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div  className="grupo">
                    <input type="tel" name="dpi" maxLength="13" value={this.state.dpi} onChange={this.handleChange}  required></input><span className="barra"></span>
                    <label>DPI*:</label>
                    </div>
                </div> 
                </div>
                <hr></hr>
                <div className="row">
                <div className="col-md-6">
                    <div className="grupo">
                    <input type="tel" name="celular" minLength="8" maxLength="8" value={this.state.celular} onChange={this.handleChange} id="celular" required></input><span className="barra"></span>
                    <label>Teléfono registrado*</label>
                    </div>
                </div>
                </div>
                <hr></hr>
                <div className="row">
                <div className="col-sm-6"  >
                    <div  className="grupo">
                    <select  id="depto" name="departamento" value={this.state.departamento} onChange={this.handleChange} required>
                            <option ></option>
                            <option>Alta Verapaz</option>
                            <option>Baja Verapaz</option>
                            <option>Chimaltenango</option>
                            <option>Chiquimula</option>
                            <option>Petén</option>
                            <option>El Progreso</option>
                            <option>Quiché</option>
                            <option>Escuintla </option>
                            <option>Guatemala</option>
                            <option>Huehuetenango</option>
                            <option>Izabal</option>
                            <option>Jalapa</option>
                            <option>Jutiapa</option>
                            <option>Quetzaltenango</option>
                            <option>Retalhuleu</option>
                            <option>Sacatepéquez</option>
                            <option>San Marcos</option>
                            <option>Santa Rosa</option>
                            <option>Sololá</option>
                            <option>Suchitepéquez</option>
                            <option>Totonicapán</option>
                            <option>Zacapa</option>
                        </select><span className="barra"></span>
                    <label>Departamento*</label>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div  className="grupo">
                    {selectt1}  
                    </div>
                </div>
                </div>
                <hr></hr>
                <div className="row">
                <div className="col-sm-6"  >
                    <div  className="grupo">
                    <select id="incident" name="inconformidad" value={this.state.inconformidad} onChange={this.handleChange} required>
                        <option ></option>
                        {this.state.inconformidades === null}
                        {
                        this.state.inconformidades && this.state.inconformidades.map(inconformidades => (
                            <option>
                                {inconformidades.nombre_inconformidad}
                            </option>    
                        ))
                        }
                        </select><span className="barra"></span>
                    <label>Inconformidad*</label>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="grupo">
                        {direcinput}
                    </div>
                </div>
                </div>
                <hr></hr>
                <a href="#/formulario" type="submit" onClick={() => this.onSubmit()} className="btn btn-info btn-block">Enviar Reporte</a>      
                <a href="#/formulario" type="submit" onClick={() => this.handleReset()} className="btn btn-info btn-block">Ingresar Nuevo</a>      
            </form>
        </main>
    </>
   ) : <p>Cargando...</p>;
  }
 
}
 
export default Formulario;
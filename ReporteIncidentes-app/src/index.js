//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mysql = require('mysql');
const { contentSecurityPolicy } = require('helmet');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

process.env.SECRET_KEY = 'secret'
// define the Express app
const app = express();

// the database
var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'incidentesdb'
});

mysqlConnection.connect((err)=>{
  if(!err)
  console.log('DB connection succeded')
  else
  console.log('DB connection failed \n Error : ' + JSON.stringify(err,undefined,2));
});

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));



// retrieve all incidentes
app.get('/incidente', (req, res) => {
  mysqlConnection.query('SELECT * FROM incidente', (err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err)
  });
});

// retrieve all operador
app.get('/operador', (req, res) => {
  mysqlConnection.query('SELECT * FROM operador', (err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err)
  });
});


// get a specific incidente
app.get('/incidente/:dpi', (req, res) => {
  
  mysqlConnection.query('SELECT * FROM incidente WHERE DPI = ?', [req.params.dpi], (err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err)
  })
});

app.post('/login', (req, res) => {
  let emp = req.body;
  console.log(emp)
  
  mysqlConnection.query('SELECT * FROM usuario WHERE Usuario = ?', [emp.usuario], (err, rows, fields)=>{
    
    if(!err && rows.length > 0){
      if(emp.pass==rows[0].pass) {
        res.send(rows[0])
      }
    }
    else{
    console.log("No existe el usuario")
    console.log(err)
    }
  })
});

app.post('/ActualizarInc/:dpi', (req, res) => {
  let emp = req.body;
  mysqlConnection.query('UPDATE incidente SET ESTADO = ?, ENCARGADO = ? WHERE DPI = ?', [emp.estado,emp.encargado,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("datos actualizados")
  })
});

app.post('/ActualizarDescripcion/:dpi', (req, res) => {
  let emp = req.body;
  mysqlConnection.query('UPDATE incidente SET ESTADO = ?, DESCRIPCION = ? WHERE DPI = ?', [emp.estado,emp.desc,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("datos actualizados")
  })
});

app.post('/ActualizarEstado/:dpi', (req, res) => {
  let emp = req.body;
  mysqlConnection.query('UPDATE incidente SET ESTADO = ? WHERE DPI = ?', [emp.estado,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("datos actualizados")
  })
});

// insert a new incidente
  app.post('/InsertarInc', (req, res) => {
    console.log("entro");
    let emp = req.body;
    console.log(emp);

    mysqlConnection.query('SELECT * FROM incidente WHERE DPI = ?', [emp.dpi], (err, rows, fields)=>{
      if(!err)
      {
        if(rows.length == 0){
          var sql = 'INSERT INTO incidente(NOMBRE_COMPLETO, DPI, CELULAR, INCONFORMIDAD, DEPARTAMENTO, MUNICIPIO, ESTADO, DESCRIPICION_RESUELTO, ENCARGADO, DIRECCION)  VALUES (?,?,?,?,?,?,?,?,?,?)';
          mysqlConnection.query(sql, [emp.nombre, emp.dpi, emp.celular, emp.inconformidad, emp.departamento, emp.municipio, emp.estado, emp.descripcion, emp.encargado, emp.direccion], function(err, data){
            console.log(emp.direccion);
            if(err)
            console.log(err);
            else
            console.log("datos insertados")
          })
        }else{
          if(rows[0].ESTADO == 'terminado'){
            var sql = 'INSERT INTO incidente(NOMBRE_COMPLETO, DPI, CELULAR, INCONFORMIDAD, DEPARTAMENTO, MUNICIPIO, ESTADO, DESCRIPICION_RESUELTO, ENCARGADO, DIRECCION)  VALUES (?,?,?,?,?,?,?,?,?,?)';
            mysqlConnection.query(sql, [emp.nombre, emp.dpi, emp.celular, emp.inconformidad, emp.departamento, emp.municipio,emp.estado, emp.descripcion, emp.encargado, emp.direccion], function(err, data){
            if(err)
            console.log(err);
            else
            console.log("datos insertados")
          })
          }else{
            res.send("Ya existe un caso con este dpi")
          }
        }
    }
      else{
      console.log(err)
    }
    })
    
    
  });

//Ingresar nueva inconformidad
  app.post('/NuevaInconformidad', (req, res) => {
    console.log("inconformidad");
    let emp = req.body;
    console.log(emp);

    mysqlConnection.query('SELECT * FROM inconformidad WHERE Nombre_Inconformidad = ?', [emp.dpi], (err, rows, fields)=>{
      if(!err)
      {
        if(rows.length == 0){
          var sql = 'INSERT INTO inconformidad(Nombre_Inconformidad, Encargado, Respuesta, Estado, operador_usuario)  VALUES (?,?,?,?,?)';
          mysqlConnection.query(sql, [emp.nombre_inconformidad, emp.encargado, emp.respuesta, emp.estado, emp.operador], function(err, data){
            console.log(emp.direccion);
            if(err)
            console.log(err);
            else
            console.log("Inconformidad insertada")
          })
        }
    }
      else{
      console.log(err)
    }
    })
    
    
  });

// start the server
app.listen(8082, () => {
  console.log('listening on port 8082');
});
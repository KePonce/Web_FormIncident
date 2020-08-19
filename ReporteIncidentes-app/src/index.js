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
    if(!err){
    res.send(rows);}
    else
    console.log(err)
  });
});

app.get('/incidenteasignado', (req, res) => {
  console.log("entro")
  mysqlConnection.query(`SELECT * FROM incidente WHERE ESTADO = 'Asignado'`, (err, rows, fields)=>{
    if(!err){
    console.log(rows)
    res.send(rows);}
    else
    console.log(err)
  });
});

app.get('/incidenteresuelto', (req, res) => {
  mysqlConnection.query(`SELECT * FROM incidente WHERE ESTADO = 'Resuelto'`, (err, rows, fields)=>{
    if(!err){
    res.send(rows);}
    else
    console.log(err)
  });
});

app.get('/incidenteterminado', (req, res) => {
  mysqlConnection.query(`SELECT * FROM incidente WHERE ESTADO = 'Terminado'`, (err, rows, fields)=>{
    if(!err){
    res.send(rows);}
    else
    console.log(err)
  });
});

app.get('/IncidenteSolucionador/:user', (req, res) => {
  //mysqlConnection.query(`SELECT * FROM incidente WHERE operador_usuario = ? AND ESTADO = 'Asignado'`,[req.params.user], (err, rows, fields)=>{
  mysqlConnection.query(`SELECT * FROM incidente WHERE operador_usuario = ?`,[req.params.user], (err, rows, fields)=>{
    if(!err){
    res.send(rows);}
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

// retrieve all inconformidad
app.get('/inconformidad', (req, res) => {
  
  mysqlConnection.query('SELECT * FROM inconformidad', (err, rows, fields)=>{
    if(!err){
    console.log(rows);
    res.send(rows);}
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

//Ingreso de usuario
app.post('/login', (req, res) => {
  let emp = req.body;
  console.log(emp)
  mysqlConnection.query('SELECT * FROM operador WHERE Usuario = ?', [emp.usuario], (err, rows, fields)=>{
    if(!err && rows.length > 0){
      if(emp.pass==rows[0].pass) {
        return res.json({
          success: 23,
          user: rows[0].usuario,
          rol: rows[0].rol,
          message: "access successfully"
        });
      }
      else{
        console.log("No coincide la contraseña")
          return res.json({
            success: -1,
            message: "access unsuccessfully"
          });
        }
    }
    else{
    console.log("No existe el usuario")
      return res.json({
        success: -1,
        message: "access unsuccessfully"
      });
    }
  })
});

//Actualizar Incidente
app.post('/ActualizarInc/:dpi', (req, res) => {
  let emp = req.body;
  mysqlConnection.query('UPDATE incidente SET ESTADO = ?, FECHA_CREADO = ?, ENCARGADO = ? WHERE DPI = ?', [emp.estado,'NOW()',emp.encargado,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("datos actualizados")
  })
});

//Actualizar Descripcion
app.post('/ActualizarDescripcion/:dpi', (req, res) => {
  let emp = req.body;
  mysqlConnection.query('UPDATE incidente SET ESTADO = ?, DESCRIPCION = ? WHERE DPI = ?', [emp.estado,emp.desc,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("datos actualizados")
  })
});

//Terminar Incidente
app.post('/ResolverInc/:dpi', (req, res) => {
  let emp = req.body;
  mysqlConnection.query('UPDATE incidente SET ESTADO = ?, FECHA_RESUELTO = now(), RESPUESTA = ? WHERE DPI = ?', [emp.estado,emp.desc,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("datos actualizados")
  })
});

//Actualizar Estado
app.post('/ActualizarEstado/:dpi', (req, res) => {
  let emp = req.body;
  mysqlConnection.query('UPDATE incidente SET ESTADO = ?, FECHA_TERMINADO = now() WHERE DPI = ?', [emp.estado,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("datos actualizados")
  })
});

//Insertar nuevo incidente
  app.post('/InsertarInc', (req, res) => {
    console.log("entro");
    let emp = req.body;
    console.log(emp);
    
    mysqlConnection.query('SELECT * FROM incidente WHERE DPI = ?', [emp.dpi], (err, rows, fields)=>{
      if(!err)
      {
        if(rows.length == 0){
          var sql = 'INSERT INTO incidente(NOMBRE_COMPLETO, DPI, CELULAR, INCONFORMIDAD, DEPARTAMENTO, MUNICIPIO, ESTADO, DIRECCION,FECHA_CREADO, operador_usuario)  VALUES (?,?,?,?,?,?,?,?,now(),(SELECT operador_usuario from incidentesdb.inconformidad where Nombre_Inconformidad =' +"'" + emp.inconformidad + "'" +'))';
          mysqlConnection.query(sql, [emp.nombre, emp.dpi, emp.celular, emp.inconformidad, emp.departamento, emp.municipio, emp.estado, emp.direccion], function(err, data){
            if(err)
            console.log(err);
            else
            console.log("datos insertados")
          })
        }else{
          
          if(rows[0].ESTADO == 'terminado'){
            var sql = 'INSERT INTO incidente(NOMBRE_COMPLETO, DPI, CELULAR, INCONFORMIDAD, DEPARTAMENTO, MUNICIPIO, ESTADO, DIRECCION, FECHA_CREADO,operador_usuario)  VALUES (?,?,?,?,?,?,?,?,NOW(),(SELECT usuario from incidentesdb.operador where usuario=' +"'" + emp.encargado + "'" +'))';
            mysqlConnection.query(sql, [emp.nombre, emp.dpi, emp.celular, emp.inconformidad, emp.departamento, emp.municipio, emp.estado, emp.direccion], function(err, data){
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
          var sql = 'INSERT INTO inconformidad(Nombre_Inconformidad, Encargado, Respuesta, Estado, operador_usuario)  VALUES (?,?,?,?,(SELECT usuario from incidentesdb.operador where usuario=' +"'" + emp.encargado + "'" +'))';
          mysqlConnection.query(sql, [emp.nombre_inconformidad, emp.encargado, emp.respuesta, emp.estado], function(err, data){
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
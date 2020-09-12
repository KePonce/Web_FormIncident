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
const { response } = require('express');

const {Pool} = require("pg")


//coneccion a la base de datos
const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
}
const client = new Pool(connectionData)

// the database
/*var mysqlConnection = mysql.createConnection({
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
});*/

client.connect((err)=>{
  if(!err){
    console.log('DBPostgre connection succeded')
  }
  else{
    console.log('DBPostgre connection failed \n Error : ' + JSON.stringify(err,undefined,2));
  }
})


// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));


// obtener incidentes
app.get('/incidente', (req, res) => {
  client.query('SELECT * FROM incidente', (err, rows, fields)=>{
    if(!err){
    res.send(rows.rows);}
    else
    console.log(err)
  });
});

//Obtiene los incidentes con estado asignado
app.get('/incidenteasignado', (req, res) => {
  client.query(`SELECT * FROM incidente WHERE estado = 'Asignado'`, (err, rows, fields)=>{
    if(!err){
    res.send(rows.rows);}
    else
    console.log(err)
  });
});

//Obtiene los incidentes con estado resuelto
app.get('/incidenteresuelto', (req, res) => {
  client.query(`SELECT * FROM incidente WHERE estado = 'Resuelto'`, (err, rows, fields)=>{
    if(!err){
    res.send(rows.rows);}
    else
    console.log(err)
  });
});

//Obtiene los incidentes con estado terminado
app.get('/incidenteterminado', (req, res) => {
  client.query(`SELECT * FROM incidente WHERE estado = 'Terminado'`, (err, rows, fields)=>{
    if(!err){
    res.send(rows.rows);}
    else
    console.log(err)
  });
});

//Obtiene los incidentes de un solucionador
app.get('/IncidenteSolucionador/:user', (req, res) => {
  //mysqlConnection.query(`SELECT * FROM incidente WHERE operador_usuario = ? AND ESTADO = 'Asignado'`,[req.params.user], (err, rows, fields)=>{
  client.query(`SELECT * FROM incidente WHERE operador_usuario = $1`,[req.params.user], (err, rows, fields)=>{
    if(!err){
    res.send(rows.rows);}
    else
    console.log(err)
  });
});

//Obtiene los operadores
app.get('/operador', (req, res) => {
  client.query('SELECT * FROM operador', (err, rows, fields)=>{
    if(!err)
    res.send(rows.rows);
    else
    console.log(err)
  });
});

// retrieve all inconformidad
app.get('/inconformidad', (req, res) => {
  client.query('SELECT * FROM inconformidad', (err, rows, fields)=>{
    if(!err){
    res.send(rows.rows);}
    else
    console.log(err)
  });
});

//Get a specific incidente
app.get('/incidente/:dpi', (req, res) => {
  client.query('SELECT * FROM incidente WHERE dpi = $1', [req.params.dpi], (err, rows, fields)=>{
    if(!err){
    console.log(rows.rows)
    res.send(rows.rows);}
    else
    console.log(err)
  })
});

//Ingreso de usuario
app.post('/login', (req, res) => {
  let emp = req.body;
  client.query('SELECT * FROM operador WHERE usuario = $1', [emp.usuario], (err, rows, fields)=>{
    if(!err && rows.rows.length > 0){
      if(emp.pass==rows.rows[0].pass) {
        return res.json({
          success: 23,
          user: rows.rows[0].usuario,
          rol: rows.rows[0].rol,
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
  client.query('UPDATE incidente SET estado = $1, fecha_creado = $2, encargado = $3 WHERE dpi = $4', [emp.estado,'now()',emp.encargado,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("Datos actualizados")
  })
});

//Actualizar Descripcion
app.post('/ActualizarDescripcion/:dpi', (req, res) => {
  let emp = req.body;
  client.query('UPDATE incidente SET estado = $1, descripcion = $2 WHERE dpi = $3', [emp.estado,emp.desc,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("Datos actualizados")
  })
});

//Terminar Incidente
app.post('/ResolverInc/:dpi', (req, res) => {
  let emp = req.body;
  client.query('UPDATE incidente SET estado = $1, fecha_resuelto = now(), respuesta = $2 WHERE dpi = $3', [emp.estado,emp.desc,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("Datos actualizados")
  })
});

//Actualizar Estado
app.post('/ActualizarEstado/:dpi', (req, res) => {
  let emp = req.body;
  client.query('UPDATE incidente SET estado = $1, fecha_terminado = now() WHERE dpi = $2', [emp.estado,emp.id], function(err,data){
    if(err)
    console.log(err);
    else
    console.log("Datos actualizados")
  })
});

//Insertar nuevo incidente
  app.post('/InsertarInc', (req, res) => {
    let emp = req.body;
    client.query('SELECT * FROM incidente WHERE dpi = $1', [emp.dpi], (err, rows, fields)=>{
      if(!err)
      {
        if(rows.rows.length == 0){
          var sql = 'INSERT INTO incidente(nombre_completo, dpi, celular, inconformidad, departamento, municipio, estado, direccion, fecha_creado,operador_usuario) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,now(),(SELECT operador_usuario from inconformidad where nombre_inconformidad =' +"'" + emp.inconformidad + "'" +'))';
          client.query(sql, [emp.nombre, emp.dpi, emp.celular, emp.inconformidad, emp.departamento, emp.municipio, emp.estado, emp.direccion], function(err, data){
            if(err)
            console.log(err);
            else
            console.log("Datos insertados")
          })
        }else{
          if(rows.rows[0].estado == 'Terminado'){
            var sql = 'INSERT INTO incidente(nombre_completo, dpi, celular, inconformidad, departamento, municipio, estado, direccion, fecha_creado,operador_usuario)  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,now(),(SELECT usuario from operador where usuario=' +"'" + emp.encargado + "'" +'))';
            client.query(sql, [emp.nombre, emp.dpi, emp.celular, emp.inconformidad, emp.departamento, emp.municipio, emp.estado, emp.direccion], function(err, data){
            if(err)
            console.log(err);
            else
            console.log("Datos insertados")
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
    let emp = req.body;
    client.query('SELECT * FROM inconformidad WHERE nombre_inconformidad = $1', [emp.nombre_inconformidad], (err, rows, fields)=>{
      if(!err)
      {
        console.log(rows.rows);
        if(rows.rows.length == 0){
          var sql = 'INSERT INTO inconformidad(nombre_inconformidad, encargado, respuesta, estado, operador_usuario)  VALUES ($1,$2,$3,$4,(SELECT usuario from operador where usuario=' +"'" + emp.encargado + "'" +'))';
          client.query(sql, [emp.nombre_inconformidad, emp.encargado, emp.respuesta, emp.estado], function(err, data){
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

//Ingresar nuevo usuario
app.post('/InsertarUsuario', (req, res) => {
  let emp = req.body;
  console.log(emp)
  client.query('SELECT * FROM operador WHERE usuario = $1', [emp.user], (err, rows, fields)=>{
    if(!err)
    {
      console.log(rows.rows);
      if(rows.rows.length == 0){
        var sql = 'INSERT INTO operador(usuario, pass, rol)  VALUES ($1,$2,$3)';
        client.query(sql, [emp.user, emp.password, emp.rol], function(err, data){
          if(err)
          console.log(err);
          else
          console.log("Usuario insertado")
        })
      }
      else{
        res.send("Usuario ya existe");
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
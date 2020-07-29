//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mysql = require('mysql');

// define the Express app
const app = express();

// the database
const VecIncidentes = [];
var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'incidentesdb',
  multipleStatements: true
});

mysqlConnection.connect((err)=>{
  if(!err)
  console.log('DB connection succeded')
  else
  console.log('DB connection failed \n Error : ' + JSON.stringify(err,undefined,2));
})

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
  })
});

// get a specific incidente with dpi
app.get('/incidente/:dpi', (req, res) => {
  console.log("hello");
  mysqlConnection.query('SELECT * FROM incidente WHERE DPI = ?', [req.params.dpi], (err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err)
  })
});

// delete a specific incidente with dpi
app.delete('/incidente/:dpi', (req, res) => {
  mysqlConnection.query('DELETE FROM incidente WHERE DPI = ?', [req.params.dpi], (err, rows, fields)=>{
    if(!err)
    res.send('Borrado Exitoso');
    else
    console.log(err)
  })
});

// insert an incidente
app.post('/incident', (req, res) => {
  console.log("entro");
  let emp = req.body;
  console.log(emp);
  var sql = 'INSERT INTO incidente(NOMBRE_COMPLETO, DPI, CELULAR, INCONFORMIDAD, DEPARTAMENTO, MUNICIPIO, ENCARGADO)  VALUES (?,?,?,?,?,?,?)';
  mysqlConnection.query(sql, [emp.NOMBRE_COMPLETO, emp.DPI, emp.CELULAR, emp.INCONFORMIDAD, emp.DEPARTAMENTO, emp.MUNICIPIO, emp.ENCARGADO], function(err, data){
    if(err)
    console.log(err);
    else
    console.log("datos insertados")
  })
});

// insert a new incidente
app.post('/post', (req, res) => {
  const newIncidente = {
    id: VecIncidentes.length + 1,
    nombre: req.body.nombre,
    dpi: req.body.dpi,
    celular: req.body.celular,
    inconformidad: req.body.inconformidad,
    departamento: req.body.departamento,
    municipio: req.body.municipio,
    encargado: "",
  };
  VecIncidentes.push(newIncidente);
  console.log(this.VecIncidentes)
  res.status(200).send();
});

// insert a encargado to a incident
app.post('/encargado/:id', (req, res) => {
  const encargado = req.body.encargado;

  const incidente = VecIncidentes.filter(q => (q.id === parseInt(req.params.id)));
  if (incidente.length > 1) return res.status(500).send();
  if (incidente.length === 0) return res.status(404).send();

  incidente[0].encargado.push(encargado);
  res.status(200).send();
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});
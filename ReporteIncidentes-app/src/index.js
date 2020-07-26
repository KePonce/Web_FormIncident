//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

// the database
const VecIncidentes = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

// retrieve all incidentes
app.get('/', (req, res) => {
  res.send(VecIncidentes);
});

// get a specific incidente
app.get('/incidente/:dpi', (req, res) => {
  const incidente = incidente.filter(q => (q.dpi === parseInt(req.params.dpi)));
  if (incidente.length > 1) return res.status(500).send();
  if (incidente.length === 0) return res.status(404).send();
  res.send(incidente[0]);
});

// insert a new incidente
app.post('/test', (req, res) => {
  //const {title, description} = req.body;
  const newIncidente = {
    id: VecIncidentes.length + 1,
    nombre: req.body.nombre,
    dpi: req.body.dpi,
    celular: req.body.celular,
    inconformidad: req.body.inconformidad,
    departamento: req.body.departamento,
    municipio: req.body.municipio,
    encargado: [],
  };
  VecIncidentes.push(newIncidente);
  console.log(this.VecIncidentes)
  res.status(200).send();
});

// insert a encargado to a incident
app.post('/encargado/:id', (req, res) => {
  const {encargado} = req.body;

  const incidente = VecIncidentes.filter(q => (q.id === parseInt(req.params.id)));
  if (incidente.length > 1) return res.status(500).send();
  if (incidente.length === 0) return res.status(404).send();

  incidente[0].encargado.push({
    encargado,
  });

  res.status(200).send();
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});
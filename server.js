const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  massive = require('massive');
  , ctrl = require('./controller.js');


const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
// massive({
//   host: //host,
//   port: //port,
//   database: //database,
//   user: //user,
//   password: //password
// }).then( db => {
//   app.set('db', db);
massive(config.connectionString).then(db => {
  app.set('db', db);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then(response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then(response => {
      console.log('Vehicle table init');
    });
  });
});

// ===== Build enpoints below ============
app.get('api/users', ctrl.gettAllUsers)
app.get('api/vehicles', ctrl.getAllVehicles)
app.get('/api/user/:userId/vehiclecount', ctrl.getCountCarsByID)
app.get('/api/user/:userId/vehicle', ctrl.getCarsByUserID)
app.get('api/vehicle', ctrl.getQuery)
// app.get('api/vehicle',)
app.get('api/newervehiclebyyear', ctrl.getVehiclesByYear)

app.put('/api/vehicle/:vehicleId/user/:userId', ctrl.UpdateVehicleOwner)

app.post('api/users', ctrl.addUser)
app.post('api/vehicles', ctrl.addVehicle)

app.delete('/api/user/:userId/vehicle/:vehicleId', ctrl.DeleteOwnership)
app.delete('/api/vehicle/:vehicleId', ctrl.DeleteVehicleByID)


// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
});

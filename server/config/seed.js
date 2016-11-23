/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;


User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'AUTOPARTES CORREA SA DE CV',
      rfc: 'ACO990517TF1',
      password: '1234',
      per_idpersona:75380
    },{
      provider: 'local',
      name: 'RISP AUTOMOTRIZ',
      rfc: 'RAU990308DZ0',
      password: '1234',
      per_idpersona:74825
    }, {
      provider: 'local',
      role: 'admin',
      name: 'ADMINISTRADOR REFACCIONES',
      rfc: 'MPI',
      password: '1234',
      per_idpersona:15
    },{
      provider: 'local',
      name: 'CENTRO AUTOMOTRIZ DE LA LAGUNA, S.A. DE C.V.',
      rfc: 'CAL7401045S9',
      password: '1234',
      per_idpersona:74861
    }])
    .then(() => {
      console.log('finished populating users');
    });
  });

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;

/*
User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'AUTOMOTRIZ EL TOREO, S.A. DE C.V.',
      rfc: 'ATO911125I32',
      password: '1234',
      per_idpersona:11
    },{
      provider: 'local',
      name: 'RISP AUTOMOTRIZ',
      rfc: 'RAU990308DZ0',
      password: '1234',
      per_idpersona:74825
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      rfc: 'PAGO910812AAA',
      password: 'admin'
    }])
    .then(() => {
      console.log('finished populating users');
    });
  });*/

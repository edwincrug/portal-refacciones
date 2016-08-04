'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'sqlite://',
    database:"refacciones",
    user:"sa",
    pass:"S0p0rt3",
    connectionTimeout:4000,
    options: {
      host: '192.168.20.9',
      dialect: 'mssql',
    }
  },

  // Seed database on startup
  seedDB: false

};

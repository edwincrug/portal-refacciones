
import config from '../config/environment';
import sql from 'mssql';


var connection = new sql.Connection({
    user: config.sequelize.user,
    password: config.sequelize.pass,
    server: config.sequelize.options.host,
    database: config.sequelize.database,
    connectionTimeout: config.sequelize.connectionTimeout
});

var DataAccess = {
  types:{
      INT: sql.Int,
      DECIMAL: sql.Decimal(18, 2),
      STRING: sql.VarChar(8000),
      DATE: sql.DateTime
  },query :function(stored, params, callback) {
      var self = connection;
      connection.connect(function(err) {
          // Stored Procedure
          var request = new sql.Request(self);
          // Add inputs
          params.forEach(function(param) {
                  request.input(param.name, param.type, param.value);
              })
              // request.output('output_parameter', sql.VarChar(50));
          request.execute(stored)
              .then(function(recordsets) {
                  callback(null, recordsets);
              }).catch(function(err) {
                  callback(err);
              });
      });
  }
}
module.exports = DataAccess;

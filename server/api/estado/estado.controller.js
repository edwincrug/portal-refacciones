'use strict';

import _ from 'lodash';
import DataAccess from '../../sqldb/dataAccess';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Empresas
export function index(req, res) {
  var params = [];
  params.push({
    name: 'idUsuario',
    value: req.query.user,
    type: DataAccess.types.STRING
  })

  params.push({
    name: 'idEmpresa',
    value: req.query.idEmpresa,
    type: DataAccess.types.INT
  })

  params.push({
    name: 'idSucursal',
    value: req.query.idSucursal,
    type: DataAccess.types.INT
  })

  console.log('estado:')
  console.log(params)

  DataAccess.query('SEL_ESTADOS_SP', params, function(error, result) {
    console.log('error:',error)
    console.log('result:',result)
    if(error) return handleError(res)(error);
    return respondWithResult(res)(result[0])
  });
}
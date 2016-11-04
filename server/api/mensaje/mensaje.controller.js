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

// Gets a list of Mensajes por empresa
export function index(req, res) {
  var params = [];
  params.push({
    name: 'idUsuario',
    value: req.query.user,
    type: DataAccess.types.INT
  })
  params.push({
    name: 'sucursal',
    value: req.query.sucursal,
    type: DataAccess.types.STRING
  })
  params.push({
    name: 'empresa',
    value: req.query.empresa,
    type: DataAccess.types.STRING
  })

  console.log('SEL_MENSAJE_SP')
  console.log(params)

  DataAccess.query('SEL_MENSAJE_SP', params, function(error, result) {
    
    /*console.log('99928229129')
    console.log(result[0][0])*/

    if (error) return handleError(res)(error);
    return respondWithResult(res)({data:result[0]})
  })
}
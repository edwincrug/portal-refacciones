/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/empresa              ->  index
 */

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
    value: req.body.user,
    type: DataAccess.types.STRING
  })
  DataAccess.query('SEL_EMPRESA_SP', params, function(error, result) {
    if(error) return handleError(res)(error);
    return respondWithResult(res)(result[0])
  });
}

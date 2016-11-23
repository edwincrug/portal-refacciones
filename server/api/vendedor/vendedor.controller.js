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

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Sucursals
export function index(req, res) {
  var params = [];
  
  params.push({
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: DataAccess.types.INT
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
    
    params.push({
            name: 'idDireccion',
            value: req.query.idDireccion,
            type: DataAccess.types.INT
        })    

  DataAccess.query('SEL_VENDEDOR_SP', params, function(error, result) {
    if(error) return handleError(res)(error);
    return respondWithResult(res)(result[0])
  });
}

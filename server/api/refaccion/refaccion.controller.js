/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/refaccion              ->  index
 * POST    /api/refaccion              ->  create
 * GET     /api/refaccion/:id          ->  show
 * PUT     /api/refaccion/:id          ->  update
 * DELETE  /api/refaccion/:id          ->  destroy
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

// Gets a list of Refaccions
export function index(req, res) {
  var params = [];
  params.push({
    name: 'descripcion',
    value: req.query.query,
    type: DataAccess.types.STRING
  })
  params.push({
    name: 'PAR_IDENPARA',
    value: req.query.par_idenpara,
    type: DataAccess.types.STRING
  })
  params.push({
    name: 'PAR_TIPOPARA',
    value: req.query.par_tipopara,
    type: DataAccess.types.STRING
  })

  params.push({
    name: 'idEmpresa',
    value: req.query.idEmpresa,
    type: DataAccess.types.STRING
  })

  params.push({
    name: 'idSucursal',
    value: req.query.idSucursal,
    type: DataAccess.types.STRING
  })

  //console.log(params)

  DataAccess.query('SEL_REFACCION_SP', params, function(error, result) {
    if(error) return handleError(res)(error);
    return respondWithResult(res)(result[0])
  });
}


// Gets a single Refaccion from the DB
export function show(req, res) {
  return Refaccion.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/direccion              ->  index
 * POST    /api/direccion              ->  create
 * GET     /api/direccion/:id          ->  show
 * PUT     /api/direccion/:id          ->  update
 * DELETE  /api/direccion/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import jsonxml from 'jsontoxml';
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

// Gets a list of Direccions
export function index(req, res) {
  var params = [];
  params.push({
    name: 'idUsuario',
    value: req.query.user,
    type: DataAccess.types.INT
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

  DataAccess.query('SEL_DIRECCION_SP', params, function(error, result) {
    if (error) return handleError(res)(error);
    return respondWithResult(res)(result[0])
  })
}


// Gets a single Direccion from the DB
export function show(req, res) {
  return Direccion.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Direccion in the DB
export function create(req, res) {
  return Direccion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Direccion in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Direccion.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Direccion from the DB
export function destroy(req, res) {
  return Direccion.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cotizacion              ->  index
 * POST    /api/cotizacion              ->  create
 * GET     /api/cotizacion/:id          ->  show
 * PUT     /api/cotizacion/:id          ->  update
 * DELETE  /api/cotizacion/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import jsonxml from 'jsontoxml';
import DataAccess from '../../sqldb/dataAccess';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    console.log("entity",entity)
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

// Gets a list of Cotizacions
export function index(req, res) {
  return Cotizacion.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Cotizacion from the DB
export function show(req, res) {
  return Cotizacion.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Cotizacion in the DB
export function create(req, res) {
  for (var i = 0; i < req.body.refacciones.length; i++) {
    req.body.refacciones[i] = {refaccion:req.body.refacciones[i]}
  }
  console.log(req.body);
  var params = [];
  params.push({
    name: 'idUsuario',
    value: req.body.idUsuario,
    type: DataAccess.types.INT
  })
  params.push({
    name: 'refacciones',
    value: jsonxml({refacciones:req.body.refacciones}),
    type: DataAccess.types.STRING
  })
  params.push({
    name: 'descripcion',
    value: req.body.descripcion,
    type: DataAccess.types.STRING
  })
  params.push({
    name: 'base',
    value: req.body.base,
    type: DataAccess.types.STRING
  })
  params.push({
    name: 'total',
    value: req.body.total,
    type: DataAccess.types.DECIMAL
  })
  params.push({
    name: 'empresa',
    value: req.body.empresa,
    type: DataAccess.types.STRING
  })
  params.push({
    name: 'sucursal',
    value: req.body.sucursal,
    type: DataAccess.types.STRING
  })

  console.log(params)
  DataAccess.query('INS_COTIZACION_SP', params, function(error, result) {
    console.log(error)
    console.log(result)

    if (error) return handleError(res)(error);
    return respondWithResult(res, 201)(result[0][0])
  });

}

// Updates an existing Cotizacion in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Cotizacion.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Cotizacion from the DB
export function destroy(req, res) {
  return Cotizacion.find({
      where: {
        _id: req.params.id
      }
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

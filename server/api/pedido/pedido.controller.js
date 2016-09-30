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

// Gets a list of Cotizacions
export function index(req, res) {
  var params = [];
  params.push({
    name: 'idUsuario',
    value: req.query.user,
    type: DataAccess.types.INT
  })
  params.push({
    name: 'estatus',
    value: req.query.estatus,
    type: DataAccess.types.STRING
  })
  DataAccess.query('SEL_PEDIDO_USUARIO_SP', params, function(error, result) {
    if (error) return handleError(res)(error);
    return respondWithResult(res)(result[0])
  })
}

// Gets a single Cotizacion from the DB
export function show(req, res) {
  var params = [];
  params.push({
    name: 'idPedido',
    value: req.params.id,
    type: DataAccess.types.INT
  })
  params.push({
    name: 'idUsuario',
    value: req.query.user,
    type: DataAccess.types.INT
  })
  console.log(params)
  DataAccess.query('SEL_PEDIDO_USUARIODETALLE_SP', params, function(error, result) {
    if (error) return handleError(res)(error);
    return respondWithResult(res)({
      data: result[0]
    })
  })

}

// Creates a new Cotizacion in the DB
export function create(req, res) {

  console.log(req.body)

  var params = [];
  params.push({
    name: 'idCotizacion',
    value: req.body.idCotizacion,
    type: DataAccess.types.INT
  })
  params.push({
    name: 'idPersona',
    value: req.body.idPersona,
    type: DataAccess.types.INT
  })
  params.push({
    name: 'RTD_CONSEC',
    value: req.body.concecutivo,
    type: DataAccess.types.INT
  })
  params.push({
    name: 'RTD_RTENTREGA',
    value: req.body.entrega,
    type: DataAccess.types.STRING
  })
  params.push({
    name: 'operacion',
    value: req.body.operacion,
    type: DataAccess.types.INT
  })
  params.push({
    name: 'idPedidoRef',
    value: req.body.idPedido,
    type: DataAccess.types.INT
  })
  params.push({
    name: 'resBPRO',
    value: req.body.respuesta,
    type: DataAccess.types.INT
  })

  DataAccess.query('INS_PEDIDO_SP', params, function(error, result) {
    console.log(error)

    if (error) return handleError(res)(error);
    //result[0][0].data = result[0][1]
    console.log(result)
    console.log(result[0][1])
    return respondWithResult(res, 201)(result[0][0])
  });

}

// Updates an existing Cotizacion in the DB
export function update(req, res) {
  for (var i = 0; i < req.body.refacciones.length; i++) {
    req.body.refacciones[i] = {
      refaccion: req.body.refacciones[i]
    }
  }
  var params = [];
  params.push({
    name: 'idCotizacion',
    value: req.body.idCotizacion,
    type: DataAccess.types.INT
  })
  params.push({
    name: 'refacciones',
    value: jsonxml({
      refacciones: req.body.refacciones
    }),
    type: DataAccess.types.STRING
  })

  params.push({
    name: 'total',
    value: req.body.total,
    type: DataAccess.types.DECIMAL
  })

  DataAccess.query('UPD_COTIZACION_SP', params, function(error, result) {
    if (error) return handleError(res)(error);
    result[0][0].detalle = result[0][1]

    return respondWithResult(res, 201)(result[0][0])
  });

}

// Deletes a Cotizacion from the DB
export function destroy(req, res) {
  var params = [];
  params.push({
    name: 'idCotizacion',
    value: req.params.id,
    type: DataAccess.types.INT
  })
  DataAccess.query('DEL_ESTATUS_COTIZACION_SP', params, function(error, result) {
    if (error) return handleError(res)(error);
    return respondWithResult(res)(result[0][0])
  })
}

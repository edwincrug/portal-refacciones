/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/template              ->  index
 * POST    /api/template              ->  create
 * GET     /api/template/:id          ->  show
 * PUT     /api/template/:id          ->  update
 * DELETE  /api/template/:id          ->  destroy
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
     name: 'sucursal',
     value: req.query.sucursal,
     type: DataAccess.types.STRING
   })
   params.push({
     name: 'empresa',
     value: req.query.empresa,
     type: DataAccess.types.STRING
   })
   DataAccess.query('SEL_PLANTILLA_SP', params, function(error, result) {
     if (error) return handleError(res)(error);
     return respondWithResult(res)(result[0])
   })
 }

 // Gets a single Cotizacion from the DB
 export function show(req, res) {
   var params = [];
   params.push({
     name: 'idCotizacionPlantilla',
     value: req.params.id,
     type: DataAccess.types.INT
   })
   DataAccess.query('SEL_PLANTILLADETALLE_SP', params, function(error, result) {
     if (error) return handleError(res)(error);
     return respondWithResult(res)({data:result[0]})
   })

 }

 // Creates a new Cotizacion in the DB
 export function create(req, res) {
   for (var i = 0; i < req.body.refacciones.length; i++) {
     req.body.refacciones[i] = {
       refaccion: req.body.refacciones[i]
     }
   }
   var params = [];
   params.push({
     name: 'idUsuario',
     value: req.body.idUsuario,
     type: DataAccess.types.INT
   })
   params.push({
     name: 'idCotizacion',
     value: 0,
     type: DataAccess.types.DECIMAL
   })
   params.push({
     name: 'refacciones',
     value: jsonxml({
       refacciones: req.body.refacciones
     }),
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
     name: 'empresa',
     value: req.body.empresa,
     type: DataAccess.types.STRING
   })
   params.push({
     name: 'sucursal',
     value: req.body.sucursal,
     type: DataAccess.types.STRING
   })
   DataAccess.query('INS_COTIZACIONPLANTILLA_SP', params, function(error, result) {
     if (error) return handleError(res)(error);
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
     name: 'idCotizacionPlantilla',
     value: req.body.idCotizacionPlantilla,
     type: DataAccess.types.INT
   })
   params.push({
     name: 'refacciones',
     value: jsonxml({
       refacciones: req.body.refacciones
     }),
     type: DataAccess.types.STRING
   })


   DataAccess.query('UPD_PLANTILLA_SP', params, function(error, result) {

     if (error) return handleError(res)(error);
     return respondWithResult(res, 201)(result[0][0])
   });

 }

 // Deletes a Cotizacion from the DB
 export function destroy(req, res) {
   var params = [];
   params.push({
     name: 'idCotizacionPlantilla',
     value: req.params.id,
     type: DataAccess.types.INT
   })
   params.push({
     name: 'idEstatus',
     value: 0,
     type: DataAccess.types.INT
   })

   DataAccess.query('DEL_ESTATUS_PLANTILLA_SP', params, function(error, result) {
     if (error) return handleError(res)(error);
     return respondWithResult(res)(result[0][0])
   })
 }

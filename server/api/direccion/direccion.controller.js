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

    console.log('guarda direccion server')

    console.log(req.body)

    var params = [];
    params.push({
        name: 'idUsuario',
        value: req.body.idUsuario,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'idEmpresa',
        value: req.body.idEmpresa,
        type: DataAccess.types.INT
    })
    params.push({
        name: 'idSucursal',
        value: req.body.idSucursal,
        type: DataAccess.types.INT
    })
    params.push({
        name: 'estado',
        value: req.body.estado,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'ciudad',
        value: req.body.ciudad,
        type: DataAccess.types.STRING
    })
    params.push({
            name: 'municipio',
            value: req.body.municipio,
            type: DataAccess.types.STRING
        })
        //LQMA ADD 05102016  
    params.push({
        name: 'colonia',
        value: req.body.colonia,
        type: DataAccess.types.STRING
    })

    ////////////////////////////////
    params.push({
        name: 'cp',
        value: req.body.cp,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'calle',
        value: req.body.calle,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'exterior',
        value: req.body.exterior,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'interior',
        value: req.body.interior,
        type: DataAccess.types.STRING
    })

    params.push({
        name: 'referencia',
        value: req.body.referencia,
        type: DataAccess.types.STRING
    })

    //CONTACTO 1
    params.push({
        name: 'nombre1',
        value: req.body.nombre1,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'apaterno1',
        value: req.body.apaterno1,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'amaterno1',
        value: req.body.amaterno1,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'rfc1',
        value: req.body.rfc1,
        type: DataAccess.types.STRING
    })

    params.push({
        name: 'lada1',
        value: req.body.lada1,
        type: DataAccess.types.STRING
    })

    params.push({
        name: 'tel1_1',
        value: req.body.tel1_1,
        type: DataAccess.types.STRING
    })

    params.push({
        name: 'tel2_1',
        value: req.body.tel2_1,
        type: DataAccess.types.STRING
    })

    params.push({
        name: 'correo1',
        value: req.body.correo1,
        type: DataAccess.types.STRING
    })

    //CONTACTO 2
    params.push({
        name: 'nombre2',
        value: req.body.nombre2,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'apaterno2',
        value: req.body.apaterno2,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'amaterno2',
        value: req.body.amaterno2,
        type: DataAccess.types.STRING
    })
    params.push({
        name: 'rfc2',
        value: req.body.rfc2,
        type: DataAccess.types.STRING
    })

    params.push({
        name: 'lada2',
        value: req.body.lada2,
        type: DataAccess.types.STRING
    })

    params.push({
        name: 'tel1_2',
        value: req.body.tel1_2,
        type: DataAccess.types.STRING
    })

    params.push({
        name: 'tel2_2',
        value: req.body.tel2_2,
        type: DataAccess.types.STRING
    })

    params.push({
        name: 'correo2',
        value: req.body.correo2,
        type: DataAccess.types.STRING
    })

    params.push({
        name: 'correoGeneral',
        value: req.body.correoGeneral,
        type: DataAccess.types.STRING
    })

    console.log('inserta direccion: ')
    console.log(params)

    DataAccess.query('INS_DIRECCION_CLIENTE_SP', params, function(error, result) {
        console.log('error: INS_DIRECCION_CLIENTE_SP')
        console.log(error)

        console.log(result)

        if (error) return handleError(res)(error);
        result[0][0].data = result[1]
        return respondWithResult(res, 201)(result[0][0])
    });
    /*return Direccion.create(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));*/
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

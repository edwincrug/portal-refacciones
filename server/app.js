/**
 * Main application file
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
    serveClient: config.env !== 'production',
    path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

//LQMA 23/11/2016
//**********************************************
//var multer = require('multer');
var path = require('path');
var formidable = require('formidable');

var fs = require('fs');

var rutaDestino = 'C:/GA_Centralizacion/CuentasXCobrar/Refacciones/DireccionesCliente/';

/*var storage = multer.diskStorage({
    destination: function(req, file, cb) {

        console.log('idDireccion')
        console.log(req.body.idDireccion)
        console.log('file')
        console.log(file)

        cb(null, 'C:/GA_Centralizacion/CuentasXCobrar/Refacciones/DireccionesCliente/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage }).single('avatar');*/

app.post('/comprobante', function(req, res) {

    /*path = path + "/ZZZZZZ"

    fs.mkdir(path, function(err) {
        if (err) {
            console.log('failed to create directory', err);
        } else {
            /*fs.writeFile(path + "/mytemp", myData, function(err) {
                if (err) {
                    console.log('error writing file', err);
                } else {
                    console.log('writing file succeeded');
                }
            });
        }
    });*/


    /*console.log(req.body)
    var num = req.body.idDireccion;
    console.log('direccion!')
    console.log(req.body.idDireccion)

    console.log('aqui!')
    upload(req, res, function(err) {

        //console.log(req)

        if (err) {
            //console.log(err)
            // An error occurred when uploading 
            return
        }
        return

        // Everything went fine 
    })*/

    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    //form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads'); //rutaDestino

    console.log(form)

    var nombreArchivo = '';
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        nombreArchivo = file.name;
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {

        var datosDir = nombreArchivo.substring(0, nombreArchivo.indexOf("."));

        console.log('idDireccion')
        console.log(datosDir)

        var arreglo = datosDir.split('_');

        console.log(arreglo[0]) //direccion
        console.log(arreglo[1]) //cliente

        //var stats = fs.lstatSync(rutaDestino + arreglo[1]);        

        // Is it a directory?
        if (!fsExistsSync(rutaDestino + arreglo[1])) {
            // no existe
            console.log('no existe cliente')
            console.log('se crea directorio de cliente')
            fs.mkdirSync(rutaDestino + arreglo[1]);

            console.log('se crea directorio de direccion')
            fs.mkdirSync(rutaDestino + arreglo[1] + '/' + arreglo[0]);

            fs.renameSync(form.uploadDir + '/' + nombreArchivo,rutaDestino + arreglo[1] + '/' + arreglo[0] + '/' + arreglo[0] + '_comprobante.pdf');

        } else {
            if (!fsExistsSync(rutaDestino + arreglo[1] + '/' + arreglo[0])) {

                console.log('no existe direccion')
                console.log('se crea directorio de direccion')

                fs.mkdirSync(rutaDestino + arreglo[1] + '/' + arreglo[0]);

                fs.renameSync(form.uploadDir + '/' + nombreArchivo,rutaDestino + arreglo[1] + '/' + arreglo[0] + '/' + arreglo[0] + '_comprobante.pdf');

            } else {

            	console.log('existe ruta completa, copiamos archivo')

            	fs.renameSync(form.uploadDir + '/' + nombreArchivo,rutaDestino + arreglo[1] + '/' + arreglo[0] + '/' + arreglo[0] + '_comprobante.pdf');

            }
        }

        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

})

function fsExistsSync(myDir) {
    try {
        fs.accessSync(myDir);
        return true;
    } catch (e) {
        return false;
    }
}


//***********************************************

var body_parser = require('body-parser');
app.use(body_parser()) //Express 4

//var multipart = require('connect-multiparty');
//app.use(multipart())

// Start server
function startServer() {
    app.angularFullstack = server.listen(config.port, config.ip, function() {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
}

sqldb.sequelize.sync()
    .then(startServer)
    .catch(function(err) {
        console.log('Server failed to start due to error: %s', err);
    });

// Expose app
exports = module.exports = app;

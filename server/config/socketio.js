/**
 * Socket.io configuration
 */
'use strict';

import config from './environment';

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/pedido/pedido.socket').register(socket);
  require('../api/direccion/direccion.socket').register(socket);
  require('../api/template/template.socket').register(socket);
  require('../api/refaccion/refaccion.socket').register(socket);
  require('../api/cotizacion/cotizacion.socket').register(socket);
  require('../api/mensaje/mensaje.socket').register(socket);
  require('../api/sucursal/sucursal.socket').register(socket);
  require('../api/empresa/empresa.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);

  require('../api/estado/estado.socket').register(socket);
  require('../api/ciudad/ciudad.socket').register(socket);
  require('../api/municipio/municipio.socket').register(socket);
  require('../api/colonia/colonia.socket').register(socket);
  require('../api/cp/cp.socket').register(socket);  

}

export default function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function(socket) {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
}

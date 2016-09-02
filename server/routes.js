/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/pedido', require('./api/pedido'));
  app.use('/api/direccion', require('./api/direccion'));
  app.use('/api/template', require('./api/template'));
  app.use('/api/refaccion', require('./api/refaccion'));
  app.use('/api/cotizacion', require('./api/cotizacion'));
  app.use('/api/sucursal', require('./api/sucursal'));
  app.use('/api/empresa', require('./api/empresa'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}

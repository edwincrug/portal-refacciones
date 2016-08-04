/**
 * Cotizacion model events
 */

'use strict';

import {EventEmitter} from 'events';
var Cotizacion = require('../../sqldb').Cotizacion;
var CotizacionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CotizacionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Cotizacion.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CotizacionEvents.emit(event + ':' + doc._id, doc);
    CotizacionEvents.emit(event, doc);
    done(null);
  }
}

export default CotizacionEvents;

'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

_mongoose2.default.Promise = global.Promise;

//Use only for development purpose
_mongoose2.default.set('debug', true); // debug mode on
try {
    _mongoose2.default.connect(_constants2.default.DB_URL, {});
} catch (err) {
    _mongoose2.default.createConnection(_constants2.default.DB_URL, {});
}

_mongoose2.default.connection.once('open', function () {
    return console.log('MongoDB Running');
}).on('error', function (e) {
    throw e;
});
//# sourceMappingURL=db.js.map
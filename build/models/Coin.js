'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CoinSchema = new _mongoose.Schema({
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    coin: {
        type: Number,
        default: 0
    },
    purpose: String
}, { collection: 'user_coins' }, { timestamps: true });
exports.default = _mongoose2.default.model('Coin', CoinSchema);
//# sourceMappingURL=Coin.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewCoinSchema = new _mongoose.Schema({
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    no_coin: {
        type: Number,
        default: 0
    },
    //pay_method: String,
    ref_code: String
}, { collection: 'user_new_coins' }, { timestamps: true });
NewCoinSchema.plugin(_mongooseTimestamp2.default);
exports.default = _mongoose2.default.model('NewCoin', NewCoinSchema);
//# sourceMappingURL=NewCoin.js.map
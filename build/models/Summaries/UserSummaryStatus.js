'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSummaryStatusSchema = new _mongoose.Schema({
    summary: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Summary'
    },
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    view_status: {
        type: Boolean,
        default: false
    }
}, { collection: 'summary_view_status' });
exports.default = _mongoose2.default.model('UserSummaryStatusSchema', UserSummaryStatusSchema);
//# sourceMappingURL=UserSummaryStatus.js.map
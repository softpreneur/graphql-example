'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import timestamps from 'mongoose-timestamp';

var SummaryDownvoteSchema = new _mongoose.Schema({
    summary: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Summary'
    },
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'summary_downvotes' });

//UpvoteSchema.plugin(timestamps);
exports.default = _mongoose2.default.model("SummaryDownvote", SummaryDownvoteSchema);
//# sourceMappingURL=Downvote.js.map
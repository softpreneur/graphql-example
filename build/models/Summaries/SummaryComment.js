'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SummaryCommentSchema = new _mongoose.Schema({
    summary: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Summary'
    },
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        maxlength: [200, 'Text must be less than 200']
    }
}, { collection: 'summary_comments' });
SummaryCommentSchema.plugin(_mongooseTimestamp2.default);
exports.default = _mongoose2.default.model('SummaryComment', SummaryCommentSchema);
//# sourceMappingURL=SummaryComment.js.map
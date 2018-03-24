'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SummarySchema = new _mongoose.Schema({
    course: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    introduction: {
        type: String,
        maxlength: [200, "Max of 200 characters"]
    },
    content: {
        type: String,
        maxlength: [500, "Max of 500 characters "]
    },
    topic: {
        type: String,
        maxlength: [50, "Max of 50 character"]
    },
    report: {
        type: Boolean,
        default: false
    },
    no_comments: {
        type: Number,
        default: 0
    },
    upvote: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Upvote'
    },
    downvote: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Downvote'
    },
    upvote_no: {
        type: Number,
        default: 0
    },
    downvote_no: {
        type: Number,
        default: 0
    }
}, { collection: 'summaries' });

SummarySchema.plugin(_mongooseTimestamp2.default);
exports.default = _mongoose2.default.model('Summary', SummarySchema);
//# sourceMappingURL=Summary.js.map
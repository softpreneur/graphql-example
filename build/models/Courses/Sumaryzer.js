'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SumaryzerSchema = new _mongoose.Schema({
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    course_code: {
        type: String,
        maxlength: [8, "Max of 8 character"]
    },
    course_title: {
        type: String,
        maxlength: [50, "Max of 50 characters"]
    },
    department: String,
    faculty: String,
    school: String,
    description: {
        type: String,
        maxlength: [145, 'Text must be less than 200']
    }
}, { collection: 'sumaryzers' });
SumaryzerSchema.plugin(_mongooseTimestamp2.default);
exports.default = _mongoose2.default.model('Sumaryzers', SumaryzerSchema);
//# sourceMappingURL=Sumaryzer.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CourseAllowedSchema = new _mongoose.Schema({
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    course_code: {
        type: String,
        maxlength: [8, "Max of 8 character"]
    }
}, { collection: 'courses_allowed' });
CourseAllowedSchema.plugin(_mongooseTimestamp2.default);
exports.default = _mongoose2.default.model('CourseAllowed', CourseAllowedSchema);
//# sourceMappingURL=CoursesAllowed.js.map
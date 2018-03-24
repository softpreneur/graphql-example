'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserCourseSchema = new _mongoose.Schema({
    course: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    course_code: String,
    course_title: String,
    department: String,
    description: String
}, { collection: 'users_course' });
UserCourseSchema.plugin(_mongooseTimestamp2.default);
exports.default = _mongoose2.default.model('UserCourse', UserCourseSchema);
//# sourceMappingURL=UserCourse.js.map
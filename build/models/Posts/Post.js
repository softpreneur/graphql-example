'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
  question: String,
  course: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  department: {
    type: String,
    index: true
  },
  faculty: {
    type: String,
    index: true
  },
  upvote_no: {
    type: Number,
    default: 0
  },
  downvote_no: {
    type: Number,
    default: 0
  },
  no_answers: {
    type: Number,
    default: 0
  }
}, { collection: "posts" });
PostSchema.plugin(_mongooseTimestamp2.default);
PostSchema.index({ createdAt: 1 });
exports.default = _mongoose2.default.model('Post', PostSchema);
//# sourceMappingURL=Post.js.map
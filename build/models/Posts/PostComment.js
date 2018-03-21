'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostCommentSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  post: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Post",
    index: true
  },
  comment: String,
  upvote_no: {
    type: Number,
    default: 0
  },
  downvote_no: {
    type: Number,
    default: 0
  }
}, { collection: "post_comments" });
PostCommentSchema.plugin(_mongooseTimestamp2.default);
PostCommentSchema.index({ createdAt: 1 });
exports.default = _mongoose2.default.model('PostComment', PostCommentSchema);
//# sourceMappingURL=PostComment.js.map
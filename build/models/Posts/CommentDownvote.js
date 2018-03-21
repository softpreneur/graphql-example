"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import timestamps from 'mongoose-timestamp';

var PostCommentDownvoteSchema = new _mongoose.Schema({
  comment: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "PostComment"
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { collection: "post_comment_downvotes" });
//UpvoteSchema.plugin(timestamps);
exports.default = _mongoose2.default.model('PostCommentDownvote', PostCommentDownvoteSchema);
//# sourceMappingURL=CommentDownvote.js.map
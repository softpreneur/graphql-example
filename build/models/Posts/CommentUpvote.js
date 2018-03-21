'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostCommentUpvoteSchema = new _mongoose.Schema({
    comment: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'PostComment'
    },
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'post_comment_upvotes' });
//PostUpvoteSchema.index({ post: 1 });
//PostUpvoteSchema.index({ user: 1 });
exports.default = _mongoose2.default.model("PostCommentUpvote", PostCommentUpvoteSchema);
//# sourceMappingURL=CommentUpvote.js.map
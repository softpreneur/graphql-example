'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostUpvoteSchema = new _mongoose.Schema({
    post: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'post_upvotes' });
//PostUpvoteSchema.index({ post: 1 });
//PostUpvoteSchema.index({ user: 1 });
exports.default = _mongoose2.default.model("PostUpvote", PostUpvoteSchema);
//# sourceMappingURL=Upvote.js.map
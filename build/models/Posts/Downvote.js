'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import timestamps from 'mongoose-timestamp';

var PostDownvoteSchema = new _mongoose.Schema({
    post: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'post_downvotes' });
//UpvoteSchema.plugin(timestamps);
exports.default = _mongoose2.default.model('PostDownvote', PostDownvoteSchema);
//# sourceMappingURL=Downvote.js.map
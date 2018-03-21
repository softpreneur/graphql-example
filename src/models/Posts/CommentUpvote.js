import mongoose, { Schema } from 'mongoose';

const PostCommentUpvoteSchema = new Schema({
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'PostComment'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { collection: 'post_comment_upvotes' });
//PostUpvoteSchema.index({ post: 1 });
//PostUpvoteSchema.index({ user: 1 });
export default mongoose.model("PostCommentUpvote", PostCommentUpvoteSchema);
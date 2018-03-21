import mongoose, { Schema } from 'mongoose';

const PostUpvoteSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { collection: 'post_upvotes' });
//PostUpvoteSchema.index({ post: 1 });
//PostUpvoteSchema.index({ user: 1 });
export default mongoose.model("PostUpvote", PostUpvoteSchema);